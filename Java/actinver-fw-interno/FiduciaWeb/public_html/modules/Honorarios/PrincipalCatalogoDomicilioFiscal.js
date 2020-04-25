var catDomicilioFiscalHonorarios = new Catalogo("mx.com.inscitech.fiducia.domain.DomFiscal");

var validacionAlta = JSON.parse("{\"id\":\"verificaExistenciaContrato\",\"numContrato\":0}");
var validacionAlta2 = JSON.parse("{\"id\":\"verificaSeaActivo\",\"numContrato\":0}");
var validacionExistenciaRegistro = JSON.parse("{\"id\":\"verificaExistenciaRegistroDomFiscal\",\"numContrato\":0}");

var tablaDomicilioFiscalHonorariosData = new Array();
tablaDomicilioFiscalHonorariosData[0] = "dfNumContrato,85px";
tablaDomicilioFiscalHonorariosData[1] = "dfNumSeq,95px";
tablaDomicilioFiscalHonorariosData[2] = "dfDomicilio,300px";
tablaDomicilioFiscalHonorariosData[3] = "dfRfc,100px";
tablaDomicilioFiscalHonorariosData[4] = "dfNombre,300px";

var operacion = 0;
var numPantalla = 0;
pkInfo = null;
var CONSULTAR = 3;
var fvMantenimientoDomicilioFiscal = new FormValidator();

formsLoaded();

function cargaPrincipalDomicilioFiscalHonorarios() {
  onButtonClickPestania("Honorarios.PrincipalCatalogoDomicilioFiscal","");
}

function clickTabla(pk) {
  pkInfo = pk;
  cloneObject(pk,catDomicilioFiscalHonorarios.getCatalogo());
}

function eliminarRegistro() {
  if(pkInfo==null)
    alert("No se ha seleccionado campo alguno de la tabla");
  else
  {
    catDomicilioFiscalHonorarios.setOnUpdate(operacionExitosa);
    eliminaCatalogo(catDomicilioFiscalHonorarios);
  }
}

////////////////////////////////////////////////////////////////////
//CARGA LA SEGUNDA PANTALLA (MantenimientoCatalogoDomicilioFiscal)
function cargaMantenimientoDomicilioFiscalHonorarios(tipoPantalla) {
  if ((tipoPantalla==OPER_MODIFICAR || tipoPantalla==CONSULTAR) && pkInfo==null)
    alert("No ha seleccionado campo alguno de la tabla");
  else
  {
    operacion = tipoPantalla;
    numPantalla = 1;
    showWaitLayer();
    var urlCliente = ctxRoot + "/modules/Honorarios/MantenimientoCatalogoDomicilioFiscal.do";
    makeAjaxRequest(urlCliente, "HTML", despliegaPantalla, null);
  }
}

function despliegaPantalla(obj, result) {
  GI("dvPantalla").innerHTML = result;
  
  //Agregando la funcionalidad del required
  fvMantenimientoDomicilioFiscal.setup({
    formName      : "frmDomicilioFiscalHonorariosMantenimiento",
    tipoAlert     : 1,
    alertFunction : BaloonAlert,
    sendObjToAlert: true
  });
  
  loadCatalogo();
}


function loadCatalogo() {
  catDomicilioFiscalHonorarios.setOnUpdate(catLoaded);
  if(operacion==OPER_MODIFICAR || operacion==CONSULTAR)
    catDomicilioFiscalHonorarios.buscaCatalogoPK(false);
  else
  {
    muestraObjs("cmdAceptar,cmdCancelar"); //Mostrar el bot\u00F3n Aceptar y Cancelar
    formsLoaded();
  }
}

function AltaOModificaInfo() {
  catDomicilioFiscalHonorarios.setOnUpdate(operacionExitosa);
  if(operacion==1 && fvMantenimientoDomicilioFiscal.checkForm())//Se trata de una alta
    catDomicilioFiscalHonorarios.altaCatalogo();
  else if(operacion==2 && fvMantenimientoDomicilioFiscal.checkForm())//Se trata de una modificaci\u00F3n
    catDomicilioFiscalHonorarios.modificaCatalogo();
}

function catLoaded() {
  if(operacion==OPER_MODIFICAR)//Si se trata de una modificaci\u00F3n, no permitir modificar la PK
  {
    muestraObjs("cmdAceptar"); //Mostrar el bot\u00F3n Aceptar
    deshabilitaPK("dfNumContrato".split(","));
  }
  else if(operacion==CONSULTAR)//Si se trata de una consulta, deshabilitar
  {
    SA(GI("cmdCancelar"), "value", "Regresar");//Colocar la leyenda Regresar en vez de Cancelar al bot\u00F3n
    deshabilitaObjetos(GI("frmDomicilioFiscalHonorariosMantenimiento"));                  //Deshabilita objetos (excepto botones)
  }
  muestraObjs("cmdCancelar"); //Mostrar el bot\u00F3n Regresar
  formsLoaded();
}

function operacionExitosa() {
  alert("La operaci\u00F3n se realiz\u00F3 correctamente");
  cargaPrincipalDomicilioFiscalHonorarios();
}

////////////////////////////////////////////////////////////////////////////
function verificarAltaPk() {
  if(GI("dfNumContrato").value!="")
  {
    validacionAlta.numContrato = GI("dfNumContrato").value;
    
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta);
    makeAjaxRequest(url, "HTML", verificarAlta, null);
  }
}

function verificarAlta(obj, result) {
  var objResult = JSON.parse(result);
  if(objResult[0].ctoNumContrato > 0)
  {
    validacionAlta2.numContrato = GI("dfNumContrato").value;
    
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta2);
    makeAjaxRequest(url, "HTML", verificarAlta2, null);
  }
  else
  {
    alert("El Fideicomiso no existe, verifique");
    GI("dfNumContrato").value="";
  }
}

function verificarAlta2(obj,result) {
  var objResult = JSON.parse(result);
  if(objResult[0].ctoCveStContrat == 0)
  {
    validacionExistenciaRegistro.numContrato = GI("dfNumContrato").value;
    
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionExistenciaRegistro);
    makeAjaxRequest(url, "HTML", verificaExistenciaRegistro, null);
  }
  else
  {
    alert("El Fideicomiso no est\u00E1 ACTIVO");
    GI("dfNumContrato").value="";
  }
}

function verificaExistenciaRegistro(obj,result) {
  var objResult = JSON.parse(result);
  if(objResult[0].dfNumRegistro != 0)
  {
    alert("Ya existe un registro con ese número de fideicomiso");
    GI("dfNumContrato").value="";
  }
}