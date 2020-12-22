package mx.com.inscitech.fiducia.interfaces;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.dtos.FiduciaWebErrorBean;

import mx.com.inscitech.fiducia.web.controllers.JsonActionController;

import org.springframework.web.servlet.ModelAndView;

public class InterfacesController extends JsonActionController {
    
    protected LoggingService logger = LoggingService.getInstance();

    public InterfacesController() {
        super();
    }

    public ModelAndView validaListasNegras(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "validaListasNegras");        
        response.setStatus(400);
        return respondObject(response, new FiduciaWebErrorBean("FWBK-IF-CU01", "Not yet implemented!"));
    }

    public ModelAndView getClienteUnico(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "getClienteUnico");
        response.setStatus(400);
        return respondObject(response, new FiduciaWebErrorBean("FWBK-IF-CU01", "Not yet implemented!"));
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