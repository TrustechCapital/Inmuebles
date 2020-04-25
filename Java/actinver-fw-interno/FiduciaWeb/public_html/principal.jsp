<%@ page contentType="text/html;charset=ISO-8859-1"
    import="mx.com.inscitech.fiducia.common.beans.UserInfoBean, net.sf.json.JSONObject"
%>
<%
String userId = ""+session.getAttribute("userid");
String userInfoJS = "{}";
String fechaContable = ""+session.getAttribute("fechaContable");
String nombre = "N/D";
String errorMsg = "";

UserInfoBean userInfo = new UserInfoBean();

try {
    if(session.getAttribute("userInfo") == null) {
        errorMsg = "Attribute userInfo is null!";
    } else {
        userInfo = (UserInfoBean)session.getAttribute("userInfo");    
        nombre = userInfo.getNombre();
        userId = ""+userInfo.getUserId();
    }
    
    userInfoJS = ""+JSONObject.fromObject(userInfo);
} catch(Exception e) {
    errorMsg = e.getMessage();
    e.printStackTrace();
}

%>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=5;IE=7;" />
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
    <title>Servicios Fiduciarios</title>
    
    <link rel="stylesheet" href="css/fiducia_operacion.css" type="text/css" />
    <link rel="stylesheet" href="css/fiducia_general.css" type="text/css" />
    <link rel="stylesheet" href="css/dhtmlXMenu.css" type="text/css" />
    <link rel="stylesheet" href="css/dhtmlXMenu_xp.css" type="text/css" />
    <link rel="stylesheet" href="js/calendar/calendario.css" type="text/css" />
    <link rel="stylesheet" href="js/calendarExtended/css/jscal2.css" id="skinhelper-Normal" type="text/css" />  
    <link rel="stylesheet" href="js/calendarExtended/css/jscal2Minis.css" id="skinhelper-Minis" type="text/css" />
    <link rel="stylesheet" href="js/calendarExtended/css/border-radius.css" type="text/css" />
    <link rel="stylesheet" href="js/calendarExtended/css/extras.css" type="text/css" />
    <link rel="stylesheet" href="js/calendarExtended/css/reduce-spacing.css" id="skinhelper-compact" type="text/css" />

    <link rel="stylesheet" href="modules/Administracion/Agenda/feederEventos/feederEventos.css" type="text/css" />

    <script src="js/jquery/jquery.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/JSON.js"></script>
    
  </head>
  
  <body vLink="#052206" onload="loadMenu();"><!-- background="imagenes/fondo_fiduciaweb_principal.jpg"-->
    
    <script type="text/javascript">
        var aMenuBar = null;
        var userInfo = <%=userInfoJS%>;        
        var ctxRoot = "<%=request.getContextPath()%>";   
        var OLbubbleImageDir = ctxRoot + "/js/overlibmws/";
        var getRefURL = ctxRoot + "/getRef.do";
        var ctxUser = '<%=userId%>';
        var ctxFeccont = ' <%=fechaContable%>';
        var ctxNomUser = userInfo.nombre;
        var msg = '<%=errorMsg%>';
    </script>
    
    <script type="text/javascript">
            //para cargar actividades economicas hijas proyecto Cambiar cuando se encuentre el JS adecuado
            
            var objComboParamAlt;
            
            function cambiaComboPr(item) {
            
              if(item.selectedIndex > 0 && item.selectedIndex <= item.options.length) {                  
                var combohijo = GI('antNomActividad'); 
                SA(eval(combohijo), "param","objComboParamAlt");
                objComboParamAlt = JSON.parse("{\"numRama\":"+item.value+"}");  
                RA(combohijo,"next");
                loadElement(combohijo);  
              }
              
            }
    </script>
    
    
    <script type="text/javascript" src="js/operacion.js" charset="iso-8859-1"></script>
    
    <script type="text/javascript" src="js/cross_browser_support.js" charset="iso-8859-1"></script>
    <script type="text/javascript" src="js/generic_functions.js" charset="iso-8859-1"></script>
    <script type="text/javascript" src="js/formValidator.js" charset="iso-8859-1"></script>
    <script type="text/javascript" src="js/keyHandler.js" charset="iso-8859-1"></script>
    <script type="text/javascript" src="js/overlibmws/overlibmws.js"></script>    
    <script type="text/javascript" src="js/overlibmws/overlibmws_bubble.js"></script>
    <script type="text/javascript" src="js/overlibmws/overlibmws_filter.js"></script>
    
    <script type="text/javascript" src="js/calendarExtended/jscal2.js"></script>
    <script type="text/javascript" src="js/calendarExtended/lang/es.js"></script>
    
    <script type="text/javascript" src="js/calendar/calendar.js"></script>
    <script type="text/javascript" src="js/calendar/lang/calendar-ES.js"></script>   
    <script type="text/javascript" src="js/calendar/calendar-setup.js"></script>
    
    <script type="text/javascript" src="js/catalogos.js"></script>
    <script type="text/javascript" src="js/menu//dhtmlXProtobar.js"></script>
    <script type="text/javascript" src="js/menu/dhtmlXMenuBar.js"></script>
    <script type="text/javascript" src="js/menu/dhtmlXCommon.js"></script>
    <script type="text/javascript" src="js/menu.jsp"></script>
    <script type="text/javascript" src="js/funciones_cliente.js"></script>
    <script type="text/javascript" src="js/handling_objects_functions.js"></script>
    
    <!-- feeder eventos -->
    <script type="text/javascript" src="modules/Administracion/Agenda/feederEventos/feederEventos.js"></script>
    <!-- -->
    
    <!-- toplink -->
    <script src="js/toplink.js" type="text/javascript"></script>
		  
    <table id="tablaPrincipal" cellpadding="0" cellspacing="0" border="0" width="100%" height="100%" style="background-color:transparent;">
      <tr>
        <td rowspan="4">&nbsp;</td>
        <td id="tdHeader" height="40px">
          <!-- Header --><jsp:include page="header.jsp"/>
        </td>
        <td rowspan="4">&nbsp;</td>
      </tr>
      <tr>
        <td height="18px"> 
          <!-- Menu Principal --><jsp:include page="menu.jsp"/>
        </td>
      </tr>
      <tr>
        <td width="100%" nowrap align="center" class="fondoPrincipal">
          
          <table id="tablaContenido" cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">
            <tr>  
              <td colspan="3" height="3px">
                &nbsp;<!-- Separador -->
              </td>
            </tr>
            <tr>
              <td width="15%">&nbsp;<!-- Separador --></td>
              <td valign="top" align="center">
              
                <!-- Contenido -->
                <div id="dvContenido" style="min-height: 800px;">
                  <%if(session.getAttribute("userid")!= null) {%>
                    <h1 class="titulo">BIENVENIDO
                    <br/><br/>
                    &nbsp;</h1>
                  <%}else{%>
                      <h1 class="titulo">&nbsp;</h1>
                  <%}%>
                                    
                  <!-- feeder eventos --><div id="dvFeeder"></div>
                </div>
              </td>
              <td width="15%">&nbsp;<!-- Separador --></td>
            </tr>
            <tr>  
              <td colspan="3" height="3px">
                &nbsp; <!-- Separador -->
              </td>
            </tr>            
          </table>
        </td>
      </tr>
      <tr>
        <td height="16px">
          <jsp:include page="footer.jsp"/>
        </td>
      </tr>
    </table>
    
    <div id="dvMensajes" style="position: absolute; top: 0; left: 0;"></div>
    <a id="linkReporteNew" href="#" target="_new" style="visibility:hidden;position: absolute; top: 0; left: 0;" >Archivo</a>
    
    <script type="text/javascript">
    
        function accesosHoy() {
            var url = getRefURL + "?json={\"id\":\"consultaUltimosAcceso\"}";
            makeAjaxRequest(url,"HTML",resAccesosHoy,null);
        }
        
        function resAccesosHoy(obj, result) {
            var res = JSON.parse(result);
            var accesos = eval(res[0].cuantos);
            if(accesos < 2) countEventosProx();
        }
      
        // eventos pendientes
        function countEventosProx() {
            var url = getRefURL + "?json={\"id\":\"consultaProximosEventos\"}";
            makeAjaxRequest(url, "HTML", resCountEventosProx, null);
        }
        
        function resCountEventosProx(obj, result) {
            var res = JSON.parse(result); 
            var pendientes = eval(res[0].cuantos);
            if(pendientes > 0) actualizaAcceso();
        }
        
        //envia correo
        function enviaCorreo() {
            var idLink = "linkReporteNew"; 
            var parametrosUrl = {};
            
            parametrosUrl.sendToJSP="true";
            parametrosUrl.urlReporte="/modules/Administracion/Agenda/EnviarCorreo.jsp?Usuario="+(""+ctxUser.replace(/\s/g,'')+"").replace(/\s/g,'');
            parametrosUrl.id="mandaCorreoPendientesAgenda";
    
            var url = ctxRoot + "/imprimirReporte.do?json=" + JSON.stringify(parametrosUrl);
            idLink.href = url;
            window.open(url,GI("linkReporteNew").value,"width=450,height=205,scrollbars=NO");        
            document.onreadystatechange = function() { hideWaitLayer(); document.onreadystatechange = function() {} }
        }
        
        //actualiza ultimo acceso
        function actualizaAcceso() {
            var url = getRefURL + "?json={\"id\":\"actualizaUltimosAcceso\"}";
            makeAjaxRequest(url, "HTML", resActualizaAcceso, null);
        }
        
        function resActualizaAcceso(obj, result) {
            enviaCorreo();
        }
        
        accesosHoy();
    </script>    
  </body>
</html>