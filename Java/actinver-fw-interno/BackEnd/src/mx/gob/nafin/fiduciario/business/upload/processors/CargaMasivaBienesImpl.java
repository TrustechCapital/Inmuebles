package mx.gob.nafin.fiduciario.business.upload.processors;

import java.io.File;

import java.util.ArrayList;
import java.util.List;

import java.util.Map;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.util.DateUtils;
import mx.com.inscitech.fiducia.models.LayoutCargaBienes;
import mx.com.inscitech.fiducia.negocio.bienes.Constants.TiposCargaMasiva;
import mx.com.inscitech.fiducia.negocio.bienes.OperacionesCargaMasivaBienes;
import mx.com.inscitech.fiducia.util.ExcelDataReader;
import mx.com.inscitech.fiducia.util.XLSDataReader;
import mx.com.inscitech.fiducia.util.XLSXDataReader;

import mx.gob.nafin.fiduciario.BusinessException;
import mx.gob.nafin.fiduciario.business.upload.UploadProcessor;

import org.apache.commons.fileupload.FileItem;

public class CargaMasivaBienesImpl extends UploadProcessor {
    public CargaMasivaBienesImpl() {
        super();
    }

    @Override
    public Object getStateInfo() {
        // TODO Implement this method
        return null;
    }

    @Override
    public void run() {
        FileItem file = null;
        String fileName = null;
        ExcelDataReader excelReader = null;
        File temporaryFile = null;
        File excelFile = null;

        // IMPORTANTE: Se requiere un numero de transaccion para validar que la operacion fue completada
        Integer numTransaccion = Integer.valueOf(super.getParameters()
                                                      .get("numTransaccion")
                                                      .toString());

        Integer tipoCarga = Integer.valueOf(super.getParameters()
                                                 .get("tipoCarga")
                                                 .toString());

        String NOMBRE_TRANSACCION = this.getNombreTransaccion(tipoCarga);

        try {
            this.limpiaRegistrosTransaccion(numTransaccion, NOMBRE_TRANSACCION);

            temporaryFile = File.createTempFile("upload", ".tmp");
            temporaryFile.delete();
            temporaryFile.mkdirs();

            Integer idFideicomiso = Integer.valueOf(super.getParameters()
                                                         .get("idFideicomiso")
                                                         .toString());
            if (!this.existeFideicomiso(idFideicomiso)) {
                throw new BusinessException("400", "El fideicomiso no existe");
            }

            setStarted(true);

            file = (FileItem) this.files.get(0);
            fileName = getFileName(file);

            excelReader = getExcelReader(fileName);

            excelFile = new File(temporaryFile, fileName);

            file.write(excelFile);
            setPercent(5);

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "About to open the Excel File: [" + excelFile.getAbsolutePath() + "]");
            excelReader.openWorkBook(excelFile);
            setPercent(10);

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "Excel File Opened Succesfully! Sheets: " + excelReader.getSheetCount());
            excelReader.setActiveSheetByNumber(0);

            int rowsCount = excelReader.getRowCount();
            int colsCount = excelReader.getColumnCount();

            OperacionesCargaMasivaBienes cargaMasivaBienes = new OperacionesCargaMasivaBienes();
            List datosCarga = new ArrayList<LayoutCargaBienes>();

            for (int i = 1; i < rowsCount; i++) {
                List valoresFila = new ArrayList<Object>();

                int j = 0;

                try {
                    for (j = 0; j < colsCount; j++) {
                        excelReader.setCurrentCell(i, j);
                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Processing cell: row " + i + ", col" + j);

                        Object valor = null;

                        //valores date
                        if (j == 20) {
                            valor = DateUtils.toString(excelReader.getDateCellValue(false, null));
                        }
                        //valores string
                        else {
                            valor = excelReader.getStringCellValue(false, null);
                        }

                        // Valida que el id del fideicomiso sea igual
                        if (j == 0) {

                            Integer numFideicomisoFila = Double.valueOf(valor.toString()).intValue();

                            if (!numFideicomisoFila.equals(idFideicomiso)) {
                                throw new BusinessException("400",
                                                            String.format("El numero de fideicomiso de la fila %s no coincide",
                                                                          i));
                            }


                        }

                        valoresFila.add(valor);
                    }

                    LayoutCargaBienes layoutCargaBienes = cargaMasivaBienes.mapColumnsToObject(valoresFila);
                    datosCarga.add(layoutCargaBienes);

                } catch (BusinessException e) {
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR,
                               "Error al procesar el layout de carga de bienes", e);
                    throw e;
                } catch (Exception e) {
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR,
                               "Error al procesar el layout de carga de bienes", e);
                    throw new BusinessException("400",
                                                String.format("Ocurrio un error al procesar la linea %s en la columna %s ",
                                                              i, j + 1));
                }
            }

            int registrosCargados = datosCarga.size();
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "Total de Registros Cargados: " + registrosCargados);
            setMessage("Operacion realizada con exito! Registros Procesados: " + registrosCargados);


            cargaMasivaBienes.ejecutaCarga(tipoCarga, idFideicomiso, datosCarga);

            this.grabaTransaccionCompleta(numTransaccion, NOMBRE_TRANSACCION);

        } catch (BusinessException e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR,
                       "Error de datos en carga masiva de bienes", e);
            this.grabaErrorTransaccion(numTransaccion, NOMBRE_TRANSACCION, e.getErrorMessage());

        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR,
                       "Error inesperado en carga masiva de bienes", e);
            this.grabaErrorTransaccion(numTransaccion, NOMBRE_TRANSACCION,
                                       "Ocurrio un error en esperado al realizar la carga");

        } finally {
            if (excelReader != null)
                excelReader.closeWorkBook();
            excelReader = null;

            if (excelFile != null) {
                excelFile.delete();
            }

        }

        setPercent(100);
        setFinished(true);
    }

    private String getNombreTransaccion(Integer tipoCarga) {
        return tipoCarga == TiposCargaMasiva.INDIVIDUALIZACION.getValue() ? "CARGA_MASIVA_BIENES-INDIVIDUALIZACION" :
               "CARGA_MASIVA_BIENES-LIBERACION";
    }

    private boolean existeFideicomiso(Integer idFideicomiso) throws BusinessException {
        List result =
            this.ejecutaQuery("select count(0) as resultados from contrato where cto_num_contrato = ?",
                              new Object[] { idFideicomiso });
        return (Long) ((Map) result.get(0)).get("resultados") == 1;
    }

    private String getFileName(FileItem file) {
        String fileName = file.getName();

        if (fileName.indexOf("\\") != -1) {
            fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
        }

        if (fileName.indexOf("/") != -1) {
            fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        }

        return fileName;
    }

    private ExcelDataReader getExcelReader(String fileName) {
        if (fileName.toLowerCase().indexOf(".xlsx") != -1) {
            return new XLSXDataReader();
        }

        return new XLSDataReader();
    }

}
