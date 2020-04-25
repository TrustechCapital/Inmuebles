package mx.gob.nafin.fiduciario.business.upload.processors;

import java.io.File;

import java.util.ArrayList;
import java.util.List;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.util.VectorPreciosProcessor;

import mx.gob.nafin.fiduciario.business.upload.UploadProcessor;

public class CargaArchivosExcelValuacion extends UploadProcessor {

    /*** Variable que tiene la informacion del header del archivo del TAS*/
    private static List headerInfo;

    /*** Variable que tiene la informacion del cuerpo del archivo del TAS*/
    private static List bodyInfo; /*** Variable para el uso del ORM de Oracle Toplink*/

    /*** Metodo utilizado para conectarse a la base de datos*/
    static {
        headerInfo = new ArrayList();
        bodyInfo = new ArrayList();
    }

    public CargaArchivosExcelValuacion() {
        super();
        filesFromFS = true;
        asThread = true; 
    }

    public void run() {

        String fileName = null;
        File theExcelFile = null;
            
        try {

            setStarted(true);

            fileName = ""+this.files.get(0);            
            theExcelFile = new File(fileName);
            setPercent(5);
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Load the Excel File: [" + theExcelFile.getAbsolutePath() + "]");
            VectorPreciosProcessor vpp = new VectorPreciosProcessor();
            vpp.setExcelFileName(theExcelFile.getName());
            vpp.setTheDate((String) this.getParameters().get("Fecha"));
            vpp.setSkipLines(1);
            setPercent(20);
            
            vpp.loadExcel(theExcelFile);
            getStateMonitor().setTotalRecords(vpp.getRecordCount());

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Total de Registros Cargados: " + vpp.getRecordCount());
            
            setMessage("Operacion realizada con exito! Registros Procesados: " + vpp.getRecordCount());        
            setSucceeded(true);
            
        } catch (Exception e) {
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error en la carga de archivos.", e);
            setMessage(e.getMessage());
            
        } finally {
            try { 
                theExcelFile.delete();                
            } catch(Exception e) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.WARN, "Error al eliminar el archivo despues de procesado.", e);
            }
        }
        
        theExcelFile = null;
        
        setPercent(100);
        setFinished(true);
    }

    public Object getStateInfo() {
        return null;
    }
}
