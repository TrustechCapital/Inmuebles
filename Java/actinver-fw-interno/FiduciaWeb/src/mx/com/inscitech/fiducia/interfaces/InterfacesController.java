package mx.com.inscitech.fiducia.interfaces;

import java.io.PrintWriter;
import java.io.StringWriter;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.services.ConfigurationService;
import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.services.GenericServiceResponse;

import mx.gob.nafin.fiduciario.controller.JsonActionController;

import net.sf.json.JSONObject;

import org.springframework.web.servlet.ModelAndView;

public class InterfacesController extends JsonActionController {
    
    private static String WATCHLIST_SERVICE_URL = null;
    private static String FIDUCIAWEB_WL_URL = null;
    
    private static String CLIENTEUNICO_SERVICE_URL = null;
    private static String FIDUCIAWEB_CUWS_URL = null;
    
    protected LoggingService logger = LoggingService.getInstance();

    public InterfacesController() {
        super();
    }

    public ModelAndView validaListasNegras(HttpServletRequest request, HttpServletResponse response) throws Exception {

        logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "validaListasNegras");
        
        GenericServiceResponse theResponse = new GenericServiceResponse();
        
        if(WATCHLIST_SERVICE_URL == null || "doSetURL".equals(request.getParameter("setURL"))) {
            WATCHLIST_SERVICE_URL = ConfigurationService.getInstance().getProperty("ACTINVER_WL_WS_URL");
            FIDUCIAWEB_WL_URL = ConfigurationService.getInstance().getProperty("FIDUCIAWEB_WL_URL");
        }        
                  
        JSONObject jsonObject = getJSONRequestObject(request);
        Map parametros = (Map) JSONObject.toBean(jsonObject, Map.class);
        setSessionAttributesAsParameters(request.getSession(), parametros);
                  
        ValidaListasNegras validador = new ValidaListasNegras(FIDUCIAWEB_WL_URL, WATCHLIST_SERVICE_URL);                  
        
        try {

            theResponse.setResponseObj(validador.queryListasNegras(
                ""+parametros.get("name"), 
                ""+parametros.get("lastName"), 
                ""+parametros.get("secondLastName"), 
                ""+parametros.get("tin"), 
                ""+parametros.get("curp"),
                ""+parametros.get("clientTypeID")
            ));
            
            theResponse.setExitCode("SUCCESS");
            theResponse.setExitMessage("Operation completed successfully!");
            theResponse.setRequestedOperation("WATCH_LIST_QUERY");
            theResponse.setSucceded(true);
            theResponse.setErrorDetail(null);
            
        } catch (Exception e) {
            StringWriter stackTrace = new StringWriter();
            PrintWriter printWriter = new PrintWriter(stackTrace);
            e.printStackTrace(printWriter);
            printWriter.flush();
            
            theResponse.getErrorDetail().setStackTrace(stackTrace.toString());
            logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error al validar en listas negras", e);
        }

        return respondObject(response, theResponse);
    }

    public ModelAndView getClienteUnico(HttpServletRequest request, HttpServletResponse response) throws Exception {

        logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "getClienteUnico");
        
        GenericServiceResponse theResponse = new GenericServiceResponse();
        
        if(CLIENTEUNICO_SERVICE_URL == null || "doSetURL".equals(request.getParameter("setURL"))) {
            CLIENTEUNICO_SERVICE_URL = ConfigurationService.getInstance().getProperty("CLIENTEUNICO_SERVICE_URL");
            FIDUCIAWEB_CUWS_URL = ConfigurationService.getInstance().getProperty("FIDUCIAWEB_CUWS_URL");
        }        
                  
        JSONObject jsonObject = getJSONRequestObject(request);
        Map parametros = (Map) JSONObject.toBean(jsonObject, Map.class);
        setSessionAttributesAsParameters(request.getSession(), parametros);
                  
        ClienteUnico cu = new ClienteUnico(FIDUCIAWEB_CUWS_URL, CLIENTEUNICO_SERVICE_URL);                  
        
        try {

            theResponse.setResponseObj(cu.getDatosCliente(""+parametros.get("bankingArea"), ""+parametros.get("contractNumber")));
            
            theResponse.setExitCode("SUCCESS");
            theResponse.setExitMessage("Operation completed successfully!");
            theResponse.setRequestedOperation("WATCH_LIST_QUERY");
            theResponse.setSucceded(true);
            theResponse.setErrorDetail(null);
            
        } catch (Exception e) {
            StringWriter stackTrace = new StringWriter();
            PrintWriter printWriter = new PrintWriter(stackTrace);
            e.printStackTrace(printWriter);
            printWriter.flush();
            
            theResponse.getErrorDetail().setStackTrace(stackTrace.toString());
            logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error al validar en listas negras", e);
        }

        return respondObject(response, theResponse);
    }

    public ModelAndView getPriceVectorData(HttpServletRequest request, HttpServletResponse response) throws Exception {

        logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "getPriceVectorData");
        
        boolean doLoadConfig = false;
        Object theResponseObj = null;
        
        String loadConfig = request.getParameter("loadConfig");
        if(loadConfig != null && !"".equals(loadConfig)) {
            doLoadConfig = true;
        }
        
        return respondObject(response, theResponseObj);
    }

}