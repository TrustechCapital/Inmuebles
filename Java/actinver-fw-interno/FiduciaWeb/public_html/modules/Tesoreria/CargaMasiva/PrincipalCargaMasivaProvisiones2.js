// JavaScript Document

var fncInterfase = JSON.parse("{\"id\":\"storeGenArchInterfazHonorarios\"}");
var objArchivosPlanosParam = JSON.parse("{\"id\":\"conArcPla\"}");
var dvFechaParam = JSON.parse("{\"id\":\"ejeFunRegresaFechaAnterior\"}");


var fvInterfase = new FormValidator();
var fechaDefault = new Date();
var opcparam = 0;

initForms();

Calendar.setup({
    inputField     :    "txtFechaValor",
    button         :    "txtFechaValor",
    ifFormat       :    "%d/%m/%Y", //"%a %e/%b/%Y",format of the input field
    showsTime      :    false,
    timeFormat     :    "24",
    onUpdate       :    setFechaCal,
    disableFunc    :    isValidDate,
    date           :    fechaDefault,
    weekNumbers    :    false,
    cache          :    true,
    step           :    1
});

function setFechaCal(){}
function isValidDate(date){ 
  var today = new Date();
  if(date > today)
    return true;
  else
    return false;
}

fvInterfase.setup({
  formName      : "frmDatosInterfase",
  tipoAlert     : 1,
  alertFunction : BaloonAlert,
  sendObjToAlert: true
});


function asignaFechaValor(){
  dvFechaParam.Fecha = GI("txtFechaValor").value;
  var url = ctxRoot + "/executeRef.do?json=" + JSON.stringify(dvFechaParam);
  makeAjaxRequest(url, "HTML", asignaEtiquetas, null);
}
function asignaEtiquetas(obj, result){
  var resultado = JSON.parse(result)[0];
  formsLoaded();
}

function ejecutaFuncion(){
  if(GI("txtFechaValor").value==""||GI("txtNomArch").value=="")
  {  
    alert("Debe seleccionar la Fecha,Nombre");
  }
  else
  {
    if(fvInterfase.checkForm())
    {
            //showWaitLayer();
            alert("subida archivo")
            frameSubmit(document.frameUpload.frameUpload);            
            //alert("Termino")            
         // ejecutaStoreInterfase();    
    }
  }
}
function obtCheckOPC(){
    var opc = [("chkProvisiones").checked, GI("chkCondonacion").checked, GI("chkQuebrantos").checked, GI("chkPagos").checked];
    /* 
     * Provisiones   = 1
     * Condonacion   = 2
     * Quebrantos    = 3
     * Generar Pagos = 4
    */
    var count = 0;
    
    for(var i = 0; i < opc.length; ++i){
        if(opc[i] == 1)
            count++;
            opcparam = i+1;
    }
    if(count > 1){
        alert("Eliga solo una opcion");
        opcparam = null;
    }
}

function frameSubmit(forma) {
alert(GI("txtFechaValor").value)
alert(GI("txtNomArch").value)
//alert(forma.document)
  forma.document.getElementById("Fecha").value = GI("txtFechaValor").value;
  forma.document.getElementById("NombreArchivo").value = GI("txtNomArch").value;
  forma.submit()
  //alert("llego")
  //ejecutaStoreInterfase(); /// ejecuta rutina  valuacion
  //document.getElementById("cmdLimpiar").click();
  //showWaitLayer();

}

function ejecutaStoreInterfase(){
    obtCheckOPC();
    if(opcparam!= null){
        fncInterfase.fecha = GI("txtFechaValor").value;
        fncInterfase.nomArchivo = GI("txtNomArch").value;
        fncInterfase.opc = opcparam;
        var url = ctxRoot + "/executeRef.do?json=" + JSON.stringify(fncInterfase);
       alert(url);
       showWaitLayer();
        makeAjaxRequest(url, "HTML", validaStoreInterfase, null);
    }
}

