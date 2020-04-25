var cat = new Catalogo("mx.com.inscitech.fiducia.domain.Credito");
var paramProducto  = JSON.parse("{\"llaveClave\":0,\"order\":\"s\"}");
var paramimonedaCred  = JSON.parse("{\"llaveClave\":0,\"order\":\"s\"}");
var paramCliente  = JSON.parse("{\"llaveClave\":0,\"order\":\"s\"}");
var clavesCombo52 = JSON.parse("{\"llaveClave\":52}");
showWaitLayer();
var fechaDefault = new Date();
function isValidDate(date){ 
  var today = new Date();
  return false;
}
var feriados;
var hay_feriados=0;
function getDateInfo(date, wantsClassName) {
  var as_number = CalendarExtended.dateToInt(date);
  if(hay_feriados!=0){
    for(i=0;i<feriados.length;i++){
      if (as_number==feriados[i][0]){
        return {
      
          klass   : feriados[i][2],
          tooltip : "<div style='text-align: center'>"+feriados[i][1]+"</div>"
        };
      }
    }
  }
};
var cal = CalendarExtended.setup({					
		showTime: 12,    
    date           :    fechaDefault,
    disableFunc    :    isValidDate,
		onSelect: function(cal) { cal.hide() ; },
    dateInfo : getDateInfo,
    animation: false
});


var ALTA = 1;
var MODIFICAR = 2;
var CONSULTAR = 3;

var tablaData = new Array();
tablaData[0] = "descripcionProducto,100px";
tablaData[1] = "nombreCliente,300px";
tablaData[2] = "anumeroCredito,200px";
tablaData[3] = "iGarantia,200px"; //Asignaci\u00F3n 5.4 de Garantías
tablaData[4] = "imontoCred,200px";
tablaData[5] = "itasaIa,100px";
tablaData[6] = "fechaOtor,100px";
tablaData[7] = "fechaVenc,100px";
tablaData[8] = "imonedaCred,100px";


var fvMantenimiento = new FormValidator();

fvMantenimiento.setup({
  formName      : "frmDatos",
  tipoAlert     : 1,
  alertFunction : BaloonAlert,
  sendObjToAlert: true
});

pkInfo=null;
initForms();
formsLoaded();

function limpiar(objForma){
  RF(objForma);
  cat = new Catalogo("mx.com.inscitech.fiducia.domain.Credito");
  pkInfo = null;
}

function clickTabla(pk) {
  pkInfo = pk;
  cloneObject(pk,cat.getCatalogo());
}

//////////////////////////////////////////////////////////////////////////////
//Funciones para la segunda pantalla

var operacion = 0;

function cargaMantenimiento(tipoPantalla) {
  if ((tipoPantalla==MODIFICAR || tipoPantalla==CONSULTAR) && pkInfo==null)
    alert("No ha seleccionado campo alguno de la tabla");
  else
  {
    operacion = tipoPantalla;
    numPantalla = 1;
    showWaitLayer();
    var urlCliente = ctxRoot + "/modules/Vinta/Credito/MantenimientoParametrosContrasena.do";
    makeAjaxRequest(urlCliente, "HTML", despliegaPantallaMantenimiento, null);
  }
}


function despliegaPantallaMantenimiento(obj, result) {
  GI("dvPantalla").innerHTML = result;
  hideWaitLayer();
  initForms();
  loadCatalogo();
  cal.manageFields("dfechaOtrorg", "dfechaOtrorg", "%d/%m/%Y");
  //cal.manageFields("dfechaVenc", "dfechaVenc", "%d/%m/%Y");
    
  //Agregando la funcionalidad del required
  fvMantenimiento.setup({
    formName      : "frmDatosMantenimiento",
    tipoAlert     : 1,
    alertFunction : BaloonAlert,
    sendObjToAlert: true,
    showErrors    : true
  });
  
}

