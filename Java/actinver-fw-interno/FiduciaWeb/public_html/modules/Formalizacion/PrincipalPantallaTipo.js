var catPantalla = new Catalogo("mx.com.inscitech.fiducia.domain.PantallaTipo");
var catNacionalidades = new Catalogo("mx.com.inscitech.fiducia.domain.Nacional");
var catProspectos = new Catalogo("mx.com.inscitech.fiducia.domain.Prospect");

var clavesCombo43 = JSON.parse("{\"llaveClave\":43}");
var validacionAlta = JSON.parse("{\"id\":\"verificaExistenciaRegistroPantalla\",\"numPan\":0}");

var tablaPantallaData = new Array();
tablaPantallaData[0] = "ptiPantalla,55px";
tablaPantallaData[1] = "ptiDescripcion,300px";
tablaPantallaData[2] = "paiNomPais,85px";
tablaPantallaData[3] = "paiNumPais,85px";
tablaPantallaData[4] = "cbAceptar,85px";
//tablaModulosData[3] = "ffunNombreFuncion,300px";

var operacion = 0;
var numPantalla = 0;
pkInfo = null;
var fvMantenimientoPantalla = new FormValidator();
var ordenFuncion;
var ordenActual;

var parametroComboSubMenu;
var usarSetValuesFormObject=false;
var CONSULTAR = 3;

function cargaPrincipalPantallaTipo() {
  onButtonClick("Formalizacion.PrincipalPantallaTipo","");
  hideWaitLayer();
}

function clickTabla(pk) {
  pkInfo = pk;
  cloneObject(pk,catPantalla.getCatalogo());
}

function AltaOModificaInfo() {
  catPantalla.setOnUpdate(operacionExitosa);
  alert(operacion);
  if(operacion==1 && fvMantenimientoPantalla.checkForm())//Se trata de una alta
    catPantalla.altaCatalogo();
  else if(operacion==2 && fvMantenimientoPantalla.checkForm())//Se trata de una modificaci\u00F3n
    catPantalla.modificaCatalogo();
}

function eliminarRegistro() {
  if(pkInfo==null)
    alert("No se ha seleccionado campo alguno de la tabla");
  else
  {
    catPantalla.setOnUpdate(operacionExitosa);
    eliminaCatalogo(catPantalla);
  }
}
/*function eliminarRegistro() {
  if(pkInfo==null)
    alert("No se ha seleccionado campo alguno de la tabla");
  else
  {
    catPantalla.setOnUpdate(operacionExitosa);
    showWaitLayer();
    eliminaCatalogo(catPantalla);
  }
}*/

/*function eliminarRegistro() {
  if(pkInfo==null)
    alert("No se ha seleccionado campo alguno de la tabla");
  else
  {
    showWaitLayer();
    var tieneHijos = JSON.parse("{\"id\":\"conCGverHij\",\"IdPadre\":" + pkInfo.ffunIdFuncion + "}");
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(tieneHijos);
    makeAjaxRequest(url, "HTML", eliminaRegistroHijos, null);
  }
}

function eliminaRegistroHijos(obj, result) {
  var objResult = JSON.parse(result);
  if(objResult[0].existeRegistro > 0)
  {
    alert("El registro no puede eliminarse, tiene funciones o submenús asignados");
    hideWaitLayer();
  }
  else
  {
    catModulos.setOnUpdate(operacionExitosa);
    eliminaCatalogo(catModulos);
  }
}*/

function operacionExitosa() {
  alert("La operaci\u00F3n se realiz\u00F3 correctamente");
  cargaPrincipalPantallaTipo();
  hideWaitLayer();
}


////////////////////////////////////////////////////////////////////
//CARGA LA SEGUNDA PANTALLA (MantenimientoPantallaTipo)
function cargaMantenimientoPantallaTipo(tipoPantalla) {
  if ((tipoPantalla==OPER_MODIFICAR || tipoPantalla==CONSULTAR) && pkInfo==null)
    alert("No ha seleccionado campo alguno de la tabla");
  else
  {
    operacion = tipoPantalla;
    numPantalla = 1;
   // showWaitLayer();
    var urlCliente = ctxRoot + "/modules/Formalizacion/MantenimientoPantallaTipo.do";
    makeAjaxRequest(urlCliente, "HTML", despliegaPantalla, null);
  }
}

