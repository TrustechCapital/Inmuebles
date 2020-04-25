package mx.com.inscitech.fiducia.util;

import java.io.ByteArrayOutputStream;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import mx.com.inscitech.fiducia.common.services.LoggingService;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class XLSXDataWriter {
    
    private LoggingService logger = null;
    
    public XLSXDataWriter() {
        super();
        logger = LoggingService.getInstance();
    }
    
    public ByteArrayOutputStream generateExcel(List resultSet, String[] tableHeaders) {
        
        XSSFWorkbook theXLSX = null;
        
        ByteArrayOutputStream outByteStream = null;
            
        try {
            
            theXLSX = new XSSFWorkbook();
            
            XSSFSheet hojaExcel = theXLSX.createSheet("FiduciaWeb");

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
    
    private Cell getExcelCell(XSSFSheet hojaExcel, int row, int cell) {
        Cell theCell = null;
        Row theRow = null;
        
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
    
    private Row getExcelRow(XSSFSheet hojaExcel, int row) {
        Row theRow = null;
        
        theRow = hojaExcel.getRow(row);
        
        if (theRow == null) {
            theRow = hojaExcel.createRow(row);
        }
        
        return theRow;
    }
    
}
