package mx.com.inscitech.fiducia.web.controllers;

import java.io.IOException;

import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mx.com.inscitech.fiducia.BusinessException;
import mx.com.inscitech.fiducia.common.services.ConfigurationService;
import mx.com.inscitech.fiducia.common.services.LoggingService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;


/**
 * Clase encargada de la logica de presentacion cuando se trata del envio y recepcion de objetos JavaScript
 * @author Inscitech M�xico inscitech@inscitechmexico.com
 */
public class JsonActionController extends MultiActionController {

    protected static String DEFAULT_CONTENT_TYPE = "application/json";

    protected LoggingService logger = LoggingService.getInstance();

    /**
     * Metodo para obtener el objeto JavaScript (JSON) del request
     * @return Un objeto JSON con la informacion del request
     * @param request El request de la peticion
     */
    protected JSONObject getJSONRequestObject(HttpServletRequest request) {
        String json = request.getParameter("json");
        logger.log(this.getClass(), "JSON Request Parameter: " + json);
        //Se crea el objeto bean a partir de la cadena json
        JSONObject jsonObject = JSONObject.fromObject(json);
        return jsonObject;
    }

    /**
     * Metodo que permite obtener la vista solicitada, pasando el objeto JavaScript (JSON)
     * @return El model de spring asociado a la vista
     * @param response El objeto de response
     */
    protected ModelAndView getResponseView(Object response) {
        JSONObject jresponse = JSONObject.fromObject(response);
        logger.log(this.getClass(), "ResponseObject:" + jresponse.toString());
        return new ModelAndView("json.jsp", "json", jresponse.toString());
    }

    protected ModelAndView respondObject(HttpServletResponse response, Object object) {
        return respondObject(200, response, object);
    }
    
    /**
     * Metodo ulitlizado para responder los ojbetos JavaScript
     * @return Este metodo siempre retorna null, con el proposito de que Spring solo de la respuesta de la cadena donde se define el objeto JavaScript
     * @param object El objeto a responder
     * @param response El objeto HttpServletResponse en donde se escribira el objeto JavaScript
     */
    protected ModelAndView respondObject(Integer responseCode, HttpServletResponse response, Object object) {
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setStatus(responseCode);

        if (DEFAULT_CONTENT_TYPE == null) {
            logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "Set default content-type to: " + DEFAULT_CONTENT_TYPE);
            DEFAULT_CONTENT_TYPE = ConfigurationService.getInstance().getProperty("defalutContentType");
        }

        if (DEFAULT_CONTENT_TYPE != null) {
            response.setContentType(DEFAULT_CONTENT_TYPE);
        } else {
            response.setContentType("text/html;charset=ISO-8859-1");
        }

        try {

            String cadenaJSON = "{}";

            if (object instanceof List)
                cadenaJSON = JSONArray.fromObject(object).toString();
            else
                cadenaJSON = JSONObject.fromObject(object).toString();

            object = null;

            logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "Cadena JSON: " + cadenaJSON);
            response.getWriter().write(cadenaJSON);

        } catch (IOException e) {
            logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }

        return null;
    }

    /**
     * Metodo que complementa los parametros del request con los atributos que se encuentran en session
     * @param session La session de Http de la cual se van a extraer los atributos
     * @param parametros El mapa que contiene los parametros de request
     */
    protected void setSessionAttributesAsParameters(HttpSession session, Map parametros) {
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "setSessionAttributesAsParameters");

        Enumeration names = session.getAttributeNames();

        if (parametros == null || names == null) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "Parameters: " + parametros + " Names: " + names);
            return;
        }

        while (names.hasMoreElements()) {
            String name = (String) names.nextElement();
            parametros.put(name, session.getAttribute(name));
        }
    }

    JSONObject jsonObjectFromError(Exception e) {
        JSONObject responseObject = new JSONObject();
        Integer errorCode = 500;
        String errorMessage = e.getMessage();

        if (e instanceof BusinessException) {
            BusinessException businessException = (BusinessException) e;
            errorCode = Integer.valueOf(businessException.getErrorCode());
            errorMessage = businessException.getErrorMessage();
        }

        if (errorMessage == null || errorMessage == "") {
            errorMessage = "Internal Server Error";
        }

        responseObject.put("errorCode", errorCode);
        responseObject.put("errorMessage", errorMessage);
        return responseObject;
    }

}
