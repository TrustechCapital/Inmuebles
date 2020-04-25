package mx.com.inscitech.fiducia.util;

import java.io.File;
import java.io.InputStream;

import java.math.BigDecimal;

import java.util.Iterator;

import javax.xml.parsers.ParserConfigurationException;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.domain.ArchivosPlanos;

import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.util.SAXHelper;
import org.apache.poi.xssf.eventusermodel.XSSFReader;
import org.apache.poi.xssf.model.SharedStringsTable;

import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.DefaultHandler;

public class VectorPreciosProcessor {
    
    private LoggingService logger = null;
    
    private int skipLines = 1;
    private long recordCount = 0;
    private String theDate = null;
    private String excelFileName = null;
    
    public VectorPreciosProcessor() {
        super();
        logger = LoggingService.getNewInstance();
    }

    public void loadExcel(File theExcelFile) throws Exception {
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "loadExcel");
        
        OPCPackage pkg = OPCPackage.open(theExcelFile);
        XSSFReader r = new XSSFReader( pkg );
        SharedStringsTable sst = r.getSharedStringsTable();

        XMLReader parser = fetchSheetParser(sst);

        Iterator<InputStream> sheets = r.getSheetsData();
        while(sheets.hasNext()) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Processing new sheet...");
            
            InputStream sheet = sheets.next();
            InputSource sheetSource = new InputSource(sheet);
            
            parser.parse(sheetSource);
            recordCount = ((SheetHandler)parser.getContentHandler()).getRecordCount();
                
            sheet.close();
        }
    }

    public XMLReader fetchSheetParser(SharedStringsTable sst) throws SAXException, ParserConfigurationException {
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "fetchSheetParser");
        
        XMLReader parser = SAXHelper.newXMLReader();
        
        ContentHandler handler = new SheetHandler(sst);
        ((SheetHandler)handler).setEnvironment(skipLines, theDate, excelFileName);
        
        parser.setContentHandler(handler);
        
        return parser;
    }

    public void setSkipLines(int skipLines) {
        this.skipLines = skipLines;
    }

    public int getSkipLines() {
        return skipLines;
    }

    public void setRecordCount(long recordCount) {
        this.recordCount = recordCount;
    }

    public long getRecordCount() {
        return recordCount;
    }

    public void setTheDate(String theDate) {
        this.theDate = theDate;
    }

    public String getTheDate() {
        return theDate;
    }

    public void setExcelFileName(String excelFileName) {
        this.excelFileName = excelFileName;
    }

    public String getExcelFileName() {
        return excelFileName;
    }

    private static class SheetHandler extends DefaultHandler {
        
        private SharedStringsTable sst = null;
        private String lastContents = null;
        private boolean nextIsString = false;

        private int skipLines = 1, secuencial = 1;
        private long recordCount = 0;
        
        private ArchivosPlanos archivosPlanos = null;
        private String theDate = null;
        private String excelFileName = null;
        
        private SheetHandler(SharedStringsTable sst) {
            this.sst = sst;
        }

        public void setEnvironment(int skipLines, String theDate, String excelFileName) {
            this.skipLines = skipLines;
            this.theDate = theDate;
            this.excelFileName = excelFileName;            
        }
        
        public long getRecordCount() {
            return recordCount;
        }

        public void startElement(String uri, String localName, String name, Attributes attributes) throws SAXException {
            // c => cell
            if(name.equals("c")) {
                String cellType = attributes.getValue("t");
                if(cellType != null && cellType.equals("s")) {
                    nextIsString = true;
                } else {
                    nextIsString = false;
                }
            }
            
            lastContents = "";
        }

        public void endElement(String uri, String localName, String name) throws SAXException {

            if(nextIsString) {
                int idx = Integer.parseInt(lastContents);
                lastContents = sst.getEntryAt(idx).toString();                
                nextIsString = false;
            }

            if(name.equals("v")) {
                if(lastContents.indexOf("<t") != -1) {
                    lastContents = lastContents.substring(lastContents.indexOf(">") + 1);
                    lastContents = lastContents.substring(0, lastContents.length() - 4);
                }
                
                if(skipLines > 0) {
                    // Do Nothing
                    skipLines--;
                } else {
                    
                    // Do Insert
                    archivosPlanos = new ArchivosPlanos();
                    archivosPlanos.setArpSecuencial(new BigDecimal(secuencial++));
                    archivosPlanos.setArpFecha(theDate);
                    archivosPlanos.setArpNomArchivo(excelFileName);
                    archivosPlanos.setArpDescripcion(lastContents);

                    if (!archivosPlanos.doInsert()) {
                        //TODO: asignar logica para el error
                        //throw new Exception("Error al registrar el archivo en Base de Datos. Curent Row: " + i + " Seq: " + secuencial);
                    }                
                    
                    recordCount++;    
                }
                
            }
        }

        public void characters(char[] ch, int start, int length) {
            lastContents += new String(ch, start, length);
        }
    }
}

