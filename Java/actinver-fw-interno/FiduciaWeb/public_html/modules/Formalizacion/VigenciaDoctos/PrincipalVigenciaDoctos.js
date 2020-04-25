//***DEFINICON DE LOS BEANS**************************************************************************************************************
var cat = new Catalogo("mx.com.inscitech.fiducia.domain.FDocvig");

//***VARIABLES GLOBALES******************************************************************************************************************
var origen = 0;

var OPER_ALTA = 1;
var OPER_MODIFICAR = 2;
var OPER_CONSULTAR = 3;
var OPER_CONSULTARPR = 4;

var modo2 = 0;
var pkProsp2 = null;
var clavesCombo27 = JSON.parse("{\"llaveClave\":27}");
var clavesCombo1006 = JSON.parse("{\"llaveClave\":1006}");

var fechaDefault = new Date();

function setFechaCal() {
}

function isValidDate(date) {
    var today = new Date();
    if (date < today)
        return true;
    else 
        return false;
}

var fvCat = new FormValidator("frmDatos");
var strIdPK = "fdocNumVigSeq";//"PRS_NUM_PROSPECT", "PRC_TIPO_CUENTAS", "PRC_NUM_CUENTAS", "PRC_BANCO"
//var arrIdPK = strIdPK.split(",");
var verificaExistenciaHijDoc = JSON.parse("{\"id\":\"verificaExistenciaHijDoc\",\"numDocto\":0}");
var objDatosFideicom = new Object();
var paramsQryDocumentsCbo;
var paramsQryDocumentsCbo2;
var tipoper;
//***DEFINICION DEL CONTENIDO DE TABLAS DE CONSULTA**************************************************************************************
//[{"numProspecto":1,"prcBanco":168,"prcNumCuentas":2,"prcTipoCuentas":1,"prsIdCuentas":1}]
var arrTblDatProsp = new Array();
arrTblDatProsp[0] = "fdocNumVigSeq,60";
arrTblDatProsp[1] = "fdocIdDocumentovig,60";
arrTblDatProsp[2] = "fdocIdDocumentovigHijo,60";
arrTblDatProsp[3] = "fdocNombre,300";
arrTblDatProsp[4] = "fdocFechaRenov,150";

function clickTablaProsp(pk) {
    //console.log("Carga de Tabla!");
    pkProsp2 = pk;
    cloneObject(pk, cat.getCatalogo());
}
var vgnumProspect;

function cargaMantenimientoCuentas(Modo) {
    modo = Modo;
    if ((isDefinedAndNotNull(pkProsp2) || Modo == OPER_ALTA) && Modo != OPER_BAJA) {
        //alert(Modo + "Pantalla Alta");
        //showWaitLayer();
        objDatosFideicom = new Object();
        objDatosFideicom.numProy = GI("paramnumProyec").value;
        objDatosFideicom.numPers = GI("paramnumPersona").value;
        objDatosFideicom.TipoPers = GI("paramTipoPer").value;
        origen=GI("pantORIG").value;
        var urlCliente = "modules/Formalizacion/VigenciaDoctos/MantenimientoVigenciaDoctos.do";
        makeAjaxRequest(urlCliente, "HTML", despliegaPantallaMantenimientoCuentas, objDatosFideicom);
    }
    else if (isDefinedAndNotNull(pkProsp2) && Modo == OPER_BAJA) {
        //alert(Modo + " X");
        ejecutaOperacionCuenta();
    }
}

function despliegaPantallaMantenimientoCuentas(obj, result) {
    GI("dvPantalla").innerHTML = result;
    
    //initForms();

    
    //alert(JSON.stringify(obj));
    GI("fdocIdAnteproy").value = obj.numProy;
    GI("fdocNumPer").value = obj.numPers;
    GI("fdocTipoPer").value = obj.TipoPers;
    switch (obj.TipoPers) {
        /*'FISICA NACIONAL',30001,'MORAL NACIONAL',30002,'FISICA EXTRANJERA',30003,'MORAL EXTRANJERA',30004
                    ,'FIDEICOMISOS',30006,'COMITE TECNICO',30007,'ADMINISTRADOR',30008,'SUSTITUCION FIDUCIARIA',30009
                    ,'REGIMEN SIMPLIFICADO',30010,'SUCESION TESTAMENTARIA',30011,30005*/
        case "FISICA NACIONAL":
            tipoper = 30001;
            break;
        case "MORAL NACIONAL":
            tipoper = 30002;
            break;
        case "FISICA EXTRANJERA":
            tipoper = 30003;
            break;
        case "MORAL EXTRANJERA":
            tipoper = 30004;
            break;
        case "FIDEICOMISOS":
            tipoper = 30006;
            break;
        case "COMITE TECNICO":
            tipoper = 30007;
            break;
        case "ADMINISTRADOR":
            tipoper = 30008;
            break;
        case "SUSTITUCION FIDUCIARIA":
            tipoper = 30009;
            break;
        case "REGIMEN SIMPLIFICADO":
            tipoper = 30010;
            break;
        case "SUCESION TESTAMENTARIA":
            tipoper = 30011;
            break;
        default :
            alert("No esta definido el tipo de persona");
            break;
    }
    Calendar.setup( {
        inputField : "fdocFechaRenov", // id of the input field
        button : "fdocFechaRenov", ifFormat : "%d/%m/%Y", //"%a %e/%b/%Y",       // format of the input field
        showsTime : false, timeFormat : "24", onUpdate : setFechaCal, disableFunc : isValidDate, date : fechaDefault, weekNumbers : false, cache : true, step : 1
    });
    
    paramsQryDocumentsCbo = JSON.parse("{\"numOper\":\"" + tipoper + "\",\"numEtapa\":\"" + eval(9) + "\"}");
    //deshabilitaPK("pacNumCto");
    initForms();

    /*fvCat.setup({
        formName      : "frmDatos",
        tipoAlert     : 1,
        alertFunction : BaloonAlert,
        sendObjToAlert: true
    });*/
    if (modo == OPER_CONSULTAR || modo == OPER_MODIFICAR) {
        deshabilitaPK(arrIdPK);
        if (modo == OPER_CONSULTAR) {
            deshabilitaObjetos(GI("frmDatos"));
            GI("cmdCancelar").value = "Regresar";
            muestraObj("cmdCancelar");
        }
    }
    if (modo == OPER_ALTA || modo == OPER_MODIFICAR)
        muestraObjs("cmdAceptar,cmdCancelar");
}

