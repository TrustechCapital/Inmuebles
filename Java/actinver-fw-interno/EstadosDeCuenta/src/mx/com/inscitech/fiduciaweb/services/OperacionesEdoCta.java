package mx.com.inscitech.fiduciaweb.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import javax.servlet.http.HttpServletRequest;

import javax.sql.DataSource;

import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("services")
public class OperacionesEdoCta {

    private static final Logger logger = LoggerFactory.getLogger(OperacionesEdoCta.class);

    private static String LOGO_AZUL_ACTINVER = "";
    private static String PDFS_FOLDER = "";
    private static String EDOCTA_JASPER_FILE = "";
    private static String TEMP_FOLDER = "";

    private DataSource dataSource = null;
    private Connection cn = null;

    private HttpServletRequest request = null;

    public OperacionesEdoCta() {
        super();
    }

    @GET
    @Path("edoCta")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getEstadoDeCuenta(@Context HttpServletRequest request, @QueryParam("fisoID") @DefaultValue("0") String fisoID, @QueryParam("date") @DefaultValue("") String date) {
        logger.debug("generateEdoCta");

        if (request != null) this.request = request;

        try {

            String pdfName = "EdoCuenta-FISO-" + fisoID + ".pdf";
            String requestedPDF = this.request.getServletContext().getRealPath("/PDFs/" + pdfName);
            
            //TODO: Implementar logica para cuando el PDF no exista o no se pueda leer
            if(("".equals(fisoID) || "0".equals(fisoID)) && (date != null && !"".equals(date))) {
                
                requestedPDF = this.request.getServletContext().getRealPath("/temp/EstadosDeCuenta-" + date.replaceAll("/", "") + ".zip");
                logger.debug("Requested PDFs Zip File Path: [" + requestedPDF + "]");
                
            } else {
                logger.debug("Requested PDF File Path: [" + requestedPDF + "]");
            }

            File file = new File(requestedPDF);

            ResponseBuilder response = Response.ok(file);
            response.header("Content-Disposition", "attachment; filename=" + pdfName);

            return response.build();

        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Error al invocar la generacion de estado de cuenta", e);
        }

        return null;
    }

    /**
     * La idea de este metodo se puede omitir usando el executeRef.do de FiduciaWeb. Este metodo esta principalmente para generar el estado de cuenta
     * a traves de aplicaciones externas.
     * @param request
     * @param fisoID
     * @param date
     * @return
     */
    @POST
    @Consumes("*/*")
    @Produces("application/json")
    @Path("edoCta")
    public GenericResponse generateEdoCta(@Context HttpServletRequest request, @QueryParam("fisoID") @DefaultValue("0") String fisoID, @QueryParam("date") String date) {
        logger.debug("generateEdoCta::fisoID:[" + fisoID + "],date:[" + date + "]");
        GenericResponse theResponse = new GenericResponse();

        if (request != null) this.request = request;
        
        try {

            if (dataSource == null) setDataSource();
            if (cn == null) cn = dataSource.getConnection();

            if ("".equals(fisoID) || "0".equals(fisoID)) {
                generaEdoCtaMasivo(date);
            } else {
                generaEdoCta(Integer.parseInt(fisoID), date);
            }

            theResponse.setSucceded(true);
            theResponse.setExitCode("FW-EDOCTA-OK");
            theResponse.setExitMessage("Operacion realizada con exito!");

        } catch (Exception e) {

            theResponse.setExitMessage(e.getMessage());
            logger.error("Error al invocar la generacion de estado de cuenta", e);

        } finally {
            closeConnection();
        }

        return theResponse;
    }

    private void generaEdoCta(int fisoID, String date) throws SQLException {
        logger.debug("generaEdoCta::fisoID:[" + fisoID + "] date: [" + date + "]");

        CallableStatement cstmt = cn.prepareCall("BEGIN TEMPORAL.GENERA_EDO_CUENTA(?, ?); END;");

        cstmt.setInt(1, fisoID);
        cstmt.setString(2, date);

        cstmt.executeUpdate();
        cstmt.close();
    }

    private void generaEdoCtaMasivo(String date) throws SQLException, FileNotFoundException, IOException {
        logger.debug("generaEdoCtaMasivo::date: [" + date + "]");

        String strSQL = "SELECT CTO_NUM_CONTRATO FROM CONTRATO WHERE CTO_CVE_ST_CONTRAT = 'ACTIVO' AND CTO_NUM_CONTRATO < 10 ORDER BY CTO_NUM_CONTRATO ASC";

        PreparedStatement ps = cn.prepareStatement(strSQL);
        ResultSet rs = ps.executeQuery();
    
        if(rs != null && !rs.isClosed()) {
            logger.debug("ResultSet: [" + rs + " isClosed: " + rs.isClosed());

            ArrayList<Integer> fisos = new ArrayList<Integer>();
            while (rs.next()) { //Se cierra el RS por el tiempo que toma la generacion de los PDFs y las consultas de las otras pantallas
                fisos.add(rs.getInt("CTO_NUM_CONTRATO"));
            }

            try { rs.close(); } catch(Exception e) {
                logger.warn(e.getMessage());
            }
            
            rs = null;
    
            for(Integer fisoID : fisos) {
                logger.debug("Generar estado de cuenta para FISO: " + fisoID);
                
                generaEdoCta(fisoID, date);
                buildEdoCta(null, "" + fisoID, date);
            }
            
        } else {
            logger.warn("No se encontraron registros");
        }
        
        doZipPDFs(date);
    }

