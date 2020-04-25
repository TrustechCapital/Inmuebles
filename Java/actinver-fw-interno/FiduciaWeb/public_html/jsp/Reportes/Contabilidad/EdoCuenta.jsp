<!--
/*
  @Autor:Inscitech
  @Creado: Abril 2019
  @Nombre: Estado de Cuenta
*/
-->

<%@ page import="java.text.*,java.util.*,java.lang.*,java.io.*,java.sql.*"%>
<jsp:useBean id="balance" class="com.nafin.negocio.nReporte"/>
<jsp:useBean id="cuentas" class="com.nafin.negocio.BalanceFormulas"/>
<jsp:useBean id="BD"  class="com.nafin.negocio.FiduciaBD"/>
<jsp:useBean id="repEdoFinan"  class="com.nafin.negocio.FiduciaBD"/>
<jsp:useBean id="datEdoFinan" class="com.nafin.negocio.nReporte"/>
<jsp:useBean id="ValorMercado"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="InsDeuda"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="MercaDine"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="InsCapi"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="MerCapi"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="BienFid"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="MovMesMN"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="MovMesDL"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="SitFin"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="SitFinDlr"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="EdoRes"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="EdoResDlr"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="DepEfe"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="ComCob"  class="com.nafin.negocio.nConsultas"/>
<jsp:useBean id="ContEC"  class="com.nafin.negocio.nConsultas"/>
<%@ page import="java.math.BigDecimal, mx.com.inscitech.fiducia.common.util.DecimalFormatUtils"%>
<%

DecimalFormat decFormat = new DecimalFormat("###,###,###,###,###,###,###,##0.00");
String[] bitacora = new String[5];
String fechaCont=BD.getFecha();
String folioBit="";
int regBitacora=0;
BigDecimal cliente =new BigDecimal(0);
BigDecimal secuencial =new BigDecimal(0);
String fideicomiso = "";
String nomfideicomiso = "";
String rfccliente = "";
String subcontrato= "";
String ejecutivo= "";
String sucursal= "";
String fechaCorte= "";
String periodo= "";
String diasPer= "";
String mesante= "";
String totabon= "";
String totcarg= "";
String mesactu= "";
String pminfo= "";
String maboDepos= "";
String maboDeposval= "";
String maboBonif= "";
String maboBienfid= "";
String maboTotal= "";
String mcgoRetiro= "";
String mcgoRetiroval= "";
String mcgoComisi= "";
String mcgoBienfid= "";
String mcgoImpues= "";
String mcgoTotcar= "";
String motrDivid= "";
String motrIntermed= "";
String mipIsrrf= "";
String mipIsrrmd= "";
String mipIvatras= "";
String mipIderec= "";
String mipIdexrec= "";

int EValorMercado =0;
int EInsDeuda =0;
int EMercaDine =0;
int EInsCapi =0;
int EMerCapi =0;
int EBienFid =0;
int EMovMesMN =0;
int EMovMesDL =0;
int ESitFin =0;
int ESitFinDlr =0;
int EEdoRes =0;
int EEdoResDlr =0;
int EDepEfe =0;
int EComCob =0;
float vportafoliot=0.00f;
%>
<%
    
    java.util.List consulta = (java.util.List)request.getAttribute("consulta");
    //Variable para obtener tupla por tupla
    java.util.Map registro = null;
