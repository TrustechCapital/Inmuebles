package mx.gob.nafin.fiduciario.business.upload.processors;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.math.BigDecimal;

import java.util.ArrayList;
import java.util.List;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.domain.ArchivosPlanos;

import mx.gob.nafin.fiduciario.business.upload.UploadProcessor;

import org.apache.commons.fileupload.FileItem;


/**
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class CargaFosegProcessorImpl extends UploadProcessor {

    /**
     * Variable que tiene la informacion del header del archivo del TAS
     */
    private static List headerInfo;

    /**
     * Variable que tiene la informacion del cuerpo del archivo del TAS
     */
    private static List bodyInfo;

    static {
        headerInfo = new ArrayList();
        bodyInfo = new ArrayList();
    }

    public CargaFosegProcessorImpl() {
        super();
    }

    public void run() {

        FileItem file = null;
        String fileName = null;

        BufferedReader tasFileReader = null;
        ArchivosPlanos archivosPlanos = null;

        String line = null;

        try {
            System.out.println("Implementacion Processor");
            file = (FileItem) this.files.get(0);
            fileName = file.getName();
            System.out.println("fileName");
            if (fileName.indexOf("\\") != -1)
                fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
            if (fileName.indexOf("/") != -1)
                fileName = fileName.substring(fileName.lastIndexOf("/") + 1);

            tasFileReader = new BufferedReader(new InputStreamReader(file.getInputStream()));

            int secuencial = 1;

            while (tasFileReader.ready()) {
                line = tasFileReader.readLine();

                archivosPlanos = new ArchivosPlanos();

                archivosPlanos.setArpSecuencial(new BigDecimal(secuencial++));
                archivosPlanos.setArpFecha((String) this.getParameters().get("Fecha"));
                archivosPlanos.setArpNomArchivo((String) this.getParameters().get("NombreArchivo"));
                archivosPlanos.setArpDescripcion(line);

                //if(!archivosPlanos.validate())
                if (!archivosPlanos.doInsert()) {
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.WARN, "Error al Insertar");
                    throw new Exception("Error al cargar la informacion de archivo a base de datos!");
                }
            }

        } catch (Exception e) {

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error al pricesar archivo FOSEG", e);

        } finally {

        }
    }

    public Object getStateInfo() {
        return null;
    }
}
