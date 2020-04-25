//Version de Formalizacion/Proyectos
var catFinalidades = new Catalogo("mx.com.inscitech.fiducia.domain.FinalidaAnteproy");

var ALTA = 1;
var MODIFICAR = 2;
var CONSULTAR = 3;
var isNumContrato = true;

var clavesCombo164 = JSON.parse("{\"llaveClave\":164}");
var consultaDatosInformativos = JSON.parse("{\"id\":\"muestraNombreAnteproyecto\",\"numAnteproyecto\":0}");
var usarSetValuesFormObject = null;

initForms();

var tablaFinalidadesContratoData = new Array();
tablaFinalidadesContratoData[0] = "finNumContrato,113px";

//tablaFinalidadesContratoData[] = "finCveTipoFinal,200px";
//tablaFinalidadesContratoData[3] = "finNumDictador,100px";
//tablaFinalidadesContratoData[1] = "finNomDictador,300px";
tablaFinalidadesContratoData[1] = "finTxtComentario,300px";
tablaFinalidadesContratoData[2] = "finCveStFinalid,90px";
tablaFinalidadesContratoData[3] = "finFolioFinalidaAnteproy,80px";

var operacion = 0;
var numPantalla = 0;
pkInfo = null;
var fvMantenimientoFinalidades = new FormValidator();

//////////////////////////////////////////////////////////////////////////////
//Funciones para la primera pantalla
function cargaPrincipalFinalidadesContrato() {
  onButtonClickPestania("Formalizacion.PrincipalFinalidadesContrato","");
}

function clickTabla(pk) {
  pkInfo = pk;
  cloneObject(pk,catFinalidades.getCatalogo());
}

function limpiar(objForma){
  RF(objForma);
  catFinalidades = new Catalogo("mx.com.inscitech.fiducia.domain.FinalidaAnteproy");
  asignaEtiqueta("txtNomProyecto","");
  pkInfo = null;
}

function operacionExitosa() {
  alert("La operaci\u00F3n se realiz\u00F3 correctamente");
  cargaPrincipalFinalidadesContrato();
  hideWaitLayer();
}

//////////////////////////////////////////////////////////////////////////////
//Funciones para la segunda pantalla
function cargaMantenimientoFinalidadesContrato(tipoPantalla) {
  if ((tipoPantalla==MODIFICAR || tipoPantalla==CONSULTAR) && pkInfo==null)
    alert("No ha seleccionado campo alguno de la tabla");
  else
  {
    operacion = tipoPantalla;
    numPantalla = 1;
    //showWaitLayer();
    var urlCliente = ctxRoot + "/modules/Formalizacion/MantenimientoFinalidadesContrato.do";
    makeAjaxRequest(urlCliente, "HTML", despliegaPantallaMantenimientoFinalidadesContrato, null);
  }
}

function despliegaPantallaMantenimientoFinalidadesContrato(obj, result) {
  GI("dvPantalla").innerHTML = result;
  initForms();
  
  //Agregando la funcionalidad del required
  fvMantenimientoFinalidades.setup({
    formName      : "frmDatosFinalidadesContratoMantenimiento",
    tipoAlert     : 1,
    alertFunction : BaloonAlert,
    sendObjToAlert: true
  });
  
  //deshabilitaPK("finFolioFinalidaAnteproy".split(","));
}

function loadCatalogo() {
  catFinalidades.setOnUpdate(catLoaded);
  if(operacion==MODIFICAR || operacion==CONSULTAR)
    catFinalidades.buscaCatalogoPK(false);
  else
  {
    muestraObjs("cmdAceptar,cmdCancelar"); //Mostrar el boton Aceptar y Cancelar
    formsLoaded();
  }
}

