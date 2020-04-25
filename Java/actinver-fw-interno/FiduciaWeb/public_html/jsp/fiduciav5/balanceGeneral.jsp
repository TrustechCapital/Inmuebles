<%@ page import="java.text.*,java.util.*,java.lang.*"%>

<jsp:useBean id="balance" class="com.nafin.negocio.nReporte"/>
<jsp:useBean id="valida" class="com.nafin.negocio.nReporte"/>
<jsp:useBean id="cuentas" class="com.nafin.negocio.BalanceFormulas"/>
<jsp:useBean id="mescerrado" class="com.nafin.negocio.nReporte"/>
<jsp:useBean id="BD"  class="com.nafin.negocio.FiduciaBD"/>

<%

DecimalFormat decFormat = new DecimalFormat("###,###,###,###,###,###,###,##0.00");
String[] bitacora = new String[5];
String fechaCont=BD.getFecha();
String folioBit="";
int regBitacora=0;
//response.setContentType("application/vnd.ms-excel");
%>
<%
try
	{
String fideicomiso="";
String periodo="";					
double sumPasivo=0;
double sumEtiPatri=0;
double sumSubTotal1=0;
double sumSubTotal2=0;
double sumFCajayBco=0; //CAJA Y BANCOS(@FCAJAYBCO) tabla:saldosmsa
double sumValoresPorRecibir=0;//VALORES POR RECIBIR EN OPERACIONES DE PR�STAMO DENTRO DEL ACTIVO Y DE PASO	  
double sumOtrasDispon=0;//OTRAS DISPONIB(@OTRAS DISPON)
double sumTitulos=0; //TITULOS PARA NEGOCIAR(@TITULOS)
double sumFAccion=0;//ACCION(@FACCION)
double sumValoresNoCotizados=0;//VALORES NO COTIZADOS(@VALORES NO COTIZADOS)
double sumValGub=0;//VALORES GUBER(@VAL_GUB)
double sumDescuentos=0;//DESCUENTOS(@DESCUENTOS)
double sumPrestaquiro=0;//PRESTAMOS QUIROGRAFARIOS(@PRESTAQUIRO)
double sumPrestgara=0;//PRESTAMOS CON GARANTIA(@PRESTGARA)
double sumCartera=0;//CARTERA DE CREDTIDOS(@CARTERA)
double sumPresHabi=0;//PRESTAMOS DE HABILITACION(@PRESHABI)
double sumGarantiPag=0;//GARANTIAS PAGADAS POR RECUPERARSE(@GARANTIPAG)				
double sumPrestRef=0;//PRESTAMOS REFACCIONARIOS(@PREST_REF)
double sumCreditosAfec=0;//CREDITOS AFECTOS EN GARANTIA(@CREDITOS_AFEC)
double sumPresCongaran=0;//PRESTAMOS CON GARANTIA INMOBILIARIA(@PRES_CONGARAN)
double sumCarteraVencida=0;//CARTERA VENCIDA(@CARTERA VENCIDA)
double sumEstimacion=0;//ESTIMACION PREVENTIVA(@ESTIMACION)
double sumClientesYDoc=0;//CLIENTES Y DOCUMENTOS POR COBRAR(@CLIENTES Y DOC)		
double sumDeudoresDiversos=0;//DEUDORES DIVERSOS(@DEUDORES DIVERSOS)
double sumInvenInmovil=0;//INVENTARIOS INMOBILIARIOS(@INVEN_INMOVIL)
double sumOtrasInversiones=0;//OTRAS INVERSIONES(@OTRAS INVERISONES)
double sumDerechos=0;//@DERECHOS
double sumInmuebles=0;//INMUEBLES, MOVILIARIO Y EQUIPO(@INMUEBLES)
double sumMaquinaria=0;//MAQUINARIA E IMPLEMENTOS AGRICOLAS(@MAQUINARIA)
double sumInventDistri=0;//INVENTARISO PARA DISTRIBUCION(@INVENT_DISTRI)
double sumInventIndust=0;//INVENTARIOS INDUSTRIALES(@INVENT_INDUST)
double sumInventDeLaIndus=0;//INVENTARIOS DE LA INDUSTRIA DE LA CONSTRUCCION(@INVENT_DE LA INDUS)
double sumInversionesParaLaConstrucc=0;//INVERSIONES PARA LA CONSTRUCCION(@INVERSIONES PARA LA CONSTRUC)
double sumBienesAdjudicatos=0;//BIENES ADJUDICADOS(@BIENES ADJUDICADOS)
double sumCargosDiferidos=0;//CARGOS DIFERIODS E INTANGIBLES(@CARGOS DIFERIDOS)
double sumDocumentosyCuentas=0;//DOCUMENTOS Y CUENTAS POR PAGAR(@DOCUMENTOS Y CUENTAS)
double sumAcreedPorCertif=0;//ACREEDORES POR CERTIFICADOS(@ACREED_POR CERTIF)
double sumAcreedDiversos=0;//ACREEDORES DIVERSOS(@ACREED_DIVERSOS)
double sumAcreePorIntereses=0;//ACREEDORES POR INTERESES UDIS(@ACREE_POR INTERESES)
double sumFinanBan=0;//FINANCIAMIENTOS BANCARIOS(@FINAN_BAN)
double sumPrestamosDeGobierno=0;//PRESTAMOS DE GOBIERNO FEDERAL (@PRESTAMOS DE GOBIERNO)
double sumOtrasObliga=0;//OTRAS OBLIGACIONES(@OTRAS OBLIGA)
double sumOtrosFinan=0;//OTROS FINANCIAMIENTOS(@OTROS FINAN)
double sumCertfDeParti=0;//CERTIFICADOS POR PARTICIPACION (@CERTIF_DE PARTI)
double sumFinanciBancarios=0;//FINANCIAMIENTOS BANCARIOS LARGO(@FINANCI_BANCARIOS)
double sumReservasyProvisiones=0;//RESERVAS Y PROVISIONES PARA  OBLIG.(@RESERVAS Y PROVISIONES)
double sumProvisionParaCobertura=0;//PROVISION PARA COBERTURA DE RIESGOS(@PROVISON PARA COBERTURA)
double sumProvisionDiferencial=0;//PROVISION PARA COBERTURA DEL DIFERENCIAL(@PROVISION DIFERENCIAL)
double sumCreditosDiferidos=0;//CREDITOS DEFERIDOS (@CREDITOS DIFERIDOS)
double sumPatrimonio=0;//PATRIMONIOS(@PATRIMONIO)
double sumPatrimEtiqueta=0;//@PATRIM_ETIQUETA	
double sumPatrimonioNoAportado=0;//PATRIMONIO NO APORTADO(@PATRIMONIO NO APORTADO)
double sumPatNoAporEtiqu=0;//@PATNOAPOR_ETIQU
double sumEntregasPatrimoniales=0;//ENTREGAS PATRIMONIALES(@ENTREGAS PATRIMONIALES)
double sumEntregasEtiq=0;//@ENTREGAS_ETIQ
double sumRemanenteLiquido=0;//REMANENTE LIQUIDO DE EJERCIOS ANERIORES(@REMANENTE LIQUIDO)
double sumRemanEtiqu=0;//@REMAN_ETIQU
double sumDeficienteLiquido=0;//DEFICIENTE LIQUIDO DE EJERCICIOS ANTERIORES(@DEFICIENTE LIQUIDO)
double sumDefEtiq=0;//@DEF_ETIQ
double sumRevaluacionDeActivos=0;//REVALUACION DE ACTIVOS(@REVALUACION DE ACTIVOS)
double sumResultadosDelEjercicio=0;//RESULTADOS DEL EJERCICIO EN CURSO(@RESULTADOS DEL EJERCICIO)
double sumResultadosDelEjerciciosAnteriores=0;//RESULTADOS DEL EJERCICIO EN CURSO(@RESULTADOS DE EJERCICIOS ANTERIORES)
double sumCreditosYDocumentos=0;//CREDITOS Y DOCUEMNTOS DESCONTADOS(@CREDITOS Y DOCUMENTOS)
double sumDeudoresPorAval=0;//DEUDORES POR AVAL(@DEUDORES POR AVAL)
double sumOtrasObligacionesCont=0;//OTRAS OBLIGACIONES CONTINGENTES(@OTRAS OBLIGACINES CONT)
double sumValoresYBienes=0;//VALORES Y BIENES EN DEPOSITO(@VALORES Y BIENES)
double sumCuentasDeudoras=0;//CUENTAS DEUDORAS DE REGISTRO(@CUENTAS DEUDORAS)
double sumDividendosPag=0;//@DividendosPag
double sumIntegracionDeCartera=0;//@INTEGRACION DE CARTERA


double sumCertificadosETF=0;//CUENTAS CERTIFICADOS ETF'S(@ 6312)
double sumCertificadosCirculacionETF=0;//CUENTAS CERTIFICADOS ETF'S(@ 6312)
double sumCertificadosAutorizadosETF=0;//CUENTAS CERTIFICADOS ETF'S(@ 6312)
double sumCertificadosTesoreriaETF=0;//CUENTAS CERTIFICADOS ETF'S(@ 6312)

boolean bCertificadosTesoreriaETF = false;

String strMensajeMesCerrado="";
String mensaje="";	
String[] meses={" ","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"};
int numFid=Integer.valueOf(request.getParameter("Fiso")).intValue();
int mes=Integer.valueOf(request.getParameter("Mes")).intValue();
int anio=Integer.valueOf(request.getParameter("Ano")).intValue();
String tabla = "saldos"+(request.getParameter("tipoReporte") == null ? "" : request.getParameter("tipoReporte"));

//incorporacion de la bitacora
 folioBit=BD.getFolio(2);
 System.out.println("Folio"+folioBit);
 bitacora[0]=fechaCont;
 bitacora[1]= folioBit;
 bitacora[2]="300";//(String)session.getValue("userid");
 bitacora[3]="Consulta del Balance General para el Fideicomiso "+numFid
 +" del Mes "+meses[mes].toUpperCase()+" del Anio "+anio;
 bitacora[4]="120.0.0.1";

 //regBitacora=BD.insertaBitacora(bitacora);	

//Valida si el fideicomiso tiene administracion propia o no

valida.setVtrIntDato1(numFid);//numero de contrato
valida.querySelect(10, tabla);

mescerrado.querySelect(12, tabla);//valida mes cerrado
if(mescerrado.hasData()){
    if(mescerrado.getVtrIntDato1()==0)
        strMensajeMesCerrado="Estado Financiero Provisional";
}
else
    strMensajeMesCerrado="Estado Financiero Provisional";
        
int j=0;
String tipoAdmin="";
if(valida.hasData())
	tipoAdmin=valida.getVtrStrDato1().trim();
		
if(tipoAdmin.equals("NO"))
		{
balance.setVtrIntDato1(numFid);//numero de contrato
balance.setVtrIntDato2(mes);//mes del Reporte
balance.setVtrIntDato3(anio);//a�o del Reportes
balance.querySelect(1, tabla);
		}
else
		{
		mensaje="El Reporte de Balance General<BR>No esta disponible<BR><BR>Para Fideicomisos con administraci�n propia";
		}
if(tipoAdmin.equals("NO") && !balance.hasData())
		{
	
		mensaje="No esta disponible<BR>El Reporte de Balance General<BR>De "+meses[mes]+" del "+anio;
		}
%>

<html>
<head>
<title>&nbsp;</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body <%=request.getParameter("bImprimir")!=null && request.getParameter("bImprimir").trim().equals("1") && balance.hasData()==true ?"onLoad=\"window.print();window.close();\"":" "%>  oncontextmenu="return false" onkeydown="return false"   onmousemove ="return false" onselectstart ="return false" onclick="return false">
<%
boolean encabezado=false;
if(balance.hasData()==true)
	{
	
	fideicomiso=balance.getVtrStrDato2().toUpperCase();
	periodo=balance.getVtrStrDato3();
	%>
  <%do
	{
    balance.setIndex(j);
	
	//Datos de saldosH
	int sal_num_ctam = balance.getVtrIntDato4();// ctam
	int sal_num_scta =balance.getVtrIntDato5(); //scta
  int sal_num_sscta =balance.getVtrIntDato6(); //sscta 
	int sal_num_ssscta =balance.getVtrIntDato7(); //ssscta
	int sal_num_sssscta =balance.getVtrIntDato8(); //sssscta
	int sal_num_ssssscta =balance.getVtrIntDato9(); //ssssscta
	int sal_num_aux1 =balance.getVtrIntDato10(); //aux1 
	double sal_num_aux2 =balance.getVtrDoubleDato11(); //aux2 
	double sal_num_aux3 =balance.getVtrDoubleDato12(); //aux3 
	double sal_imp_saldo_act =balance.getVtrDoubleDato13(); //saldoAct
	
	// Cuentas y saldos
	cuentas.setValores( sal_num_ctam,  sal_num_scta,  sal_num_sscta,sal_num_ssscta,sal_num_sssscta,sal_num_ssssscta,sal_num_aux1, sal_num_aux2,  sal_num_aux3,  sal_imp_saldo_act  );					
	

	//CAJA Y BANCOS(@FCAJAYBCO) tabla:saldosmsa
	sumFCajayBco = sumFCajayBco + cuentas.fCajayBco(); 

    // valoresPorRecibir
	sumValoresPorRecibir=sumValoresPorRecibir+ cuentas.valoresPorRecibir(); 
	//OTRAS DISPONIB(@OTRAS DISPON)
	sumOtrasDispon = sumOtrasDispon + cuentas.otrasDispon();
	
	//TITULOS PARA NEGOCIAR(@TITULOS)
	sumTitulos  =sumTitulos + cuentas.titulos(); 

	//ACCION(@FACCION)
	sumFAccion = sumFAccion + cuentas.fAccion();

	//VALORES NO COTIZADOS(@VALORES NO COTIZADOS)
	sumValoresNoCotizados = sumValoresNoCotizados + cuentas.valoresNoCotizados();

	//VALORES GUBER(@VAL_GUB)
	sumValGub = sumValGub + cuentas.valGub();

	//DESCUENTOS(@DESCUENTOS)
	sumDescuentos = sumDescuentos + cuentas.descuentos();

	//PRESTAMOS QUIROGRAFARIOS(@PRESTAQUIRO)
	sumPrestaquiro = sumPrestaquiro + cuentas.prestaquiro();

	//PRESTAMOS CON GARANTIA(@PRESTGARA)
	sumPrestgara = sumPrestgara + cuentas.prestgara();

	//CARTERA DE CREDTIDOS(@CARTERA)
	sumCartera = sumCartera + cuentas.cartera();
	
	//PRESTAMOS DE HABILITACION(@PRESHABI)
	sumPresHabi = sumPresHabi + cuentas.presHabi();

	//GARANTIAS PAGADAS POR RECUPERARSE(@GARANTIPAG)				
	sumGarantiPag = sumGarantiPag + cuentas.garantiPag();

	//PRESTAMOS REFACCIONARIOS(@PREST_REF)
	sumPrestRef = sumPrestRef + cuentas.prestRef();
	
	//CREDITOS AFECTOS EN GARANTIA(@CREDITOS_AFEC)
	sumCreditosAfec = sumCreditosAfec + cuentas.creditosAfec();

	//PRESTAMOS CON GARANTIA INMOBILIARIA(@PRES_CONGARAN)
	sumPresCongaran = sumPresCongaran + cuentas.presCongaran();

	//CARTERA VENCIDA(@CARTERA VENCIDA)
	sumCarteraVencida = sumCarteraVencida + cuentas.carteraVencida();

	//ESTIMACION PREVENTIVA(@ESTIMACION)
	sumEstimacion = sumEstimacion + cuentas.estimacion();

	//CLIENTES Y DOCUMENTOS POR COBRAR(@CLIENTES Y DOC)		
	sumClientesYDoc = sumClientesYDoc + cuentas.clientesYDoc();

	//DEUDORES DIVERSOS(@DEUDORES DIVERSOS)
	sumDeudoresDiversos = sumDeudoresDiversos + cuentas.deudoresDiversos();

	//INVENTARIOS INMOBILIARIOS(@INVEN_INMOVIL)
	sumInvenInmovil = sumInvenInmovil + cuentas.invenInmovil();

	//OTRAS INVERSIONES(@OTRAS INVERISONES)
	sumOtrasInversiones = sumOtrasInversiones + cuentas.otrasInversiones();

	//@DERECHOS
	sumDerechos = sumDerechos + cuentas.derechos();

	//INMUEBLES, MOVILIARIO Y EQUIPO(@INMUEBLES)
	sumInmuebles = sumInmuebles + cuentas.inmuebles();

	//MAQUINARIA E IMPLEMENTOS AGRICOLAS(@MAQUINARIA)
	sumMaquinaria = sumMaquinaria + cuentas.maquinaria();

	//INVENTARISO PARA DISTRIBUCION(@INVENT_DISTRI)
	sumInventDistri = sumInventDistri + cuentas.inventDistri();
	
	//INVENTARIOS INDUSTRIALES(@INVENT_INDUST)
	sumInventIndust = sumInventIndust + cuentas.inventIndust();

	//INVENTARIOS DE LA INDUSTRIA DE LA CONSTRUCCION(@INVENT_DE LA INDUS)
	sumInventDeLaIndus = sumInventDeLaIndus +  cuentas.inventDeLaIndus();

	//INVERSIONES PARA LA CONSTRUCCION(@INVERSIONES PARA LA CONSTRUC)
	sumInversionesParaLaConstrucc = sumInversionesParaLaConstrucc + cuentas.inversionesParaLaConstrucc();

	//BIENES ADJUDICADOS(@BIENES ADJUDICADOS)
	sumBienesAdjudicatos = sumBienesAdjudicatos + cuentas.bienesAdjudicatos();

	//CARGOS DIFERIODS E INTANGIBLES(@CARGOS DIFERIDOS)
	sumCargosDiferidos = sumCargosDiferidos + cuentas.cargosDiferidos();

	//DOCUMENTOS Y CUENTAS POR PAGAR(@DOCUMENTOS Y CUENTAS)
	sumDocumentosyCuentas = sumDocumentosyCuentas + cuentas.documentosyCuentas();

	//ACREEDORES POR CERTIFICADOS(@ACREED_POR CERTIF)
	sumAcreedPorCertif = sumAcreedPorCertif + cuentas.acreedPorCertif();

	//ACREEDORES DIVERSOS(@ACREED_DIVERSOS)
	sumAcreedDiversos = sumAcreedDiversos + cuentas.acreedDiversos();

	//ACREEDORES POR INTERESES UDIS(@ACREE_POR INTERESES)
	sumAcreePorIntereses = sumAcreePorIntereses + cuentas.acreePorIntereses();

	//FINANCIAMIENTOS BANCARIOS(@FINAN_BAN)
	sumFinanBan = sumFinanBan + cuentas.finanBan();

	//PRESTAMOS DE GOBIERNO FEDERAL (@PRESTAMOS DE GOBIERNO)
	sumPrestamosDeGobierno = sumPrestamosDeGobierno + cuentas.prestamosDeGobierno();

	//OTRAS OBLIGACIONES(@OTRAS OBLIGA)
	sumOtrasObliga = sumOtrasObliga + cuentas.otrasObliga();

	//OTROS FINANCIAMIENTOS(@OTROS FINAN)
	sumOtrosFinan = sumOtrosFinan + cuentas.otrosFinan();

	//CERTIFICADOS POR PARTICIPACION (@CERTIF_DE PARTI)
	sumCertfDeParti = sumCertfDeParti + cuentas.certfDeParti();

	//FINANCIAMIENTOS BANCARIOS LARGO(@FINANCI_BANCARIOS)
	sumFinanciBancarios = sumFinanciBancarios + cuentas.financiBancarios();

	//RESERVAS Y PROVISIONES PARA  OBLIG.(@RESERVAS Y PROVISIONES)
	sumReservasyProvisiones = sumReservasyProvisiones + cuentas.reservasyProvisiones();

	//PROVISION PARA COBERTURA DE RIESGOS(@PROVISON PARA COBERTURA)
	sumProvisionParaCobertura = sumProvisionParaCobertura + cuentas.provisionParaCobertura();

	//PROVISION PARA COBERTURA DEL DIFERENCIAL(@PROVISION DIFERENCIAL)
	sumProvisionDiferencial = sumProvisionDiferencial + cuentas.provisionDiferencial();
	
	//CREDITOS DEFERIDOS (@CREDITOS DIFERIDOS)
	sumCreditosDiferidos = sumCreditosDiferidos + cuentas.creditosDiferidos();

	//PATRIMONIOS(@PATRIMONIO)
	sumPatrimonio = sumPatrimonio + cuentas.patrimonio();

	//@PATRIM_ETIQUETA	
	sumPatrimEtiqueta = sumPatrimEtiqueta + cuentas.patrimEtiqueta();

	//PATRIMONIO NO APORTADO(@PATRIMONIO NO APORTADO)
	sumPatrimonioNoAportado = sumPatrimonioNoAportado + cuentas.patrimonioNoAportado();

	//@PATNOAPOR_ETIQU
	sumPatNoAporEtiqu = sumPatNoAporEtiqu + cuentas.patNoAporEtiqu();

	//ENTREGAS PATRIMONIALES(@ENTREGAS PATRIMONIALES)
	sumEntregasPatrimoniales = sumEntregasPatrimoniales + cuentas.entregasPatrimoniales();

	//@ENTREGAS_ETIQ
	sumEntregasEtiq = sumEntregasEtiq + cuentas.entregasEtiq();

	//REMANENTE LIQUIDO DE EJERCIOS ANERIORES(@REMANENTE LIQUIDO)
	sumRemanenteLiquido = sumRemanenteLiquido + cuentas.remanenteLiquido();

	//@REMAN_ETIQU
	sumRemanEtiqu = sumRemanEtiqu + cuentas.remanEtiqu();

	//DEFICIENTE LIQUIDO DE EJERCICIOS ANTERIORES(@DEFICIENTE LIQUIDO)
	sumDeficienteLiquido = sumDeficienteLiquido + cuentas.deficienteLiquido();

	//@DEF_ETIQ
	sumDefEtiq = sumDefEtiq + cuentas.defEtiq();

	//REVALUACION DE ACTIVOS(@REVALUACION DE ACTIVOS)
	sumRevaluacionDeActivos = sumRevaluacionDeActivos + cuentas.revaluacionDeActivos();

	//RESULTADOS DEL EJERCICIO EN CURSO(@RESULTADOS DEL EJERCICIO)
	sumResultadosDelEjercicio = sumResultadosDelEjercicio + cuentas.resultadosDelEjercicio();

	//CREDITOS Y DOCUEMNTOS DESCONTADOS(@CREDITOS Y DOCUMENTOS)
	sumCreditosYDocumentos = sumCreditosYDocumentos + cuentas.creditosYDocumentos();

	//DEUDORES POR AVAL(@DEUDORES POR AVAL)
	sumDeudoresPorAval = sumDeudoresPorAval + cuentas.deudoresPorAval();

	//OTRAS OBLIGACIONES CONTINGENTES(@OTRAS OBLIGACINES CONT)
	sumOtrasObligacionesCont = sumOtrasObligacionesCont + cuentas.otrasObligacionesCont();

	//VALORES Y BIENES EN DEPOSITO(@VALORES Y BIENES)
	sumValoresYBienes = sumValoresYBienes + cuentas.valoresYBienes();

	//CUENTAS DEUDORAS DE REGISTRO(@CUENTAS DEUDORAS)
	sumCuentasDeudoras = sumCuentasDeudoras + cuentas.cuentasDeudoras();

	//@DividendosPag
	sumDividendosPag = sumDividendosPag + cuentas.dividendosPag();

	//@INTEGRACION DE CARTERA  
	sumIntegracionDeCartera = sumIntegracionDeCartera + cuentas.integracionDeCartera();
  
  
	//CUENTAS CERTIFICADOS ETF'S(@ 6312)-------
	sumCertificadosETF = cuentas.certificadosETF();
  
  if(cuentas.bCertificadosETF)
  {
    bCertificadosTesoreriaETF = true;
    if(cuentas.bCertificadosAutorizadosETF)
      sumCertificadosAutorizadosETF = sumCertificadosETF;
    else if(cuentas.bCertificadosCirculacionETF)
      sumCertificadosCirculacionETF = sumCertificadosETF;
    else if(cuentas.bCertificadosTesoreriaETF)
      sumCertificadosTesoreriaETF = sumCertificadosETF;
  }
  
     
	j++;
	}
	while(j<balance.getSize());%>
	
<table width="960" border="0" align="center">
<tr><td><table width="680">
  <tr>
    
    <td colspan="7"  align="center"  style="font-family: Arial;	font-size: 16px;color: #000000;font-weight: bold;"><%=session.getAttribute("empresa_1")%></td>
    
  </tr>
  <tr> 
    <td  align="center" colspan="7" style="font-family: Verdana, Arial, Helvetica;	font-size: 12px;color: #000000;font-weight: bold;"><%=session.getAttribute("empresa_2")%></td>
    
  </tr>
  <tr> 
    <td align="center" style="font-family: Arial;	font-size: 12px;color: #000000;font-weight: bold;" colspan="7">BALANCE 
      GENERAL AL <%=periodo%>&nbsp;
      <%=strMensajeMesCerrado%></td>
  </tr>
  <tr>
    <td>
      &nbsp;
    </td>
  </tr>
  <tr> 
    <td align="center" style="font-family: Arial;	font-size: 12px;color: #000000;font-weight: bold;" colspan="7"> 
      <%=fideicomiso%> </td>
      
   
  </tr>
  </table>
  </td>
  <td width='151' height='91' rowspan="4"><img src="<%=request.getContextPath()%>/imagenes/logo_bn.jpg" ></td>  
  </tr>
</table>

    
<table width="960" border="0" align="center">
  <tr style="font-family: Arial;	font-size: 12px;color: #000000;" >
    <td align="center" colspan="8">&nbsp;</td>
  </tr>
  <tr style="font-family: Arial;	font-size: 12px;color: #000000;" > 
    <td align="center" colspan="8">(Importe en Pesos)</td>
  </tr>
  <tr style="font-family: Arial;	font-size: 12px;color: #000000;font-weight: bold;" > 
    <td align="center" width="50%" colspan="4">ACTIVO</td>
    <td align="center" width="50%" colspan="4">PASIVO</td>
  </tr>
</table>
<table width="960" border="0" align="center">
  <%if (cuentas.bFCajayBco || cuentas.bDocumentosyCuentas || (cuentas.bFCajayBco && cuentas.bDocumentosyCuentas))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td width="30%"><%=cuentas.bFCajayBco?"CAJA Y BANCOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bFCajayBco && !cuentas.bOtrasDispon?" "+decFormat.format(sumFCajayBco):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bDocumentosyCuentas?"DOCUMENTOS Y CUENTAS POR PAGAR":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=(cuentas.bDocumentosyCuentas && !cuentas.bAcreedPorCertif && !cuentas.bAcreedDiversos   && !cuentas.bAcreePorIntereses)?" "+decFormat.format((-1)*(sumDocumentosyCuentas+sumAcreedPorCertif+sumAcreedDiversos+ sumAcreePorIntereses)):"&nbsp;"%></td>
  </tr>
  <%     }%>
  <%if (cuentas.bOtrasDispon || cuentas.bAcreedPorCertif || (cuentas.bOtrasDispon && cuentas.bAcreedPorCertif ) )
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bOtrasDispon?"OTRAS DISPONIBILIDADES":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bOtrasDispon?" "+decFormat.format(sumFCajayBco+sumOtrasDispon):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bAcreedPorCertif?"ACREEDORES POR CERTIFICADOS, OTROS TITULOS Y CUPONES DE INTERESES":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=(cuentas.bAcreedPorCertif && !cuentas.bAcreedDiversos   && !cuentas.bAcreePorIntereses)?" "+decFormat.format((-1)*(sumDocumentosyCuentas+sumAcreedPorCertif+sumAcreedDiversos+ sumAcreePorIntereses)):"&nbsp;"%></td>
  </tr>
  <%    }%>
  
    
  
  <%if (cuentas.bTitulos || cuentas.bAcreedDiversos || (cuentas.bTitulos && cuentas.bAcreedDiversos) )
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td width="30%"><%=cuentas.bTitulos?"INVERSIONES EN VALORES":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bTitulos?" "+decFormat.format(sumTitulos):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bAcreedDiversos?"ACREEDORES DIVERSOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=( cuentas.bAcreedDiversos && !cuentas.bAcreePorIntereses)?" "+decFormat.format((-1)*(sumDocumentosyCuentas+sumAcreedPorCertif+sumAcreedDiversos+ sumAcreePorIntereses)):"&nbsp;"%></td>
  </tr>
  <%    }%>
  
  <%if (cuentas.bValoresPorRecibir)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td width="30%"><%=cuentas.bTitulos?"VALORES POR RECIBIR EN OPERACIONES DE PR�STAMO":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bValoresPorRecibir?" "+decFormat.format(sumValoresPorRecibir):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;</td>
  </tr>
  <%    }%>
  
  <%if (cuentas.bFAccion || cuentas.bAcreePorIntereses || (cuentas.bFAccion && cuentas.bAcreePorIntereses) )
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bFAccion?"ACCIONES":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bFAccion?" "+decFormat.format(sumFAccion):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bAcreePorIntereses?"ACREEDORES POR INTERESES UDI'S":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bAcreePorIntereses?" "+decFormat.format((-1)*(sumDocumentosyCuentas+sumAcreedPorCertif+sumAcreedDiversos+ sumAcreePorIntereses)):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bValoresNoCotizados || cuentas.bFinanBan  || (cuentas.bValoresNoCotizados && cuentas.bFinanBan) )
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td width="30%"><%=cuentas.bValoresNoCotizados?"VALORES NO COTIZADOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bValoresNoCotizados?" "+decFormat.format(sumValoresNoCotizados):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bFinanBan?"FINANCIAMIENTOS BANCARIOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bFinanBan && !cuentas.bFinanciBancarios && !cuentas.bOtrosFinan?" "+decFormat.format((-1)*(sumFinanciBancarios+sumFinanBan+sumOtrosFinan)):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bValGub || cuentas.bFinanciBancarios || (cuentas.bValGub && cuentas.bFinanciBancarios))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td width="30%"><%=cuentas.bValGub?"VALORES GUBERNAMENTALES EN GARANTIA":"&nbsp;"%></td> <!--LEYENDA ANTERIOR VALORES GUBERNAMENTALES UDI'S-->
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bValGub?" "+decFormat.format(sumValGub):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bFinanciBancarios?"FINANCIAMIENTOS BANCARIOS LARGO PLAZO":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bFinanciBancarios && !cuentas.bOtrosFinan?" "+decFormat.format((-1)*(sumFinanciBancarios+sumFinanBan+sumOtrosFinan)):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bDescuentos || cuentas.bOtrosFinan || (cuentas.bDescuentos && cuentas.bOtrosFinan))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td width="30%"><%=cuentas.bDescuentos?"DESCUENTOS (NETOS)":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bDescuentos && !cuentas.bPrestaquiro && !cuentas.bPrestgara && !cuentas.bPresHabi && !cuentas.bPrestRef && !cuentas.bPresCongaran?" "+decFormat.format(sumDescuentos+sumPrestaquiro+sumPrestgara+sumPresHabi+sumPrestRef+sumPresCongaran):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td  width="30%"><%=cuentas.bOtrosFinan?"OTROS FINANCIAMIENTOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bOtrosFinan?" "+decFormat.format((-1)*(sumFinanciBancarios+sumFinanBan+sumOtrosFinan)):"&nbsp;"%></td></td>
  </tr>
  <%    }%>
  <%if (cuentas.bPrestaquiro || cuentas.bOtrasObliga || (cuentas.bPrestaquiro && cuentas.bOtrasObliga))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td width="30%"><%=cuentas.bPrestaquiro?"PRESTAMOS QUIROGRAFARIOS Y PRENDARIOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bPrestaquiro && !cuentas.bPrestgara && !cuentas.bPresHabi && !cuentas.bPrestRef && !cuentas.bPresCongaran?" "+decFormat.format(sumDescuentos+sumPrestaquiro+sumPrestgara+sumPresHabi+sumPrestRef+sumPresCongaran):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bOtrasObliga?"OTRAS OBLIGACIONES":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bOtrasObliga?" "+decFormat.format((-1)*sumOtrasObliga):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bPrestgara || cuentas.bPrestamosDeGobierno || (cuentas.bPrestgara && cuentas.bPrestamosDeGobierno))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td width="30%"><%=cuentas.bPrestgara?"PRESTAMOS CON GARANTIA DE UNIDADES INDUSTRIALES":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bPrestgara && !cuentas.bPresHabi && !cuentas.bPrestRef && !cuentas.bPresCongaran?" "+decFormat.format(sumDescuentos+sumPrestaquiro+sumPrestgara+sumPresHabi+sumPrestRef+sumPresCongaran):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bPrestamosDeGobierno?"PRESTAMOS DE GOBIERNO FEDERAL PROGRAMA UDI'S":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bPrestamosDeGobierno?" "+decFormat.format((-1)*sumPrestamosDeGobierno):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bPresHabi || cuentas.bCertfDeParti || (cuentas.bPresHabi && cuentas.bCertfDeParti))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bPresHabi?"PRESTAMOS DE HABILITACION O AVIO (NETO)":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bPresHabi && !cuentas.bPrestRef && !cuentas.bPresCongaran?" "+decFormat.format(sumDescuentos+sumPrestaquiro+sumPrestgara+sumPresHabi+sumPrestRef+sumPresCongaran):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bCertfDeParti?"CERTIFICADOS DE PARTICIP., OTROS TIT. Y CUPONES DE INTS. LARGO PLAZO":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bCertfDeParti?" "+decFormat.format((-1)*sumCertfDeParti):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bPrestRef || cuentas.bReservasyProvisiones || (cuentas.bPrestRef && cuentas.bReservasyProvisiones))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bPrestRef?"PRESTAMOS REFACCIONARIOS (NETO)":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bPrestRef && !cuentas.bPresCongaran?" "+decFormat.format(sumDescuentos+sumPrestaquiro+sumPrestgara+sumPresHabi+sumPrestRef+sumPresCongaran):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bReservasyProvisiones?"RESERVAS Y PROVISIONES PARA OBLIGACIONES DIVERSAS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bReservasyProvisiones?" "+decFormat.format((-1)*sumReservasyProvisiones):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bPresCongaran)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%">PRESTAMOS CON GARANTIA INMOBILIARIA (NETO)</td>
    <td align="right" width="9%">&nbsp;<%=decFormat.format(sumPresCongaran)%></td>
    <td align="right" width="9%"><%=" "+decFormat.format(sumDescuentos+sumPrestaquiro+sumPrestgara+sumPresHabi+sumPrestRef+sumPresCongaran)%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;</td>
  </tr>
  <%    }%>
  <%if (cuentas.bGarantiPag || cuentas.bProvisionParaCobertura || (cuentas.bGarantiPag && cuentas.bProvisionParaCobertura))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bGarantiPag?"GARANTIAS PAGADAS POR RECUPERARSE":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bGarantiPag?" "+decFormat.format(sumGarantiPag):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bProvisionParaCobertura?"PROVISIONES PARA COBERTURA DE RIESGOS CREDITICIOS UDI'S":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bProvisionParaCobertura?" "+decFormat.format((-1)*sumProvisionParaCobertura):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bCartera || cuentas.bProvisionDiferencial || (cuentas.bCartera && cuentas.bProvisionDiferencial))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bCartera?"CARTERA DE CREDITOS PROGRAMA UDI'S":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bCartera?" "+decFormat.format(sumCartera):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bProvisionDiferencial?"PROVISION PARA COBERTURA DEL DIFERENCIAL DE LA TASA DEL 4%":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bProvisionDiferencial?" "+decFormat.format((-1)*sumProvisionDiferencial):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bCreditosAfec || cuentas.bCreditosDiferidos)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bCreditosAfec?"CREDITOS AFECTOS EN GARANTIA":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bCreditosAfec?" "+decFormat.format(sumCreditosAfec):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bCreditosDiferidos?"CREDITOS DIFERIDOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bCreditosDiferidos?" "+decFormat.format((-1)*sumCreditosDiferidos):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bCarteraVencida || cuentas.bPatrimonio || (cuentas.bCarteraVencida && cuentas.bPatrimonio))
			{%>
  <tr style="font-family: Arial;	font-size: 12px;color: #000000;font-weight: bold;" >
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">TOTAL PASIVO</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%" align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<%=decFormat.format(-1*cuentas.pasivo(sumDocumentosyCuentas, sumAcreedPorCertif, sumAcreedDiversos , sumAcreePorIntereses, sumFinanBan , sumPrestamosDeGobierno , sumOtrasObliga, sumOtrosFinan, sumCertfDeParti, sumFinanciBancarios, sumReservasyProvisiones, sumProvisionParaCobertura, sumProvisionDiferencial, sumCreditosDiferidos,0.00))%></td>
  </tr>
  <tr style="font-family: Arial;	font-size: 12px;color: #000000;font-weight: bold;" >
    <td align="center" width="100%" colspan="8">&nbsp;</td>
  </tr>
  <tr style="font-family: Arial;	font-size: 12px;color: #000000;font-weight: bold;" > 
   <td align="center" width="50%" colspan="4">&nbsp;</td>
    <td align="center" width="50%" colspan="4">PATRIMONIO</td>
  </tr>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bCarteraVencida?"CARTERA VENCIDA":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bCarteraVencida?" "+decFormat.format(sumCarteraVencida):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bPatrimonio?"PATRIMONIO":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bPatrimonio?" "+decFormat.format((-1)*sumPatrimonio):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bEstimacion || cuentas.bEntregasPatrimoniales|| (cuentas.bEstimacion && cuentas.bEntregasPatrimoniales))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bEstimacion?"ESTIMACION PREVENTIVA PAR RIESGOS CREDITICIOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bEstimacion?" "+decFormat.format(sumEstimacion):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bEntregasPatrimoniales?"ENTREGAS PATRIMONIALES":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bEntregasPatrimoniales && !cuentas.bPatrimonioNoAportado?" "+decFormat.format(sumEntregasPatrimoniales):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bClientesYDoc || cuentas.bPatrimonioNoAportado || (cuentas.bClientesYDoc && cuentas.bPatrimonioNoAportado))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bClientesYDoc?"CLIENTES Y DOCTOS. POR COBRAR (NETO)":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bClientesYDoc?" "+decFormat.format(sumClientesYDoc):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bPatrimonioNoAportado?"PATRIMONIO NO PORTADO":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bPatrimonioNoAportado?" "+decFormat.format((-1)*((sumPatrimonio+sumEntregasPatrimoniales)+sumPatrimonioNoAportado)):"&nbsp;"%></td>
  </tr>
  <%//@subtotal2
		sumSubTotal2=cuentas.subTotal2(sumEntregasPatrimoniales,sumPatrimonio);
		%>
  <%    }%>
  <%if (cuentas.bDeudoresDiversos|| cuentas.bRemanenteLiquido || (cuentas.bDeudoresDiversos && cuentas.bRemanenteLiquido))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bDeudoresDiversos?"DEUDORES DIVERSOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bDeudoresDiversos?" "+decFormat.format(sumDeudoresDiversos):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bRemanenteLiquido && !cuentas.bDeficienteLiquido?"RESULTADO DE EJERCICIOS ANTERIORES":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bRemanenteLiquido && !cuentas.bDeficienteLiquido ?" "+decFormat.format((-1)*sumRemanenteLiquido):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bDerechos|| cuentas.bDeficienteLiquido|| cuentas.bRemanenteLiquido || (cuentas.bDerechos && cuentas.bDeficienteLiquido))
			{
         sumResultadosDelEjerciciosAnteriores = sumRemanenteLiquido+sumDeficienteLiquido;
   %>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bDerechos?"DERECHOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bDerechos?" "+decFormat.format(sumDerechos):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bDeficienteLiquido?"RESULTADO DE EJERCICIOS ANTERIORES":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bDeficienteLiquido?" "+decFormat.format((-1)*(sumResultadosDelEjerciciosAnteriores)):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bOtrasInversiones|| cuentas.bRevaluacionDeActivos || (cuentas.bOtrasInversiones&& cuentas.bRevaluacionDeActivos))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bOtrasInversiones?"OTRAS INVERSIONES":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bOtrasInversiones?" "+decFormat.format(sumOtrasInversiones):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bRevaluacionDeActivos?"REVALUACION DE ACTIVOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bRevaluacionDeActivos?" "+decFormat.format((-1)*sumRevaluacionDeActivos):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bInvenInmovil || cuentas.bResultadosDelEjercicio || (cuentas.bInvenInmovil && cuentas.bResultadosDelEjercicio))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bInvenInmovil?"INVENTARIOS INMOBILIARIOS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bInvenInmovil?" "+decFormat.format(sumInvenInmovil):"&nbsp;"%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bResultadosDelEjercicio?"RESULTADO DEL EJERCICIO EN CURSO":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bResultadosDelEjercicio?" "+decFormat.format((-1)*sumResultadosDelEjercicio):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bInmuebles || cuentas.bMaquinaria || (cuentas.bInmuebles && cuentas.bMaquinaria))
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%"><%=cuentas.bInmuebles?"INMUEBLES, MOBILIARIO Y EQUIPO (NETO)":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bInmuebles?" "+decFormat.format(sumInmuebles):"&nbsp;"%>&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"><%=cuentas.bMaquinaria?"MAQUINARIA E IMPLEMENTOS AGRICOLAS":"&nbsp;"%></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%"><%=cuentas.bMaquinaria?" "+decFormat.format((-1)*sumMaquinaria):"&nbsp;"%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bInventDistri)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%">INVENTARIOS PARA DISTRIBUCION Y VENTA></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;<%=decFormat.format(sumInventDistri)%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"></td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;</td>
  </tr>
  <%    }%>
  <%if (cuentas.bInventIndust)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%">INVENTARIOS INDUSTRIALES</td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;<%=decFormat.format(sumInventIndust)%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"> </td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;</td>
  </tr>
  <%    }%>
  <%if (cuentas.bInventDeLaIndus)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%">INVENT. CONST. DE VIVIENDA Y OBRAS DE INFRAEST.</td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;<%=decFormat.format(sumInventDeLaIndus)%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"> </td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;</td>
  </tr>
  <%    }%>
  <%if (cuentas.bInversionesParaLaConstrucc)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%">INV. CONST. DE VIVIENDA Y OBRAS DE INFRAEST.</td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;<%=decFormat.format(sumInversionesParaLaConstrucc)%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"> </td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;</td>
  </tr>
  <%    }%>
  <%if (cuentas.bBienesAdjudicatos)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%">BIENES ADJUDICADOS</td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;<%=decFormat.format(sumBienesAdjudicatos)%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"> </td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;</td>
  </tr>
  <%    }%>
  <%if (cuentas.bCargosDiferidos)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  width="30%">CARGOS DIFERIDOS E INTANGIBLES (NETO)</td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;<%=decFormat.format(sumCargosDiferidos)%></td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td width="30%"> </td>
    <td align="right" width="9%">&nbsp;</td>
    <td align="right" width="9%">&nbsp;</td>
  </tr>
  <%    }%>
  <tr style="font-family: Arial;	font-size: 12px;color: #000000;font-weight: bold;" >
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="center" width="2%">&nbsp;&nbsp;TOTAL PATRIMONIO</td>
    <td align="center" width="2%">&nbsp;</td>
    <td align="right" width="2%"><%=decFormat.format((-1)*(sumPatrimonio+sumEntregasPatrimoniales+sumResultadosDelEjercicio+sumResultadosDelEjerciciosAnteriores+sumRevaluacionDeActivos))%></td>
  </tr>
  <tr style="font-family: Arial;	font-size: 12px;color: #000000;font-weight: bold;" > 
    <td colspan="3" align="right">SUMA DE ACTIVO:&nbsp;&nbsp;&nbsp; 
      <%//@total activo%>
      <u> <%=decFormat.format(cuentas.totalActivo(sumFCajayBco, sumOtrasDispon, sumTitulos, sumFAccion, sumValoresNoCotizados, sumValGub, sumDescuentos, sumPrestaquiro, sumPrestgara, sumCartera, sumPresHabi, sumGarantiPag, sumPrestRef, sumCreditosAfec, 	 sumPresCongaran, sumCarteraVencida, sumEstimacion, sumClientesYDoc, sumDeudoresDiversos, sumInvenInmovil, 	 sumOtrasInversiones, sumDerechos, sumInmuebles, sumMaquinaria, sumInventDistri,sumInventIndust, sumInventDeLaIndus, 	sumInversionesParaLaConstrucc, sumCargosDiferidos,  sumBienesAdjudicatos,sumValoresPorRecibir))%></u></td>
    <td align="center">&nbsp;</td>
    <td align="center">&nbsp;</td>
    <td colspan="3" align="right">SUMA DE PASIVO Y PATRIMONIO:&nbsp;&nbsp;&nbsp;<u> 
      <%//@TOTAL PASIVO Y PATRIMONIO
  		    //{@PASIVO}+{@PATRIMON}%>
      <%=decFormat.format((-1)*(cuentas.pasivo(sumDocumentosyCuentas, sumAcreedPorCertif, sumAcreedDiversos , sumAcreePorIntereses, sumFinanBan , sumPrestamosDeGobierno , sumOtrasObliga, sumOtrosFinan, sumCertfDeParti, sumFinanciBancarios, sumReservasyProvisiones, sumProvisionParaCobertura, sumProvisionDiferencial, sumCreditosDiferidos, sumPatrimonio) + cuentas.patrimon(sumPatrimonioNoAportado,sumEntregasPatrimoniales,sumRemanenteLiquido,sumDeficienteLiquido,sumRevaluacionDeActivos, sumResultadosDelEjercicio)))%> 
      </u></td>
  </tr>