//se valida si hay informacion en la tabla
    if(consulta.size()>0)
    {
        registro = (java.util.Map)consulta.get(0);
        cliente = (BigDecimal)registro.get("feceCliente");
        rfccliente = (String)registro.get("feceRfc");
        secuencial = (BigDecimal)registro.get("feceSeq");
        fideicomiso = (String)registro.get("feceFideicomiso");
        nomfideicomiso = (String)registro.get("feceNomFideicomiso");
        subcontrato= (String)registro.get("feceSubcontrato");
        ejecutivo= (String)registro.get("feceEjecutivo");
        sucursal= (String)registro.get("feceSucursal");
        fechaCorte= (String)registro.get("feceFechacorte");
        periodo= (String)registro.get("fecePeriodo");
        diasPer= (String)registro.get("feceDiasper");
        mesante= (String)registro.get("feceMMesante");
        totabon= (String)registro.get("feceMTotabon");
        totcarg= (String)registro.get("feceMTotcarg");
        mesactu= (String)registro.get("feceMMesactu");
        pminfo= (String)registro.get("feceMPminfo");
        maboDepos= (String)registro.get("feceMAboDepos");
        maboDeposval= (String)registro.get("feceMAboDeposvalor");
        maboBonif= (String)registro.get("feceMAboBonif");
        maboBienfid= (String)registro.get("feceMAboBienfid");
        maboTotal= (String)registro.get("feceMAboTotabo");
        mcgoRetiro= (String)registro.get("feceMCgoRetiro");
        mcgoRetiroval= (String)registro.get("feceMCgoRetiroval");
        mcgoComisi= (String)registro.get("feceMCgoComisi");
        mcgoBienfid= (String)registro.get("feceMCgoBienfid");
        mcgoImpues= (String)registro.get("feceMCgoImpues");
        mcgoTotcar= (String)registro.get("feceMCgoTotcar");
        motrDivid= (String)registro.get("feceMOtrDivid");
        motrIntermed= (String)registro.get("feceMOtrIntermd");
        mipIsrrf= (String)registro.get("feceMIpIsrrf");
        mipIsrrmd= (String)registro.get("feceMIpIsrrmd");
        mipIvatras= (String)registro.get("feceMIpIvatras");
        mipIderec= (String)registro.get("feceMIpIderec");
        mipIdexrec= (String)registro.get("feceMIpIdexrec");
    }
    ContEC.setVtrIntDato1(secuencial.intValue());
      ContEC.querySelect(116);
      if(ContEC.hasData())
      {
                ContEC.setIndex(0);
                EValorMercado = Integer.parseInt(ContEC.getVtrStrDato2());
                EInsDeuda = Integer.parseInt(ContEC.getVtrStrDato3());
                EMercaDine = Integer.parseInt(ContEC.getVtrStrDato4());
                EInsCapi = Integer.parseInt(ContEC.getVtrStrDato5());
                EMerCapi = Integer.parseInt(ContEC.getVtrStrDato6());
                EBienFid = Integer.parseInt(ContEC.getVtrStrDato7());
                EMovMesMN = Integer.parseInt(ContEC.getVtrStrDato8());
                EMovMesDL = Integer.parseInt(ContEC.getVtrStrDato9());
                ESitFin = Integer.parseInt(ContEC.getVtrStrDato10());
                ESitFinDlr = Integer.parseInt(ContEC.getVtrStrDato11());
                EEdoRes = Integer.parseInt(ContEC.getVtrStrDato12());
                EEdoResDlr = Integer.parseInt(ContEC.getVtrStrDato13());
                EDepEfe = Integer.parseInt(ContEC.getVtrStrDato14());
                EComCob = Integer.parseInt(ContEC.getVtrStrDato15());
       }
       if(EValorMercado == 1){
        System.out.println("entra al if EValorMercado");
            ValorMercado.setVtrIntDato1(secuencial.intValue());
            ValorMercado.querySelect(102);
            if(ValorMercado.hasData())
            {
                System.out.println("Entra aki");
                ValorMercado.setIndex(0);
            }
       }else{
            System.out.println("EValorMercado no tiene datos");
       }
       /*Instrumentos de Deuda*/
       float totalID=0;
       float totalPorcID=0;
       float totalIDVL=0;
       float totalVA=0;
       float totalVAM=0;
       float totalEFEP=0;
       float totalEFEA=0;
       float totalEFELP=0;
       float totalEFELA=0;
       float totalPV=0;
       float totalPorcPort=0;
       float totalPorcPortM=0;
       ArrayList<String> IDContrato = new ArrayList<String>();
       ArrayList<String> IDTipoVal = new ArrayList<String>();
       ArrayList<String> IDEmisora = new ArrayList<String>();
       ArrayList<String> IDMesante = new ArrayList<String>();
       ArrayList<String> IDMesactu = new ArrayList<String>();
       ArrayList<String> IDValorLib= new ArrayList<String>();
       ArrayList<String> IDPrecioAl = new ArrayList<String>();
       ArrayList<String> IDValorAct = new ArrayList<String>();
       ArrayList<String> IDPlusVinf = new ArrayList<String>();
       ArrayList<String> IDPorceport = new ArrayList<String>();
       
       ArrayList<String> MDContrato= new ArrayList<String>();
       ArrayList<String> MDTipoVal= new ArrayList<String>();
       ArrayList<String> MDEmisora= new ArrayList<String>();
       ArrayList<String> MDMesante= new ArrayList<String>();
       ArrayList<String> MDMesactu= new ArrayList<String>();
       ArrayList<String> MDFadqui= new ArrayList<String>();
       ArrayList<String> MDFvenci= new ArrayList<String>();
       ArrayList<String> MDPrecioAl= new ArrayList<String>();
       ArrayList<String> MDValorAct= new ArrayList<String>();
       ArrayList<String> MDPorcTasa= new ArrayList<String>();
       ArrayList<String> MDDiasporven= new ArrayList<String>();
       ArrayList<String> MDPorcgat= new ArrayList<String>();
       ArrayList<String> MDPorcport= new ArrayList<String>();
       
       if(EInsDeuda == 1){
            InsDeuda.setVtrIntDato1(secuencial.intValue());
            InsDeuda.querySelect(103);
            if(InsDeuda.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<InsDeuda.getSize();i++)
                {
                    InsDeuda.setIndex(i);
                    IDContrato.add(InsDeuda.getVtrStrDato4());
                    IDTipoVal.add(InsDeuda.getVtrStrDato5());
                    IDEmisora.add(InsDeuda.getVtrStrDato6());
                    IDMesante.add(InsDeuda.getVtrStrDato7());
                    IDMesactu.add(InsDeuda.getVtrStrDato8());
                    IDValorLib.add(InsDeuda.getVtrStrDato9());
                    totalIDVL+=Float.parseFloat(InsDeuda.getVtrStrDato9());
                    IDPrecioAl.add(InsDeuda.getVtrStrDato10());
                    IDValorAct.add(InsDeuda.getVtrStrDato11());
                    totalVA+=Float.parseFloat(InsDeuda.getVtrStrDato11());
                    totalID+=Float.parseFloat(InsDeuda.getVtrStrDato11());
                    IDPlusVinf.add(InsDeuda.getVtrStrDato12());
                    totalPV+=Float.parseFloat(InsDeuda.getVtrStrDato12());
                    IDPorceport.add(InsDeuda.getVtrStrDato13());
                    totalPorcPort+=Float.parseFloat(InsDeuda.getVtrStrDato13());
                    totalPorcID+=Float.parseFloat(InsDeuda.getVtrStrDato13());
                }
            }
       }
       if(EMercaDine== 1){
            MercaDine.setVtrIntDato1(secuencial.intValue());
            MercaDine.querySelect(104);
            if(MercaDine.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<MercaDine.getSize();i++)
                {
                    MercaDine.setIndex(i);
                    MDContrato.add(MercaDine.getVtrStrDato2());
                    MDTipoVal.add(MercaDine.getVtrStrDato3());
                    MDEmisora.add(MercaDine.getVtrStrDato4());
                    MDMesante.add(MercaDine.getVtrStrDato5());
                    MDMesactu.add(MercaDine.getVtrStrDato6());
                    MDFadqui.add(MercaDine.getVtrStrDato7());
                    MDFvenci.add(MercaDine.getVtrStrDato8());
                    MDPrecioAl.add(MercaDine.getVtrStrDato9());
                    MDValorAct.add(MercaDine.getVtrStrDato10());
                    totalVAM+=Float.parseFloat(MercaDine.getVtrStrDato10());
                    totalID+=Float.parseFloat(MercaDine.getVtrStrDato10());
                    MDPorcTasa.add(MercaDine.getVtrStrDato11());
                    MDDiasporven.add(MercaDine.getVtrStrDato12());
                    MDPorcgat.add(MercaDine.getVtrStrDato13());
                    MDPorcport.add(MercaDine.getVtrStrDato14());
                    totalPorcPortM+=Float.parseFloat(MercaDine.getVtrStrDato14());
                    totalPorcID+=Float.parseFloat(MercaDine.getVtrStrDato14());
                }
            }
       }
       /*Instrumentos Capitales*/
       float totalIC=0;
       float totalPorcIC=0;
       float totalICVL=0;
       float totalICVA=0;
       float totalICPI=0;
       float totalICPP=0;
       float totalMCVL=0;
       float totalMCVA=0;
       float totalMCPI=0;
       float totalMCPP=0;
       ArrayList<String> ICContrato = new ArrayList<String>();
       ArrayList<String> ICTipoVal = new ArrayList<String>();
       ArrayList<String> ICEmisora = new ArrayList<String>();
       ArrayList<String> ICMesante = new ArrayList<String>();
       ArrayList<String> ICMesactu = new ArrayList<String>();
       ArrayList<String> ICValorLib= new ArrayList<String>();
       ArrayList<String> ICPrecioAl = new ArrayList<String>();
       ArrayList<String> ICValorAct = new ArrayList<String>();
       ArrayList<String> ICPlusVinf = new ArrayList<String>();
       ArrayList<String> ICPorceport = new ArrayList<String>();
       
       ArrayList<String> MCContrato = new ArrayList<String>();
       ArrayList<String> MCTipoVal = new ArrayList<String>();
       ArrayList<String> MCEmisora = new ArrayList<String>();
       ArrayList<String> MCMesante = new ArrayList<String>();
       ArrayList<String> MCMesactu = new ArrayList<String>();
       ArrayList<String> MCValorLib= new ArrayList<String>();
       ArrayList<String> MCPrecioAl = new ArrayList<String>();
       ArrayList<String> MCValorAct = new ArrayList<String>();
       ArrayList<String> MCPlusVinf = new ArrayList<String>();
       ArrayList<String> MCPorceport = new ArrayList<String>();
       
       
       if(EInsCapi == 1){
            InsCapi.setVtrIntDato1(secuencial.intValue());
            InsCapi.querySelect(105);
            if(InsCapi.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<InsCapi.getSize();i++)
                {
                    InsCapi.setIndex(i);
                    ICContrato.add(InsCapi.getVtrStrDato4());
                    ICTipoVal.add(InsCapi.getVtrStrDato5());
                    ICEmisora.add(InsCapi.getVtrStrDato6());
                    ICMesante.add(InsCapi.getVtrStrDato7());
                    ICMesactu.add(InsCapi.getVtrStrDato8());
                    ICValorLib.add(InsCapi.getVtrStrDato9());
                    totalICVL+=Float.parseFloat(InsCapi.getVtrStrDato9());
                    ICPrecioAl.add(InsCapi.getVtrStrDato10());
                    ICValorAct.add(InsCapi.getVtrStrDato11());
                    totalICVA+=Float.parseFloat(InsCapi.getVtrStrDato11());
                    totalIC+=Float.parseFloat(InsCapi.getVtrStrDato11());
                    ICPlusVinf.add(InsCapi.getVtrStrDato12());
                    totalICPI+=Float.parseFloat(InsCapi.getVtrStrDato12());
                    ICPorceport.add(InsCapi.getVtrStrDato13());
                    totalICPP+=Float.parseFloat(InsCapi.getVtrStrDato13());
                    totalPorcIC+=Float.parseFloat(InsCapi.getVtrStrDato13());
                }
            }
       }
       if(EMerCapi== 1){
            MerCapi.setVtrIntDato1(secuencial.intValue());
            MerCapi.querySelect(106);
            if(MerCapi.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<MerCapi.getSize();i++)
                {
                    MerCapi.setIndex(i);
                    MCContrato.add(MerCapi.getVtrStrDato2());
                    MCTipoVal.add(MerCapi.getVtrStrDato3());
                    MCEmisora.add(MerCapi.getVtrStrDato4());
                    MCMesante.add(MerCapi.getVtrStrDato5());
                    MCMesactu.add(MerCapi.getVtrStrDato6());
                    MCValorLib.add(MerCapi.getVtrStrDato7());
                    totalMCVL+=Float.parseFloat(MerCapi.getVtrStrDato7());
                    MCPrecioAl.add(MerCapi.getVtrStrDato8());
                    MCValorAct.add(MerCapi.getVtrStrDato9());
                    totalMCVA+=Float.parseFloat(MerCapi.getVtrStrDato9());
                    totalIC+=Float.parseFloat(MerCapi.getVtrStrDato9());
                    MCPlusVinf.add(MerCapi.getVtrStrDato10());
                    totalMCPI+=Float.parseFloat(MerCapi.getVtrStrDato10());
                    MCPorceport.add(MerCapi.getVtrStrDato11());
                    totalMCPP+=Float.parseFloat(MerCapi.getVtrStrDato11());
                    totalPorcIC+=Float.parseFloat(MerCapi.getVtrStrDato11());
                }
            }
       }
       /*Bienes Fideicomitidos*/
       float totalVM=0;
       float totalPI=0;
       ArrayList<String> BFTipo = new ArrayList<String>();
       ArrayList<String> BFDesc = new ArrayList<String>();
       ArrayList<String> BFValorMerca = new ArrayList<String>();
       ArrayList<String> BFPorcvm= new ArrayList<String>();
       ArrayList<String> BFPlusinfo = new ArrayList<String>();
       if(EBienFid == 1){
            BienFid.setVtrIntDato1(secuencial.intValue());
            BienFid.querySelect(107);
            if(BienFid.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<BienFid.getSize();i++)
                {
                    BienFid.setIndex(i);
                    BFTipo.add(BienFid.getVtrStrDato2());
                    BFDesc.add(BienFid.getVtrStrDato3());
                    BFValorMerca.add(BienFid.getVtrStrDato4());
                    totalVM+=Float.parseFloat(BienFid.getVtrStrDato4());
                    BFPorcvm.add(BienFid.getVtrStrDato5());
                    BFPlusinfo.add(BienFid.getVtrStrDato6());
                    totalPI+=Float.parseFloat(BienFid.getVtrStrDato6());
                }
            }
       }
       /*Movimientos Mes MN*/
       ArrayList<String> MMCMNOperLiq = new ArrayList<String>();
       ArrayList<String> MMCMNFolio = new ArrayList<String>();
       ArrayList<String> MMCMNDesc= new ArrayList<String>();
       ArrayList<String> MMCMNCargo= new ArrayList<String>();
       ArrayList<String> MMCMNAbono = new ArrayList<String>();
       ArrayList<String> MMCMNSaldo = new ArrayList<String>();
       if(EMovMesMN == 1){
            MovMesMN.setVtrIntDato1(secuencial.intValue());
            MovMesMN.querySelect(108);
            if(MovMesMN.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<MovMesMN.getSize();i++)
                {
                    MovMesMN.setIndex(i);
                    MMCMNOperLiq.add(MovMesMN.getVtrStrDato2());
                    MMCMNFolio.add(MovMesMN.getVtrStrDato3());
                    MMCMNDesc.add(MovMesMN.getVtrStrDato4());
                    MMCMNCargo.add(MovMesMN.getVtrStrDato5());
                    MMCMNAbono.add(MovMesMN.getVtrStrDato6());
                    MMCMNSaldo.add(MovMesMN.getVtrStrDato7());
                }
            }
       }
       /*Movimientos Mes DlRS*/
       ArrayList<String> MMCDLRSOperLiq = new ArrayList<String>();
       ArrayList<String> MMCDLRSFolio = new ArrayList<String>();
       ArrayList<String> MMCDLRSDesc= new ArrayList<String>();
       ArrayList<String> MMCDLRSCargo= new ArrayList<String>();
       ArrayList<String> MMCDLRSAbono = new ArrayList<String>();
       ArrayList<String> MMCDLRSSaldo = new ArrayList<String>();
       if(EMovMesDL == 1){
            MovMesDL.setVtrIntDato1(secuencial.intValue());
            MovMesDL.querySelect(109);
            if(MovMesDL.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<MovMesDL.getSize();i++)
                {
                    MovMesDL.setIndex(i);
                    MMCDLRSOperLiq.add(MovMesDL.getVtrStrDato2());
                    MMCDLRSFolio.add(MovMesDL.getVtrStrDato3());
                    MMCDLRSDesc.add(MovMesDL.getVtrStrDato4());
                    MMCDLRSCargo.add(MovMesDL.getVtrStrDato5());
                    MMCDLRSAbono.add(MovMesDL.getVtrStrDato6());
                    MMCDLRSSaldo.add(MovMesDL.getVtrStrDato7());
                }
            }
       }
       /*Situacion Financiera*/
       float totalAC=0;
       float totalCap=0;
       ArrayList<String> SFDesc = new ArrayList<String>();
       ArrayList<String> SFActivos= new ArrayList<String>();
       ArrayList<String> SFCapital= new ArrayList<String>();
       ArrayList<String> SFTipo= new ArrayList<String>();
       if(ESitFin == 1){
            SitFin.setVtrIntDato1(secuencial.intValue());
            SitFin.querySelect(110);
            if(SitFin.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<SitFin.getSize();i++)
                {
                    SitFin.setIndex(i);
                    SFDesc.add(SitFin.getVtrStrDato2());
                    SFActivos.add(SitFin.getVtrStrDato3());
                    totalAC+=Float.parseFloat(SitFin.getVtrStrDato3());
                    SFCapital.add(SitFin.getVtrStrDato4());
                    totalCap+=Float.parseFloat(SitFin.getVtrStrDato4());
                    SFTipo.add(SitFin.getVtrStrDato5());
                }
            }
       }
       /*Situacion Financiera Dolares*/
       float totalACD=0;
       float totalCapD=0;
       ArrayList<String> SFDLRSDesc = new ArrayList<String>();
       ArrayList<String> SFDLRSActivos= new ArrayList<String>();
       ArrayList<String> SFDLRSCapital= new ArrayList<String>();
       ArrayList<String> SFDLRSTipo= new ArrayList<String>();
       if(ESitFinDlr == 1){
            SitFinDlr.setVtrIntDato1(secuencial.intValue());
            SitFinDlr.querySelect(111);
            if(SitFinDlr.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<SitFinDlr.getSize();i++)
                {
                    SitFinDlr.setIndex(i);
                    SFDLRSDesc.add(SitFinDlr.getVtrStrDato2());
                    SFDLRSActivos.add(SitFinDlr.getVtrStrDato3());
                    totalACD+=Float.parseFloat(SitFinDlr.getVtrStrDato3());
                    SFDLRSCapital.add(SitFinDlr.getVtrStrDato4());
                    totalCapD+=Float.parseFloat(SitFinDlr.getVtrStrDato4());
                    SFDLRSTipo.add(SitFinDlr.getVtrStrDato5());
                }
            }
       }
       /*Estado de Resultados*/
       float totalIng=0;
       float totalEg=0;
       float totalRE=0;
       ArrayList<String> ERDesc = new ArrayList<String>();
       ArrayList<String> ERIng= new ArrayList<String>();
       ArrayList<String> EREgr= new ArrayList<String>();
       //ArrayList<String> ERReseje= new ArrayList<String>();
       //ArrayList<String> ERTipo= new ArrayList<String>();
       if(EEdoRes == 1){
            EdoRes.setVtrIntDato1(secuencial.intValue());
            EdoRes.querySelect(112);
            if(EdoRes.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<EdoRes.getSize();i++)
                {
                    EdoRes.setIndex(i);
                    ERDesc.add(EdoRes.getVtrStrDato2());
                    ERIng.add(EdoRes.getVtrStrDato3());
                    totalIng+=Float.parseFloat(EdoRes.getVtrStrDato3());
                    EREgr.add(EdoRes.getVtrStrDato4());
                    totalEg+=Float.parseFloat(EdoRes.getVtrStrDato4());
                    //ERTipo.add(EdoRes.getVtrStrDato5());
                }
                totalRE=totalIng+totalEg;
            }
       }
       /*Estado de Resultados Dolares*/
       float totalIngD=0;
       float totalEgD=0;
       float totalRED=0;
       ArrayList<String> ERDLRDesc = new ArrayList<String>();
       ArrayList<String> ERDLRIng= new ArrayList<String>();
       ArrayList<String> ERDLREgr= new ArrayList<String>();
       //ArrayList<String> ERDLRReseje= new ArrayList<String>();
       ArrayList<String> ERDLRTipo= new ArrayList<String>();
       if(EEdoResDlr == 1){
            EdoResDlr.setVtrIntDato1(secuencial.intValue());
            EdoResDlr.querySelect(113);
            if(EdoResDlr.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<EdoResDlr.getSize();i++)
                {
                    EdoResDlr.setIndex(i);
                    ERDLRDesc.add(EdoResDlr.getVtrStrDato2());
                    ERDLRIng.add(EdoResDlr.getVtrStrDato3());
                    totalIngD+=Float.parseFloat(EdoResDlr.getVtrStrDato3());
                    ERDLREgr.add(EdoResDlr.getVtrStrDato4());
                    totalEgD+=Float.parseFloat(EdoResDlr.getVtrStrDato4());
                    //ERDLRTipo.add(EdoResDlr.getVtrStrDato5());
                }
                totalRED=totalIngD+totalEgD;
            }
       }
       /*Depositos Efectivo*/
       int totalDp=0;
       ArrayList<String> DEPer= new ArrayList<String>();
       ArrayList<String> DETotal= new ArrayList<String>();
       //ArrayList<String> ERDLRReseje= new ArrayList<String>();
       //ArrayList<String> ERDLRTipo= new ArrayList<String>();
       if(EDepEfe == 1){
            DepEfe.setVtrIntDato1(secuencial.intValue());
            DepEfe.querySelect(114);
            if(DepEfe.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<DepEfe.getSize();i++)
                {
                    DepEfe.setIndex(i);
                    DEPer.add(DepEfe.getVtrStrDato2());
                    DETotal.add(DepEfe.getVtrStrDato3());
                    totalDp+=Float.parseFloat(DepEfe.getVtrStrDato3());
                }
            }
       }
        /*Comisiones Cobradas*/
        float totalCC=0;
       ArrayList<String> CCConcepto= new ArrayList<String>();
       ArrayList<String> CCComision= new ArrayList<String>();
       ArrayList<String> CCIva= new ArrayList<String>();
       ArrayList<String> CCTotal= new ArrayList<String>();
       //ArrayList<String> ERDLRReseje= new ArrayList<String>();
       //ArrayList<String> ERDLRTipo= new ArrayList<String>();
       if(EComCob == 1){
            ComCob.setVtrIntDato1(secuencial.intValue());
            ComCob.querySelect(114);
            if(ComCob.hasData()){
                //String InsDeudaNum=InsDeuda.getVtrStrDato2();
                //String PorcDeudaNum=InsDeuda.getVtrStrDato3();
                for(int i=0;i<ComCob.getSize();i++)
                {
                    ComCob.setIndex(i);
                    CCConcepto.add(ComCob.getVtrStrDato2());
                    CCComision.add(ComCob.getVtrStrDato3());
                    CCIva.add(ComCob.getVtrStrDato4());
                    CCTotal.add(ComCob.getVtrStrDato5());
                    totalCC+=Float.parseFloat(ComCob.getVtrStrDato5());
                }
            }
       }
       /*vportafoliot=totalID+totalIC;
       //calculo de porcentajes
       for(int i=0;i<IDContrato.size();i++){
            double porc0=Float.parseFloat(IDValorAct.get(i))*100/vportafoliot;
            IDPorceport.set(i,Double.toString(porc0));
            totalPorcPort+=porc0;
            totalPorcID+=porc0;
       }
       for(int i=0;i<MDContrato.size();i++){
            double porc1=Float.parseFloat(MDValorAct.get(i))*100/vportafoliot;
            MDPorcport.set(i,Double.toString(porc1));
            totalPorcPort+=porc1;
            totalPorcPortM+=porc1;
       }
       for(int i=0;i<ICContrato.size();i++){
            double porc2=Float.parseFloat(ICValorAct.get(i))*100/vportafoliot;
            ICPorceport.set(i,Double.toString(porc2));
            totalICPP+=porc2;
            totalPorcIC+=porc2;
       }
       for(int i=0;i<MCContrato.size();i++){
            double porc3=Float.parseFloat(MCValorAct.get(i))*100/vportafoliot;
            MCPorceport.set(i,Double.toString(porc3));
            totalMCPP+=porc3;
            totalPorcIC+=porc3;
       }
       */
       //Calculo de totales 
       totalEFEP=0;
       totalEFEA=0;
       totalEFELP=0;
       totalEFELA=0;
       
       mesactu=Float.toString(totalVA+totalVAM+totalICVA+totalMCVA+totalVM);
       
