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

import mx.com.inscitech.fiducia.business.services.BitacoraService;
import mx.com.inscitech.fiducia.common.beans.UserInfoBean;
import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.services.UserInformationService;


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

        String uri = httpRequest.getRequestURI();
        String userName = null;

        logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "RequestURI: " + uri);

        UserInfoBean userInfo = null;
        
        /*if (uri.indexOf("login") != -1 || uri.indexOf("ssologoff") != -1 || uri.indexOf("error.jsp") != -1) {
            chain.doFilter(request, response);
            return;
        } else {*/

            userName = "fiducia";// + session.getAttribute("username");
            logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "User: " + userName);

            /*if ("".equals(userName) || "null".equals(userName)) {


                logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Usuario no autenticado");

                //TODO: Si llama algo json regresar algo json {}
                request.setAttribute("error", "InvalidUserException");
                httpRequest.getRequestDispatcher("/login.jsp").forward(request, response);
                //httpResponse.sendRedirect("login.jsp");
                chain.doFilter(request, response);
                return;

            } else {*/

                if(session.getAttribute("userInfo") == null) {
                    logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error! La informacion del usuario no se ha encontrado en sesion");
                    //httpResponse.sendRedirect(httpRequest.getContextPath() + "/error.jsp");
                } else {

                    logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Else de usuario en SecurityFilter: " + uri);        
                    //TODO: Que hacer en el caso que userInfo sea null
                    userInfo = (UserInfoBean)session.getAttribute("userInfo");
                    int userId = userInfo.getUserId().intValue();
                    logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Userid para Principal.jsp "+String.valueOf(userId));
                    session.setAttribute("userid", ""+userId);
                    logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "PuestoId para Principal.jsp "+100);
                    int puestoId = userInfo.getPuestoId().intValue();
                    session.setAttribute("puestoId", ""+ puestoId);

                    logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Nombre para Principal.jsp "+"");
                    session.setAttribute("Nombre", "");
                    
                    /*if (uri.indexOf("jsp") != -1) {
                        httpResponse.sendRedirect(httpRequest.getContextPath() + "/principal.do");
                    } else {
    
                        if (uri.indexOf("altaCatalogo") != -1)
                            BitacoraService.getInstance().registraBitacora(BitacoraService.ALTA, uri, "0", userName, userId);
                        else if (uri.indexOf("bajaCatalogo") != -1)
                            BitacoraService.getInstance().registraBitacora(BitacoraService.BAJA, uri, "0", userName, userId);
                        else if (uri.indexOf("modificaCatalogo") != -1)
                            BitacoraService.getInstance().registraBitacora(BitacoraService.MODIFICACION, uri, "0", userName, userId);
                        else if (uri.indexOf("Ref") != -1)
                            BitacoraService.getInstance().registraBitacora(BitacoraService.CONSULTA, uri, "0", userName, userId);
    
                        logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Chain to: " + uri);
                        chain.doFilter(request, response);
    
                    }*/
                }
                
                //return;
            //}
        //}
        httpResponse.addHeader("Access-Control-Allow-Origin", "*");
        chain.doFilter(request, response);
    }
    
    private void setSessionAttributes(HttpSession session, UserInfoBean userInfo, Object empresas[]) {
                
        //logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "setSessionAttributes userInfo: " + userInfo + " userid: " + userInfo.getUserId() + " puestoId: " + userInfo.getPuestoId() + " nompuesto:"+ userInfo.getPuesto());
        
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