</table>
     
<table width="622" border="0" align="center">
  <tr> 
    <td align="center" style="font-family: Arial;	font-size: 9px;color: #000000;"  colspan="2">&nbsp;</td>
  </tr>
  <tr> 
    <td align="center" style="font-family: Arial;	font-size: 9px;color: #000000;"  colspan="2">&nbsp;</td>
  </tr>
  <tr> 
    <td align="center" style="font-family: Arial;	font-size: 11px;color: #000000;font-weight: bold;" colspan="2"> 
      <%=(cuentas.bCreditosYDocumentos||cuentas.bDeudoresPorAval||cuentas.bValoresYBienes||cuentas.bCuentasDeudoras||cuentas.bCuentasDeudoras|| cuentas.bIntegracionDeCartera|| bCertificadosTesoreriaETF)?"CUENTAS DE ORDEN":""%> </td>
  </tr>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td width="325"  >&nbsp;</td>
    <td width="320"  align="right">&nbsp;</td>
  </tr>
  <%if (cuentas.bCreditosYDocumentos)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td  >CREDITOS Y DOCUMENTOS DESCONTADOS</td>
    <td  align="right"><%=decFormat.format(sumCreditosYDocumentos)%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bDeudoresPorAval)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td>DEUDORES POR AVAL</td>
    <td align="right"><%=decFormat.format(sumDeudoresPorAval)%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bOtrasObligacionesCont)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td>OTRAS OBLIGACIONES CONTINGENTES</td>
    <td align="right"><%=decFormat.format(sumOtrasObligacionesCont)%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bValoresYBienes)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td>VALORES Y BIENES EN DEPOSITO, ADMINISTRACION O GARANTIA</td>
    <td align="right"><%=decFormat.format(sumValoresYBienes)%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bCuentasDeudoras)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td >CUENTAS DEUDORAS DE REGISTRO</td>
    <td align="right"><%=decFormat.format(sumCuentasDeudoras)%></td>
  </tr>
  <%    }%>
  <%if (cuentas.bIntegracionDeCartera)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td>INTEGRACION DE CARTERA CRED.</td>
    <td align="right"><%=decFormat.format(sumIntegracionDeCartera)%></td>
  </tr>
  <%    }%>
  
  
  <!--ESPECIAL ETFS-->
  <%if (sumCertificadosAutorizadosETF>0)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td>CERTIFICADOS AUTORIZADOS</td>
    <td align="right"><%=decFormat.format(sumCertificadosAutorizadosETF)%></td>
  </tr>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td colspan=2><hr></td>
  </tr>
  <%    }%>
  <%if (sumCertificadosCirculacionETF>0)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td>CERTIFICADOS EN CIRCULACION</td>
    <td align="right"><%=decFormat.format(sumCertificadosCirculacionETF)%></td>
  </tr>
  <%    }%>
  <%if (sumCertificadosTesoreriaETF>0)
			{%>
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td>CERTIFICADOS EN TESORERIA</td>
    <td align="right"><%=decFormat.format(sumCertificadosTesoreriaETF)%></td>
  </tr>
  <%    }%>
  <tr> 
    <td align="center" style="font-family: Arial;	font-size: 9px;color: #000000;"  colspan="2">&nbsp;</td>
  </tr>
  <tr> 
    <td align="center" style="font-family: Arial;	font-size: 9px;color: #000000;"  colspan="2">&nbsp;</td>
  </tr>