%>

<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8;" />
        <title>ESTADO DE CUENTA FIDUCIARIO</title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        
        <script src="js/amcharts/core.js"></script>
        <script src="js/amcharts/charts.js"></script>
        <script src="js/amcharts/themes/animated.js"></script>        
        
    </head>
    <body <%=request.getParameter("bImprimir")!=null && request.getParameter("bImprimir").trim().equals("1") && balance.hasData()==true ?"onLoad=\"window.print();window.close();\"":" "%>  oncontextmenu="return false" onkeydown="return false"   onmousemove ="return false" onselectstart ="return false" onclick="return false">    
        <style>
            *{
                font-family: "Arial";
            }
<<<<<<< .mine
            #chartdiv {
              width: 100%;
              max-height: 600px;
              height: 100vh;
            }
||||||| .r266
=======
            #chartdiv {
              width: 100%;
              max-height: 600px;
              height: 100vh;
            }            
>>>>>>> .r267
        </style>
        <table border='0' bordercolor='#000000' bgcolor='#FFFFFF' width="1700" style="padding-left:20px; padding-right:15px; table-layout: fixed;">
            <tr>
                <td width="500">
                    <table style="align:left" width="450" border='0' bordercolor='#000000' bgcolor='#FFFFFF'>
                        <tr>
                            <td><img src="imagenes/logo_Actinver_azul.png" border="0" width="15%"></td> <!--<%=request.getContextPath()%>/imagenes/logo_Actinver_blanco.jpg-->
                        </tr>
                        <tr>
                        
                            <td><b>Banco Actinver, S.A. Instituci&oacute;n de Banca M&uacute;ltiple</b></td>
                        </tr>
                        <tr>
                            <td><b>Grupo Financiero Actinver</b></td>
                        </tr>
                        <tr>
                            <td><p style="text-align: justify;">Guillermo Gonz&aacute;lez Camarena 1200, piso 9 y 10 Centro de <br/>
                                Ciudad Santa Fe, Del. &Aacute;lvaro Obreg&oacute;n CP 01210, Ciudad de<br/>
                                M&eacute;xico. RFC: PBI061115SC6 Tel&eacute;fono 1103 6600, Lada sin<br/>
                                costo 01800 705 5555</p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">www.actinver.com</td>
                        </tr>
                    </table>
                </td>
                <td width="700">
                    <table border='0' width="700" bordercolor='#000000' bgcolor='#FFFFFF' style="table-layout:fixed;">
                        <tr>
                            <td>No. Cliente: </td>
                            <td><%=cliente!=null?cliente:""%></td>
                        </tr>
                        <tr>
                            <td>No. Fideicomiso:</td>
                            <td><%=fideicomiso!=null?fideicomiso:""%></td>
                        </tr>
                        <tr>
                            <td>Subcontrato Ejecutivo: </td>
                            <td><%=subcontrato!=null?subcontrato:""%></td>
                        </tr>
                        <tr>
                            <td style="vertical-align:top">Sucursal:</td>
                            <td><p style="text-align: justify;">DIRECCI&Oacute;N FIDUCIARIA <br/>Guillermo Gonz&aacute;lez Camarena 1200, piso 9 y 10 Centro Cd. Santa Fe, Del. &Aacute;lvaro Obreg&oacute;n CP 01210 CR. Tel&eacute;fono 1103 6600 D.F. MEXICO</p></td>
                        </tr>
                        <tr>
                            <td>Fecha de Corte:</td><td> <%=fechaCorte!=null?fechaCorte:""%></td>
                        </tr>
                        <tr>
                            <td>Periodo:</td><td> <%=periodo!=null?periodo:""%></td>
                        </tr>
                        <tr>
                            <td>Dias Periodo:</td><td> <%=diasPer!=null?diasPer:""%></td>
                        </tr>
                    </table>
                </td>
                <td width="400">
                    <table  border='0' width="400" bordercolor='#000000' bgcolor='#FFFFFF' style="table-layout: fixed;" >
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><p style="text-align: justify;" >VICTOR MANUEL TORRES MACIAS
                                CORDILLERA HIMALAYA 612
                                LOMAS 4TA SECCION
                                SAN LUIS POTOSI
                                Del. Alvaro Obregón
                                SAN LUIS POTOSI MEXICO
                                CP.: 78216 CR.:</p></td><!-- <%=nomfideicomiso!=null?nomfideicomiso:""%> -->
                        </tr>
                        
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="right"><h2>Estado de Cuenta Fiduciario</h2></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="3"><hr/></td>
            </tr>
            <tr>
                <td align="center" colspan="3">
                    <p>Nuestro compromiso de calidad es por ti. Te recordamos que puedes hacer tus comentarios en nuestro Centro de Atenci&oacute;n Telef&oacute;nica al correo electr&oacute;nico actinver@actinver.com.mx o
