showWaitLayer();
initForms();

var fvCargaMasiva = new FormValidator();
var archivoSeleccionado = false;
//var divNombreFideicomisoParam;
var fechaDefault = new Date();

fvCargaMasiva.setup({
  formName      : "frmCargaMasiva",
  tipoAlert     : 1,
  alertFunction : BaloonAlert,
  sendObjToAlert: true
});

function showFrame() {
  displayFrame("dvMensajes", "frameUpload", ctxRoot + "/modules/Tesoreria/Interfaces/TasUpload.do", 200, 200, 100, 400, 0, 0);  
}

function frameSubmitOld(forma) {
    //obtenerTipoArchivo();
  if(fvCargaMasiva.checkForm() && obtenerNombreArchivo(forma.flArchivo)){
    showWaitLayer();
    GI("frameUpload").onreadystatechange = hideFrame;

//alert("Nombre Archivo"+GI("NombreArchivo").value);
    
  forma.document.getElementById("Fecha").value = GI("txtFechaContable").value;
  forma.document.getElementById("NombreArchivo").value = GI("NombreArchivo").value;
  forma.submit();
  
    archivoSeleccionado = true;
    deshabilitaObjetos(GI("frmCargaMasiva"));
    muestraObjs("cmdCargar,cmdLimpiar");
  }else{
    archivoSeleccionado = false;
  }
}

function hideFrame() { 
  GI("frameUpload").onreadystatechange = null;
  removeFrame("frameUpload");
  hideWaitLayer();
  
  consultaFisoInmuebles();
}

function consultaFisoInmuebles()
{
  var objCargaMasivaParam = JSON.parse("{\"id\":\"conArcPla\"}");
  objCargaMasivaParam.nomArchivo = GI("NombreArchivo").value;
  objCargaMasivaParam.Fecha = GI("txtFechaContable").value;
  var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(objCargaMasivaParam);

  makeAjaxRequest(url, "HTML", consultaFisoInmueblesRes, null);
}


function consultaFisoInmueblesRes(obj,result)
{
  var res = JSON.parse(result);
  
  if(isDefinedAndNotNull(res))
  {
  
    if(res.length>0)
    {
      var sline = res[0].arpDescripcion;
      var sfiso = sline.split(";")[0];
      alert(sfiso)
      if(sfiso!=GI("paramFideicomiso").value)
      {
        alert("El no. de Fideicomiso contenido en el archivo no coincide con el no. digitado en el campo Fideicomiso");
        
        borraArchivoInmuebles();
      }
      
    }
  }
}

function borraArchivoInmuebles()
{
  var objCargaMasivaParam = JSON.parse("{\"id\":\"borraArcPla\"}");
  objCargaMasivaParam.Archivo = GI("NombreArchivo").value;
  var url = ctxRoot + "/doRef.do?json=" + JSON.stringify(objCargaMasivaParam);
  makeAjaxRequest(url, "HTML", borraArchivoInmueblesRes, null);
}

function borraArchivoInmueblesRes(obj,result)
{
  
  var res = JSON.parse(result);
  
  if(isDefinedAndNotNull(res))
  {
    if(res.tipoError=="SUCCESS")
    {
      limpiar();
    }
  }
}


