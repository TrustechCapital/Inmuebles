var catFideicomitentes = new Catalogo("mx.com.inscitech.fiducia.domain.Fideicom");

showWaitLayer();

var clavesCombo16 = JSON.parse("{\"llaveClave\":16}");
var clavesCombo23 = JSON.parse("{\"llaveClave\":23}");
var clavesCombo31 = JSON.parse("{\"llaveClave\":31}");

var contenedor = new Object();

initForms();

var tablaFideicomitentesData = new Array();
tablaFideicomitentesData[0] = "fidNumContrato,100px";
tablaFideicomitentesData[1] = "fidNomFideicom,300px";
tablaFideicomitentesData[2] = "fidCveStFideico,90px";

var operacion = 0;
var numPantalla = 0;
var modo = 0;
pkInfo = null;
var fvCat = new FormValidator();

//////////////////////////////////////////////////////////////////////////////
//Funciones para la primera pantalla
function cargaPrincipalFideicomitentes() {
    onButtonClickPestania("Administracion.PrincipalFideicomitentes", "");
}

function clickTabla(pk) {
    pkInfo = pk;
    cloneObject(pk, catFideicomitentes.getCatalogo());
}

function limpiar(objForma) {
    RF(objForma);
    catFideicomitentes = new Catalogo("mx.gob.nafin.fiduciario.domain.Fideicom");
    asignaEtiqueta("nomFideicomiso", "");
    pkInfo = null;
}

function operacionExitosa() {
    alert("La operaci\u00F3n se realiz\u00F3 correctamente");
    cargaPrincipalFideicomitentes();
    hideWaitLayer();
}

function operacionExitosaKYC() {
    alert("La operaci\u00F3n se realiz\u00F3 correctamente");
    //cargaPrincipalFideicomitentes();
    ocultaObjs("cmdAceptar");//Mostrar el bot\u00F3n Aceptar y Cancelar
    SA(GI("cmdCancelar"), "value", "Regresar");//Colocar la leyenda Regresar en vez de Cancelar al bot\u00F3n
    deshabilitaObjetos(GI("frmDatos"));
    cargaCheckList();
    hideWaitLayer();
}

function verificacionActivo() {
    if (GI("paramNumFiso").value != "") {
        var validacionAlta2 = JSON.parse("{\"id\":\"verificaSeaActivo\",\"numContrato\":" + GI("paramNumFiso").value + "}");
        var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta2);
        makeAjaxRequest(url, "HTML", funcionVerificacionActivo, null);
    }
    else 
    asignaEtiqueta("nomFideicomiso", "");
}

function funcionVerificacionActivo(obj, result) {
    var objResult = JSON.parse(result);
    if (objResult[0].ctoCveStContrat != 0) {
        alert("El Fideicomiso no est\u00E1 ACTIVO");
        GI("paramNumFiso").value = "";
        asignaEtiqueta("nomFideicomiso", "");
    }
    else 
        consultaNombreFideicomiso("nomFideicomiso", GI("paramNumFiso"));
}
var ALTA = 1;
var OPER_MODIFICAR = 2;
var OPER_CONSULTAR = 3
//////////////////////////////////////////////////////////////////////////////
//Funciones para la segunda pantalla
function cargaMantenimientoFideicomitentes(tipoPantalla) {
    if ((tipoPantalla == OPER_MODIFICAR || tipoPantalla == OPER_CONSULTAR) && pkInfo == null)
        alert("No ha seleccionado campo alguno de la tabla");
    else {
        operacion = tipoPantalla;
        numPantalla = 1;
        showWaitLayer();
        var urlCliente = ctxRoot + "/modules/Administracion/MantenimientoFideicomitentes.do";
        makeAjaxRequest(urlCliente, "HTML", despliegaPantallaMantenimientoFideicomitentes, null);
        loadDynamicJS(ctxRoot + "/modules/Administracion/Direcciones/PrincipalDirecciones.js");
    }
}