a los tel&eacute;fonos 1103 6699 en el &aacute;rea metropolitana y al 01 800 705 5555, lada sin costo desde cualquier lugar de la rep&uacute;blica o a trav&eacute;s de la p&aacute;gina de internet www.actinver.com</p></td>
            </tr>
            <tr>
                <td colspan="3"><hr/></td>
            </tr>
            </table>
            <table border='0' bordercolor='#000000' bgcolor='#FFFFFF' width="1700" style="padding-left:20px; table-layout: fixed; ">
            <tr>
                <td width="450">
                    <table cellpadding="0" cellspacing="0" width="100%" >
                        <tr>
                            <td align="center">
                                <h2>Movimientos del Mes</h2>
                            </td>
                        </tr>
                        <td colspan="2"><hr /></td>
                        <tr>
                            <td><b>Mes anterior</b></td>
                            <td align="right"><b>$<%=mesante!=null?mesante:""%></b></td>
                        </tr>
                        <tr>
                            <td>Total Abonos ( + )</td>
                            <td align="right">$<%=totabon!=null?totabon:""%></td>
                        </tr>
                        <tr>
                            <td>Total Cargos ( - )</td>
                            <td align="right">$<%=totcarg!=null?totcarg:""%></td>
                        </tr>
                        <tr>
                            <td><b>Mes actual</b></td>
                            <td align="right"><b>$<%=decFormat.format(Double.parseDouble(mesactu))%></b></td>
                        </tr>
                        <td colspan="2" class="divider"><hr /></td>
                        <tr style="background-color:#e3eaff" border="0">
                            <td><b>Plus/Minus Informativa M.N</b></td>
                            <td align="right"><b>$<%=pminfo!=null?pminfo:""%></b></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><b>Abonos</b></td>
                        </tr>
                        <tr>
                            <td>Dep&oacute;sitos</td>
                            <td align="right">$<%=maboDepos!=null?maboDepos:""%></td>
                        </tr>
                        <tr>
                            <td>Dep&oacute;sitos Valores</td>
                            <td align="right">$<%=maboDeposval!=null?maboDeposval:""%></td>
                        </tr>
                        <tr>
                            <td>Bonificaciones</td>
                            <td align="right">$<%=maboBonif!=null?maboBonif:""%></td>
                        </tr>
                        <tr>
                            <td>Bienes Fideicomitidos</td>
                            <td align="right">$<%=maboBienfid!=null?maboBienfid:""%></td>
                        </tr>
                        <td colspan="2" class="divider"><hr /></td>
                        <tr>
                            <td><b>Total Abonos</b></td>
                            <td align="right"><b>$<%=maboTotal!=null?maboTotal:""%></b></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><b>Cargos</b></td>
                        </tr>
                        <tr>
                            <td>Retiro</td>
                            <td align="right">$<%=mcgoRetiro!=null?mcgoRetiro:""%></td>
                        </tr>
                        <tr>
                            <td>Retiros Valores</td>
                            <td align="right">$<%=mcgoRetiroval!=null?mcgoRetiroval:""%></td>
                        </tr>
                        <tr>
                            <td>Comisiones</td>
                            <td align="right">$<%=mcgoComisi!=null?mcgoComisi:""%></td>
                        </tr>
                        <tr>
                            <td>Bienes Fideicomitidos</td>
                            <td align="right">$<%=mcgoBienfid!=null?mcgoBienfid:""%></td>
                        </tr>
                        <tr>
                            <td>Impuestos*</td>
                            <td align="right">$<%=mcgoImpues!=null?mcgoImpues:""%></td>
                        </tr>
                        <td colspan="2" class="divider"><hr /></td>
                        <tr>
                            <td><b>Total Cargos</b></td>
                            <td align="right"><b>$<%=mcgoTotcar!=null?mcgoTotcar:""%></b></td>
                        </tr>
                        <tr>
                            <td><b>Otros</b></td>
                        </tr>
                        <tr>
                            <td>Dividendos</td>
                            <td align="right">$<%=motrDivid!=null?motrDivid:""%></td>
                        </tr>
                        <tr>
                            <td>Intereses M.D.</td>
                            <td align="right">$<%=motrIntermed!=null?motrIntermed:""%></td>
                        </tr>
                        <td colspan="2" class="divider"><hr /></td>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><b>IMPUESTOS DEL PERIODO</b></td>
                        </tr>
                        <tr align="right">
                            <td></td>
                            <td><b>RFC: <%=rfccliente!=null?rfccliente:""%></b></td>
                        </tr>
                        <tr>
                            <td>*ISR retenido fondos</td>
                            <td align="right">$<%=mipIsrrf!=null?mipIsrrf:""%></td>
                        </tr>
                        <tr>
                            <td>*ISR retenido mercado de dinero</td>
                            <td align="right">$<%=mipIsrrmd!=null?mipIsrrmd:""%></td>
                        </tr>
                        <tr>
                            <td>IVA trasladado</td>
                            <td align="right">$<%=mipIvatras!=null?mipIvatras:""%></td>
                        </tr>
                        <tr>
                            <td>IDE recaudado</td>
                            <td align="right">$<%=mipIderec!=null?mipIderec:""%></td>
                        </tr>
                        <tr>
                            <td>IDE por recaudar</td>
                            <td align="right">$<%=mipIdexrec!=null?mipIdexrec:""%></td>
                        </tr>
                        <td colspan="2" class="divider"><hr /></td>
                        <tr>
                            <td><b>*Este Impuesto no se suma a los cargos del contrato</b></td>
                        </tr>
                    </table>
                </td>
                <td valign="top" width="1100" >
                <table cellpadding="0" cellspacing="0" width="100%" style="border:solid 2px #000; ">
                        <tr style="background-color:#000a4b; color:white;" >
                            <td align="left" valign="middle"><h2><b>Valor Mercado a la Fecha</b></h2></td>
                            <td>&nbsp;</td>
                            <td align="right" valign="middle"><h2><b>$<%=decFormat.format(Double.parseDouble(mesactu))%></b></h2></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr align="middle">
                            <td colspan="5"><b>Resumen Informativo</b></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td align="middle"><b>Saldo Inicial</b></td>
                            <td>&nbsp;</td>
                            <td align="middle"><b>Saldo Final</b></td>
                            <td rowspan="7" align="middle" valign="middle"><br><br><div id="chartdiv"></div></td>
                        </tr>
                        <tr>
                            <td>Efectivo</td>
                            <td align="right">$<%=decFormat.format(totalEFEP)%></td>
                            <td>&nbsp;</td>
                            <td align="right">$<%=decFormat.format(totalEFEA)%></td>
                        </tr>
                        <tr>
                            <td>Portafolio de Inversiones</td>
                        </tr>
                        <tr>
                            <td style="padding-left:30px">S. I. de Deuda</td>
                            <td align="right">$&nbsp;</td>
                            <td>&nbsp;</td>
                            <td align="right">$<%=decFormat.format(totalVA)%></td>
                        </tr>
                        <tr>
                            <td style="padding-left:30px">Mercado de Dinero</td>
                            <td align="right">$&nbsp;</td>
                            <td>&nbsp;</td>
                            <td align="right">$<%=decFormat.format(totalVAM)%></td>
                        </tr>
                        <tr>
                            <td style="padding-left:30px">S. I. de renta Variable</td>
                            <td align="right">$&nbsp;</td>
                            <td>&nbsp;</td>
                            <td align="right">$<%=decFormat.format(totalICVA)%></td>
                        </tr>
                        <tr>
                            <td style="padding-left:30px">Mercado de Capitales</td>
                            <td align="right">$&nbsp;</td>
                            <td>&nbsp;</td>
                            <td align="right">$<%=decFormat.format(totalMCVA)%></td>
                        </tr>
                         <tr>
                            <td style="padding-left:30px">Bienes Fideicomitidos</td>
                            <td align="right">$&nbsp;</td>
                            <td>&nbsp;</td>
                            <td align="right">$<%=decFormat.format(totalVM)%></td>
                        </tr>
                        <tr>
                            <td style="padding-left:30px">Efectivo por Liquidar</td>
                            <td align="right">$&nbsp;</td>
                            <td>&nbsp;</td>
                            <td align="right">$</td>
                        </tr>
                        <tr style="background-color:#e3eaff; ">
                            <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;"><b>&nbsp; Total</b></td>
                            <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>$</b></td>
                            <td  style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right">&nbsp;</td>
                            <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>$<%=decFormat.format(Double.parseDouble(mesactu))%></b></td>
                            <td  style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right">&nbsp;</td>
                        </tr>
                        <tr align="middle">
                            <td colspan="4"><b>Resumen por Moneda</b></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td align="middle"><b>Pesos PS</b></td>
                            <td align="middle"><b>D&oacute;lar US</b></td>
                            <td align="middle"><b>Euro EUR</b></td>
                            <td rowspan="7" align="middle" valign="middle"><h1>GRAFICA AQUII</h1></td>
                        </tr>
                        <tr>
                            <td>Efectivo</td>
                            <td align="right"></td>
                            <td align="right"></td>
                            <td align="right"></td>
                        </tr>
                        <tr>
                            <td>Portafolio de Inversiones</td>
                        </tr>
                        <tr>
                            <td style="padding-left:30px">S. I. de Deuda</td>
                            <td align="right">$<%=decFormat.format(totalVA)%></td>
                            <td align="right"></td>
                            <td align="right"></td>
                        </tr>
                        <tr>
                            <td style="padding-left:30px">Mercado de Dinero</td>
                            <td align="right">$<%=decFormat.format(totalVAM)%></td>
                            <td align="right"></td>
                            <td align="right"></td>
                        </tr>
                        <tr>
                            <td style="padding-left:30px">S. I. de renta Variable</td>
                            <td align="right">$<%=decFormat.format(totalICVA)%></td>
                            <td align="right"></td>
                            <td align="right"></td>
                        </tr>
                        <tr>
                            <td style="padding-left:30px">Mercado de Capitales</td>
                            <td align="right">$<%=decFormat.format(totalMCVA)%></td>
                            <td align="right"></td>
                            <td align="right"></td>
                        </tr>
                         <tr>
                            <td style="padding-left:30px">Bienes Fideicomitidos</td>
                            <td align="right">$<%=decFormat.format(totalVM)%></td>
                            <td align="right"></td>
                            <td align="right"></td>
                        </tr>
                        <tr>
                            <td style="padding-left:30px">Efectivo por Liquidar</td>
                            <td align="right"></td>
                            <td align="right"></td>
                            <td align="right"></td>
                        </tr>
                        <tr style="background-color:#e3eaff; border:solid 2px #000;">
                            <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;"><b> &nbsp; Total</b></td>
                            <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>$</b></td>
                            <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>$</b></td>
                            <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>$</b></td>
                            <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right">&nbsp;</td>
                        </tr>
                        <tr>
                            <td colspan="2" align="left"><b>Las cifras presentadas como porcentaje se expresan a dos decimales</b></td>
                            <td align="right">&nbsp;</td>
                            <td colspan="2" align="right"><i>Tipo de cambio Spot de valuacion a Moneda Nacional D&oacute;lar: $19.4085 Euro: $21.7502</i></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--Instrumentos de Deuda-->
        
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="10" height="16"><b>Detalle de Inversiones Moneda Nacional</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="10" class="divider"><hr /></td>
            <%if(EInsDeuda==1){%>
            <tr colspan="10" style="background-color:#7b97cf; ">
                <td colspan="4" style="border-left:solid 2px #000; border-top:solid 2px #000;">Instrumentos de Deuda</td>
                <td colspan="3" align="right" style="border-top:solid 2px #000;" >$<%=decFormat.format(totalID)%></td>
                <td colspan="3" align="middle" style="border-top:solid 2px #000; border-right:solid 2px #000;"><%=decFormat.format(totalPorcPort)%>%</td>
            </tr>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td colspan="3" style="border-left:solid 2px #000;"><b>&nbsp; S.I. DE DEUDA</b></td>
                <td colspan="2" align="middle" ><i>Titulos</i></td>
                <td colspan="5" style="border-right:solid 2px #000;"><b>&nbsp;</b></td>
            </tr>
            <tr><td colspan="10" style="background-color:#e3eaff; border-left:solid 2px #000; border-right:solid 2px #000;">&nbsp;</td></tr>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="middle" style="border-left:solid 2px #000; border-bottom:solid 2px #000;"><i>Contrato</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Tipo Valor</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000; "><i>Emisora</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Mes Anterior</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Mes Actual</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Valor en libros</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Precio al FECHA</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Valor Actual</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Plusvalia Informativa</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000; border-right:solid 2px #000; "><i>% Portafolio</i></td>
            </tr>
            <% 
                for(int i=0;i<IDContrato.size();i++)
                {%>
                <tr>
                    <td align="right" style="border-left:solid 2px #000; "><%=IDContrato.get(i)%></td>
                    <td align="left" style="padding-left:20px; "><%=IDTipoVal.get(i)%></td>
                    <td align="left" style="padding-left:20px;  "><%=IDEmisora.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=IDMesante.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=IDMesactu.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=IDValorLib.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=IDPrecioAl.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=IDValorAct.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=IDPlusVinf.get(i)%></td>
                    <td align="right" style="padding-left:20px; border-right:solid 2px #000; "><%=decFormat.format(Double.parseDouble(IDPorceport.get(i)))%></td>
                </tr>
            <%}%>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;" colspan="5"><b>&nbsp; TOTAL S.I. DE DEUDA</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp; $<%=decFormat.format(totalIDVL)%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" colspan="2" align="right"><b>&nbsp; $<%=decFormat.format(totalVA)%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp; $<%=decFormat.format(totalPV)%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " align="right"><b>&nbsp; <%=decFormat.format(totalPorcID)%></b></td>
            </tr>
            <%}%>
            </table>
            <%if(EMercaDine==1){%>
            <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td colspan="3" style="border-left:solid 2px #000;"><b>&nbsp; Mercado de Dinero</b></td>
                <td colspan="2" align="middle" ><i>Titulos</i></td>
                <td colspan="8" style="border-right:solid 2px #000;"><b>&nbsp;</b></td>
            </tr>
            <tr><td colspan="13" style="background-color:#e3eaff; border-left:solid 2px #000; border-right:solid 2px #000;">&nbsp;</td></tr>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="middle" style="border-left:solid 2px #000; border-bottom:solid 2px #000;"><i>Contrato</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Tipo Valor</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000; "><i>Emisora</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Mes Anterior</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Mes Actual</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>F. adquisicion</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>F. vencimiento</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Precio al FECHA</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Valor Actual</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>% Tasa</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Dias por vencer</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>% GAT</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000; border-right:solid 2px #000; "><i>%Portafolio</i></td>
            </tr>
             <% for(int i=0;i<MDContrato.size();i++)
                {%>
                <tr>
                    <td align="right" style="border-left:solid 2px #000; "><%=MDContrato.get(i)%></td>
                    <td align="left" style="padding-left:20px; "><%=MDTipoVal.get(i)%></td>
                    <td align="left" style="padding-left:20px;  "><%=MDEmisora.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=MDMesante.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=MDMesactu.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=MDFadqui.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=MDFvenci.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=MDPrecioAl.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=MDValorAct.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=MDPorcTasa.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=MDDiasporven.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=MDPorcgat.get(i)%></td>
                    <td align="right" style="padding-left:20px; border-right:solid 2px #000; "><%=decFormat.format(Double.parseDouble(MDPorcport.get(i)))%></td>
                </tr>
                <%}%>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;" colspan="8"><b>&nbsp; TOTAL MERCADO DE DINERO</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;$<%=decFormat.format(totalVAM)%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " align="right" colspan="4" ><b>&nbsp;<%=decFormat.format(totalPorcPortM)%></b></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <!--Instrumentos Capitales-->
        
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="10" height="16"><b>Detalle de Inversiones Moneda Nacional</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="10" class="divider"><hr /></td>
            <%if(EInsCapi==1){%>
            <tr colspan="10" style="background-color:#7b97cf; ">
                <td colspan="4" style="border-left:solid 2px #000; border-top:solid 2px #000;">Instrumentos Capitales</td>
                <td colspan="3" align="right" style="border-top:solid 2px #000;" >$<%=decFormat.format(totalIC)%></td>
                <td colspan="3" align="middle" style="border-top:solid 2px #000; border-right:solid 2px #000;"><%=decFormat.format(totalPorcIC)%></td>
            </tr>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td colspan="3" style="border-left:solid 2px #000;"><b>&nbsp; S.I. DE RENTA</b></td>
                <td colspan="2" align="middle" ><i>Titulos</i></td>
                <td colspan="5" style="border-right:solid 2px #000;"><b>&nbsp;</b></td>
            </tr>
            <tr><td colspan="10" style="background-color:#e3eaff; border-left:solid 2px #000; border-right:solid 2px #000;">&nbsp;</td></tr>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="middle" style="border-left:solid 2px #000; border-bottom:solid 2px #000;"><i>Contrato</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Tipo Valor</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000; "><i>Emisora</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Mes Anterior</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Mes Actual</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Valor en libros</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Precio al FECHA</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Valor Actual</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Plusvalia Informativa</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000; border-right:solid 2px #000; "><i>%Portafolio</i></td>
            </tr>
            <% 
                for(int i=0;i<ICContrato.size();i++)
                {%>
                <tr>
                    <td align="right" style="border-left:solid 2px #000; "><%=ICContrato.get(i)%></td>
                    <td align="left" style="padding-left:20px; "><%=ICTipoVal.get(i)%></td>
                    <td align="left" style="padding-left:20px;  "><%=ICEmisora.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=ICMesante.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=ICMesactu.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=ICValorLib.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=ICPrecioAl.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=ICValorAct.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=ICPlusVinf.get(i)%></td>
                    <td align="right" style="padding-left:20px; border-right:solid 2px #000; "><%=decFormat.format(Double.parseDouble(ICPorceport.get(i)))%></td>
                </tr>
            <%}%>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;" colspan="5"><b>&nbsp; TOTAL S.I. DE RENTA</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp; $<%=decFormat.format(totalICVL)%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" colspan="2" align="right"><b>&nbsp; $<%=decFormat.format(totalICVA)%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp; $<%=decFormat.format(totalICPI)%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " align="right"><b>&nbsp; <%=decFormat.format(totalICPP)%></b></td>
            </tr>
            <%}%>
            </table>
            <%if(EMerCapi==1){%>
            <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td colspan="3" style="border-left:solid 2px #000;"><b>&nbsp; Mercado de Capitales</b></td>
                <td colspan="2" align="middle" ><i>Titulos</i></td>
                <td colspan="8" style="border-right:solid 2px #000;"><b>&nbsp;</b></td>
            </tr>
            <tr><td colspan="13" style="background-color:#e3eaff; border-left:solid 2px #000; border-right:solid 2px #000;">&nbsp;</td></tr>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="middle" style="border-left:solid 2px #000; border-bottom:solid 2px #000;"><i>Contrato</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Tipo Valor</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000; "><i>Emisora</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Mes Anterior</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Mes Actual</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Valor en Libros</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Precio al FECHA</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Valor Actual</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;"><i>Plusvalia Informativa</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000; border-right:solid 2px #000; "><i>%Portafolio</i></td>
            </tr>
             <% for(int i=0;i<MCContrato.size();i++)
                {%>
                <tr>
                    <td align="right" style="border-left:solid 2px #000; "><%=MCContrato.get(i)%></td>
                    <td align="left" style="padding-left:20px; "><%=MCTipoVal.get(i)%></td>
                    <td align="left" style="padding-left:20px;  "><%=MCEmisora.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=MCMesante.get(i)%></td>
                    <td align="right" style="padding-left:20px; "><%=MCMesactu.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=MCValorLib.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=MCPrecioAl.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=MCValorAct.get(i)%></td>
                    <td align="right" style="padding-left:20px; ">$<%=MCPlusVinf.get(i)%></td>
                    <td align="right" style="padding-left:20px; border-right:solid 2px #000; "><%=decFormat.format(Double.parseDouble(MCPorceport.get(i)))%></td>
                </tr>
                <%}%>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;" colspan="6"><b>&nbsp; TOTAL MERCADO DE CAPITALES</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;$<%=decFormat.format(totalMCVL)%></b></td>
                
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;$<%=decFormat.format(totalMCVA)%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;$<%=decFormat.format(totalMCPI)%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " align="right"><b>&nbsp;<%=decFormat.format(totalMCPP)%></b></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <%if(EBienFid==1){%>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="5"><b>Detalle de Bienes Fideicomitidos</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="5" class="divider"><hr /></td>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="left" style="border-left:solid 2px #000; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Tipo</i></td>
                <td align="left" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Descripcion</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;"><i>Valor de Mercado</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;"><i>% VM</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;border-right:solid 2px #000;"><i>Plusvalia Informativa</i></td>
            </tr>
            <% for(int i=0;i<BFTipo.size();i++)
                {%>
            <tr>
                <td align="right" style="border-left:solid 2px #000; "><%=BFTipo.get(i)%></td>
                <td align="left" style="padding-left:20px; "><%=BFDesc.get(i)%></td>
                <td align="right" style="padding-left:20px;  ">$<%=decFormat.format(Double.parseDouble(BFValorMerca.get(i)))%></td>
                <td align="right" style="padding-left:20px; "><%=decFormat.format(Double.parseDouble(BFPorcvm.get(i)))%></td>
                <td align="right" style="padding-left:20px; border-right:solid 2px #000; "><%=decFormat.format(Double.parseDouble(BFPlusinfo.get(i)))%></td>
            </tr>
             <%}%>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;" colspan="2"><b>&nbsp; TOTAL DE BIENES FIDEICOMITIDOS</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp; $<%=decFormat.format(totalVM)%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " coslpan="2" align="right"><b>&nbsp; $<%=decFormat.format(totalPI)%></b></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <%if(EMovMesMN==1){%>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="6"><b>Detalle de Movimientos del Mes del Contrato Moneda Nacional</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="5" class="divider"><hr /></td>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="left" style="border-left:solid 2px #000; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Oper/Liq</i></td>
                <td align="left" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Folio</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;"><i>Descripci&oacute;n</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;"><i>Cargo</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;"><i>Abono</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;border-right:solid 2px #000;"><i>Saldo</i></td>
            </tr>
            <% for(int i=0;i<MMCMNOperLiq.size();i++)
                {%>
            <tr>
                <td align="right" style="border-left:solid 2px #000; "><%=MMCMNOperLiq.get(i)%></td>
                <td align="left" style="padding-left:20px; "><%=MMCMNFolio.get(i)%></td>
                <td align="right" style="padding-left:20px;  "><%=MMCMNDesc.get(i)%></td>
                <td align="right" style="padding-left:20px; "><%=MMCMNCargo.get(i)%></td>
                <td align="right" style="padding-left:20px; "><%=MMCMNAbono.get(i)%></td>
                <td align="right" style="padding-left:20px; border-right:solid 2px #000; "><%=MMCMNSaldo.get(i)%></td>
            </tr>
             <%}%>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;" colspan="2"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " coslpan="2" align="right"><b>&nbsp;</b></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <%if(EMovMesDL==1){%>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="6"><b>Detalle de Movimientos del Mes del Contrato D&oacute;lares</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="5" class="divider"><hr /></td>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="left" style="border-left:solid 2px #000; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Oper/Liq</i></td>
                <td align="left" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Folio</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;"><i>Descripci&oacute;n</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;"><i>Cargo</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;"><i>Abono</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;border-right:solid 2px #000;"><i>Saldo</i></td>
            </tr>
            <% for(int i=0;i<MMCDLRSOperLiq.size();i++)
                {%>
            <tr>
                <td align="right" style="border-left:solid 2px #000; "><%=MMCDLRSOperLiq.get(i)%></td>
                <td align="left" style="padding-left:20px; "><%=MMCDLRSFolio.get(i)%></td>
                <td align="right" style="padding-left:20px;  "><%=MMCDLRSDesc.get(i)%></td>
                <td align="right" style="padding-left:20px; "><%=MMCDLRSCargo.get(i)%></td>
                <td align="right" style="padding-left:20px; "><%=MMCDLRSAbono.get(i)%></td>
                <td align="right" style="padding-left:20px; border-right:solid 2px #000; "><%=MMCDLRSSaldo.get(i)%></td>
            </tr>
             <%}%>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;" colspan="2"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="right"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " coslpan="2" align="right"><b>&nbsp;</b></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <%if(ESitFin==1){%>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="5"><b>Estado de Situaci&oacute;n Financiera</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="3" class="divider"><hr /></td>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="left" style="border-left:solid 2px #000; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Descripci&oacute;n</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Activos</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;border-right:solid 2px #000;"><i>Capital</i></td>
            </tr>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">ACTIVO</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <!--FILA DE ACTIVOS-->
            <% int axc=0;
                for(int i=0;i<SFActivos.size();i++)
                { axc++;%>
            <tr>
                <td align="left" style="padding-left:20px; border-left:solid 2px #000; "><%=SFDesc.get(i)%></td>
                <td align="middle" style="padding-left:20px; "> $<%=SFActivos.get(i)%></td>
                <td align="right" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <%}%>
            <!--FILA DE ACTIVOS FIN-->
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">PATRIMONIO</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <!--FILA DE PATRIMONIO-->
            <%
                for(int i=axc;i<SFDesc.size();i++)
                {%>
            <tr>
                <td align="left" style="padding-left:20px; border-left:solid 2px #000; "><%=SFDesc.get(i)%></td>
                <td align="middle" style="padding-left:20px; "> &nbsp;</td>
                <td align="right" style="padding-left:20px; border-right:solid 2px #000; ">$<%=SFCapital.get(i)%></td>
            </tr>
            <!--FILA DE PATRIMONIO-->
            <!-- <tr>
                <td align="left" style="border-left:solid 2px #000; ">Resultados del ejercicio</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">Resultados del Mes</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr> -->
            <%}%>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;"><b>&nbsp; TOTAL DE ESTADO DE SITUACION FINANCIERA</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="middle"><b>&nbsp; $<%=totalAC%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " align="right"><b>&nbsp; $<%=totalCap%></b></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <%if(ESitFinDlr==1){%>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="5"><b>Estado de Situaci&oacute;n Financiera D&oacute;lares</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="3" class="divider"><hr /></td>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="left" style="border-left:solid 2px #000; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Descripci&oacute;n</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Activos</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;border-right:solid 2px #000;"><i>Capital</i></td>
            </tr>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">ACTIVO</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <!--FILA DE ACTIVOS-->
            <% int axcsf=0;
                for(int i=0;i<SFDLRSActivos.size();i++)
                { axcsf++;%>
            <tr>
                <td align="left" style="padding-left:20px; border-left:solid 2px #000; "><%=SFDLRSDesc.get(i)%></td>
                <td align="middle" style="padding-left:20px; "> $<%=SFDLRSActivos.get(i)%></td>
                <td align="right" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <%}%>
            <!--FILA DE ACTIVOS FIN-->
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">PATRIMONIO</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <!--FILA DE PATRIMONIO-->
            <%
                for(int i=axcsf;i<SFDLRSDesc.size();i++)
                {%>
            <tr>
                <td align="left" style="padding-left:20px; border-left:solid 2px #000; "><%=SFDLRSDesc.get(i)%></td>
                <td align="middle" style="padding-left:20px; "> &nbsp;</td>
                <td align="right" style="padding-left:20px; border-right:solid 2px #000; ">$<%=SFDLRSCapital.get(i)%></td>
            </tr>
            <!--FILA DE PATRIMONIO-->
            <!-- <tr>
                <td align="left" style="border-left:solid 2px #000; ">Resultados del ejercicio</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">Resultados del Mes</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr> -->
            <%}%>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;"><b>&nbsp; TOTAL DE ESTADO DE SITUACION FINANCIERA</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="middle"><b>&nbsp; $<%=totalAC%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " align="right"><b>&nbsp; $<%=totalCap%></b></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <%if(EEdoRes == 1){%>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="5"><b>Estado de Resultados</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="4" class="divider"><hr /></td>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="left" style="border-left:solid 2px #000; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Descripci&oacute;n</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Ingresos</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Egresos</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;border-right:solid 2px #000;"><i>Resultados del Ejercicio</i></td>
            </tr>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">INGRESOS</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <% int axcer=0;
                for(int i=0;i<ERIng.size();i++)
                { axcer++;%>
                    <tr>
                        <td align="left" style="border-left:solid 2px #000; "><%=ERDesc.get(i)%></td>
                        <td align="left" style="padding-left:20px; "><%=ERIng.get(i)%></td>
                        <td align="left" style="padding-left:20px; ">&nbsp;</td>
                        <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
                    </tr>
            <%}%>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">EGRESOS</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <%
                for(int i=axcer;i<ERDesc.size();i++)
                {%>
                    <tr>
                        <td align="left" style="border-left:solid 2px #000; "><%=ERDesc.get(i)%></td>
                        <td align="left" style="padding-left:20px; ">&nbsp;</td>
                        <td align="left" style="padding-left:20px; "><%=EREgr.get(i)%></td>
                        <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
                    </tr>
            <%}%>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">Resultados del Mes</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">$<%=totalRE%></td>
            </tr>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;"><b>&nbsp; TOTAL ESTADO DE RESULTADOS</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="middle"><b>&nbsp; $<%=totalIng%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="middle"><b>&nbsp; $<%=totalEg%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " align="right"><b>&nbsp; $<%=totalRE%></b></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <%if(EEdoResDlr == 1){%>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="5"><b>Estado de Resultados D&oacute;lares</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="4" class="divider"><hr /></td>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="left" style="border-left:solid 2px #000; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Descripci&oacute;n</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Ingresos</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Egresos</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;border-right:solid 2px #000;"><i>Resultados del Ejercicio</i></td>
            </tr>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">INGRESOS</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <% int axcerd=0;
                for(int i=0;i<ERDLRIng.size();i++)
                { axcerd++;%>
                    <tr>
                        <td align="left" style="border-left:solid 2px #000; "><%=ERDLRDesc.get(i)%></td>
                        <td align="left" style="padding-left:20px; "><%=ERDLRIng.get(i)%></td>
                        <td align="left" style="padding-left:20px; ">&nbsp;</td>
                        <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
                    </tr>
            <%}%>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">EGRESOS</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
            <%
                for(int i=axcerd;i<ERDLRDesc.size();i++)
                {%>
                    <tr>
                        <td align="left" style="border-left:solid 2px #000; "><%=ERDLRDesc.get(i)%></td>
                        <td align="left" style="padding-left:20px; ">&nbsp;</td>
                        <td align="left" style="padding-left:20px; "><%=ERDLREgr.get(i)%></td>
                        <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
                    </tr>
            <%}%>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">Resultados del Mes</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; ">&nbsp;</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">$<%=totalRED%></td>
            </tr>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;"><b>&nbsp; TOTAL ESTADO DE RESULTADOS</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="middle"><b>&nbsp; $<%=totalIngD%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="middle"><b>&nbsp; $<%=totalEgD%></b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " align="right"><b>&nbsp; $<%=totalRE%></b></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <%if(EDepEfe == 1){%>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="2"><b>Dep&oacute;sitos en Efectivo</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="2" class="divider"><hr /></td>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="left" style="border-left:solid 2px #000; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Periodo</i></td>
                <td align="right" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;border-right:solid 2px #000;"><i>Total Dep&oacute;sitos</i></td>
            </tr>
            <tr>
                <td align="left" style="border-left:solid 2px #000; ">Del Mes</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; ">&nbsp;</td>
            </tr>
             <%
                for(int i=0;i<DEPer.size();i++)
                {%>
            <tr>
                <td align="left" style="border-left:solid 2px #000; "><%=DEPer.get(i)%></td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; "><%=DETotal.get(i)%></td>
            </tr>
            <%}%>
            <tr>
                <td align="left" style="border-left:solid 2px #000; border-bottom:solid 2px #000;">Acumulado del a&ntilde;o</td>
                <td align="left" style="padding-left:20px; border-right:solid 2px #000; border-bottom:solid 2px #000;"><%=totalDp%></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <%if(EComCob == 1){%>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="right" colspan="5"><b>Comisiones Cobradas</b></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <td colspan="4" class="divider"><hr /></td>
            <tr style="background-color:#e3eaff; border:solid 2px #000;">
                <td align="left" style="border-left:solid 2px #000; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Concepto</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>Comisi&oacute;n</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000;border-top:solid 2px #000;"><i>IVA</i></td>
                <td align="middle" style="padding-left:20px; border-bottom:solid 2px #000; border-top:solid 2px #000;border-right:solid 2px #000;"><i>Total</i></td>
            </tr>
            <%
                for(int i=0;i<CCConcepto.size();i++)
                {%>
            <tr>
                <td style="border-left:solid 2px #000;"><b><%=CCConcepto.get(i)%></b></td>
                <td  align="middle"><b><%=CCComision.get(i)%></b></td>
                <td  align="middle"><b><%=CCIva.get(i)%></b></td>
                <td style="border-right:solid 2px #000; " align="right"><b><%=CCTotal.get(i)%></b></td>
            </tr>
            <%}%>
            <tr>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-left:solid 2px #000;"><b>&nbsp; TOTAL COMISIONES</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="middle"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000;" align="middle"><b>&nbsp;</b></td>
                <td style="border-top:solid 2px #000; border-bottom:solid 2px #000; border-right:solid 2px #000; " align="right"><b><%=totalCC%></b></td>
            </tr>
        </table>
        <%}%>
        <br/>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="left" style="background-color:#000a4b; color:white;border-top:solid 2px #000; border-radius: 15px 15px 0px 0px; border-left:solid 2px #000; border-right:solid 2px #000;" colspan="3" valign="middle"><h3><b> &nbsp; Avisos Importantes</b></h3></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;" width="1.5%">&nbsp;</td>
                <td  align="middle" valing="center" width="97%"><b>&nbsp;</b></td>
                <td style="border-right:solid 2px #000;" width="1.5%">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;">&nbsp;</td>
                <td  align="middle" valing="middle" style=" text-align:justify"><b>Cualquier aclaraci&oacute;n relacionada con la informaci&oacute;n contenida en el presente estado de cuenta, deber&eacute; ser notificada a nuestra Unidad Especializada de Atenci&oacute;n al P&uacute;blico al tel&eacute;fono
11036699 o 01800 705 5555 o por correo electr&oacute;nico a la direcci&oacute;n unidad@actinver.com.mx dentro de los 60 (sesenta) días naturales siguientes a su fecha de corte, de lo contrario se
tendr&eacute;n por aceptadas y consentidas las posiciones de valores, los movimientos y los saldos que este contiene. Sin perjuicio de anterior, usted podr&eacute; presentar su reclamaci&oacute;n en los
t&eacute;rminos de la regulaci&oacute;n aplicable ante CONDUSEF,Comisi&oacute;n Nacional para la Protecci&oacute;n y Defensa de los Usuarios de Servicios Financieros al tel&eacute;fono 53400999 o 018009998080 o a trav&eacute;s
de la p&eacute;gina www.condusef.gob.mx</b></td>
                <td style="border-right:solid 2px #000;">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-bottom:solid 2px #000; border-left:solid 2px #000;">&nbsp;</td>
                <td style="border-bottom:solid 2px #000;" align="middle" valing="center"><b>&nbsp;</b></td>
                <td style="border-bottom:solid 2px #000; border-right:solid 2px #000;">&nbsp;</td>
            </tr>
        </table>
        <br/>
        <table cellpadding="0" cellspacing="0" width="1700" style="padding-left:20px; padding-right:15px;">
            <tr>
                <td align="left" style="background-color:#000a4b; color:white;border-top:solid 2px #000; border-radius: 15px 15px 0px 0px; border-left:solid 2px #000; border-right:solid 2px #000;" colspan="3" valign="middle"><h3><b> &nbsp; Abreviaturas</b></h3></td>
                <!-- <td>&nbsp;</td> -->
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;" width="1.5%">&nbsp;</td>
                <td  align="middle" valing="center" width="97%"><b>&nbsp;</b></td>
                <td style="border-right:solid 2px #000;" width="1.5%">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;">&nbsp;</td>
                <td  align="left" valing="middle"><b>I. S. R. Retenido = Impuesto Sobre la Renta Retenido</b></td>
                <td style="border-right:solid 2px #000;">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;">&nbsp;</td>
                <td  align="left" valing="middle"><b>Excedente en T&eacute;rminos de la LIDE = Excedente en T&eacute;rminos de la Ley de Impuesto de Dep&oacute;sitos en Efectivo</b></td>
                <td style="border-right:solid 2px #000;">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;">&nbsp;</td>
                <td  align="left" valing="middle"><b>IDE Determinado = Impuesto Dep&oacute;sitos en Efectivo Retenido</b></td>
                <td style="border-right:solid 2px #000;">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;">&nbsp;</td>
                <td  align="left" valing="middle"><b>IDE Recaudado = Impuesto Dep&oacute;sitos en Efectivo Recaudado</b></td>
                <td style="border-right:solid 2px #000;">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;">&nbsp;</td>
                <td  align="left" valing="middle"><b>IDE Pendiente por Recaudar = Impuestos Dep&oacute;sitos en Efectivo Pendiente</b></td>
                <td style="border-right:solid 2px #000;">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;">&nbsp;</td>
                <td  align="left" valing="middle"><b>Remanente de IDE Recaudado de Períodos Anteriores = Remanente de Impuesto Deposito en Efectivo Recaudado en Periodos Anteriores</b></td>
                <td style="border-right:solid 2px #000;">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;">&nbsp;</td>
                <td  align="left" valing="middle"><b>I. V. A. = Impuesto al Valor Agregadov</b></td>
                <td style="border-right:solid 2px #000;">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;">&nbsp;</td>
                <td  align="left" valing="middle"><b>Nos deposit&oacute; SBC = Nos deposit&oacute; salvo buen cobro</b></td>
                <td style="border-right:solid 2px #000;">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-left:solid 2px #000;">&nbsp;</td>
                <td  align="left" valing="middle"><b>I.V.A. Cuota integral = Impuesto al Valor Agregado Cuota Integral</b></td>
                <td style="border-right:solid 2px #000;">&nbsp;</td>
            </tr>
            <tr>
                <td style="border-bottom:solid 2px #000; border-left:solid 2px #000;">&nbsp;</td>
                <td style="border-bottom:solid 2px #000;" align="middle" valing="center"><b>&nbsp;</b></td>
                <td style="border-bottom:solid 2px #000; border-right:solid 2px #000;">&nbsp;</td>
            </tr>
        </table>
        
        <script type="text/javascript">
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chartdiv", am4charts.PieChart3D);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
            
            //chart.legend = new am4charts.Legend();
            chart.data = [{}];
            
            var porcEfe= <%=(totalEFEA*100)/Double.parseDouble(mesactu)%>;
            if(porcEfe != 0.0){
                var obj={concepto: "Efectivo F.",porcentaje: porcEfe};
                chart.data.push(obj);
            }
            var porcDeuda= <%=(totalVA*100)/Double.parseDouble(mesactu)%>;
            if(porcDeuda != 0.0){
                var obj={concepto: "Deuda",porcentaje: porcDeuda};
                chart.data.push(obj);
            }
            var porcMercado= <%=(totalVAM*100)/Double.parseDouble(mesactu)%>;
            if(porcMercado != 0.0){
                var obj={concepto: "Mercado",porcentaje: porcMercado};
                chart.data.push(obj);
            }
            var porcRenta= <%=(totalICVA*100)/Double.parseDouble(mesactu)%>;
            if(porcRenta != 0.0){
                var obj={concepto: "Renta",porcentaje: porcRenta};
                chart.data.push(obj);
            }
            var porcCapitales= <%=(totalMCVA*100)/Double.parseDouble(mesactu)%>;
            if(porcCapitales != 0.0){
                var obj={concepto: "Capitales",porcentaje: porcCapitales};
                chart.data.push(obj);
            }
            var porcBienes= <%=(totalVM*100)/Double.parseDouble(mesactu)%>;
            if(porcBienes != 0.0){
                var obj={concepto: "Bienes F.",porcentaje: porcBienes};
                chart.data.push(obj);
            }
            var porcEfel= <%=(totalEFELA*100)/Double.parseDouble(mesactu)%>;
            if(porcEfel != 0.0){
                var obj={concepto: "Efectivo L.",porcentaje: porcEfel};
                chart.data.push(obj);
            }
            
            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "porcentaje";
            series.dataFields.category = "concepto";
            
            var licObj = $('g[fill="#ffffff"]').parentElement.children[1];
            licObj.removeChild(licObj.children[1]);
        </script>
    </body>
</html>