    private void doZipPDFs(String date) throws FileNotFoundException, IOException {
        logger.debug("doZipPDFs");

        byte[] buffer = new byte[1024];
        int length;

        File pdfsDir = new File(PDFS_FOLDER);
            
        File[] files = pdfsDir.listFiles();

        File theZipFile = new File(TEMP_FOLDER + File.separator + "EstadosDeCuenta-" + date.replaceAll("/", "") + ".zip");
        logger.debug("PDFs Zip File: [" + theZipFile.getAbsolutePath() + "]");
        
        for (File thePDF : files) {
            
            logger.debug("Compressing PDF: [" + thePDF.getAbsolutePath() + "] Readable: " + thePDF.canRead());

            if (thePDF.getName().toLowerCase().indexOf(".pdf") != -1 && thePDF.canRead()) {
                
                FileOutputStream fos = new FileOutputStream(theZipFile);
                ZipOutputStream zos = new ZipOutputStream(fos);

                ZipEntry zipEntry = new ZipEntry(thePDF.getName());
                zos.putNextEntry(zipEntry);

                // Read file content and write to zip output stream.
                FileInputStream fis = new FileInputStream(thePDF);
                while ((length = fis.read(buffer)) > 0) {
                    zos.write(buffer, 0, length);
                }

                // Close the zip entry.
                zos.closeEntry();                
            }
        }
    }

    @PUT
    @Consumes("*/*")
    @Produces("application/json")
    @Path("edoCta")
    public GenericResponse buildEdoCta(@Context HttpServletRequest request, @QueryParam("fisoID") @DefaultValue("0") String fisoID, @QueryParam("date") String date) {
        logger.debug("buildEdoCta! fisoID: [" + fisoID + "] date: [" + date + "]");
        GenericResponse theResponse = new GenericResponse();

        if (request != null) this.request = request;
        
        JasperReport theReport = null;
        JasperPrint printer = null;

        try {

            if ("".equals(LOGO_AZUL_ACTINVER) || LOGO_AZUL_ACTINVER == null) LOGO_AZUL_ACTINVER = this.request.getServletContext().getRealPath("/images/logo_Actinver_azul.png");
            logger.debug("LOGO_AZUL_ACTINVER: [" + LOGO_AZUL_ACTINVER + "]");

            HashMap<String, Object> reportParemeters = new HashMap<String, Object>();
            reportParemeters.put("ActinverAzulLogo", LOGO_AZUL_ACTINVER);

            if ("".equals(PDFS_FOLDER) || PDFS_FOLDER == null) PDFS_FOLDER = this.request.getServletContext().getRealPath("/PDFs");
            logger.debug("PDFS_FOLDER: [" + PDFS_FOLDER + "]");

            if ("".equals(EDOCTA_JASPER_FILE) || EDOCTA_JASPER_FILE == null) EDOCTA_JASPER_FILE = this.request.getServletContext().getRealPath("/templates/EdoCuenta.jasper");
            logger.debug("EDOCTA_JASPER_FILE: [" + EDOCTA_JASPER_FILE + "]");

            if ("".equals(TEMP_FOLDER) || TEMP_FOLDER == null) TEMP_FOLDER = this.request.getServletContext().getRealPath("/temp");
            logger.debug("TEMP_FOLDER: [" + TEMP_FOLDER + "]");
            
            theReport = (JasperReport) JRLoader.loadObject(new File(EDOCTA_JASPER_FILE));

            if (dataSource == null) setDataSource();
            if (cn == null) cn = dataSource.getConnection();

            printer = JasperFillManager.fillReport(theReport, reportParemeters, cn);

            String thePDF = PDFS_FOLDER + File.separator + "EdoCuenta-FISO-" + fisoID + ".pdf";
            logger.debug("thePDF: [" + thePDF + "]");

            JasperExportManager.exportReportToPdfFile(printer, thePDF);

            theResponse.setSucceded(true);
            theResponse.setExitCode("FW-EDOCTA-OK");
            theResponse.setExitMessage("Operacion realizada con exito!");

        } catch (Exception e) {

            theResponse.setExitMessage(e.getMessage());
            logger.error("Error al invocar la generacion de estado de cuenta", e);

        } finally {
            closeConnection();
        }

        return theResponse;
    }

    private void setDataSource() throws NamingException {
        logger.debug("setDataSource");

        InitialContext context = new InitialContext();
        dataSource = (DataSource) context.lookup("jdbc/fiduciaDS");
    }

    private void closeConnection() {
        logger.debug("closeConnection");

        if (cn != null) {
            try {
                if(cn.getAutoCommit()) cn.commit();
            } catch (SQLException e) {
                logger.warn("Error al cerrar la transaccion", e);
            }

            try {
                if(!cn.isClosed()) cn.close();
            } catch (SQLException e) {
                logger.warn("Error al cerrar la conexion a base de datos", e);
            }
        }

        cn = null;
    }
}