function loadCatalogo() {
  cat.setOnUpdate(catLoaded);
  if(operacion==MODIFICAR || operacion==CONSULTAR)
    cat.buscaCatalogoPK(false);
  else
  {
    muestraObjs("cmdAceptar,cmdCancelar"); //Mostrar el bot\u00F3n Aceptar y Cancelar
  }
}

function catLoaded() {
  if(operacion==MODIFICAR)//Si se trata de una modificaci\u00F3n, no permitir modificar la PK
  {
    muestraObjs("cmdAceptar"); //Mostrar el bot\u00F3n Aceptar
    deshabilitaPK("idProducto,idCredito,idCliente".split(","));
  }
  else if(operacion==CONSULTAR)//Si se trata de una consulta, deshabilitar
  {
    SA(GI("cmdCancelar"), "value", "Regresar");//Colocar la leyenda Regresar en vez de Cancelar al bot\u00F3n
    deshabilitaObjetos(GI("frmDatosMantenimiento"));                  //Deshabilita objetos (excepto botones)
    muestraObjs("cmdTabla"); //Mostrar el bot\u00F3n Regresar
  }
  muestraObjs("cmdCancelar"); //Mostrar el bot\u00F3n Regresar
  formsLoaded();
}

function AltaOModificaInfo() {
  //alert("Operacion: " + operacion);
  cat.setOnUpdate(operacionExitosa);
  if(operacion==ALTA && fvMantenimiento.checkForm())//Se trata de una alta
  {
    if(GI("idProducto").value==""||GI("idCredito").value==""||GI("idCliente").value==""){
        alert("Son campos obligatorios el Producto, el Credito y el Cliente.");
        GI("idProducto").focus();
    }
    else{
        showWaitLayer();
        cat.altaCatalogo();    
    }
  }
  else if(operacion==MODIFICAR && fvMantenimiento.checkForm())//Se trata de una modificaci\u00F3n
  {
    showWaitLayer();
    cat.modificaCatalogo();
  }
}

function eliminarRegistro() {
//alert(pkInfo)
  if(pkInfo==null)
    alert("No se ha seleccionado campo alguno de la tabla");
  else
  {
    cat.setOnUpdate(operacionExitosa);
    showWaitLayer();
    eliminaCatalogo(cat);
  }
}

function operacionExitosa() {
  alert("La operaci\u00F3n se realiz\u00F3 correctamente");
  cargaPrincipal();
  hideWaitLayer();
}

function cargaPrincipal() {
  onButtonClickPestania("Vinta.Credito.PrincipalParametrosContrasena","");
}



function verificarAlta() {
  if(GI("idProducto").value!="")
  {
    var ingresaSecuencial = JSON.parse("{\"id\":\"conCreditoSec\"}");
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(ingresaSecuencial);
    //alert(url)
    makeAjaxRequest(url, "HTML", funcionIngresaSecuencial, null);
  }
}

function funcionIngresaSecuencial(obj, result) {
 //alert(result)
  var objResult = JSON.parse(result);
  GI("idCredito").value = objResult[0].folio;
}


function cargaPrincipalTabla(){
    var objParametros = JSON.parse("{\"id\":\"fncGeneraTablaAmor\"}");
    objParametros.numeroCredito= GI("anumeroCredito").value;
    
    var url = ctxRoot + "/executeRef.do?json=" + JSON.stringify(objParametros);
    //alert(url)
    makeAjaxRequest(url, "HTML", respuestaTabla);
}

function respuestaTabla(obj, result){
  var fcn = JSON.parse(result);
  if(isDefinedAndNotNull(fcn.resultado) && fcn.resultado == 0) {
    alert("Operaci\u00F3n realizada exitosamente!");
  } else if(isDefinedAndNotNull(fcn.resultado) && fcn.resultado == 1) {
    alert("El Credito ya tiene pagos realizados!");
  }
  else {
    alert("Ocurri\u00F3 un error al realizar la operaci\u00F3n!");
  }  
  hideWaitLayer();
}