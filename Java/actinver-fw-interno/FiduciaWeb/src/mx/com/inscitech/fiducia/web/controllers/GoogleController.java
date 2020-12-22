package mx.com.inscitech.fiducia.web.controllers;

import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.dtos.AppGoogleInfo;

import org.springframework.web.servlet.ModelAndView;

public class GoogleController extends JsonActionController {
    
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
        
        String test = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        
        AppGoogleInfo googleInfo = new AppGoogleInfo("656756775jgjgjghjjhgjg7766866");
        
        return respondObject(response, googleInfo);
    }
    
    public ModelAndView ssoIdp(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "ssoIdp");
        
        AppGoogleInfo googleInfo = new AppGoogleInfo("656756775jgjgjghjjhgjg7766866");
        
        return respondObject(response, googleInfo);
    }
}