function catLoaded() {
  if(operacion==MODIFICAR)//Si se trata de una modificacion, no permitir modificar la PK
  {
    muestraObjs("cmdAceptar"); //Mostrar el boton Aceptar
    deshabilitaPK("finNumContrato,finCveTipoFinal".split(","));
  }
  else if(operacion==CONSULTAR)//Si se trata de una consulta, deshabilitar
  {
    SA(GI("cmdCancelar"), "value", "Regresar");//Colocar la leyenda Regresar en vez de Cancelar al boton
    deshabilitaObjetos(GI("frmDatosFinalidadesContratoMantenimiento"));                  //Deshabilita objetos (excepto botones)
  }
  muestraObjs("cmdCancelar"); //Mostrar el boton Regresar
  //Mostrar el nombre del fiso (informativo)
  alert(GI("paramfinNumContrato").value)
  consultaNombreFideicomiso("txtNomProyecto",GI("paramfinNumContrato"));
  
  cargaParamComboMandante(GI("paramfinNumContrato"),true);
  formsLoaded();
}

function AltaOModificaInfo() {
  catFinalidades.setOnUpdate(operacionExitosa);
  if(operacion == ALTA && fvMantenimientoFinalidades.checkForm())//Se trata de una alta
  {
    //console.log(JSON.stringify(fvMantenimientoFinalidades));
    //alert("Intento de registro");
    //showWaitLayer();
    catFinalidades.altaCatalogo(true);
  }
  else if(operacion == MODIFICAR && fvMantenimientoFinalidades.checkForm())//Se trata de una modificacion
  {
    //showWaitLayer();
    catFinalidades.modificaCatalogo(true);
  }
}

function eliminarRegistro() {
  if(pkInfo==null)
    alert("No se ha seleccionado campo alguno de la tabla");
  else
  {
    
    catFinalidades.setOnUpdate(operacionExitosa);
    //showWaitLayer();
    //eliminaCatalogo(catFinalidades);
    catFinalidades.bajaCatalogo(false);
  }
}


///////////////////////////////////////////////////////////
/*function mostrarDatosInformativos() {
  showWaitLayer();
  var validacionAlta = JSON.parse("{\"id\":\"verificaExistenciaContrato\",\"numContrato\":0}");
  validacionAlta.numContrato = GI("paramfinNumContrato").value;
  var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta);
  makeAjaxRequest(url, "HTML", verificarAlta, GI("paramfinNumContrato"));
}*/

function verificarAlta(obj, result) {
  var objResult = JSON.parse(result);
  if(objResult[0].ctoNumContrato > 0)
  {
    var validacionAlta2 = JSON.parse("{\"id\":\"verificaSeaActivo\",\"numContrato\":0}");
    validacionAlta2.numContrato = GI("paramfinNumContrato").value;
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta2);
    makeAjaxRequest(url, "HTML", verificarAlta2, obj);
  }
  else
  {
    alert("El Fideicomiso no existe, verifique");
    asignaEtiqueta("txtNomProyecto","");
    GI("finFolioFinalidaAnteproy").value = "";
    obj.value="";
    borraCombos("finNumDictador");
    obj.focus();
    hideWaitLayer();
  }
}

function verificarAlta2(obj,result) {
  var objResult = JSON.parse(result);
  if(objResult[0].ctoCveStContrat == 0)
  {
    consultaNombreFideicomiso("txtNomProyecto",obj);
    
    //Agregar el numero de la Finalidad (Incremental)
    var SecNumFinalida = JSON.parse("{\"id\":\"numSecNumFinalida2\",\"NumFiso\":0}");
    
    SecNumFinalida.NumFiso=GI("paramfinNumContrato").value;

    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(SecNumFinalida);
    makeAjaxRequest(url, "HTML", agregarFinalida, obj);
  }
  else
  {
    alert("El Fideicomiso no esta ACTIVO");
    asignaEtiqueta("txtNomProyecto","");
    GI("finFolioFinalidaAnteproy").value = "";
    obj.value="";
    borraCombos("finNumDictador");
    obj.focus();
    hideWaitLayer();
  }
}

function agregarFinalida(obj, result) {
  var objResult = JSON.parse(result);
  GI("finFolioFinalidaAnteproy").value=objResult[0].secNumFinalida;
  alert("Param= "+obj.value);
  cargaParamComboMandante(obj,false);
}

/////////////////////////////////////////////////////////////////////////
//Verificar al intentar dar de alta si el Registro aun no existe

