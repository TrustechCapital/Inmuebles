<!--
/*
  @Autor:Inscitech
  @Creado: Mayo 2019
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
    BigDecimal numfideico = new BigDecimal(0);

    //int numfideico=0;
    String tipo="";
    String fechaconst="";
    String fiduciario="";
    String fideicomitente="";
    String fideicomisario_pl=""; 
    String fideicomisario_sl=""; 
    String fideicomisarios=""; 
    int contador=0;
    
    ArrayList<String> nomcol= new ArrayList<String>();
    ArrayList<String> nomcolF= new ArrayList<String>();
        //Anadir encabezados de columnas
    ArrayList<String> valcol= new ArrayList<String>();
    ArrayList<String> valcolF= new ArrayList<String>();

//se valida si hay informacion en la tabla
    if(consulta.size()>0)
    {
        registro = (java.util.Map)consulta.get(0);
    }
%>

<html>
    <head>
        <title>FORMATO CHEQUE CAJA</title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    </head>
    <body <%=request.getParameter("bImprimir")!=null && request.getParameter("bImprimir").trim().equals("1") && balance.hasData()==true ?"onLoad=\"window.print();window.close();\"":" "%>  oncontextmenu="return false" onkeydown="return false"   onmousemove ="return false" onselectstart ="return false" onclick="return false">    
    
        <table border='0' bordercolor='#000000' bgcolor='#FFFFFF'>        
            <tr>
                <td rowspan="5"   align="center"><img src="<%=request.getContextPath()%>/imagenes/logo_bn.jpg"  height="40"></td>
                <td width="30%"   align="center">&nbsp;</td>
                <td colspan="5" align="CENTER"  style="font-family: Arial; font-size: 16px;color: #000000;font-weight: bold;">FORMATO CHEQUE CAJA</td>
            </tr>
        </table>	
        
        <table width="960"  border="0" align="left">
              <tr ><td colspan="10" align='left'  style="font-family: Arial; font-size: 14px;color: #000000;font-weight: bold;">&nbsp;</td></tr>
              <tr>
                    <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;"><label for="ex"><input type="checkbox" id="ex" /> <span style="vertical-align: middle;">Expedici&oacute;n</span></label></td>
                  <td align="left" width="207" style="font-family: Arial; font-size: 12px;"><label for="bl"><input type="checkbox" id="bl" /> <span style="vertical-align: middle;">Bloqueo</span></label></td>
                  <td align="left" width="454" style="font-family: Arial; font-size: 12px;"><label for="cn"><input type="checkbox" id="cn" /> <span style="vertical-align: middle;">Cancelaci&oacute;n</span></label></td>
                <td width="95"><p>&nbsp;</p></td>
              </tr>
              <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;">Fecha:</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">&nbsp;<input type="text" id="fecha" /></td>
                
              </tr>
              <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;">Importe:</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">$<input type="text" id="fecha" /></td>
                
              </tr>
              <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;">Numero de Cuenta de Cargo:</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">&nbsp;<input type="text" id="fecha" /></td>
              </tr>
              <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;">Nombre del Titular:</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">&nbsp;<input type="text" id="fecha" /></td>
              </tr>
              <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;">Nombre del Beneficiario:</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">&nbsp;<input type="text" id="fecha" /></td>
              </tr>
            <tr ><td width="95"><p>&nbsp;</p></td></tr >
              <tr ><td colspan="10" align='left'  style="font-family: Arial; font-size: 14px;color: #000000;font-weight: bold;">&nbsp;</td></tr>
              <tr>
                    <td width="95"><p>&nbsp;</p></td>
                    <td width="190">Tipo de Persona:</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;"><label for="ex"><input type="checkbox" id="ex" /> <span style="vertical-align: middle;">F&iacute;sica</span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="bl"><input type="checkbox" id="bl" /> <span style="vertical-align: middle;">Moral</span></label></td>
              </tr>
              <tr ><td width="95"><p>&nbsp;</p></td></tr >
              <tr>
                    <td width="95"><p>&nbsp;</p></td>
                    <td width="190">Nacionalidad:</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;"><label for="ex"><input type="checkbox" id="ex" /> <span style="vertical-align: middle;">Nacional</span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="bl"><input type="checkbox" id="bl" /> <span style="vertical-align: middle;">Extranjero</span></label></td>
              </tr>
              <tr ><td width="95"><p>&nbsp;</p></td></tr >
              <tr>
                    <td width="95"><p>&nbsp;</p></td>
                    <td width="190">Causa que origina el Bloqueo y/o Cancelaci&oacute;n:</td>
              </tr>
              <tr>
                    <td width="95"><p>&nbsp;</p></td>
                  <td align="left" colspan="3" width="100" style="font-family: Arial; font-size: 12px;"><label for="ex"><span style="vertical-align: middle;">Extravio</span><input type="checkbox" id="ex" /> </label></td>
              </tr>
              <tr>
                    <td width="95"><p>&nbsp;</p></td>
                  <td align="left" colspan="3" width="100" style="font-family: Arial; font-size: 12px;"><label for="ex"><span style="vertical-align: middle;">Robo &nbsp;&nbsp;</span><input type="checkbox" id="ex" /> </label></td>
              </tr>
              <tr>
                    <td width="95"><p>&nbsp;</p></td>
                  <td align="left" colspan="3" width="100" style="font-family: Arial; font-size: 12px;"><label for="ex"><span style="vertical-align: middle;">Otros &nbsp;&nbsp;</span><input type="checkbox" id="ex" /> </label></td>
              </tr>
               <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;">Especificar</td>
                  <td align="left" colspan="2" rowspan="2" style="font-family: Arial; font-size: 12px;">&nbsp;<textarea width="200" id="fecha"></textarea></td>
                
              </tr>
              <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;">N&uacute;mero de Cheque:</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">&nbsp;<input type="text" id="fecha" /></td>
              </tr>
              <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" colspan="3" style="font-family: Arial; font-size: 12px;"><p>Libero de toda responsabilidad civil, mercantil, administrativa y penal a Banco Actinver S.A.
Institución de Banca Múltiple, Grupo Financiero Actinver, por los actos que realice en cumplimiento de
la presente solicitud.</p></td>
              </tr>
               <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">&nbsp;<input type="text" id="fecha" /></td>
                    <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">&nbsp;<input type="text" id="fecha" /></td>
              </tr>
               <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" colspan="2" style="font-family: Arial; font-size: 12px;">Nombre y Firma Cliente</td>
                    <td align="left" width="190" style="font-family: Arial; font-size: 12px;">Nombre y Firma de Gerente/<br/>Subgerente Administrativo</td>
              </tr>
              <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;">Centro Financiero o Area Solicitante</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">&nbsp;<input type="text" id="fecha" /></td>
              </tr>
              
              <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;">Recibe CAT/Operaciones Pasiva:</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">&nbsp;<input type="text" id="fecha" /></td>
              </tr>
              <tr>
                  <td width="95"><p>&nbsp;</p></td>
                  <td align="left" width="190" style="font-family: Arial; font-size: 12px;">Cargo o Puesto</td>
                  <td align="left" colspan="2" width="100" style="font-family: Arial; font-size: 12px;">&nbsp;<input type="text" id="fecha" /></td>
              </tr>
        </table>
    </body>
</html>