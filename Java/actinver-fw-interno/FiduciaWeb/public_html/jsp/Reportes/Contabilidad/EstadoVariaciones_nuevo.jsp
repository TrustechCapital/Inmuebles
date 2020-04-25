<!--
/*
  @Autor:Inscitech
  @Creado: Junio 2008
*/
-->

<%@ page import="java.text.*,java.util.*,java.lang.*,java.io.*,java.sql.*"%>
<jsp:useBean id="balance" class="com.nafin.negocio.nReporte"/>
<jsp:useBean id="cuentas" class="com.nafin.negocio.BalanceFormulas"/>
<jsp:useBean id="BD"  class="com.nafin.negocio.FiduciaBD"/>
<jsp:useBean id="repEdoFinan"  class="com.nafin.negocio.FiduciaBD"/>
<jsp:useBean id="datEdoFinan" class="com.nafin.negocio.nReporte"/>
<%@ page import="java.math.BigDecimal, mx.com.inscitech.fiducia.common.util.DecimalFormatUtils"%>
<%

DecimalFormat decFormat = new DecimalFormat("###,###,###,###,###,###,###,##0.00");
String[] bitacora = new String[5];
String fechaCont=BD.getFecha();
String folioBit="";
int regBitacora=0;
String tipoAdmin="";
%>
<%
 
    java.util.List consulta = (java.util.List)request.getAttribute("consulta");
    //Variable para obtener tupla por tupla
    java.util.Map registro = null;
    
    //Variables que contendr�n los elementos de cada tupla
    String sNumFideicomiso ="";    
    BigDecimal iNumUsuario = new BigDecimal(0);    
    BigDecimal iCveCuenta = new BigDecimal(0);    
    BigDecimal iFolio = new BigDecimal(0);   
    BigDecimal iEsEtiqueta = new BigDecimal(0);   
    BigDecimal dValorDato = new BigDecimal(0);   
    BigDecimal dordenDato = new BigDecimal(0);   

    BigDecimal dValorDato2 = new BigDecimal(0);   
    BigDecimal dValorDato3 = new BigDecimal(0);   
    BigDecimal dValorDato4 = new BigDecimal(0);   
    BigDecimal dValorDato5 = new BigDecimal(0);   

    BigDecimal valorDatoTemp= new BigDecimal(0);
    BigDecimal dSumTotalReng= new BigDecimal(0);
    BigDecimal dSumTotalCol1= new BigDecimal(0);
    BigDecimal dSumTotalCol2= new BigDecimal(0);
    BigDecimal dSumTotalCol3= new BigDecimal(0);
    BigDecimal dSumTotalCol4= new BigDecimal(0);
    BigDecimal dSumTotalCol5= new BigDecimal(0);
    String sValorLogicoTemp="";
    String sNombreImpresoTemp="";
    String sNombreAgrupacion="";
    String sNomUsuario="";
    String sCuenta="";    
    String sMotRechazo=""; 
    String sFideicomiso="";
    String sPeriodo="";
    String sNombreImpreso="";
    
 //nuevos   
    BigDecimal numContrato= new BigDecimal(0);
    String nomContrato="";
    String Fecha="";
    BigDecimal folioOper= new BigDecimal(0);
    BigDecimal col1= new BigDecimal(0);
    BigDecimal col2= new BigDecimal(0);
    BigDecimal col3= new BigDecimal(0);
    BigDecimal col4= new BigDecimal(0);
    BigDecimal col5= new BigDecimal(0);
    BigDecimal numColumna= new BigDecimal(0);
    String etiquetas="";
    int iCtaOrden=0;
    String FechaAnt="";

  
String fideicomiso="";
String periodo="";					

String mensaje="";	
String[] meses={" ","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"};

//se valida si hay informacion en la tabla
  if(consulta.size()>0)
  {
    registro = (java.util.Map)consulta.get(1);
    numContrato=(BigDecimal)registro.get("refNumFideicomiso");
    nomContrato=(String)registro.get("refNomFideicomiso");
    sPeriodo=(String)registro.get("refPeriodoReporte");
    

   
 /*   if(tipoAdmin.equals("SI"))
        {
        mensaje="El Reporte de Balance General<BR>No esta disponible<BR><BR>Para Fideicomisos con administraci�n propia";
        }*/
  }
  else
  {
    mensaje="No esta disponible<BR>El Reporte de Balance General<BR>De "+sPeriodo;
  }
  //Valida si el fideicomiso tiene administracion propia o no
int j=0;

%>

<html>
<head>
<title>ESTADO DE  VARIACIONES DEL PATRIMONIO</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body <%=request.getParameter("bImprimir")!=null && request.getParameter("bImprimir").trim().equals("1") && balance.hasData()==true ?"onLoad=\"window.print();window.close();\"":" "%>  oncontextmenu="return false" onkeydown="return false"   onmousemove ="return false" onselectstart ="return false" onclick="return false">
<table width="960" border="0" align="center">
<tr><td><hr width="960" size="1"> </td></tr>
</table>


