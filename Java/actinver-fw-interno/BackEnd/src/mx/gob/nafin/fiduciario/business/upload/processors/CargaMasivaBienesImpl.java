package mx.gob.nafin.fiduciario.business.upload.processors;

import java.io.File;

import java.util.ArrayList;
import java.util.List;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.models.LayoutCargaBienes;
import mx.com.inscitech.fiducia.negocio.bienes.OperacionesCargaMasivaBienes;
import mx.com.inscitech.fiducia.util.ExcelDataReader;
import mx.com.inscitech.fiducia.util.XLSDataReader;
import mx.com.inscitech.fiducia.util.XLSXDataReader;

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
        try {

            temporaryFile = File.createTempFile("upload", ".tmp");
            temporaryFile.delete();
            temporaryFile.mkdirs();


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

            Integer idFideicomiso = Integer.valueOf(super.getParameters()
                                                         .get("idFideicomiso")
                                                         .toString());
            Integer tipoCarga = Integer.valueOf(super.getParameters()
                                                     .get("tipoCarga")
                                                     .toString());

            OperacionesCargaMasivaBienes cargaMasivaBienes = new OperacionesCargaMasivaBienes();
            List datosCarga = new ArrayList<LayoutCargaBienes>();

            for (int i = 1; i < rowsCount; i++) {
                List valoresFila = new ArrayList<Object>();
                for (int j = 0; j < colsCount; j++) {
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

                    valoresFila.add(valor);
                }

                LayoutCargaBienes layoutCargaBienes = cargaMasivaBienes.mapColumnsToObject(valoresFila);
                datosCarga.add(layoutCargaBienes);
            }

            int registrosCargados = datosCarga.size();
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "Total de Registros Cargados: " + registrosCargados);
            setMessage("Operacion realizada con exito! Registros Procesados: " + registrosCargados);


            cargaMasivaBienes.ejecutaCarga(tipoCarga, idFideicomiso, datosCarga);


        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error en la carga de archivos.", e);
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