//var objArchivosPlanosParam = JSON.parse("{\"id\":\"conInterPrecios\"}");
function validaStoreInterfase(obj, result){
  var res = JSON.parse(result).RESULTADO;
  if(isDefinedAndNotNull(res)){
    switch(eval(res)){
      case 0:
          alert("Operaci\u00F3n exitosa")
          document.getElementById("cmdLimpiar").click();
          if(opcparam == 4){
            showWaitLayer();
            objArchivosPlanosParam.tipoId = 1;
            objArchivosPlanosParam.Archivo = "HONORARIOS" + GI("txtFechaValor").value.split("/")[2] + GI("txtFechaValor").value.split("/")[1] + GI("txtFechaValor").value.split("/")[0];
            objArchivosPlanosParam.colData = "arpDescripcion";
            var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(objArchivosPlanosParam);
            makeAjaxRequest(url, "HTML", sugerirNombreArchivoInterfase, null);
          }
      break;
    case 1:alert("Cargue el archivo correcto antes de Cargar Honorarios!");break;
      case 5:
        alert("La Fecha del Archivo no corresponde con la Fecha del Sistema!");
        //var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(objArchivosPlanosParam);
        //makeAjaxRequest(url, "HTML", sugerirNombreArchivoInterfase, null);            
        break;
      case 6:
        alert("Faltan DATOS!");
        //var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(objArchivosPlanosParam);
        //makeAjaxRequest(url, "HTML", sugerirNombreArchivoInterfase, null);           
        break;
      default:
        alert("Ocurri\u00F3 un error inesperado");
    }
  }else
  {
     alert("Ocurri\u00F3 un error inesperado");
  }
  hideWaitLayer();
}

function sugerirNombreArchivoInterfase(obj , result){
    var resultado = JSON.parse(result)[0];
    if (isDefinedAndNotNull(resultado)) {
        alert("Se le sugiere coloque el siguiente nombre " + GI("txtNomArch").value + ".txt para el archivo generado!");
        delete objArchivosPlanosParam.id;
        objArchivosPlanosParam.queryId = "conArcPla";
        objArchivosPlanosParam.Fecha = GI("txtFechaValor").value;
        objArchivosPlanosParam.order = "\"s\"";
        objArchivosPlanosParam.fileName = "HO" + GI("txtFechaValor").value.split("/")[1] + GI("txtFechaValor").value.split("/")[0] + GI("txtFechaValor").value.split("/")[2];//resultado.arpNomArchivo + ".txt";
        var url = ctxRoot + "/generarArchivoInterfase.do?json=" + JSON.stringify(objArchivosPlanosParam);
        var liga = GI("ligaArchivo");
        liga.href = url;
        liga.click();
        alert("Proceso concluido satisfactoriamente!");
        //ObtenReporte();
        onButtonClickPestania('Honorarios.CargaProvisiones.PrincipalCargaMasivaProvisiones', '');

    }
    else 
    alert("Ocurri\u00F3 un error inesperado");
    hideWaitLayer();
}

var cont=0;
function fileUploaded() {  
    hideWaitLayer();
    cont++;
    if(cont==1) {
    alert("Archivo Cargado correctamente");    
    }
    
 /* 
  var objInterface = GI("dvInterface");
  var url = ctxRoot + "/modules/Interfases/InterfseVauacion/TasAplicar.do";
 
 GI("frameUpload").onreadystatechange = function() {};
  hide("frameUpload");
  hide("frmTas");
  
  removeFrame("frameUpload");
  
  makeAjaxRequest(url, "HTML", cambiaPantallaTAS, objInterface);*/
}
/*

function cambiaPantallaTAS(obj, result) {
  obj.innerHTML = result;
  SA(GI("paramFecha"), "readonly", "true");
  GI("txtMensaje").value=vgDisplay;
  hideWaitLayer();
}*/