function despliegaPantallaMantenimientoFideicomitentes(obj, result) {
    GI("dvPantalla").innerHTML = result;
    initForms();

    //Agregando la funcionalidad del required
    fvCat.setup( {
        formName : "frmDatos", tipoAlert : 1, alertFunction : BaloonAlert, sendObjToAlert : true
    });

    deshabilitaPK("fidFideicomitente".split(","));

    GI('btnViewDoc').style.visibility = 'hidden';
    GI('cboNombre').style.visibility = 'hidden';
}

function loadCatalogo() {
    catFideicomitentes.setOnUpdate(catLoaded);
    if (operacion == OPER_MODIFICAR || operacion == OPER_CONSULTAR)
        catFideicomitentes.buscaCatalogoPK(false);
    else {
        muestraObjs("cmdAceptar,cmdCancelar");//Mostrar el bot\u00F3n Aceptar y Cancelar
        formsLoaded();
    }
}

function catLoaded() {
    if (operacion == OPER_MODIFICAR)//Si se trata de una modificaci\u00F3n, no permitir modificar la PK
    {
        muestraObjs("cmdAceptar");//Mostrar el bot\u00F3n Aceptar
        deshabilitaPK("fidNumContrato".split(","));
    }
    else if (operacion == OPER_CONSULTAR)//Si se trata de una consulta, deshabilitar
    {
        SA(GI("cmdCancelar"), "value", "Regresar");//Colocar la leyenda Regresar en vez de Cancelar al bot\u00F3n
        //muestraObjs("cmdKYC");
        muestraObjs("cmdDirecciones");//Mostrar el bot\u00F3n Regresar
        deshabilitaObjetos(GI("frmDatos"));//Deshabilita objetos (excepto botones)
        var tp = "P" + GI("fidCveTipoPer").value.substring(0, 1) + ((GI("fidNomNacional").value == "MEXICANA") ? "NAC" : "EXT");
        var tipof = 0;
        switch (tp) {
            case "PFNAC":
            //alert("Persona Fisica Nacional 30001");
                tipof = 30001;
                break;
            case "PMNAC":
            //alert("Persona Moral Nacional 30002");
                tipof = 30002;
                break;
            case "PFEXT":
            //alert("Persona Fisica Extranjera 30003");
                tipof = 30003;
                break;
            case "PMEXT":
            //alert("Persona Moral Extranjera 30004");
                tipof = 30004;
                break;
            default :
            //alert("CONTRATOS DE FIDEICOMISO 30000");
                tipof = 30000;
                break;
        }
        paramsQryDocumentsCbo = JSON.parse("{\"Tipo\":\"" + tipof + "\"}");
        //alert(JSON.stringify(paramsQryDocumentsCbo));
        loadElement(GI("cboNombre"));
        GI('btnViewDoc').style.visibility = 'visible';
        GI('cboNombre').style.visibility = 'visible';
        GI('cboNombre').disabled = false;

        cargaCheckList();
    }
    muestraObjs("cmdCancelar");//Mostrar el bot\u00F3n Regresar
    //cargaRadiosConMaster("fidCveSexo","fidCveSexo2,fidCveSexo3");
    consultaNombreFideicomiso('nomFideicomiso', GI("fidNumContrato"));
    formsLoaded();
}

function AltaOModificaInfo() {
    catFideicomitentes.setOnUpdate(operacionExitosaKYC);
    showWaitLayer();

    //VALIDACION DE PORCENTAJES
    vgContenedorDatos = null;
    vgContenedorDatos = JSON.parse("{\"id\":\"funcionPorcentajes\"}");//PRIMERO SE PROCESA LA BITACORA
    vgContenedorDatos.etapa = 'FIDEICOMISO';
    vgContenedorDatos.fiso = eval(GI("fidNumContrato").value);
    vgContenedorDatos.tipopersona = 'FIDEICOMITENTE';
    vgContenedorDatos.porcentaje = eval(GI("fidCurp").value);
    var url = ctxRoot + "/executeRef.do?json=" + JSON.stringify(vgContenedorDatos);
    //alert("1"+url)
    makeAjaxRequest(url, "HTML", ejecutaFuncionPorcentaje, null);
}
var nombre="";
var anteproy="";
var numsec="";