</table>
		<%
		cuentas.limpiaBanderas();
		/*
		<%=sumPatrimEtiqueta	 @PATRIM_ETIQUETA	
		<%=sumPatNoAporEtiqu	 @PATNOAPOR_ETIQU
		<%=sumEntregasEtiq	@ENTREGAS_ETIQ
		<%=sumRemanEtiqu	@REMAN_ETIQU
		<%=sumDefEtiq	@DEF_ETIQ
		<%=sumDividendosPag   @DividendosPag
			*/
		%>

		

 

     
<table width="960" border="0"  align="center">
  <tr style="font-family: Arial;	font-size: 9px;color: #000000;" > 
    <td width="17%">&nbsp;</td>
    <td width="15%">&nbsp;</td>
  </tr>
    <tr  >
    <td align="center" style="font-family: Arial;	font-size: 9px;color: #000000;" colspan="8">&nbsp;</td>
  </tr>
  <%if(anio<2005 || (anio==2005 && mes<8)) 
  
  	{%>
  <tr  > 
    <td align="center" style="font-family: Arial;	font-size: 12px;color: #000000;" colspan="8"><img src="<%=request.getContextPath()%>/imagenes/THARTI.jpg" width="206" height="71" ></td>
  </tr>
  <tr  > 
    <td align="center" style="font-family: Arial;	font-size: 9px;color: #000000;" colspan="8">	
       <%=session.getAttribute("empresa_5")%></td>
  </tr>
  <%}
  
  else
  {
  %>
    <tr  > 
    <td align="center" style="font-family: Arial;	font-size: 12px;color: #000000;" colspan="8"><img src="<%=request.getContextPath()%>/imagenes/THARTI.jpg" width="158" height="99"></td>
  </tr>
  <tr  > 
    <td align="center" style="font-family: Arial;	font-size: 9px;color: #000000;" colspan="8">	
      <%=session.getAttribute("empresa_5")%></td>
  </tr>
  <%}%>
  <tr  >
    <td align="center" style="font-family: Arial;	font-size: 9px;color: #000000;" colspan="8">&nbsp;</td>
  </tr>
  <tr  > 
    <td align="center" style="font-family: Arial;	font-size: 9px;color: #000000;" colspan="8">	
      &nbsp;</td>
  </tr>
