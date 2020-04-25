package mx.gob.nafin.fiduciario.business.upload.processors;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import java.math.BigDecimal;

import java.util.ArrayList;
import java.util.List;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.domain.ArchivosPlanos;

import mx.gob.nafin.fiduciario.business.upload.UploadProcessor;

public class CargaArchivosCSVValuacion extends UploadProcessor {

    /*** Variable que tiene la informacion del header del archivo del TAS*/
    private static List headerInfo;

    /*** Variable que tiene la informacion del cuerpo del archivo del TAS*/
    private static List bodyInfo; /*** Variable para el uso del ORM de Oracle Toplink*/

    /*** Metodo utilizado para conectarse a la base de datos*/
    static {
        headerInfo = new ArrayList();
        bodyInfo = new ArrayList();
    }

    public CargaArchivosCSVValuacion() {
        super();
        filesFromFS = true;
        asThread = true; 
    }

    public void run() {

        String fileName = null;

        ArchivosPlanos archivosPlanos = null;
        File theCVSFile = null;
        
        try {

            setStarted(true);
            
            fileName = ""+this.files.get(0);
            theCVSFile = new File(fileName);
            setPercent(5);
            
            long fileSize = theCVSFile.length(), processedBytes = 0L;
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "About to open the CSV File: [" + theCVSFile.getAbsolutePath() + "] Size: " + fileSize);
            BufferedReader reader = new BufferedReader(new FileReader(theCVSFile));
            setPercent(10);
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "CSV File Opened Succesfully!");

            int i = 0, secuencial = 1;
            String line = reader.readLine();
            if(line != null) {

                processedBytes = line.getBytes().length;
                line = reader.readLine(); //Esto para saltar la linea del header
            
                while(line != null) {
                    
                    setPercent(new BigDecimal((processedBytes * 90)/fileSize).intValue() + 10);
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Processed Bytes: " + processedBytes + " Percent: " + getPercent());
    
                    processedBytes += line.getBytes().length;
    
                    archivosPlanos = new ArchivosPlanos();
                    archivosPlanos.setArpSecuencial(new BigDecimal(secuencial++));
                    archivosPlanos.setArpFecha((String) this.getParameters().get("Fecha"));
                    archivosPlanos.setArpNomArchivo((String) this.getParameters().get("NombreArchivo"));
                    archivosPlanos.setArpDescripcion(line);
                    
                    if (!archivosPlanos.doInsert()) {
                        throw new Exception("Error al registrar el archivo en Base de Datos. Curent Record: " + i + " Seq: " + secuencial);
                    }                
                    
                    line = reader.readLine();
                    i++;
                    
                }
            }
            
            reader.close();
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Total de Registros Cargados: " + i);
            
            setMessage("Operacion realizada con exito! Registros Procesados: " + i);
            setSucceeded(true);
            
        } catch (Exception e) {
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error en la carga de archivos.", e);
            setMessage(e.getMessage());
            
        } finally {
            try { 
                theCVSFile.delete();                
            } catch(Exception e) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.WARN, "Error al eliminar el archivo despues de procesado.", e);
            }        
        }
        
        theCVSFile = null;
        
        setPercent(100);
        setFinished(true);
    }

    public Object getStateInfo() {
        return null;
    }
}