function despliegaPantalla(obj, result) {
  GI("dvContenido").innerHTML = result;
  initForms();
  
  //Agregando la funcionalidad del required
  fvMantenimientoPantalla.setup({
    formName      : "frmMantenimientoPantallaTipo",
    tipoAlert     : 1,
    alertFunction : BaloonAlert,
    sendObjToAlert: true
  });
  deshabilitaPK("ffunNombreFuncion".split(","));
}

function loadCatalogo() {
  catPantalla.setOnUpdate(catLoaded);
  if(operacion==OPER_MODIFICAR || operacion==CONSULTAR)
    catPantalla.buscaCatalogoPK(false);
  else
  {
    muestraObjs("cmdAceptar,cmdCancelar"); //Mostrar el bot\u00F3n Aceptar y Cancelar
    numIdFuncion();
    numOrden(GI("nacNumPais"));
    formsLoaded();
  }
}

function catLoaded() { 
  if(operacion==OPER_MODIFICAR)//Si se trata de una modificaci\u00F3n, no permitir modificar la PK
  {
    deshabilitaPK("ptiPantalla".split(","));
    muestraObjs("cmdAceptar"); //Mostrar el bot\u00F3n Aceptar
    numOrden(GI("paiNomPais"));
  }
  else if(operacion==CONSULTAR)//Si se trata de una consulta, deshabilitar
  {
    SA(GI("cmdCancelar"), "value", "Regresar");//Colocar la leyenda Regresar en vez de Cancelar al bot\u00F3n
    deshabilitaObjetos(GI("frmMantenimientoPantallaTipo"));         //Deshabilita objetos (excepto botones)
  }
  muestraObjs("cmdCancelar"); //Mostrar el bot\u00F3n Regresar
  //cargaParamComboSubMenu(GI("ffunIdPadre"),GI("ffunNomMenu"),true);
  formsLoaded();
}

/*function AltaOModificaInfo() {
  catPantalla.setOnUpdate(operacionExitosa);
  if(operacion==OPER_ALTA && fvMantenimientoPantalla.checkForm())//Se trata de una alta
  {
    showWaitLayer();
    if(GI("ffunOrden").value < ordenFuncion)
    {
      var cambiaOrden;
      if(GI("ffunIdPadre").value=="null")
        cambiaOrden = JSON.parse("{\"id\":\"cambiaOrdenFuncionesNul\",\"OrdenActual\":" + ordenFuncion + ",\"OrdenAnterior\":" + GI("ffunOrden").value + "}");
      else
        cambiaOrden = JSON.parse("{\"id\":\"cambiaOrdenFunciones\",\"OrdenActual\":" + ordenFuncion + ",\"IdPadre\":" + GI("ffunIdPadre").value + ",\"OrdenAnterior\":" + GI("ffunOrden").value + "}");
      
      var url = ctxRoot + "/doRef.do?json=" + JSON.stringify(cambiaOrden);
      makeAjaxRequest(url, "HTML", null, null);
    }
    
    catModulos.altaCatalogo();
  }
  else if(operacion==OPER_MODIFICAR && fvMantenimientoModulos.checkForm())//Se trata de una modificaci\u00F3n
  {
    showWaitLayer();
    if(GI("ffunOrden").value != ordenActual)
    {
      var cambiaOrden1;
      var cambiaOrden2;
      var cambiaOrden3;
      
      if(GI("ffunIdPadre").value=="null")
      {
        cambiaOrden1 = JSON.parse("{\"id\":\"cambiaOrdenFuncionesNul\",\"OrdenActual\":" + ordenFuncion + ",\"OrdenAnterior\":" + GI("ffunOrden").value + "}");
        cambiaOrden2 = JSON.parse("{\"id\":\"cambiaOrdenFuncionesNul\",\"OrdenActual\":" + GI("ffunOrden").value + ",\"OrdenAnterior\":" + ordenActual + "}");
        cambiaOrden3 = JSON.parse("{\"id\":\"cambiaOrdenFuncionesNul\",\"OrdenActual\":" + ordenActual + ",\"OrdenAnterior\":" + ordenFuncion + "}");
      }
      else
      {
        cambiaOrden1 = JSON.parse("{\"id\":\"cambiaOrdenFunciones\",\"OrdenActual\":" + ordenFuncion + ",\"IdPadre\":" + GI("ffunIdPadre").value + ",\"OrdenAnterior\":" + GI("ffunOrden").value + "}");
        cambiaOrden2 = JSON.parse("{\"id\":\"cambiaOrdenFunciones\",\"OrdenActual\":" + GI("ffunOrden").value + ",\"IdPadre\":" + GI("ffunIdPadre").value + ",\"OrdenAnterior\":" + ordenActual + "}");
        cambiaOrden3 = JSON.parse("{\"id\":\"cambiaOrdenFunciones\",\"OrdenActual\":" + ordenActual + ",\"IdPadre\":" + GI("ffunIdPadre").value + ",\"OrdenAnterior\":" + ordenFuncion + "}");
      }
      
      var url1 = ctxRoot + "/doRef.do?json=" + JSON.stringify(cambiaOrden1);
      makeAjaxRequest(url1, "HTML", null, null);
      
      var url2 = ctxRoot + "/doRef.do?json=" + JSON.stringify(cambiaOrden2);
      makeAjaxRequest(url2, "HTML", null, null);
      
      var url3 = ctxRoot + "/doRef.do?json=" + JSON.stringify(cambiaOrden3);
      makeAjaxRequest(url3, "HTML", null, null);
      
      operacionExitosa();
    }
    else
      catModulos.modificaCatalogo();
  }
}*/

