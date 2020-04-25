package mx.gob.nafin.fiduciario.business.upload.processors;

import java.io.File;

import java.math.BigDecimal;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.domain.ArchivosPlanos;
import mx.com.inscitech.fiducia.util.ExcelDataReader;
import mx.com.inscitech.fiducia.util.ExcelDataReader.InvalidRowException;
import mx.com.inscitech.fiducia.util.XLSDataReader;
import mx.com.inscitech.fiducia.util.XLSXDataReader;

import mx.gob.nafin.fiduciario.business.upload.UploadProcessor;

import org.apache.commons.fileupload.FileItem;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class CargaArchivosExcelPagaresImpl extends UploadProcessor {

    /*** Variable que tiene la informacion del header del archivo del TAS*/
    private static List headerInfo;

    /*** Variable que tiene la informacion del cuerpo del archivo del TAS*/
    private static List bodyInfo; /*** Variable para el uso del ORM de Oracle Toplink*/

    /*** Metodo utilizado para conectarse a la base de datos*/
    static {
        headerInfo = new ArrayList();
        bodyInfo = new ArrayList();
    }

    public CargaArchivosExcelPagaresImpl() {
        super();
    }

    public void run() {

        FileItem file = null;
        String fileName = null;
        Date date = null;    
        ArchivosPlanos archivosPlanos = null;
        ExcelDataReader excelReader = null;
        DataFormatter formatter = new DataFormatter();
        String val=null;
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
            excelReader.setCurrentCell(1, 0);
            
            double cellValue = excelReader.getNumericCellValue(false, "");//  .getStringCellValue(false, "");            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Test cellValue: " + cellValue);
            
            int secuencial = 1, col = 0, rowCount = excelReader.getRowCount();
            for(int i = 1; i < rowCount; i++) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Linea: " + String.valueOf(i));                
                setPercent(new BigDecimal((i * 90)/rowCount).intValue() + 10);
                
                String line = "";
                //System.out.println("linea no.:"+String.valueOf(i));
                if(i==2)
                    i=2;
                try {
                    
                    for(col = 0; col < 14; col++) {
                      if(col!=10&col!=8&col!=9&col!=3)  {
                        excelReader.setCurrentCell(i, col);
                       // Cell cell1 = excelReader.get .getRow(i).getCell(0);
                        /*switch(excelReader){
                        }*/
                        if(col==0||col==3||col==4||col==5||col==6||col==11||col==12||col==13)//valores numericos
                            line += excelReader.getNumericCellValue(false, "0").longValue() + ",";
                        else if(col==7||col==8||col==9||col==10){//valores date
                            date = excelReader.getDateCellValue (false, "0");
                            line += (date.getDate() + "/" + (date.getMonth() + 1) + "/" + (1900 + date.getYear())).toString() + ",";
                        }    
                        else//valores string
                            line += excelReader.getStringCellValue(false, "0") + ",";
                        }
                    }
                    line = line.substring(0, line.length()-1);
                        
                } catch(InvalidRowException ire) {
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Rows ended at: " + i);
                    break;
                }
                
                archivosPlanos = new ArchivosPlanos();
                archivosPlanos.setArpSecuencial(new BigDecimal(secuencial++));
                archivosPlanos.setArpFecha((String) this.getParameters().get("Fecha"));
                archivosPlanos.setArpNomArchivo((String) this.getParameters().get("NombreArchivo"));
                archivosPlanos.setArpDescripcion(line);

                if (!archivosPlanos.doInsert()) {
                    throw new Exception("Error al registrar el archivo en Base de Datos. Curent Row: " + i + " Seq: " + secuencial);
                }                
            }

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Total de Registros Cargados: " + secuencial);
            setMessage("Operacion realizada con exito! Registros Procesados: " + secuencial);        
            
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error en la carga de archivos.", e);
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