function obtenerNombreArchivo(objFile){  
  var numTipo = GI("rdTipoMovimiento").value;
  var tipoOperacion = eval(numTipo);
  switch(tipoOperacion){
    case 1://Individualizaci\u00F3n Inmuebles
         if(false&&objFile.value != "" && objFile.value.split("\\")[objFile.value.split("\\").length-1].split(".")[0].indexOf("INMUEBLES") == -1){
         alert("Seleccione un Archivo de Carga correcto!");
         return false;
         }else if(objFile.value == ""){
            alert("Seleccione el Archivo de Carga!");
            return false;
	}else 
      {
       GI("NombreArchivo").value = objFile.value.split("\\")[objFile.value.split("\\").length-1].split(".")[0];
        return true;
      }
    break;
    case 2://Individualizaci\u00F3n Inmuebles
         if(false&&objFile.value != "" && objFile.value.split("\\")[objFile.value.split("\\").length-1].split(".")[0].indexOf("ADQUIRENTES") == -1){
         alert("Seleccione un Archivo de Carga correcto!");
         return false;
         }else if(objFile.value == ""){
            alert("Seleccione el Archivo de Carga!");
            return false;
      }else 
      {
       GI("NombreArchivo").value = objFile.value.split("\\")[objFile.value.split("\\").length-1].split(".")[0];
        return true;
      }
    break;
    case 3://Individualizaci\u00F3n Inmuebles
         if(false&&objFile.value != "" && objFile.value.split("\\")[objFile.value.split("\\").length-1].split(".")[0].indexOf("PAGOS") == -1){
         alert("Seleccione un Archivo de Carga correcto!");
         return false;
         }else if(objFile.value == ""){
            alert("Seleccione el Archivo de Carga!");
            return false;
	}else 
      {
       GI("NombreArchivo").value = objFile.value.split("\\")[objFile.value.split("\\").length-1].split(".")[0];
        return true;
      }
    break;
   default:
      alert("Operacion Realizada Satisfactoriamente"); 
      }

  if(false&&objFile.value != "" && objFile.value.split("\\")[objFile.value.split("\\").length-1].split(".")[0].indexOf("ADQUIRENTES") == -1){
    alert("Seleccione un Archivo de Carga correcto!");
    return false;
  }else if(objFile.value == ""){
    alert("Seleccione el Archivo de Carga!");
    return false;
  }
  GI("NombreArchivo").value = objFile.value.split("\\")[objFile.value.split("\\").length-1].split(".")[0];
  return true;
}

function ejecutaCargaMasiva(){
  showWaitLayer();
  var objCargaMasivaParam = JSON.parse("{\"id\":\"ejeFunCargaMasivaInmuebles\"}");
  //objCargaMasivaParam.Tipo = 1;
  objCargaMasivaParam.TipoMovimiento = eval(GI("rdTipoMovimiento").value);
  objCargaMasivaParam.Fideicomiso = GI("paramFideicomiso").value;
  objCargaMasivaParam.NombreArchivo = GI("NombreArchivo").value;
  objCargaMasivaParam.Fecha = GI("txtFechaContable").value;
  var url = ctxRoot + "/executeRef.do?json=" + JSON.stringify(objCargaMasivaParam);
  makeAjaxRequest(url, "HTML", validaCargaMasiva, null);
}


function validaCargaMasiva(obj, result){
  var resultado = JSON.parse(result);
  if(isDefinedAndNotNull(resultado)){
    if(resultado == "CORRECTO"||resultado == "0"){
      alert("Proceso concluido satisfactoriamente!");
      onButtonClickPestania('Garantias.Inmuebles.CargaMasiva.PrincipalCargaMasiva','');
    }else if(resultado == "ERROR NO DATOS")
      alert("No existe informaci\u00F3n a procesar!");
    else if(resultado == "ERROR NUM COLS")
      alert("Número de columnas invalido!");
    else if(resultado == "ERROR NUM SPD")
      alert("Error de dato númerico que no debería tener punto décimal!");
    else if(resultado == "ERROR NUM CPD")
      alert("Error de dato númerico que maneja punto décimal!");
    else if(resultado == "ERROR PROC. ASIGNADO")
      alert("Error al procesar el rubro de asignado!");
    else if(resultado == "ERROR PROC. COMPROMETIDO")
      alert("Error al procesar el rubro de comprometido!");
    else if(resultado == "ERROR PROC. EJERCIDO")
      alert("Error al procesar el rubro de ejercido!");
    else if(resultado == "ERROR ORACLE")
      alert("Ocurri\u00F3 un error inesperado (oracle)!");
    if(resultado != "CORRECTO"){
      var objDeleteParam = JSON.parse("{\"id\":\"delArcPla\"}");
      var url = ctxRoot + "/doRef.do?json=" + JSON.stringify(objDeleteParam);
      //alert(url);
      makeAjaxRequest(url, "HTML", null, null);
    }
  }else
    alert("Ocurri\u00F3 un error inesperado!"+resultado);
  hideWaitLayer();
}