/*function AltaOModificaInfo() {
  catPantalla.setOnUpdate(operacionExitosa);
  if(operacion==ALTA && fvMantenimientoPantalla.checkForm())//Se trata de una alta
  {
    showWaitLayer();
    catPantalla.altaCatalogo();
  }
  else if(operacion==MODIFICAR && fvMantenimientoPantalla.checkForm())//Se trata de una modificaci\u00F3n
  {
    showWaitLayer();
    catPantalla.modificaCatalogo();
  }
}*/


//Funciones para colocar autoIncremental el Id de Funci\u00F3n
function numIdFuncion() {
  var secuencialIdFuncion = JSON.parse("{\"id\":\"conCGIncIdPan\" }");
  
  var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(secuencialIdFuncion);
  makeAjaxRequest(url, "HTML", ingresaNumIdFuncion, null);
}

function ingresaNumIdFuncion(obj,result) {
  var objResult = JSON.parse(result);
  GI("ptiPantalla").value = objResult[0].ptiPantalla;
}


/*//Funciones para colocar autom\u00E1ticamente el Orden del menú o funci\u00F3n
function numOrden(objComboNomPais) {
  var secuencialOrden;
  
  if(objComboNomPais.value=="null")
    secuencialOrden = JSON.parse("{\"id\":\"conCGIncOrdNul\" }");
  else
    secuencialOrden = JSON.parse("{\"id\":\"conCGIncOrd\",\"Orden\": " + objComboIdPadre.value + "}");
  
  var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(secuencialOrden);
  makeAjaxRequest(url, "HTML", ingresaNumOrden, null);
}

function ingresaNumOrden(obj,result) {
  var objResult = JSON.parse(result);
  
  if(operacion == OPER_ALTA)
    GI("ffunOrden").value = objResult[0].ffunOrden;
  ordenFuncion = objResult[0].ffunOrden;
}

function verificaOrden(objOrden) {
  if(objOrden=="")
    return;
  
  if(operacion == OPER_ALTA) {
    if(objOrden.value > ordenFuncion)
    {
      alert("El Orden no debe ser mayor a " + ordenFuncion + " para este Sub Menú");
      objOrden.value = ordenFuncion;
    }
    else if(objOrden.value < ordenFuncion)
      alert("El Registro con el Orden " + objOrden.value + " tomar\u00E1 el orden " + ordenFuncion);
  }
  else if(operacion == OPER_MODIFICAR) {
    if(objOrden.value > (ordenFuncion-1))
    {
      alert("El Orden no debe ser mayor a " + (ordenFuncion-1) + " para este Sub Menú");
      objOrden.value = ordenActual;
    }
    else if(objOrden.value<ordenFuncion && objOrden.value!=ordenActual)
      alert("El Registro con el Orden " + objOrden.value + " tomar\u00E1 el orden " + ordenActual);
  }
}*/

