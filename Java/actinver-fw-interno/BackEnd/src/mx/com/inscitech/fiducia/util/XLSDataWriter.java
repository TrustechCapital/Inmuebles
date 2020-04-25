package mx.com.inscitech.fiducia.util;

import java.io.ByteArrayOutputStream;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import mx.com.inscitech.fiducia.common.services.LoggingService;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public class XLSDataWriter {
    
    private LoggingService logger = null;
    
    public XLSDataWriter() {
        super();
        logger = LoggingService.getInstance();
    }
    
    public ByteArrayOutputStream generateExcel(List resultSet, String[] tableHeaders) {
        
        HSSFWorkbook theXLSX = null;
        
        ByteArrayOutputStream outByteStream = null;
        
        try {
            
            theXLSX = new HSSFWorkbook();
            
            HSSFSheet hojaExcel = theXLSX.createSheet("FiduciaWeb");

            List<String> dataColumns = new ArrayList<String>();
        
            int currentRow = 0, currentCell = 0;
            
            if(tableHeaders != null && tableHeaders.length > 0) {
                for(String header : tableHeaders) {
                    getExcelCell(hojaExcel, currentRow, currentCell).setCellValue(header);
                    currentCell++;
                }
                currentCell = 0;
                currentRow = 1;
            }
            
            for(Object rowData : resultSet) {
                
                currentCell = 0;
                HashMap<String, Object> recordData = (HashMap<String, Object>)rowData;
                
                if(dataColumns.size() <= 0) {
                    //Get column names
                    for(String colName : recordData.keySet()) {
                        dataColumns.add(colName);
                    }
                }
                
                for(String colName : dataColumns) {
                    getExcelCell(hojaExcel, currentRow, currentCell).setCellValue(""+recordData.get(colName));
                    currentCell++;
                }
                
                currentRow++;
            }
                
            outByteStream = new ByteArrayOutputStream();
            theXLSX.write(outByteStream);
            outByteStream.flush();
            
        } catch(Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error al exportar la consulta a Excel(XLSX). Error: [" + e.getMessage() + "]");
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }
        
        return outByteStream;
    }
    
    private HSSFCell getExcelCell(HSSFSheet hojaExcel, int row, int cell) {
        HSSFCell theCell = null;
        HSSFRow theRow = null;
        
        theRow = hojaExcel.getRow(row);
        if (theRow == null) {
            theRow = getExcelRow(hojaExcel, row);
        }
        
        theCell = theRow.getCell(cell);
        if (theCell == null) {
            theCell = theRow.createCell(cell);
        }
        
        return theCell;
    }
    
    private HSSFRow getExcelRow(HSSFSheet hojaExcel, int row) {
        HSSFRow theRow = null;
        
        theRow = hojaExcel.getRow(row);
        
        if (theRow == null) {
            theRow = hojaExcel.createRow(row);
        }
        
        return theRow;
    }
    
}