// limpiar

function limpiar()
{
  onButtonClickPestania('Garantias.DerechosCobro.CargaMasiva.PrincipalCargaMasiva','');
}

// validacion garantias

function consultaDatosFideicomiso(txtFideicomiso)
{
  consultaNombreFideicomiso('nomFideicomiso',txtFideicomiso);
  
  var vFideicomiso = txtFideicomiso.value;
  
  if(vFideicomiso.length>0)
  {
    var objFisoGar = JSON.parse("{}");
    objFisoGar.id = "consultarBienesGar";
    objFisoGar.Fiso = vFideicomiso;
    
    var url = ctxRoot+"/getRef.do?json="+JSON.stringify(objFisoGar);
    
    makeAjaxRequest(url,"html",consultaDatosFideicomisoRes,txtFideicomiso);
  }
}

function consultaDatosFideicomisoRes(txtFideicomiso,result)
{
  var res = JSON.parse(result);
  
 /* if(res.length==0)
  {
    alert("Fideicomiso no tiene Garantias registradas");
    txtFideicomiso.value="";
    txtFideicomiso.focus();
  }*/
  
}

function subirArchivo(obj, result) {
    var theProcessor = "mx.gob.nafin.fiduciario.business.upload.processors.CargaArchivosExcelPagaresImpl";
    document.frameUpload.frmCargaComprasVentas.processor.value = theProcessor;
    veces = 0;
    frameSubmit(document.frameUpload.frmCargaComprasVentas);
}

function frameSubmit(forma) {
    ////console.log('frameSubmit');
    //TODO: Optimizar la condicion para no tener un IF extenso... quiza un parseInt del valor de paramInterfaceID y poner la condicion de: si valor > 1 & < 4
    if(GI("txtFechaContable").value=="" ) {  
        alert("Debe seleccionar la Fecha");
    } else {  
    
        showWaitLayer();
        //alert(date);
        nomArchivo = forma.document.getElementById("fileTest").value;
    
        if (nomArchivo == '') {
            alert('debe seleccionar un archivo');
            hideWaitLayer();
            return;
            
        }
    
        nomArchivo = nomArchivo.split('\\');
        nomArchivo = nomArchivo[nomArchivo.length - 1];
        
        forma.document.getElementById("Fecha").value = GI("txtFechaContable").value;
        forma.document.getElementById("NombreArchivo").value = nomArchivo;
        
        nom = nomArchivo;
        forma.submit();
    
        stopCtl = false;
        uploadMonitor();
    }  
}

var urlCtl = ctxRoot + "/getRef.do?json=" + JSON.stringify({id:"cuentaAP"});
var stopCtl = false;
var procID = 0;
var veces = 0;
var ultimaCantidad = -1;
function uploadMonitor(obj, result) {
    ////console.log('uploadMonitor.result: ' + result);
    if(!stopCtl) { setTimeout(function() { makeAjaxRequest(urlCtl, "HTML", uploadMonitor, null); }, 3000); }
    if(isDefinedAndNotNull(result)) {
        var objCtl = JSON.parse(result)[0];
        if(!stopCtl && objCtl.totalRegistros == ultimaCantidad && veces >= 5) {
            alert("Archivo Cargado Exitosamente!");
            stopCtl = true;
            hideWaitLayer();
        } else {
            ultimaCantidad = objCtl.totalRegistros;
            veces++;
        }
    }
}