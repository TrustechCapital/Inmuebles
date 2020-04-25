<%@ page contentType="text/html;charset=ISO-8859-1"%>

<%
try {
%>
<table id="tablaFooter" cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" background="imagenes/fondoInscitech.jpg" style="background-repeat:repeat-x">
  <tr>
    <TD align="left" valign="middle" class="pie" ><b><%=session.getAttribute("userInfo")!=null?((mx.com.inscitech.fiducia.common.beans.UserInfoBean)session.getAttribute("userInfo")).getNombre():"&nbsp;"%></b></td>
    <TD  align="right" valign="middle" class="pie">Sistema Fiduciario  <%=mx.com.inscitech.fiducia.listeners.ApplicationStartUp.CURRENT_VERSION%>&nbsp; A</td>
  </tr>
</table>
<%
} catch(Exception e) {
    
    mx.com.inscitech.fiducia.common.services.LoggingService logger = mx.com.inscitech.fiducia.common.services.LoggingService.getNewInstance();
    logger.log(this, Thread.currentThread(), mx.com.inscitech.fiducia.common.services.LoggingService.LEVEL.ERROR, e);
    
    session.removeAttribute("userInfo");
    session.removeAttribute("username");
    
    session.invalidate();
    
    response.sendRedirect("error.jsp");
}
%>