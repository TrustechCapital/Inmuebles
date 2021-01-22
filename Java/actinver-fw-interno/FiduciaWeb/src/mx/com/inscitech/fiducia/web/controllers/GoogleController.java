package mx.com.inscitech.fiducia.web.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.dtos.AppGoogleInfo;
import mx.com.inscitech.fiducia.services.ErrorData;
import mx.com.inscitech.fiducia.web.services.saml.AuthData;
import mx.com.inscitech.fiducia.web.services.saml.SAMLServiceClient;

import org.springframework.web.servlet.ModelAndView;

public class GoogleController extends JsonActionController {

    //TODO: Mover la logica y las constantes a un servicio
    public static final String ONELOGIN_CONFIG_FILE = "fw.saml.properties";    
    
    public static final String USERID = "userId";
    public static final String USER_NAME = "userName";
    public static final String USER_LAST_NAME = "userLastName";
    public static final String USER_EMAIL = "userEmail";
        
    private static final String GOOGLE_NAME_ATTRIBUTE = "nombre";
    private static final String GOOGLE_lAST_NAME_ATTRIBUTE = "apellido";
    private static final String GOOGLE_EMAIL_ATTRIBUTE = "correo";
    
    public GoogleController() {
        super();
    }
    
    public ModelAndView getAppToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "getAppToken");
        
        AppGoogleInfo googleInfo = new AppGoogleInfo("656756775jgjgjghjjhgjg7766866");
        
        return respondObject(response, googleInfo);
    }
    
    public ModelAndView doSignIn(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "doSignIn");
        
        SAMLServiceClient samlClient = new SAMLServiceClient();
        AuthData authData = samlClient.authenticateUser(request.getParameter(SAMLServiceClient.SAML_PARAMETER_NAME));
        
        //if(authData == null) respondObject(403, response, new ErrorData("FWBK-SECURITY-SAML01", "Invalid user!"));
        
        if(authData != null) {
            request.getSession().setAttribute(USERID, authData.getId());
            request.getSession().setAttribute(USER_EMAIL, authData.getEmail());
            request.getSession().setAttribute(USER_NAME, authData.getFirstName());
            request.getSession().setAttribute(USER_LAST_NAME, authData.getLastName());            
        }

        response.sendRedirect("/FiduciaWeb/");                    
        return null;
    }
    
    public ModelAndView doSignOut(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "doSignOut");
        return respondObject(400, response, new ErrorData("FWBK-SECURITY-SAML02", "Bad request!"));
    }
    
    public ModelAndView ssoIdp(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "ssoIdp");        
        return respondObject(400, response, new ErrorData("FWBK-SECURITY-SAML03", "Bad request!"));
    }
}