</table>


<%
}
else
	{%>
<table width="447" align="center">
  <tr>
    <td height="19" >&nbsp;</td>
  </tr>
  <tr> 
    <td width="439" height="19" >&nbsp;</td>
  </tr>
  <tr> 
    <td height="19" style="font-family: Arial, Helvetica, Verdana;	font-size: 14px;color: #006699;font-weight: bold;" align="center"> 
		<%=mensaje%>    
    </td>
  </tr>
  <tr> 
    <td align="center">&nbsp;</td>
  </tr>
  <tr> 
    <td align="center"><input type="button" name="Cerrar" value="Cerrar" onClick="window.close();" style="background: #006699; border: 1px solid #000066; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 9px; color: #FFFFFF; font-weight: normal;"></td>
  </tr>
</table>
	<%}%>

<%}
catch(Exception e)
	{
System.out.println(" Reporte Balance General: \nError:"+e);
e.printStackTrace();	%>

	<table width="447" align="center">
  <tr>
    <td height="19">&nbsp;</td>
  </tr>
  <tr> 
    <td width="439" height="19">&nbsp;</td>
  </tr>
  <tr> 
    <td  align="center" height="19" style="font-family: Arial, Helvetica, Verdana;	font-size: 14px;color: #006699;font-weight: bold;">Reporte Balance General: Error:<%=e%></td>
  </tr>
  <tr> 
    <td align="center">&nbsp;</td>
  </tr>
 
</table>

<%}%>
</body>
</html>