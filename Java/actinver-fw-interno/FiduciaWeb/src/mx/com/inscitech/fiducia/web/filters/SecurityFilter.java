package mx.com.inscitech.fiducia.web.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mx.com.inscitech.fiducia.InvalidUserException;
import mx.com.inscitech.fiducia.common.beans.UserInfoBean;
import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.services.UserInformationService;
import mx.com.inscitech.fiducia.web.controllers.GoogleController;


public class SecurityFilter implements Filter {

    private LoggingService logSrv = null;

    private FilterConfig _filterConfig = null;

    public void init(FilterConfig filterConfig) throws ServletException {
        _filterConfig = filterConfig;
    }

    public void destroy() {
        _filterConfig = null;
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        logSrv = LoggingService.getNewInstance();
        logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Security filter inicio!");

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        HttpSession session = httpRequest.getSession();

        UserInfoBean userInfo = null;
        
        String uri = httpRequest.getRequestURI();
        String userName = ""+session.getAttribute(GoogleController.USERID);
        
        logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, String.format("User: %s RequestURI: %s", userName, uri));

        if ("".equals(userName) || "null".equals(userName)) {
            httpResponse.setStatus(403);
            return;
        }
        
        if (uri.indexOf("jsp") != -1) {
            httpResponse.sendRedirect("/FiduciaWeb/");
            return;
        }        
        
        if(session.getAttribute("userInfo") == null) {
            logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error! La informacion del usuario no se ha encontrado en sesion");
            try {
                userInfo = UserInformationService.getInstance().getUserInfo(userName, null, 1);
                setSessionAttributes(session, userInfo, new Object[]{});
            } catch (InvalidUserException e) {
                httpResponse.setStatus(403);
                return;
            }
        }
        
        httpResponse.addHeader("Access-Control-Allow-Origin", "*");
        chain.doFilter(request, response);
    }
    
    private void setSessionAttributes(HttpSession session, UserInfoBean userInfo, Object empresas[]) {
                
        logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "setSessionAttributes userInfo: " + userInfo + " userid: " + userInfo.getUserId() + " puestoId: " + userInfo.getPuestoId() + " nompuesto:"+ userInfo.getPuesto());
        
        session.setAttribute("userInfo", userInfo);
        session.setAttribute("fechaContable", userInfo.getFechaContable());
        session.setAttribute("strFechaContable", userInfo.getStrFechaContable());
        session.setAttribute("userid", userInfo.getUserId());
        session.setAttribute("puestoId", userInfo.getPuestoId());
        session.setAttribute("puesto", userInfo.getPuesto());
        session.setAttribute("mesAbiertoLbl", userInfo.getMesAbiertoStr());
        session.setAttribute("mesAbierto", userInfo.getMesAbierto());        
        
        for (int s = 0; s < empresas.length; s++) {
            session.setAttribute("empresa_" + s, String.valueOf(empresas[s]));
        }
        
    }
    
}