function ejecutaFuncionPorcentaje(tp, result) {
    //alert(result);
    var rusultado = JSON.parse(result);
    var res = rusultado.result
    if (res == 0) {
        if ((operacion == ALTA || operacion == OPER_MODIFICAR) && fvCat.checkForm())//Se trata de una alta
        {
            //catFideicomitentes.altaCatalogo();
            var vgContenedorDatos = null;
            vgContenedorDatos = JSON.parse("{\"id\":\"funcionIncorporaTipoPers\"}");//PRIMERO SE PROCESA LA BITACORA
            vgContenedorDatos.Etapa = 'FIDEICOMISO';
            vgContenedorDatos.NumProyFid = eval(GI("fidNumContrato").value);
            anteproy = eval(GI("fidNumContrato").value);
            vgContenedorDatos.TipoPers = 'FIDEICOMITENTE';
            vgContenedorDatos.NumPers = eval(GI("fidFideicomitente").value);
            numsec = eval(GI("fidFideicomitente").value);
            vgContenedorDatos.Nombre = GI("fidNomFideicom").value;
            nombre = GI("fidNomFideicom").value;
            vgContenedorDatos.CatPersona = GI("fidCveTipoPer").value;
            vgContenedorDatos.Pais = GI("fidNomNacional").value;
            vgContenedorDatos.Calidad = GI("fidCveMigratoria").value;
            vgContenedorDatos.Status = 'PENDIENTE';
            var url = ctxRoot + "/executeRef.do?json=" + JSON.stringify(vgContenedorDatos);
            //alert("2"+url)
            makeAjaxRequest(url, "HTML", ejecutaFuncion, null);
        }
        /*else if (operacion == OPER_MODIFICAR && fvCat.checkForm())//Se trata de una modificaci\u00F3n
        {
            catFideicomitentes.modificaCatalogo();
        }*/
    }
    else if (res == 1) {
        alert("El Porcentaje Total del Fideicomiso supera el 100%, Favor de revisar");
    }
    hideWaitLayer();
}

function ejecutaFuncion(tp, result) {
    //alert(result);
    var rusultado = JSON.parse(result);
    var res = rusultado.result
    if (res == 0) {
        alert("Operacion Realizada Satisfactoriamente");
    }
    else if (res == 1) {
        alert("El Registro ya existe");
    }
    else if (res == 2) {
        alert("Existen Registros PENDIENTES por Autorizar");
    }
    else {
        alert("Ocurrio un error al realizar la Operacion.")
    }
    hideWaitLayer();
    
    //FUNCION PARA ACTUALIZAR NOMBRE
        var objParametros = null;
        objParametros = JSON.parse("{\"id\":\"updNombreFideicom\"}");
        //alert(GI("afbAnteproyecto").value);
        objParametros.anteproy = anteproy;
        objParametros.numpers = numsec;
        objParametros.nomb = nombre;
        var url = ctxRoot + "/doRef.do?json=" + JSON.stringify(objParametros);
        //console.log(url);
        makeAjaxRequest(url, "HTML", respuestaAltaNombre, null);
    
    //onButtonClickPestania("Administracion.PrincipalFideicomitentes", "");
}

function respuestaAltaNombre(obj, result) {
    //alert("aqui")
    var resultado = JSON.parse(result);
    /*console.log(result);
  console.log(obj);*/
    if (isDefinedAndNotNull(resultado) && resultado.codigoError == 0) {
        //alert("Cambio de nombre realizado exitosamente!");
        onButtonClickPestania("Administracion.PrincipalFideicomitentes", "");
    }
    else {
        //alert("Ocurri\u00F3 un error al realizar el cambio de nombre!");
        onButtonClickPestania("Administracion.PrincipalFideicomitentes", "");
    }
}

function eliminarRegistro() {
    if (pkInfo == null)
        alert("No se ha seleccionado campo alguno de la tabla");
    else {
        catFideicomitentes.setOnUpdate(operacionExitosa);
        showWaitLayer();
        eliminaCatalogo(catFideicomitentes);
    }
}

