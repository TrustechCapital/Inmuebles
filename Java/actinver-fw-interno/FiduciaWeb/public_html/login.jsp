<%@ page contentType="text/html;charset=ISO-8859-1"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
        <meta http-equiv="Page-Exit" content="BlendTrans(Duration=1)"/>
        <title>Servicios Fiduciarios</title>
        <link rel="stylesheet" href="css/fiducia_general.css" type="text/css"/>
        <link href="js/jquery/jalert/alerts.css" rel="stylesheet" type="text/css" media="screen"/>
        <script src="js/jquery/jquery.js" type="text/javascript"></script>
        <script src="js/jquery/draggable/draggable.js" type="text/javascript"></script>
        <script src="js/jquery/draggable/draggable.js" type="text/javascript"></script>
        <script src="js/jquery/jalert/alerts.js" type="text/javascript"></script>
        <script src="js/JSON.js" type="text/javascript"></script>
        <script type="text/javascript">
          var ctxRoot = "<%=request.getContextPath()%>";
        </script>
        <script src="js/generic_functions.js" type="text/javascript"></script>
        <script src="js/login.js" type="text/javascript"></script>
    </head>
    <body vlink="#052206" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" bgcolor="white"
          background="./imagenes/fondo_fiduciaweb.jpg" style="background-repeat:no-repeat;" onload="">
        <div style="height:100%">
            <table id="tablaPrincipal" cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">
                <tr>
                    <td rowspan="4">&nbsp;</td>
                    <td id="tdHeader" height="40px">
                        <jsp:include page="header.jsp"/>
                    </td>
                    <td rowspan="4">&nbsp;</td>
                </tr>
                 
                <tr>
                    <td width="100%" nowrap="nowrap" align="center">
                        <table id="tablaContenido" cellpadding="0" cellspacing="0" border="0" width="100%"
                               height="100%">
                            <tr>
                                <td colspan="3" height="3px">&nbsp;</td>
                            </tr>
                             
                            <tr>
                                <td width="15%">&nbsp;</td>
                                <td valign="top" align="center">
                                    <br/><br/><br/>
                                     
                                    <form name="logon" method="POST" action="#" autocomplete="off">
                                        <table border="0" cellpadding="5" cellspacing="3" align="center" width="80%">
                                            <tr>
                                                <td colspan="2" align="center" class="titulo" nowrap="nowrap">Sistema
                                                                                                              Fiduciario</td>
                                            </tr>
                                        </table>
                                        <br/>
                                        <hr/>
                                        <br/>
                                        <table border="0" cellpadding="5" cellspacing="3" align="center">
                                            <tr>
                                                <td style="font-family:Calibri,Tahoma,Arial;font-size:14px;font-weight:bold;color:#444444;">Usuario:</td>
                                                <td>
                                                    <input type="text" id="username" name="username" maxlength="50"
                                                           value=""/>
                                                </td>
                                            </tr>
                                             
                                            <tr>
                                                <td style="font-family:Calibri,Tahoma,Arial;font-size:14px;font-weight:bold;color:#444444;">Contrase&ntilde;a:</td>
                                                <td>
                                                    <input type="password" id="password" name="password" maxlength="50"
                                                           value=""/>
                                                </td>
                                            </tr>
                                             
                                            <tr>
                                                <td colspan="2" align="center" valign="bottom">
                                                    <input id="cmdEntrar" type="button" class="boton"
                                                           onclick="doLogin()" value="Entrar"/>
                                                </td>
                                            </tr>
                                             
                                            <tr>
                                                <td colspan="2">&nbsp;</td>
                                            </tr>
                                             
                                            <tr>
                                                <td colspan="2" align="center">
                                                    <div id="dvMensajesLogin" style="width:400px;">&nbsp;</div>
                                                </td>
                                            </tr><!--tr>
                                            <td colspan="2" align="center" valign="bottom">
                                                <input id="cmdCambiaPwd" type="button" class="boton" onclick="doCambiaPWD()" value="Cambiar Contrase&ntilde;a"/>
                                            </td>
                                        </tr-->
                                        </table>
                                    </form>
                                </td>
                                <td width="15%">&nbsp;</td>
                            </tr>
                             
                            <tr>
                                <td colspan="3" height="3px">&nbsp;</td>
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
        </div>
        <div id="cambiaPassword" style="visibility:hidden">
                                                <form name="logon2" autocomplete="off">
                                                    <table border="0" cellpadding="5" cellspacing="3" align="center"
                                                           width="80%">
                                                        <tr>
                                                            <td colspan="2" align="center" class="titulo"
                                                                nowrap="nowrap">Cambio de Password</td>
                                                        </tr>
                                                    </table>
                                                    <hr/>
                                                    <table border="0" cellpadding="5" cellspacing="3" align="center">
                                                        <tr>
                                                            <td>Contrase&ntilde;a:</td>
                                                            <td>
                                                                <input type="password" id="password2" name="password2"
                                                                       value="" maxlength="50"/>
                                                            </td>
                                                        </tr>
                                                         
                                                        <tr>
                                                            <td>Confirmacion Contrase&ntilde;a:</td>
                                                            <td>
                                                                <input type="password" id="password3" name="password3"
                                                                       value="" maxlength="50"/>
                                                                 
                                                                <input type="hidden" id="ssousername2"
                                                                       name="ssousername2" value="" maxlength="50"/>
                                                            </td>
                                                        </tr>
                                                         
                                                        <tr>
                                                            <td colspan="2" align="right" valign="bottom">
                                                                <input type="button" class="boton"
                                                                       onclick="validaPassword()" value="Confirmar"/>
                                                                 
                                                                <input type="hidden" id="tipo2" name="tipo2"
                                                                       maxlength="8" value="1"/>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </form>
                                            </div>
    </body>
</html>