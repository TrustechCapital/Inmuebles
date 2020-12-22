package mx.com.inscitech.fiducia.web.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.domain.base.DomainObject;

import org.springframework.web.servlet.ModelAndView;


/**
 * Clase que regresa la definicion de un objeto para poder representarlo en JavaScript mediante JSON
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class ObjectDefinitionActionController extends JsonActionController {

    public ModelAndView getObjectDefinition(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //JSONObject jsonObject = getJSONRequestObject(request);
        //Object object = getObjectInstance(jsonObject.getString("className"));
        String className = request.getParameter("class");
        if (className == null || "".equals(className.trim()))
            className = request.getParameter("objectClass");
        Object object = getObjectInstance(className);

        if (object instanceof DomainObject) {
            ((DomainObject) object).setRetrieveSQL(false);
        }

        return respondObject(response, object);
    }

    private Object getObjectInstance(String className) {
        try {
            Object obj = Class.forName(className).newInstance();
            return obj;
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }

        return null;
    }
}
