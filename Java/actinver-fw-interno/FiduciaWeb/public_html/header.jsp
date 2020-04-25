<%@ page contentType="text/html;charset=ISO-8859-1"
import="mx.com.inscitech.fiducia.common.beans.UserInfoBean, 
            mx.com.inscitech.fiducia.listeners.ApplicationStartUp, 
            mx.com.inscitech.fiducia.common.services.LoggingService"
%>
<%
LoggingService logger = LoggingService.getNewInstance();

String nombre = "&nbsp;";
String version = ApplicationStartUp.CURRENT_VERSION;
String errorMsgFoot = "";

UserInfoBean userInfoF = new UserInfoBean();

try {

    if(session.getAttribute("userInfo") != null) {
        userInfoF = (UserInfoBean)session.getAttribute("userInfo");
        nombre = userInfoF.getNombre();
    } else {
        errorMsgFoot = "La informacion del usuario en sesion no esta disponible";
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, errorMsgFoot);
    }

} catch(Exception e) {
    e.printStackTrace();
    errorMsgFoot = e.getMessage();
    
    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
    
    /*session.removeAttribute("userInfo");
    session.removeAttribute("username");
    
    session.invalidate();
    
    response.sendRedirect("error.jsp");*/
}
%>
<TABLE border="0" cellPadding="0" cellSpacing="0"  width="100%">  
  <TR>
    <TD width="20%" background="imagenes/fondoInscitech.jpg"> <img src="imagenes/logo_Actinver_blanco.png" alt="Actinver" border="0" height="45"/></TD>
    <td width="80%"  align="right" valign="bottom" background="imagenes/fondoInscitech.jpg" height="50%" width="50%">
      <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
        <tr>
          <td  align="right" valign="middle"  height="25">&nbsp; 
              <!-- Usuario: <b style="color:#FFFFFF"><%=nombre%></b> --> &nbsp; <a href="ssologoff.jsp" style="color:#FFFFFF">Cerrar Sesion &nbsp;&nbsp;<img src="imagenes/power.png" border="0" alt="Cerrar Sesión SSO" height="14" width="34"></a>
          </td>
        </tr>
        <tr>
          <td  align="right" valign="bottom" class="tituloEncabezado" height="50%"> 
            <font style="font-weight: bolder; font-size: 9pt;">Fecha Real&nbsp;:<%=mx.com.inscitech.fiducia.common.util.DateTimeUtils.formatDateTimeFromPattern("dd - MMMMM - yyyy", new java.util.Date(), java.util.Locale.getDefault())%></font>&nbsp; &nbsp;<font style="font-weight: bolder; font-size: 9pt;">Fecha Contable&nbsp;:<%=session.getAttribute("strFechaContable") != null ? session.getAttribute("strFechaContable") : "&nbsp;"%></font>&nbsp;&nbsp; 
            <%if(session.getAttribute("mesAbiertoLbl") != null) {%>
            <%}%>
          </td>
        </tr>
      </table>
    </td>
  </TR>
</TABLE>