//Verificar que el registro aún no exista
function verificaExistenciaRegistro() {
  if(operacion==OPER_ALTA && GI("ptiPantalla").value!="")
  {
    validacionAlta.numPan = GI("ptiPantalla").value;
    
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta);
    makeAjaxRequest(url, "HTML", verificacionAlta, null);
  }
}

function verificacionAlta(obj, result) {
  var objResult = JSON.parse(result);
  if(objResult[0].existeRegistro > 0)
  {
    alert("La Opci\u00F3n ya existe, verifique");
    GI("ptiPantalla").value="";
  }
}


/*//Funci\u00F3n para determinar si es un Menú o una Funci\u00F3n
function determinaMenuFuncion(objRadio) {
  if(objRadio.id=="rdMenu")
  {
    deshabilitaPK("ffunNombreFuncion".split(","));
    GI("ffunNombreFuncion").value = "";
    RA(GI("ffunNombreFuncion"), "required", "");
  }
  else if(objRadio.id=="rdFuncion")
  {
    habilitaPK("ffunNombreFuncion".split(","));
    SA(GI("ffunNombreFuncion"), "required", "");
  }
}*/

////////////////////////////////////////////////////////////////////
//Funciones para modificar el result y obtener en el Menú Padre toda la ruta desde la cu\u00E1l viene
/*function loadTableElementModulos(objTabla, result) {
  var jsonArray = JSON.parse(result);
  
  for(i in jsonArray)
    if(jsonArray[i].ffunIdPadre=="-")
      jsonArray[i].ffunNombreFuncion = " ";
    else
      jsonArray[i].ffunNombreFuncion = armaRuta(jsonArray,jsonArray[i].ffunIdPadre,"");
  
  var arWidth = eval(GA(objTabla, "dataInfo"));
  loadTable(objTabla, jsonArray, arWidth, GA(objTabla, "keys"), GA(objTabla, "fun"), true);
  hideWaitLayer();
}

function armaRuta(jsonArray,ffunIdPadre,ruta) {
  ruta = "/" + ruta;
  
  for(i in jsonArray)
  {
    alert("");
    if(jsonArray[i].ffunIdFuncion == ffunIdPadre)
    {
      ruta = jsonArray[i].ffunNomMenu + ruta;
      if(jasonArray[i].ffunIdPadre=="-")
        return ruta;
      else
      {
        ruta = armaRuta(jsonArray,jsonArray[i].ffunIdPadre,ruta);
      }
    }
  }
  return ruta;
}*/


/*//////////////////////////////////////////////////////////////////
//Funci\u00F3n para el bot\u00F3n refrescar el menú
function refrescarMenu() {
  var urlRefresh = ctxRoot + "/modules/ControlGestion/clearMenuCache.do";
  makeAjaxRequest(urlRefresh, "HTML", null, null);
}*/


////////////////////////////////////////////////////////////////////
//Funciones para cargar el combo SubMenu luego de haber elegido alguna opci\u00F3n del combo Modulo
/*function cargaParamComboSubMenu(objCombo,objComboAbre,parametro2){
  usarSetValuesFormObject=parametro2;
  parametroComboSubMenu = JSON.parse("{\"Modulo\": " +objCombo.value + "}");
  SA(objComboAbre,"next","asignaSubMenu");
  loadElement(objComboAbre);
}

function asignaSubMenu(){
  if(usarSetValuesFormObject)
  {
    setValuesFormObject(catModulos.getCatalogo());
  }
  else
  {
    GI("paramSubMenu").selectedIndex=0;
    cambiaRefAceptar();
  }
  
  formsLoaded();
}
*/
////////////////////////////////////////////////////////////////////
//Funci\u00F3n para cambiar la referencia de la consulta
/*function cambiaRefAceptar() {
  if(GI("paramSubMenu").value!=-1)
  {
    SA(GI("Aceptar"),"ref","muestraDatosModulos2");
    GI("paramOpcion").value="";
  }
  else
    SA(GI("Aceptar"),"ref","muestraDatosModulos");
}*/

/*function determinarConsulta() {
  if(GI("paramOpcion").value!="")
  {
    GI("paramSubMenu").selectedIndex=0;
     cambiaRefAceptar();
  }
}*/