function cargaPrincipalDirecciones2() {
    showWaitLayer();
    pkProsp2 = null;
    var objDatosFideicomitente = new Object();
    objDatosFideicomitente.NumAnteproy = GI("fdocIdAnteproy").value;
    objDatosFideicomitente.NumPers = GI("fdocNumPer").value;
    objDatosFideicomitente.TipoPers = GI("fdocTipoPer").value;
    var urlCliente = "modules/Formalizacion/VigenciaDoctos/PrincipalVigenciaDoctos.do";
    makeAjaxRequest(urlCliente, "HTML", despliegaPantallaPrincipalDirecciones, objDatosFideicomitente);
}

function ejecutaOperacionCuenta() {
    cat.setOnUpdate(verificaOperacionCuenta);
    if (modo == OPER_ALTA) {
        if (fvCat.checkForm()) {
            //console.log(JSON.stringify(fvCat));
            //alert("Alta de catalogo");
            //showWaitLayer();
            cat.altaCatalogo(true);
        }
    }
    else if (modo == OPER_BAJA) {
        showWaitLayer();
        cat.bajaCatalogo(false);
    }
}

function actualizaDoctos() {

}

function verificaOperacionCuenta() {
    alert("Operacion realizada exitosamente!");
    if (modo == OPER_BAJA)
        consultar(GI("cmdRegresar"), GI("frmDatos"), false);
    else 
        cargaPrincipalDirecciones2();
    hideWaitLayer();
}

function regresar() {
    var x = origen;
    
    //alert("Pant Orig:"+x);
    switch (x) {
        case "1":
            cargaPrincipalProspectosFideicomitentes();
            break;
        case "2":
            cargaPrincipalProspectosFideicomisarios();
            break;
        case "3":
            cargaPrincipalProspectosFideicomitentesO();
            break;
    }
}

function cargaTablaParaDocumentos() {
    verificaExistenciaHijDoc.numDocto = GI("fdocIdDocumentovig").value;
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(verificaExistenciaHijDoc);
    //alert(url)
    makeAjaxRequest(url, "HTML", verificarDoctHijo, null);
}

function verificarDoctHijo(obj, result) {
    var objResult = JSON.parse(result);

    if (objResult[0].existeRegistro > 0) {
        //alert(GI("cboNombre").value)
        //alert(pkInfoCharSol.insNumOper)
        paramsQryDocumentsCbo2 = JSON.parse("{\"numOper\":\"" + tipoper + "\",\"numEtapa\":\"" + eval(9) + "\",\"DocPadre\":\"" + eval(GI("fdocIdDocumentovig").value) + "\"}");
        //alert(paramsQryDocumentsCbo2)
        SA(GI("fdocIdDocumentovigHijo"), "next", "formsLoaded");
        loadElement(GI("fdocIdDocumentovigHijo"));
    }
    else {
        //NO TIENE HIJOS
        paramsQryDocumentsCbo2 = JSON.parse("{\"numOper\":\"" + tipoper + "\",\"numEtapa\":\"" + eval(9) + "\",\"DocPadre\":\"" + eval(0) + "\"}");
        //alert("OPC2"+paramsQryDocumentsCbo2)
        SA(GI("fdocIdDocumentovigHijo"), "next", "formsLoaded");
        loadElement(GI("fdocIdDocumentovigHijo"));
        /*vgContenedorDatos = null;
        vgContenedorDatos = new Object();
        vgContenedorDatos.tipo = 2
        vgContenedorDatos.perfil = txtPerfil;
        eval(pkInfoCharSol.insNumOper) == null ? vgContenedorDatos.numOper = 0 : vgContenedorDatos.numOper = pkInfoCharSol.insNumOper;
        vgContenedorDatos.fiso = pkInfoCharSol.insNumContrato
        vgContenedorDatos.numfolio = GI("insNumFolioInst").value;
        vgContenedorDatos.documento = GI("cboNombre").value;
        despliegaTabla(GI("tblRegDocumentos"), vgContenedorDatos);*/
    }
}