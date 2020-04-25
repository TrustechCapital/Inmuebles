package mx.gob.nafin.fiduciario.business.upload.processors;

import java.io.File;

import java.math.BigDecimal;

import java.util.ArrayList;
import java.util.List;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.domain.ArchivosPlanos;
import mx.com.inscitech.fiducia.util.ExcelDataReader;
import mx.com.inscitech.fiducia.util.ExcelDataReader.InvalidRowException;
import mx.com.inscitech.fiducia.util.XLSDataReader;
import mx.com.inscitech.fiducia.util.XLSXDataReader;

import mx.gob.nafin.fiduciario.business.upload.UploadProcessor;

import org.apache.commons.fileupload.FileItem;

public class CargaArchivosExcelCBBancoImpl extends UploadProcessor {

    /*** Variable que tiene la informacion del header del archivo del TAS*/
    private static List headerInfo;

    /*** Variable que tiene la informacion del cuerpo del archivo del TAS*/
    private static List bodyInfo; /*** Variable para el uso del ORM de Oracle Toplink*/

    /*** Metodo utilizado para conectarse a la base de datos*/
    static {
        headerInfo = new ArrayList();
        bodyInfo = new ArrayList();
    }

    public CargaArchivosExcelCBBancoImpl() {
        super();
    }

    public void run() {

        FileItem file = null;
        String fileName = null;

        ArchivosPlanos archivosPlanos = null;
        ExcelDataReader excelReader = null;
        String sValorTotal = "";
        try {

            setStarted(true);
            
            file = (FileItem) this.files.get(0);
            fileName = file.getName();

            if (fileName.indexOf("\\") != -1) {
                fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
            }

            if (fileName.indexOf("/") != -1) {
                fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
            }

            if(fileName.toLowerCase().indexOf(".xlsx") != -1) {
                excelReader = new XLSXDataReader();
            } else {
                excelReader = new XLSDataReader();
            }

            File theExcelFile = new File(this.getContainmentPath() + File.separator + fileName);
            file.write(theExcelFile);
            setPercent(5);
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "About to open the Excel File: [" + theExcelFile.getAbsolutePath() + "]");
            excelReader.openWorkBook(theExcelFile);
            setPercent(10);
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Excel File Opened Succesfully! Sheets: " + excelReader.getSheetCount());
            excelReader.setActiveSheetByNumber(0);
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Sheet Data { Column Count: " + excelReader.getColumnCount() + ", Row Count: " + excelReader.getRowCount() + " }");
            excelReader.setCurrentCell(2, 3);
            
            String cellValue = excelReader.getStringCellValue(false, "");            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Test cellValue: " + cellValue);
            
            int secuencial = 1, rowCount = excelReader.getRowCount();
            for(int i = 2; i < rowCount; i++) {
                
                setPercent(new BigDecimal((i * 90)/rowCount).intValue() + 10);
                
                try {
                    excelReader.setCurrentCell(i, 5);
                } catch(InvalidRowException ire) {
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Rows ended at: " + i);
                    break;
                }
                
                archivosPlanos = new ArchivosPlanos();
                archivosPlanos.setArpSecuencial(new BigDecimal(secuencial++));
                archivosPlanos.setArpFecha((String) this.getParameters().get("Fecha"));
                archivosPlanos.setArpNomArchivo((String) this.getParameters().get("NombreArchivo"));
                sValorTotal=excelReader.getStringCellValue(false, "");
                excelReader.setCurrentCell(i, 3);
                sValorTotal+=","+excelReader.getStringCellValue(false, "");
                archivosPlanos.setArpDescripcion(sValorTotal);

                if (!archivosPlanos.doInsert()) {
                    throw new Exception("Error al registrar el archivo en Base de Datos. Curent Row: " + i + " Seq: " + secuencial);
                }                
            }

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Total de Registros Cargados: " + secuencial);
            
            setMessage("Operacion realizada con exito! Registros Procesados: " + secuencial);
            setSucceeded(true);
            
        } catch (Exception e) {
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error en la carga de archivos.", e);
            setMessage(e.getMessage());
            
        } finally {
            if(excelReader != null) excelReader.closeWorkBook();
            excelReader = null;
        }
        
        setPercent(100);
        setFinished(true);
    }

    public Object getStateInfo() {
        return null;
    }
}