//////////////////////////////////////////////////////////////
function validarPkAlta(objeto) {
    if (objeto.value != "") {
        showWaitLayer();
        var validacionAlta = JSON.parse("{\"id\":\"verificaExistenciaContrato\",\"numContrato\":0}");
        validacionAlta.numContrato = objeto.value;
        var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta);
        makeAjaxRequest(url, "HTML", verificarAlta, objeto);
    }
}

function verificarAlta(obj, result) {
    var objResult = JSON.parse(result);
    if (objResult[0].ctoNumContrato > 0) {
        var validacionAlta2 = JSON.parse("{\"id\":\"verificaSeaActivo\",\"numContrato\":0}");
        validacionAlta2.numContrato = obj.value;
        var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta2);
        makeAjaxRequest(url, "HTML", verificarAlta2, obj);
    }
    else {
        alert("El Fideicomiso no existe, verifique");
        obj.value = "";
        obj.focus();
        hideWaitLayer();
    }
}

function verificarAlta2(obj, result) {
    var objResult = JSON.parse(result);
    if (objResult[0].ctoCveStContrat != 0) {
        alert("El Fideicomiso no est\u00E1 ACTIVO");
        obj.value = "";
        obj.focus();
        hideWaitLayer();
    }
    else {
        consultaNombreFideicomiso('nomFideicomiso', obj);

        //Agregar el número del Fideicomitente (Incremental)
        var SecNumFideicom = JSON.parse("{\"id\":\"numSecFidFideicomitente\",\"NumFiso\":0}");
        SecNumFideicom.NumFiso = obj.value;
        var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(SecNumFideicom);
        makeAjaxRequest(url, "HTML", agregarFideicomitente, obj);
    }
}

function agregarFideicomitente(obj, result) {
    var objResult = JSON.parse(result);
    GI("fidFideicomitente").value = objResult[0].secNumFideicomitente;
    hideWaitLayer();
}

//----------------------------------------- Pantalla de Direcciones de Fideicomitentes
function cargaPrincipalDirecciones() {
    showWaitLayer();
    var objDatosFideicomitente = new Object();
    objDatosFideicomitente.NumContrato = GI("fidNumContrato").value;
    objDatosFideicomitente.NomContrato = GI("nomFideicomiso").innerHTML;
    objDatosFideicomitente.NumFideicomitente = GI("fidFideicomitente").value;
    objDatosFideicomitente.NomFideicomitente = GI("fidNomFideicom").value;
    var urlCliente = "modules/Administracion/Direcciones/PrincipalDirecciones.do";
    makeAjaxRequest(urlCliente, "HTML", despliegaPantallaPrincipalDirecciones, objDatosFideicomitente);
}

function despliegaPantallaPrincipalDirecciones(obj, result) {
    GI("dvPantalla").innerHTML = result;
    deshabilitaObjetos(GI("frmDatos"));
    asignaEtiqueta("nomFideicomiso", obj.NomContrato);
    GI("fidNomFideicom").value = obj.NomFideicomitente;
    GI("paramFideicomiso").value = obj.NumContrato;
    GI("paramFideicom").value = obj.NumFideicomitente;
    consultar(GI("cmdRegresar"), GI("frmDatos"), false);
    formsLoaded();
}

/// enlace CHECKLIST-----------------
function cargaCheckList() {
    contenedor.Fideicomiso = GI("fidNumContrato").value;
    contenedor.NumPersona = GI("fidFideicomitente").value;
    contenedor.NomPersona = GI("fidNomFideicom").value;
    contenedor.TPersona = "P" + GI("fidCveTipoPer").value.substring(0, 1) + ((GI("fidNomNacional").value == "MEXICANA") ? "NAC" : "EXT");
    var url = ctxRoot + "/modules/KYC/PrincipalCheckList.do";
    makeAjaxRequest(url, "HTML", cargaParametros, contenedor);
    loadDynamicJS(ctxRoot + "/modules/KYC/PrincipalCheckList.js");
}

