<%@ page contentType="text/html;charset=ISO-8859-1"%>
<%@ page import="java.util.*, javax.mail.*, javax.mail.internet.*, java.io.*, javax.activation.*" %>
<!--jsp:useBean id="BD"  class="com.nafin.negocio.FiduciaBD"/-->
<%@ page import="java.math.BigDecimal, mx.com.inscitech.fiducia.common.util.DecimalFormatUtils"%>
<%@ page import="java.math.BigDecimal, mx.com.inscitech.fiducia.common.util.DecimalFormatUtils, mx.com.inscitech.fiducia.common.services.LoggingService"%>
<%
    
    LoggingService logger = LoggingService.getInstance();
    
    List consulta = (List)request.getAttribute("consulta");
    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Objeto consulta: " + consulta);
    
    //Variable para obtener tupla por tupla
    Map registro = null;
    
	String sCuerpo = "";

    //Variables que contendrán los elementos de cada tupla
    String usuario = "";
    String fecha = "";
    String status = "";
    String sTipoPersona="";
    String sNumPersona="";
    String sTipoOperacion="";
    String sFolios="";
    String contrato = "";
    String importe = "";  
    String sBanco = "";  
    String sTipo = "";  
    String sMoneda = "";
    String sAsesor = "";
    String sFecha = "";
    String sExpuesta = "";
    String sCorreo = "";
    String sManejo = "";
    String sCelu = "";
    BigDecimal sFideicom = new BigDecimal(0);  
    String sTipop = "";
    String fiduciario = "";
    BigDecimal iContratos = new BigDecimal(0);       
    BigDecimal iBolsa = new BigDecimal(0);       
    BigDecimal fideicomiso = new BigDecimal(0);       
    
    
    boolean falleEnCorreo = false;
    int contador = 0;
    int usu = 0;
    int iActAlerta=0;    
    
    int iBanco=0,iCasaBolsa=0;
    int iCtaChe=0,iCtoInver=0;
    
    String subject = "Aviso de Atencion de Solicitud";
    
    String emailFrom = "fiduciarioweb@actinver.com.mx";
    String emailTo = "fidmiddleoffice@actinver.com.mx"; //"agonzalez@actinver.com.mx"; 
    
    try {
		
        while(contador<consulta.size()) {
            registro = (java.util.Map)consulta.get(contador);
            System.out.println("Envio de correo 0");
            fideicomiso = (BigDecimal)registro.get("fideicomiso");
            sBanco = (String)registro.get("banco");
            sMoneda = (String)registro.get("moneda");
            sAsesor = (String)registro.get("asesor");
            sFecha =  (String)registro.get("fecha");
            sFideicom = (BigDecimal)registro.get("fideicomitente");
            sTipop = (String)registro.get("tipopers");
            sExpuesta = (String)registro.get("personaexp");
            sCorreo = (String)registro.get("correo");
            sManejo = (String)registro.get("perfinv");
            sCelu = (String)registro.get("celular");
            iContratos = (BigDecimal)registro.get("numcuentas");
            iBolsa = (BigDecimal)registro.get("cuentasbolsa");
            if (iBolsa.intValue()>0) {//si es banco actinver
                    iBanco=iContratos.intValue();
                    iCasaBolsa=iBolsa.intValue();
                    fiduciario="Casa de Bolsa";
            }        
            else//en caso contrario 
                 if (sBanco.indexOf("CUENTA")!=-1)//si es cuenta de cheques
                    iCtaChe=iContratos.intValue();
                 else
                    iCtoInver=iContratos.intValue();
            sTipo = (String)registro.get("tipocuenta");
			System.out.println("Envio de correo 0.1");

           
          contador++;
         }        
         
         //ya que se obtuvieron los valores se procede a armar los correos
        
        subject = "Aviso de Apertura de Contratos de Inversion y/o Cuentas Cheques "+ String.valueOf(fideicomiso.intValue());           
        String fromAddress = "fiduciarioweb@actinver.com.mx"; //Tecnico Legal
        String toAddress = "agonzalez@actinver.com.mx";//"fidmiddleoffice@actinver.com.mx";  Dictaminacion
        /*LOCAL
        emailFrom = "actinver@inscitech";
        emailTo = "actinver@inscitech";
        */
        String IPCorreo ="";// BD.getDatosParametros(100);
        String correo = "";//BD.getDatosParametros(101);

        Properties props = new Properties();
        /*ACTINVER*/
        props.put("mail.smtp.host", "masivos.actinver.com.mx");
        props.put("mail.smtp.auth", "false");
        props.put("mail.smtp.port", "25");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        
        /*LOCAL*/
        /*props.put("mail.smtp.host", "127.0.0.1");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "25");
        props.put("mail.smtp.starttls.enable", "true");
        */
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Properties: " + props);

        Session session3 = Session.getInstance(props, 
            new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    //ACTINVER
                    return new PasswordAuthentication("fiduciarioweb@actinver.com.mx", "$J41Mpj:hj");
                    //LOCAL
                    //return new PasswordAuthentication("actinver@inscitech","actinver");
                }
            }
        );                

        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "session3: " + session3);
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "CADENAS: " + fideicomiso+ "/"+ sBanco+ "/" + sMoneda + "/" +sAsesor+"/"+sFecha+"/"+sFideicom+"/"+sTipop);
        
        fromAddress = emailFrom;
        toAddress = emailTo;
                        
        sCuerpo= "<div style='font-family: Arial; font-size: 12px;color: #000000;'>";

            if (iBolsa.intValue()>0){//si es banco actinver
                    sCuerpo = sCuerpo +"	Buen día	";
                    sCuerpo = sCuerpo +"	<br>";	
                    
                    sCuerpo = sCuerpo +"	<br>";	
                    sCuerpo = sCuerpo +"	FIDEICOMITENTE:"+String.valueOf(sFideicom);
                    sCuerpo = sCuerpo +"	FIDUCIARIO:"+fiduciario;
                    sCuerpo = sCuerpo +"	Por  este conducto te solicito tu apoyo para aperturar <b>"+ (iBanco!=0?String.valueOf(iBanco)+"</b> contrato(s)  en  (BANCO)": "") + " y <b>" + (iCasaBolsa!=0?String.valueOf(iCasaBolsa)+"</b>  contrato(s)  en  (CASA DE BOLSA)":"") + " a  nombre de:	<br>";
                    sCuerpo = sCuerpo +"	<br>ASESOR:"+sAsesor+"<br>";
                    sCuerpo = sCuerpo +"	<br>PERFIL DE INVERSION:"+sManejo+"<br>";
                    sCuerpo = sCuerpo +"	<br>ES PERSONA POLITICAMENTE EXPUESTA:"+sExpuesta+"<br>";
                    sCuerpo = sCuerpo +"	<br>TIPO DE PERSONA:"+sTipop+"<br>";
                    sCuerpo = sCuerpo +"	<br>N&uacute;mero de Celular de la persona facultada:"+sCelu+"<br>";
                    sCuerpo = sCuerpo +"	<br>Correo electr&oacute;nico de la persona facultada:"+sCorreo+"<br>";
           }
            else{//no es actinver
                sCuerpo = sCuerpo +"	FIDEICOMITENTE:"+String.valueOf(sFideicom);
                    sCuerpo = sCuerpo +"	INSTITUCI&OACUTE;N:"+sBanco;
                    sCuerpo = sCuerpo +"	Por  este conducto te solicito tu apoyo para aperturar <b>"+ (iBanco!=0?String.valueOf(iBanco)+"</b> contrato(s)  en  (BANCO)": "") + " y <b>" + (iCasaBolsa!=0?String.valueOf(iCasaBolsa)+"</b>  contrato(s)  en  (CASA DE BOLSA)":"") + " a  nombre de:	<br>";
                    sCuerpo = sCuerpo +"	<br>ASESOR:"+sAsesor+"<br>";
                    sCuerpo = sCuerpo +"	<br>PERFIL DE INVERSION:"+sManejo+"<br>";
                    sCuerpo = sCuerpo +"	<br>ES PERSONA POLITICAMENTE EXPUESTA:"+sExpuesta+"<br>";
                    sCuerpo = sCuerpo +"	<br>TIPO DE PERSONA:"+sTipop+"<br>";
                    sCuerpo = sCuerpo +"	<br>N&uacute;mero de Celular de la persona facultada:"+sCelu+"<br>";
                    sCuerpo = sCuerpo +"	<br>Correo electr&oacute;nico de la persona facultada:"+sCorreo+"<br>";
                /*sCuerpo = sCuerpo +"	CIUDAD DE MEXICO, A "+sFecha+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	Por medio de la presente y en seguimiento a instrucciones del Fideicomitente o miembros del Comité Tecnico del Fideicomiso <b>"+ String.valueOf(fideicomiso.intValue())+", 	"+"</b><br>";
                sCuerpo = sCuerpo +"	siendo Banco Actinver S.A o Casa de Bolsa Actinver SA de CV el Fiduciario y de acuerdo con los fines del contrato, 	"+"<br>";
                sCuerpo = sCuerpo +"	solicitamos se realicen los tramites necesarios para la apertura de la (s) cuenta(s), 	"+"<br>";
                sCuerpo = sCuerpo +"	de acuerdo a las siguientes características:	"+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	Institucion:  	<b>"+sBanco+"</b><br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	Moneda:	<b>"+sMoneda+"</b><br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	No. Contratos  Requeridos:	<b>"+(iCtaChe!=0?iCtaChe:iCtoInver)+"</b><br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	Contacto:	"+"<br>";
                sCuerpo = sCuerpo +"	Telefono:	"+sCelu+"<br>";
                sCuerpo = sCuerpo +"	Correo:	"+sCorreo+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";                  
                sCuerpo = sCuerpo +"	Informacion de la Cuenta 	"+"<br>";            
                if (sTipo.indexOf("CUENTA")!=-1){
                    sCuerpo = sCuerpo +"	Inversion: <b>SI	"+"</b><br>";
                    sCuerpo = sCuerpo +"	Intermediacion:<b> NO	"+"</b><br>";
                }
                else{
                    sCuerpo = sCuerpo +"	Inversion: <b>NO	"+"</b><br>";
                    sCuerpo = sCuerpo +"	Intermediacion: <b>SI	"+"</b><br>";                
                }
                sCuerpo = sCuerpo +"		";
                sCuerpo = sCuerpo +"	Medio  de  Acceso: SI/NO	"+"<br>";
                sCuerpo = sCuerpo +"		";
                sCuerpo = sCuerpo +"	Especificaciones de Facultades:	"+"<br>";
                sCuerpo = sCuerpo +"	Consulta 	"+"<br>";
                sCuerpo = sCuerpo +"	Operador 	"+"<br>";
                sCuerpo = sCuerpo +"	Autorizador 	"+"<br>";
                sCuerpo = sCuerpo +"	Número de personas	"+"<br>";
                sCuerpo = sCuerpo +"	Número de personas	"+"<br>";
                sCuerpo = sCuerpo +"	Número de personas	"+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	Otras Especificaciones:	"+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	* En caso de requerir la cuenta con otra institucion diferente favor de indicar los datos del ejecutivo, telefono, email y domicilio .	"+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	Asi mismo autorizamos a proprocionar informacion concerniente que sea requerida por el Banco emisor , incluso una copia del contrato del Fideicomiso, los gastos en que se incurra por dicho tramite seran aplicados en la misma cuenta o con cargo al patrimonio del Fideicomiso.	"+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	Sin mas por el momento, quedo a sus  ordenes para cualquier duda o comentario.	"+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	Atentamente	"+"<br>";
                sCuerpo = sCuerpo +"		"+"<br>";
                sCuerpo = sCuerpo +"	Promotor:	<b>"+sAsesor+"</b>";*/                  
            }
            sCuerpo = sCuerpo +"</div>";

        Message message = new MimeMessage(session3);

        InternetAddress from = new InternetAddress(fromAddress);
        InternetAddress to = new InternetAddress(toAddress);

        DataHandler data = new DataHandler(sCuerpo, "text/html");
        
        message.setFrom(from);	
        message.addRecipient(Message.RecipientType.TO, to);
        message.setSubject(subject);
        message.setHeader("X-Mailer", "sendhtml");
        message.setSentDate(new Date());
        message.setDataHandler(data);

        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "message: " + message);
        
        Transport.send(message);

        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Email sended! Contador: " + contador);

        if(contador == 0) falleEnCorreo = false;
         
    } catch(Exception e) {
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error al enviar el correo", e);
        falleEnCorreo = true;
    }
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
        <title>Enviar Correo</title>
        <link rel="stylesheet" href="css/fiducia_general.css" type="text/css"/>
        <link rel="stylesheet" href="css/dhtmlXMenu.css" type="text/css"/>
        <link rel="stylesheet" href="css/dhtmlXMenu_xp.css" type="text/css"/>
        <link rel="stylesheet" href="css/nafin.css" type="text/css"/>
        <link rel="stylesheet" href="fiduciav5/nafin.css" type="text/css"/>
    </head>
    <body bgColor=#ffffff leftMargin=0 text=#000000 topMargin=0 marginwidth="0" marginheight="0" width="10" height="10" toolbar="no" resizable="yes">
        <table width="50%" height="50%"  align="center" bordercolor="#000000" bgcolor="#EAEADF" border="2">
            <tr valign="top">
                <td height="50" align="center">
                    <br/>
                    <table border="0" height="110" width="440" >
                        <tr>
                            <td align="center" style="font-family: Arial;font-size: 14px;color: #000000;font-weight: bold;"><img src="<%=request.getContextPath()%>/imagenes/logo_bn.jpg" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CORREO&nbsp;&nbsp;<%=session.getAttribute("empresa_9")%></td>
                        </tr>
                        <tr>
                            <td><hr size="1" noshade/></td>
                        </tr>
                        <%if(!falleEnCorreo) {%>
                        <tr>
                            <td align="center"  style="font-family: Arial;font-size: 12px;color: #000000;font-weight: bold;">El email ha sido enviado satisfactoriamente</td>
                        </tr>
                        <%} else {%>
                        <tr>
                            <td align="center"  style="font-family: Arial;font-size: 12px;color: #000000;font-weight: bold;">Hubo un error al tratar de enviar el correo</td> 
                        </tr>
                        <%}%>
                        <tr>
                            <td align="center">        
                                <p><input type="button" name="Cerrar" value="CERRAR" onClick="window.close();" style="background: url('imagenes/boton_new.png'); font-family: Arial, Helvetica, sans-serif; border: 0px;font-size: 11px;width:112px;height:24px;color: #FFFFFF;font-weight: bold;cursor:hand;"/></p>
                                <p>&nbsp;</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