function verificacionExistenciaRegistro(isNumContratoReq) {
    isNumContrato = isNumContratoReq;
    
    if(GI("finNumContrato").value != "" && GI("finCveTipoFinal").value != "") { // && GI("finFolioFinalidaAnteproy").value != -1
        //showWaitLayer();
        
        var validacionExistenciaRegistro = {};
        validacionExistenciaRegistro.id = "verificaExistenciaFinalidadesAdmon2";
        validacionExistenciaRegistro.numContrato = GI("finNumContrato").value;
        validacionExistenciaRegistro.cveTipoFinal = GI("finCveTipoFinal").value;
        var url = ctxRoot + "/doRef.do?json=" + JSON.stringify(validacionExistenciaRegistro);     
        
        console.log("URL: "+url);
        makeAjaxRequest(url, "HTML", verificacionExistenciaRegistroFunction);    
        
        if(GI("finNumContrato").value != "" && isNumContrato) {
            mostrarDatosInformativos(1);
        } else if(GI("finNumContrato").value == "" && isNumContrato) {
            asignaEtiqueta("txtNomProyecto","");
            //GI("finFolioFinalidaAnteproy").value = "";
            borraCombos("finNumDictador");
        }
    }
}

function loadComboX(obj, result) {
    console.log("loadComboX: " + result);
    loadComboElement(GI('finNumDictador'), result);
}

function verificacionExistenciaRegistroFunction(obj, result) {
    //console.log("verificacionExistenciaRegistroFunction");
    //console.log("Result VERF:"+result);
    //console.log("isNumContrato: " + isNumContrato);

    var objResult = JSON.parse(result);
    if(objResult[0].existeRegistro > 0) {
        //alert("El Registro ya existe, verifique");
        obj.value = "";
        GI("finCveTipoFinal").value =- 1;
        //GI("finFolioFinalidaAnteproy").value = "";
        borraCombos("finNumDictador");
        obj.focus();
    }
    
    if(!isNumContrato) {
        //console.log("isDefinedAndNotNull(isNumContrato) && !isNumContrato");

        var fxp = {};
        fxp.id = "fideicomitentesXProyecto";
        //fxp.Proyecto = GI("paramfinNumContrato").value;
        //fxp.Status = GI("finCveTipoFinal").value;
        var url = ctxRoot + "/doRef.do?json=" + JSON.stringify(fxp);     
        
        console.log("URL: "+url);
        makeAjaxRequest(url, "HTML", loadComboX);    
    }
    
    hideWaitLayer();
}

/////////////////////////////////////////////////////////////////////////
//Funcion para obtener el Nombre del Dictador
function obtieneNombre(combo) {
  if(combo.value != -1)
    GI("finNomDictador").value = combo.options[combo.selectedIndex].text;
  else
    GI("finNomDictador").value = "";
}

////////////////////////////////////////////////////////////////////
//Funciones para cargar el combo Fideicomitente/Mandante luego de haber colocado un numero de Fideicomiso
function cargaParamComboMandante(obj,usoSetValuesFormObject){
    alert("Param= "+obj.value);
  usarSetValuesFormObject = usoSetValuesFormObject;
  parametroComboMandante = JSON.parse("{\"AFB_ANTEPROYECTO\": " +obj.value + "}"); 
  //parametroComboMandante = JSON.parse("{\"AFB_ANTEPROYECTO\": " +GI("paramfinNumContrato").value + "}");
  SA(GI("finNumDictador"),"next","asignaMandante");
  loadElement(GI("finNumDictador"));
}

function asignaMandante(){
  if(usarSetValuesFormObject)
  {
    setValuesFormObject(catFinalidades.getCatalogo());
  }
  else
    GI("finNumDictador").selectedIndex=0;
  
  formsLoaded();
}
// Valida exista el proyecto



function mostrarDatosInformativos() { //parametroPantalla
    GI("txtNomProyecto").value="";
    //showWaitLayer();
    //esta es la buena 
    consultaDatosInformativos.numAnteproyecto = GI("paramfinNumContrato").value;
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(consultaDatosInformativos);
    makeAjaxRequest(url, "HTML", insertaDatosInformativos, null);
}

function insertaDatosInformativos(obj, result) {
    //var objResult = JSON.parse(result);
    //GI("txtNomProyecto").value=objResult[0].antNomNegocio;
    hideWaitLayer();
}