function cargaParametros(obj, result) {
    GI("cargaCheck").innerHTML = result;
    //initForms();
    GI("paramProyecto").value = obj.Fideicomiso;
    GI("paramTPersona").value = obj.TPersona;
    GI("paramNumPersona").value = obj.NumPersona;
    GI("paramNomPersona").value = obj.NomPersona;
    GI("idRegresar").value = 1;
    GI("paramTipo").value = 1;

    var url = ctxRoot + "/executeRef.do?json={\"id\":\"ejeFunCargaConceptosKYC\",\"TPersona\":\"" + obj.TPersona + "\",\"Fideicomiso\":" + obj.Fideicomiso + ",\"Tipo\":" + 1 + ",\"NumPersona\":" + obj.NumPersona + "}";

    makeAjaxRequest(url, "HTML", cargaConceptosKYC, null);
}

function cargaConceptosKYC(obj, result) {
    var resultado = JSON.parse(result).result;
    switch (resultado) {
        case 0:
            consultar(GI("cmdCargar"), GI('frmCheckList'), false);
            break;
        case 1:
            alert("No hay Conceptos para esta Persona");
            break;
    }
    hideWaitLayer();
    GI('ContenedorKYC').style.visibility = 'visible';
    GI('cargaConceptos').innerHTML = '<div style="color: #CCCCCC;font-size: 70px;font-weight: bold;">KYC</div>';
}

//para cargar actividades economicas hijas dinamicamente
var objComboParamAlt;

function cambiaCombo(item) {

    if (item.selectedIndex > 0 && item.selectedIndex <= item.options.length) {

        var combohijo = GI('fidNumSrama');
        SA(eval(combohijo), "param", "objComboParamAlt");
        objComboParamAlt = JSON.parse("{\"numRama\":" + item.value + "}");
        RA(combohijo, "next");
        loadElement(combohijo);
    }

}

function viewDoc(objBtn) {
    var objSel = GI('cboNombre');
    var objLnk = GI('docLink');
    var url = "#";
    //alert(objSel.value)
    switch (parseInt(objSel.value)) {
        case 100:
        //Solicitud de Revocacion Firmada
            url = ctxRoot + "/temp/solicitud.pdf";
            break;
        case 101:
        case 301:
        //Identificacion Oficial vigente
            url = ctxRoot + "/temp/identificacion.pdf";
            break;
        case 102:
        //En su caso Acuerdo del Comite
            url = ctxRoot + "/temp/acuerdo.pdf";
            break;
        case 103:
        //Copia del Poder a Revocar
            url = ctxRoot + "/temp/poder.pdf";
            break;
        case 103:
        //Copia del Poder a Revocar
            url = ctxRoot + "/temp/poder.pdf";
            break;
        case 205:
        //proyecto de negocio
            url = ctxRoot + "/temp/proyecto.PDF";
            break;
        case 300:
        //Copia del Poder a Revocar
            url = ctxRoot + "/temp/instruccionpago.pdf";
            break;
        case 302:
        //Copia FATCA
            url = ctxRoot + "/temp/FormatoFATCA.pdf";
            break;
        case 303:
        //RFC
            url = ctxRoot + "/temp/RFC.pdf";
            break;
        case 304:
        //CURP
            url = ctxRoot + "/temp/CURP.pdf";
            break;
        default :
            alert('Seleccione un documento');
    }

    SA(objLnk, "href", url);
    objLnk.click();
}
//A peticion de QA se agregan validaciones de campos 9/12/19
function validaNombre() {
    if (!/^([a-zA-Z\s])*$/.test(GI("fidNomFideicom").value)) {
        alert("Verificar nombre");
        GI("fidNomFideicom").value = "";
    }
    else {
        return (true);
    }

}

function validaParticipacion() {
    var validNum = /^[0-9]*$/;
    if (!validNum.test(GI("fidCurp").value)) {
        alert('Participaci\u00F3n inv\u00E1lida');
        GI("fidCurp").value = "";
    }
    else {
        return (true);
    }
}

function ValidateEmail() {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(GI("fidRfc").value)) {
        return (true);
    }
    else {
        alert("E-mail inv\u00E1lido");
        GI("fidRfc").value = "";
    }
}