<table border='0' bordercolor='#000000' bgcolor='#FFFFFF' >
		<tr>		
		<td>
			<table width='900'>
				<tr>
					<td align="CENTER"  style="font-family: Arial;	font-size: 16px;color: #000000;font-weight: bold;"><%=session.getAttribute("empresa_1")%></td>
				</tr>
				<tr>
					<td><div align='center' style="font-family: Verdana, Arial, Helvetica;	font-size: 12px;color: #000000;font-weight: bold;"><%=session.getAttribute("empresa_2")%></div></td>
				</tr>
				<tr>
					<td><div align='center' style="font-family: Verdana, Arial, Helvetica;	font-size: 12px;color: #000000;font-weight: bold;"><%=sPeriodo%></div></td>
				</tr>
				<tr><td height='23'>&nbsp;</td></tr>
        <tr><td align="center" style="font-family: Arial;	font-size: 12px;color: #000000;font-weight: bold;"><%=nomContrato%></td></tr>
			</table>
		</td>
		<td>
			<table> 
				<tr>
					<td width='151' height='91' rowspan='7'><div align='center'><img src="<%=request.getContextPath()%>/imagenes/logo_bn.jpg" ></div></td>					
				</tr>
			</table>
		</td>
		</tr>
		</table>	
	
          <P>&nbsp;</P>

           <table width="960"  border="0" align="center" bgcolor="#CCCCCC" style="font-family: Arial;	font-size: 13px;color: #000000;font-weight: bold;">
            <tr>
                <td align="center" width="350">&nbsp;</td>
                <td align="center" width="157">Patrimonio Fideicomitido</td>
                <td align="center" width="102">Aplicaciones Patrimoniales</td>
                <td align="center" width="188">Resultado Ejercicios Ant. </td>
                <td align="center" width="156">Resultado del Ejericio</td>
                <td align="center" width="112">Total</td>
            </tr>
</table>
<table width="960"  border="0" align="center">
      <%
           for(int i = 0; i < consulta.size(); i++) {  //Para cada registro
              registro = (java.util.Map)consulta.get(i); 

                numColumna = (BigDecimal)registro.get("refNumColDato");
                sNombreImpreso = (String)registro.get("refValorEtiqueta"); 
                iEsEtiqueta = (BigDecimal)registro.get("refEtiqueta");
                dValorDato = (BigDecimal)registro.get("refValorDato");
                dValorDato2 = (BigDecimal)registro.get("refValorDato2");
                dValorDato3 = (BigDecimal)registro.get("refValorDato3");
                dValorDato4 = (BigDecimal)registro.get("refValorDato4");
                dValorDato5 = (BigDecimal)registro.get("refValorDato5");
                dordenDato = (BigDecimal)registro.get("refOrdenDato");              
                dSumTotalReng=new BigDecimal(dValorDato2.doubleValue()+
                dValorDato3.doubleValue()+dValorDato4.doubleValue()+
                dValorDato5.doubleValue());
                //se obtienen totales por columna
                dSumTotalCol1=new BigDecimal (dSumTotalCol1.doubleValue() + dValorDato2.doubleValue());
                dSumTotalCol2=new BigDecimal (dSumTotalCol2.doubleValue() + dValorDato3.doubleValue());
                dSumTotalCol3=new BigDecimal (dSumTotalCol3.doubleValue() + dValorDato4.doubleValue());
                dSumTotalCol4=new BigDecimal (dSumTotalCol4.doubleValue() + dValorDato5.doubleValue());
                dSumTotalCol5=new BigDecimal (dSumTotalCol5.doubleValue() + dSumTotalReng.doubleValue());
                            
             %>               
          <tr style="font-family: Arial;	font-size: 10px;color: #000000;">
            <td align="left" width="350" ><%=sNombreImpreso%></td>
            <td align="right" width="157" ><%=DecimalFormatUtils.getFormatedNumber("###,###,###,###,###.00",new BigDecimal(dValorDato2.doubleValue()))%></td>                
            <td align="right" width="102" ><%=DecimalFormatUtils.getFormatedNumber("###,###,###,###,###.00",new BigDecimal(dValorDato3.doubleValue()))%></td>                
            <td align="right" width="188" ><%=DecimalFormatUtils.getFormatedNumber("###,###,###,###,###.00",new BigDecimal(dValorDato4.doubleValue()))%></td>                
            <td align="right" width="156" ><%=DecimalFormatUtils.getFormatedNumber("###,###,###,###,###.00",new BigDecimal(dValorDato5.doubleValue()))%></td>                
            <td align="right" width="112" ><%=DecimalFormatUtils.getFormatedNumber("###,###,###,###,###.00",new BigDecimal(dSumTotalReng.doubleValue()))%></td>                
          </tr>   
      <% }
            //se coloca el total por columna
          if(consulta.size()>0)
          {
            registro = (java.util.Map)consulta.get(1);      
      %>
          <tr style="font-family: Arial;	font-size: 10px;color: #000000;">
            <td align="left" width="350" >Total:</td>
            <td align="right" width="157" ><%=DecimalFormatUtils.getFormatedNumber("###,###,###,###,###.00",new BigDecimal(dSumTotalCol1.doubleValue()))%></td>                
            <td align="right" width="102" ><%=DecimalFormatUtils.getFormatedNumber("###,###,###,###,###.00",new BigDecimal(dSumTotalCol2.doubleValue()))%></td>                
            <td align="right" width="188" ><%=DecimalFormatUtils.getFormatedNumber("###,###,###,###,###.00",new BigDecimal(dSumTotalCol3.doubleValue()))%></td>                
            <td align="right" width="156" ><%=DecimalFormatUtils.getFormatedNumber("###,###,###,###,###.00",new BigDecimal(dSumTotalCol4.doubleValue()))%></td>                
            <td align="right" width="112" ><%=DecimalFormatUtils.getFormatedNumber("###,###,###,###,###.00",new BigDecimal(dSumTotalCol5.doubleValue()))%></td>                
          </tr>         
      <%}%>
    </table>

</body>
</html>