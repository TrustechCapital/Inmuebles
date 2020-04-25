package mx.gob.nafin.fiduciario.controller;

import java.io.File;
import java.io.IOException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.util.ReflectionUtils;

import mx.com.inscitech.fiducia.dml.GenericDML;

import mx.gob.nafin.fiduciario.BusinessException;
import mx.gob.nafin.fiduciario.business.upload.UploadProcessor;

import org.apache.commons.fileupload.DiskFileUpload;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.FileUploadException;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

/**
 * Controller encargado de procesar archivos de entrada.
 * El controller recibe y procesa el request y lo delega a la clase especificada
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class UploadFileController implements Controller {

    protected LoggingService logger = LoggingService.getInstance();

    /**
     * Miembro para el uso del ORM de Spring, JDBCTemplate
     */
    private JdbcTemplate jdbcTemplate;

    /**
     * Metodo encargado de procesar el request y delegar el archivo recivido a la clase especificada
     * @throws java.io.IOException Cuando ocurre un error al escribir/leer el request y/o response
     * @throws javax.servlet.ServletException Cuando no es posible procesar la peticion
     * @return
     * @param response La respuesta http que se le envia al cliente
     * @param request La peticion http que realiza el cliente
     */
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, BusinessException {

        List fileList = null;
        DiskFileUpload diskFileUpload = null;
        Map parameters = null;
        List files = null;
        FileItem fileItem = null;
        UploadProcessor processor = null;
        int processID = 0;
        String trData = null;

        if (request != null && FileUpload.isMultipartContent(request)) {

            try {

                String thePath = request.getRealPath("/temp/");
                diskFileUpload = new DiskFileUpload();
                fileList = diskFileUpload.parseRequest(request, 4096, 50000000, thePath);
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Temp Path: " + thePath);

                files = new ArrayList();
                parameters = new HashMap();

                for (int i = 0; i < fileList.size(); i++) {
                    if (((FileItem) fileList.get(i)).isFormField())
                        parameters.put(((FileItem) fileList.get(i)).getFieldName(), ((FileItem) fileList.get(i)).getString());
                    else {
                        //if(((FileItem)fileList.get(i)).getSize() > 0) files.add( ((FileItem)fileList.get(i)).getInputStream() );
                        if (((FileItem) fileList.get(i)).getSize() > 0)
                            files.add(fileList.get(i));
                    }
                }

                if (files.size() <= 0)
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.WARN, "No se econontraron Archivos en el Request");
                if (files.size() <= 0)
                    throw new BusinessException("No se econontraron Archivos en el Request");
                if (parameters.isEmpty() || !parameters.containsKey("processor"))
                    throw new BusinessException("No Existe clase para procesar el(los) archivo(s)");

                if(parameters.get("processID") != null) processID = new Integer(""+parameters.get("processID"));
                if(parameters.get("trData") != null) trData = parameters.get("trData").toString();
                
                processor = (UploadProcessor) new ReflectionUtils().getClass((String) parameters.get("processor")).newInstance();
                processor.setProcessID(processID);
                processor.setContainmentPath(thePath);

                if(processor.getFilesFromFS()) {
                    processor.setFiles(saveFiles(files, thePath));
                } else {
                    processor.setFiles(files);
                }
                                
                processor.setJdbcTemplate(jdbcTemplate);

                request.getSession().setAttribute("UploadProcessor", processor.getStateMonitor());
                if(processor.doAsThreadThread()) {
                    processor.getParameters().putAll(parameters);
                    new Thread(processor).start();   
                } else {
                    processor.setParameters(parameters);
                    processor.run();
                }
                
            } catch (FileUploadException e) {
                e.printStackTrace();
            } catch (InstantiationException e) {
                throw new BusinessException(e.getMessage());
            } catch (IllegalAccessException e) {
                throw new BusinessException(e.getMessage());
            } catch (Exception g) {
                g.printStackTrace();
                throw new BusinessException(g.getMessage());
            } finally {
                // TODO: Ver que no le pegue al procesador del archivo
                if (files != null)
                    files.clear();
                if (parameters != null)
                    parameters.clear();

                files = null;
                parameters = null;
            }
        }

        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "trData: " + trData);
        if(trData != null) {
            String strSQL = "UPDATE F_TRANSACTIONS SET TRANSACTION_DATA = '{\"done\":\"true\", \"pid\":\"" + processID + "\"}' WHERE TRANSACTION_ID = ?";
            GenericDML genericDML = new GenericDML();
            genericDML.executeUpdate(strSQL, new String[] {trData});
        }

        return new ModelAndView("/uploaded.jsp");
    }

    private List saveFiles(List theFiles, String thePath) {
        ArrayList fileList = new ArrayList();
        
        FileItem file = null;
        String fileName = null;

        try {
            for (int i = 0; i < theFiles.size(); i++) {
                file = (FileItem) theFiles.get(0);
                fileName = file.getName();

                if (fileName.indexOf("\\") != -1) {
                    fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
                }

                if (fileName.indexOf("/") != -1) {
                    fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
                }

                File theFile = new File(thePath + File.separator + fileName);
                file.write(theFile);

                fileList.add(theFile.getAbsolutePath());
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Save File to FS: [" + theFile.getAbsolutePath() + "]");
                
            }
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error al guardar los archivos en el sistema de archivos!", e);
        }
        
        return fileList;
    }

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
}
