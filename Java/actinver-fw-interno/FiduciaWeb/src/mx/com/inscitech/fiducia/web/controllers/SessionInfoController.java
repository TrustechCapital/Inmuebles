package mx.com.inscitech.fiducia.web.controllers;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.dtos.SessionInfo;
import mx.com.inscitech.fiducia.dtos.SessionUser;
import mx.com.inscitech.fiducia.dtos.SessionUserPermisions;

import mx.gob.nafin.fiduciario.business.services.GenericDataAccessService;
import mx.gob.nafin.fiduciario.controller.JsonActionController;

import org.springframework.web.servlet.ModelAndView;

public class SessionInfoController extends JsonActionController {
    
    protected GenericDataAccessService genericDataAccessService;
    
    public SessionInfoController() {
        super();
    }

    public void setGenericDataAccessService(GenericDataAccessService genericDataAccessService) {
        this.genericDataAccessService = genericDataAccessService;
    }

    public GenericDataAccessService getGenericDataAccessService() {
        return genericDataAccessService;
    }

    public ModelAndView getSessionInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Session info for user: " + request.getParameter("userId"));
        
        SessionInfo sessionInfo = null;
        
        sessionInfo = new SessionInfo(
                          new SessionUser("admin", "Administrador"),
                          "10/12/2020",
                          Arrays.asList(
                            new SessionUserPermisions("ADMINISTRACION.FIDEICOMISOS", true, true),
                            new SessionUserPermisions("BIENES.BIENES", true, true),
                            new SessionUserPermisions("BIENES.CARGA_MASIVA", true, true),
                            new SessionUserPermisions("BIENES.INDIVIDUALIZACION", true, true),
                            new SessionUserPermisions("BIENES.ADQUIRIENTES", true, true),
                            new SessionUserPermisions("BIENES.LIBERACIONES", true, true),
                            new SessionUserPermisions("INTERFASES.INTERFASES", true, true),
                            new SessionUserPermisions("OPERACIONES.APERTURA_CIERRE", true, true),
                            new SessionUserPermisions("REPORTES.REPORTE_BIENES", true, true),
                            new SessionUserPermisions("SEGURIDAD.USUARIOS", true, true)
                          ));
    
        return respondObject(response, sessionInfo);
    }
    
}
