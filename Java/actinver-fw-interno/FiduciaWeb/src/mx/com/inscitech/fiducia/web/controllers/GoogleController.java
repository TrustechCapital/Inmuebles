package mx.com.inscitech.fiducia.web.controllers;

import com.onelogin.saml2.Auth;

import java.io.InputStream;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.dtos.AppGoogleInfo;
import mx.com.inscitech.fiducia.services.ErrorData;

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
        
        ClassLoader classLoader = getClass().getClassLoader();
        try(InputStream inputStream = classLoader.getResourceAsStream(ONELOGIN_CONFIG_FILE)) {
            if(inputStream != null) {
                Auth auth = new Auth(inputStream, request, response);

                auth.processResponse();
                if (auth.isAuthenticated()) {

                    Map<String, List<String>> attrs = auth.getAttributes();
                    logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, 
                        "user-name:" + attrs.get(GOOGLE_NAME_ATTRIBUTE) + " user-lastname: " + attrs.get(GOOGLE_lAST_NAME_ATTRIBUTE) + " user-email: " + attrs.get(GOOGLE_EMAIL_ATTRIBUTE)
                    );
                    
                    request.getSession().setAttribute(USERID, auth.getNameId());
                    request.getSession().setAttribute(USER_NAME, attrs.get(GOOGLE_NAME_ATTRIBUTE).get(0));
                    request.getSession().setAttribute(USER_LAST_NAME, attrs.get(GOOGLE_lAST_NAME_ATTRIBUTE).get(0));
                    request.getSession().setAttribute(USER_EMAIL, attrs.get(GOOGLE_EMAIL_ATTRIBUTE).get(0));
                    
                    response.sendRedirect("/FiduciaWeb/");
                    return null;
                        
                } else {
                    logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "The user is not authenticated!");
                    //TODO: manage scenario
                }
                
            } else {
                //TODO: Throw exception & manage error
                logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.ERROR, "Unable to load sso settings!");
            }
        } catch(Exception e) {
            logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }

        response.sendRedirect("/FiduciaWeb/");
        return null; //respondObject(403, response, new ErrorData("FWBK-SECURITY-SAML01", "Invalid user!"));
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
