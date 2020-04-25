var catGar = new Catalogo("mx.com.inscitech.fiducia.domain.FGarantias");
var catfBienesgar = new Catalogo("mx.com.inscitech.fiducia.domain.FBienesgar");

catGar.dateFormat = "dd/MM/YYYY";
catfBienesgar.dateFormat = "dd/MM/YYYY";
var vgContenedorDatos;
//VARIABLES QUE CONTROLAN EL EVENTO DEL BOTON ACEPTAR DE LA PANTALLA PRINCIPAL

var OP_REGISTRO = 1;
var OP_REVALUACION = 3;
var OP_MODIFICAR = 2;
var OP_SALIDA = 5;
var OP_CONSULTAR = 4;
var OP_IMAGENES = 6;

var pkInfo = null;
var pkInfoBienesGar = null;
var pkInfoBienesGarPagos = null;

var modo;

var usarSetValuesFormObject=false;
var parametroComboProducto;

var cmbInstrumentoParam = JSON.parse("{\"llaveClaveSec\":-1}");

var fechas = new Date();

var strIdPK = "fgarIdFideicomiso,fgarIdSubcuenta";
var arrIdPK = strIdPK.split(",");
var strIdPKBienesGar = "fgrsIdFideicomiso,fgrsIdSubcuenta,forsCveTipoGarantia,forsIdGarantia,forsNumEscritura";
var arrIdPKBienesGar = strIdPKBienesGar.split(",");
var strIdPKBienesGarPagos = "fpbIdFideicomiso,fpbIdSubcuenta,fpbIdGarantia,fpbIdBienGarantia";
var arrIdPKBienesGarPagos = strIdPKBienesGarPagos.split(",");



var clavesCombo38 = JSON.parse("{\"llaveClave\":38}");
var clavesCombo70b = JSON.parse("{\"chido\":70}");
var clavesCombo72 = JSON.parse("{\"llaveClave\":72}");
var clavesCombo31 = JSON.parse("{\"llaveClave\":31}");
var clavesCombo52 = JSON.parse("{\"llaveClave\":52}");
var clavesCombo71 = JSON.parse("{\"llaveClave\":71}");
var clavesCombo53 = JSON.parse("{\"llaveClave\":53}");

parametroComboProducto = JSON.parse("{\"llaveClave\":71}");

var fechaActual = JSON.parse("{\"id\":\"regresaFechaActual\"}");
var clavesComboClasifBienFideicom;

initForms();

var tablaGarantiasData = new Array();
tablaGarantiasData[0] = "fgarIdFideicomiso,100px";
tablaGarantiasData[1] = "fgarCveGarantia2,100px";
tablaGarantiasData[2] = "fgarImpGarantiaFormatted,100px";
tablaGarantiasData[3] = "fgarImpGarantizadFormatted,100px";
//tablaGarantiasDat[5] = "fgarFecInicio,100px";
tablaGarantiasData[4] = "fgarCveStatus,100px";


var tablaBienesGarData = new Array();
tablaBienesGarData[0] = "fgrsIdFideicomiso,110px";
tablaBienesGarData[1] = "descripbien,110px";
tablaBienesGarData[2] = "forsImpUltValuaFormatted,110px";
tablaBienesGarData[3] = "forsTextoDescrip,220px";


function clickTabla(pk)
{
  cloneObject(pk,catGar.getCatalogo());
  pkInfo = pk;
  
  //GI('paramIdGar').value = pkInfo.fgarCveGarantia;
  GI('paramCveTipoGar').value = pkInfo.fgarCveGarantia;
  GI('paramFiso').value = pkInfo.fgarIdFideicomiso;
  
  GI('dvModificacionGarantia').style.visibility = "visible";
  consultaBienesGar();
}

function clickTablaBienesGar(pk)
{
  cloneObject(pk,catfBienesgar.getCatalogo());
  pkInfoBienesGar = pk;  
  GI('paramIdBienGar').value = pkInfoBienesGar.forsIdGarantia;
}

function clickTablaBienesGarPagos(pk)
{
  pkInfoBienesGarPagos = pk;  
}

var fvCatGar = new FormValidator();
var fvcatfBienesgar = new FormValidator();
var fvcatfBienesgarPagos = new FormValidator();

function consultaGarantia(btnAceptar)
{
  consultar(btnAceptar, GI('frmPrincipalGarantias'), false);
  
  // limpia bienesgar
  pkInfo = null;
  pkInfoBienesGar = null;
  pkInfoBienesGarPagos = null;
  //GI('paramIdGar').value = 999999999;
  GI('paramCveTipoGar').value = 999999999;
  GI('paramFiso').value = 999999999;
  GI('dvModificacionGarantia').style.visibility = "hidden";
  
  consultaBienesGar();
  
}


// FUNCIONES QUE CARGAN LA PANTALLA DE MANTENIMIENTO 

fvCatGar.setup({
  formName      : "frmMantenimientoGarantias",
  tipoAlert     : 1,
  alertFunction : BaloonAlert,
  sendObjToAlert: true
});


fvcatfBienesgar.setup({
  formName      : "frmMantenimientoBienesGar",
  tipoAlert     : 1,
  alertFunction : BaloonAlert,
  sendObjToAlert: true
});


function cargaMantenimientoGarantias(Modo){
    modo = Modo;
    if((isDefinedAndNotNull(pkInfo) || modo == OPER_ALTA)){//
        var urlCliente = "modules/Garantias/Garantias/MantenimientoGarantias.do";
        makeAjaxRequest(urlCliente, "HTML", despliegaPantallaMantenimientoGarantias, null);
    }
    else
        alert("No a has seleccionado campo alguno de la tabla");
}

function despliegaPantallaMantenimientoGarantias(obj, result) {
  GI("dvPantalla").innerHTML = result;
  initForms();
  
  fvCatGar.setup({
    formName      : "frmMantenimientoGarantias",
    tipoAlert     : 1,
    alertFunction : BaloonAlert,
    sendObjToAlert: true
  });
    
      // DEFINICION DE LOS CAMPOS DE TEXTOS PARA SER CONVERTIDOS EN FECHAS --------------------------------
      
      
  Calendar.setup({
    inputField     :    "fgarFecUltValua",   // id of the input field
    button         :    "fgarFecUltValua",
    ifFormat       :    "%d/%m/%Y", //"%a %e/%b/%Y",       // format of the input field
    showsTime      :    false,
    timeFormat     :    "24",
    onUpdate       :    setFechaCal,
    disableFunc    :    isValidDateAll,
    date           :    fechas,
    weekNumbers    :    false,
    cache          :    true,
    step           :    1
  });
  
  Calendar.setup({
    inputField     :    "fgarFecInicio",   // id of the input field
    button         :    "fgarFecInicio",
    ifFormat       :    "%d/%m/%Y", //"%a %e/%b/%Y",       // format of the input field
    showsTime      :    false,
    timeFormat     :    "24",
    onUpdate       :    setFechaCal,
    disableFunc    :    isValidDate,
    date           :    fechas,
    weekNumbers    :    false,
    cache          :    true,
    step           :    1
  });
  
  Calendar.setup({
    inputField     :    "fgarFecFin",   // id of the input field
    button         :    "fgarFecFin",
    ifFormat       :    "%d/%m/%Y", //"%a %e/%b/%Y",       // format of the input field
    showsTime      :    false,
    timeFormat     :    "24",
    onUpdate       :    setFechaCal,
    disableFunc    :    isValidDateAll,
    date           :    fechas,
    weekNumbers    :    false,
    cache          :    true,
    step           :    1
  });
  
  /*Calendar.setup({
    inputField     :    "txtFecha",   // id of the input field
    button         :    "txtFecha",
    ifFormat       :    "%d/%m/%Y", //"%a %e/%b/%Y",       // format of the input field
    showsTime      :    false,
    timeFormat     :    "24",
    onUpdate       :    setFechaCal,
    disableFunc    :    isValidDateAll,
    date           :    fechas,
    weekNumbers    :    false,
    cache          :    true,
    step           :    1
  });*/
  
  
  muestraFechaActual();
  asignaFec();
  // FIN DE LA DEFINICION DE FECHAS -------------------------------------------------------------------
  
 if(modo != OPER_CONSULTAR)
 {
      muestraObjs("cmdAceptar,cmdCancelar");
 }
 else  
 {
      SA(GI("cmdCancelar"),"value","Regresar");
      muestraObjs("cmdCancelar");
 }
    
}

function operacionExitosa() {
  alert("La operaci\u00F3n se realiz\u00F3 correctamente");
  cargaPrincipalGarantias();
  hideWaitLayer();
}

function cargaPrincipalGarantias() {
  onButtonClickPestania("Garantias.Garantias.PrincipalGarantias","");
  hideWaitLayer();
}

function loadCatalogo(){
  catGar.setOnUpdate(catLoaded);
  
  if(modo!=OPER_ALTA&&modo!=OPER_BAJA){//SI NO ES UN REGISTRO NUEVO
        catGar.buscaCatalogoPK(false);// MANDAR LLAMAR EL MAPEO CORRESPONDIENTE CON CADA CAMPO
        if(modo==OP_MODIFICAR){//SI ES UNA MODIFICACION
              
              deshabilitaPK(arrIdPK);// BLOQUEAR LOS CAMPOS DE LLAVE PRIMARIA PERTENECIENTES A LA TABLA F_BIENES
        }
        else if(modo==OPER_CONSULTAR){
              deshabilitaObjetos(GI("frmMantenimientoGarantias")); 
              
        }   
  }
}

function catLoaded(){
  formsLoaded();
}

//_______________________________________________________________________________________

// FUNCIONES QUE SE ENCARGAN DE LA GESTION DE LAS FECHAS


function setFechaCal()
{}

function isValidDate(date)
{
  var today = new Date();
  if(date>today)
    return true;
  else
    return false;
}


function isValidDateAll(date)
{
  return false;
}

//------------------------------------------------------------------------


//FUNCIONES GENERICAS DE ESTE JAVASCRPT-----------------------------

function AltaOModificaInfo(){
  catGar.setOnUpdate(operacionExitosa);
  if(modo==OP_REGISTRO && fvCatGar.checkForm())//Se trata de una alta
  {
    showWaitLayer();
    //actualizaImporte(); 
    catGar.altaCatalogo();
  }
  else if(modo==OP_MODIFICAR && fvCatGar.checkForm())//Se trata de una modificaci\u00F3n
  {
    showWaitLayer();
    catGar.modificaCatalogo();
  }
}

function     actualizaImporte() {
    vgContenedorDatos=JSON.parse("{\"id\":\"ejemanttogarantias\"}");
    vgContenedorDatos.Opcion=eval(1);
    vgContenedorDatos.Fideicomiso=eval(GI("fgarIdFideicomiso").value);
    //alert(GI("fgarIdSubcuenta").value)
    if(GI("fgarIdSubcuenta").value!=null)
        vgContenedorDatos.Subfiso=eval(GI("fgarIdSubcuenta").value);
    else
        vgContenedorDatos.Subfiso=eval(0);
    vgContenedorDatos.Garantia=eval(GI("fgarCveGarantia").value);
    vgContenedorDatos.Texto=GI("fgarTexGarantia").value;
    vgContenedorDatos.Comentario=GI("fgarTexComentario").value;
    //alert(GI("fgarCveRevaluaChk").value)
    if(GI("fgarCveRevaluaChk").value.length!=2)
        vgContenedorDatos.Revalua=eval(GI("fgarTexComentario").value);
    else
        vgContenedorDatos.Revalua=eval(0);
    vgContenedorDatos.Importe=""+GI("fgarImpGarantia").value;
    vgContenedorDatos.Garantizado=eval(GI("fgarImpGarantizad").value);
    //alert(GI("fgarPjePicnorado").value)
    if(GI("fgarPjePicnorado").value!=null)
        vgContenedorDatos.Pignorado=eval(GI("fgarPjePicnorado").value);
    else
        vgContenedorDatos.Pignorado=eval(0);
    vgContenedorDatos.ImpUltValua=""+GI("fgarImpUltValua").value;
    vgContenedorDatos.CvePerValua=GI("fgarCvePerValua").value;
    vgContenedorDatos.FecUltValua='';
   // alert(GI("fgarFecInicio").value)
    if(GI("fgarFecInicio").value!=null)
        vgContenedorDatos.FecInicio=GI("fgarFecInicio").value;
    else
        vgContenedorDatos.FecInicio='';
    //alert(GI("fgarFecFin").value)    
    if(GI("fgarFecFin").value!=null)    
        vgContenedorDatos.FecFin=GI("fgarFecFin").value;    
    else
        vgContenedorDatos.FecFin='';    
    vgContenedorDatos.Status=GI("fgarCveStatus").value;    
    if(GI("fgarEsGarantiaChk").value.length!=2)
        vgContenedorDatos.EsGarantia=eval(GI("fgarEsGarantiaChk").value);
    else
        vgContenedorDatos.EsGarantia=eval(0);

    
    var url = ctxRoot + "/executeRef.do?json=" + JSON.stringify(vgContenedorDatos);//executeRef
   // alert(url);
    makeAjaxRequest(url, "HTML", resultadoMantenimiento, null);      
}

  function resultadoMantenimiento(objTabla, result) {
    //alert(result);
    var resultado =JSON.parse(result).result;
    if(resultado==0){
      alert("La operaci\u00F3n se realiz\u00F3 correctamente");
      onButtonClickPestania("Garantias.Garantias.PrincipalGarantias","");
    }
    else{
      alert("Ocurrio un Error inesperado");        
    } 
    hideWaitLayer();
  }


function eliminarRegistro() {
  if(pkInfo==null)
    alert("No se ha seleccionado campo alguno de la tabla");
  else
  {
    catGar.setOnUpdate(operacionExitosa);
    showWaitLayer();
    eliminaCatalogo(catGar);
  }
}

function muestraFechaActual() {
  //fechaActual.tipoFecha="CONTABLE";
  var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(fechaActual);
  makeAjaxRequest(url, "HTML", insertaFechaActual, null);
}

function insertaFechaActual(obj, result) {
  //alert(result);
  var objResult = JSON.parse(result);
  
  GI("fcoDiaDia").value=objResult[0].fcoDiaDia;
  GI("fcoMesDia").value=objResult[0].fcoMesDia;
  GI("fcoAnoDia").value=objResult[0].fcoAnoDia;
  
  if(isDefinedAndNotNull(GI("fgarFecInicio"))) {
    GI("fgarFecInicio").value = formatString(GI("fcoDiaDia").value,"0",2,"Izquierda") + "/" + formatString(GI("fcoMesDia").value,"0",2,"Izquierda") + "/" + GI("fcoAnoDia").value;
  }
}

function asignaFec()
{
  if(modo==OP_REGISTRO)
    GI("fgarFecUltValua").value=GI("fgarFecInicio").value;

}




///
/***************************************** BIENES GAR ******************************************************************/
/***********************************************************************************************************************/

function consultaBienesGar()
{
  GI('cmdAceptarBienesGar').click();
  
  GI('paramIdBienGar').value = 999999999;
}

function cargaMantenimientoBienesGar(Modo){
    modo = Modo;
    if((isDefinedAndNotNull(pkInfoBienesGar) ||isDefinedAndNotNull(pkInfo)))
    {//&& Modo != OPER_BAJA
        var objVerRxisteGarantia = JSON.parse("{\"id\":\"verExisteGarantia\"}");
        var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(objVerRxisteGarantia);
        
        if(modo == OP_REGISTRO)
          verificarYdesplegarMantenimiento(null,'[{"verifyExistFile":1}]');
        else
          makeAjaxRequest(url, "HTML", verificarYdesplegarMantenimiento, null);
    }
    else
        alert("No ha seleccionado campo alguno de la tabla");
}

function verificarYdesplegarMantenimiento(obj,result){
   var resultado = JSON.parse(result)[0];
   if(resultado.verifyExistFile==0)
        alert("No se ha encontrado ninguna garantia dada de alta");
   else{
        var urlCliente = "modules/Garantias/BienesGar/MantenimientoBienesGar.do";
        makeAjaxRequest(urlCliente, "HTML", despliegaPantallaMantenimientoBienesGar, null);
   }
}

function despliegaPantallaMantenimientoBienesGar(obj, result) {
  GI("dvPantalla").innerHTML = result;
  initForms();
  fvcatfBienesgar.setup({
    formName      : "frmMantenimientoBienesGar",
    tipoAlert     : 1,
    alertFunction : BaloonAlert,
    sendObjToAlert: true
  });

      // DEFINICION DE LOS CAMPOS DE TEXTOS PARA SER CONVERTIDOS EN FECHAS --------------------------------
        
  Calendar.setup({
    inputField     :    "forsFecVencimiento",   // id of the input field
    button         :    "forsFecVencimiento",
    ifFormat       :    "%d/%m/%Y", //"%a %e/%b/%Y",       // format of the input field
    showsTime      :    false,
    timeFormat     :    "24",
    onUpdate       :    setFechaCal,
    disableFunc    :    isValidDateAll,
    date           :    fechas,
    weekNumbers    :    false,
    cache          :    true,
    step           :    1
  });
  
  Calendar.setup({
    inputField     :    "forsFecUltValua",   // id of the input field
    button         :    "forsFecUltValua",
    ifFormat       :    "%d/%m/%Y", //"%a %e/%b/%Y",       // format of the input field
    showsTime      :    false,
    timeFormat     :    "24",
    onUpdate       :    setFechaCal,
    disableFunc    :    isValidDate,
    date           :    fechas,
    weekNumbers    :    false,
    cache          :    true,
    step           :    1
  });
  
  /*Calendar.setup({
    inputField     :    "fbifFecFin",   // id of the input field
    button         :    "fbifFecFin",
    ifFormat       :    "%d/%m/%Y", //"%a %e/%b/%Y",       // format of the input field
    showsTime      :    false,
    timeFormat     :    "24",
    onUpdate       :    setFechaCal,
    disableFunc    :    isValidDateAll,
    date           :    fechas,
    weekNumbers    :    false,
    cache          :    true,
    step           :    1
  });*/
  
  Calendar.setup({
    inputField     :    "txtFecha",   // id of the input field
    button         :    "txtFecha",
    ifFormat       :    "%d/%m/%Y", //"%a %e/%b/%Y",       // format of the input field
    showsTime      :    false,
    timeFormat     :    "24",
    onUpdate       :    setFechaCal,
    disableFunc    :    isValidDateAll,
    date           :    fechas,
    weekNumbers    :    false,
    cache          :    true,
    step           :    1
  });
  
 muestraFechaActualBienesGar(); 
  // FIN DE LA DEFINICION DE FECHAS -------------------------------------------------------------------
 
 if(modo != OP_CONSULTAR)
 {
      muestraObjs("cmdAceptar,cmdCancelar");
 }
 else  {
      SA(GI("cmdCancelar"),"value","Regresar");
      muestraObjs("cmdCancelar");
 }
    
}

function operacionExitosaBienesGar() {
  alert("La operaci\u00F3n se realiz\u00F3 correctamente");
  cargaPrincipalBienesFideicomitidos();
  hideWaitLayer();
}

function cargaPrincipalBienesFideicomitidos() {
  onButtonClickPestania("Garantias.Garantias.PrincipalGarantias","");
  hideWaitLayer();
}

function loadCatalogoBienesGar(){
  //alert(modo);
  catfBienesgar.setOnUpdate(catLoadedBienesGar);
  
  deshabilitaPK(arrIdPKBienesGar);// BLOQUEAR LOS CAMPOS DE LLAVE PRIMARIA PERTENECIENTES A LA TABLA F_BIENES
  
  if(modo!=OP_REGISTRO){//SI NO ES UN REGISTRO NUEVO
        catfBienesgar.buscaCatalogoPK(false);// MANDAR LLAMAR EL MAPEO CORRESPONDIENTE CON CADA CAMPO
        if(modo==OP_MODIFICAR){//SI ES UNA MODIFICACION, CIERTOS CAMPOS DEBEN ESTAR BLOQUEADOS
              //alert(modo);
              SA(GI("fbifImpBien"),"disabled","true");
              SA(GI("fbifMoneda"),"disabled","true");
              SA(GI("fbifImpMoneda"),"disabled","true");
              SA(GI("fbifImpUltValua"),"disabled","true");
              SA(GI("fbifFecFin"),"disabled","true");
              SA(GI("fbifFecUltValua"),"disabled","true");
              SA(GI("fbifStBien"),"disabled","true");
              
        }
        else if(modo==OP_REVALUACION){
              SA(GI("fgrsIdFideicomiso"),"disabled","true");
              SA(GI("fgrsIdSubcuenta"),"disabled","true");
              SA(GI("forsIdGarantia"),"disabled","true");
              SA(GI("forsCveTipoGarantia"),"disabled","true");
              SA(GI("forsCveTipoBien"),"disabled","true");
              SA(GI("forsIdentificacion"),"disabled","true");
              SA(GI("forsImpBien"),"disabled","true");
              SA(GI("forsMoneda"),"disabled","true");
              SA(GI("forsTextoDescrip"),"disabled","true");
              SA(GI("forsTexComentario"),"disabled","true");
              SA(GI("forsCveStatus"),"disabled","true");
              SA(GI("forsFecVencimiento"),"disabled","true");
              SA(GI("forsCveRevaluaChk"),"disabled","true");
              SA(GI("forsCvePerValua"),"disabled","true");
              SA(GI("forsNumEscritura"),"disabled","true");
              SA(GI("forsNumNotario"),"disabled","true");
              SA(GI("forsImpUltValua"),"disabled","true");
              SA(GI("forsFecUltValua"),"disabled","true");

              
        }
        else {//PARA SALIDA y CONSULTAR TODO EL FORMULARIO DEBE DE ESTAR BLOQUEADO
              //alert(modo)
              
              deshabilitaObjetos(GI("frmMantenimientoBienesGar"));
        }
        
        
  }
  else  {// SI ES REGISTRO
  //alert("registro")
        GI("forsCveRevaluaChk").value="off"
        //SA(GI("fbifImpBien"),"disabled","true");
              //SA(GI("fbifMoneda"),"disabled","true");
             // SA(GI("fbifImpMoneda"),"disabled","true");
              SA(GI("forsImpUltValua"),"disabled","true");
              SA(GI("forsFecUltValua"),"enabled","true");
              /*SA(GI("fbifFecUltValua"),"disabled","true");
              SA(GI("fbifStBien"),"disabled","true");
        GI("fbifMoneda").selectedIndex = "MONEDANACIONAL";
        GI("fbifStBien").selectedIndex = "ACTIVO";
        GI("fbifStBien").selectedIndex = 1;*/
        
        // valores tomados desde garantias ----------
        
        GI("fgrsIdFideicomiso").value = pkInfo.fgarIdFideicomiso;
        GI("fgrsIdSubcuenta").value = pkInfo.fgarIdSubcuenta;
        GI("forsCveTipoGarantia").value = pkInfo.fgarCveGarantia;
        //eval(pkInfo.ctoNumEscritura)
        if(pkInfo.ctoNumEscritura!=null)
            GI("forsNumEscritura").value = pkInfo.ctoNumEscritura;
        else
            GI("forsNumEscritura").value = "";
        
        if(GI("forsCveTipoGarantia").value==2)
            parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(71) + "\"}");
        else if(GI("forsCveTipoGarantia").value==1)
            parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(72) + "\"}");
        else if(GI("forsCveTipoGarantia").value==3)
            parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(73) + "\"}");
            
        loadElement(GI("forsCveTipoBien"));
        
        consultaSigBien();// obtiene siguiente id_bien
  }
        
}

function consultaSigBien()
{
  var objSigBien = JSON.parse("{}");
  objSigBien.id = "consultaSigBienesGar";
  objSigBien.Fiso = GI('fgrsIdFideicomiso').value;
  objSigBien.SubFiso = GI('fgrsIdSubcuenta').value;
  objSigBien.CveTipoGar = GI('forsCveTipoGarantia').value;
  
  var url = ctxRoot + "/getRef.do?json="+JSON.stringify(objSigBien);
  
  makeAjaxRequest(url,"html",consultaSigBienRes,null);

}

function consultaSigBienRes(obj,result)
{
  var res = JSON.parse(result)[0];
  
  GI('forsIdGarantia').value = res.idSigBien;

}

function asignaFecBienesGar()
{
 if(modo==OP_REGISTRO)
    GI("fbifFecUltValua").value=GI("fbifFecInicio").value

}

function catLoadedBienesGar()
{

  //deshabilitaObjetos(GI("frmMantenimientoBienesGar"));
  //cargaParamComboProducto(GI("fbifIdTipoBien"),true);
  if(modo==OP_REVALUACION){
        muestraObj("importeRevaluacion");
        muestraObj("txtImporteRevaluacion");
        muestraObj("divFecha");
        muestraObj("txtFecha");
        
      }
  else if(modo==OP_CONSULTAR){
        muestraObj("tipoCambio");
        muestraObj("fbifTipoCambio");
  }
  cargaParamComboEstado(GI("forsCveTipoGarantia"),true);
  cargaParamComboEstadoP(GI("paramCveTipoGar"),true);//paramTipoBienFideicomitido
  formsLoaded();
}

//_______________________________________________________________________________________

//FUNCIONES GENERICAS DE ESTE JAVASCRPT-----------------------------


function AltaOModificaInfoBienesGar() {
  catfBienesgar.setOnUpdate(operacionExitosaBienesGar);
  if(modo==OP_REGISTRO && fvcatfBienesgar.checkForm())//Se trata de una alta
  {
    showWaitLayer();
    catfBienesgar.altaCatalogo();
  }
  else if(modo==OP_MODIFICAR && fvcatfBienesgar.checkForm())//Se trata de una modificaci\u00F3n
  {
    showWaitLayer();
    catfBienesgar.modificaCatalogo();
  }
}

//CARGA LOS COMBOS DE LA PANTALLA PRINCIPAL

  function cargaParamComboEstado(objCombo,parametro2){
  usarSetValuesFormObject=parametro2;
  //alert(""+objCombo.value);
  
    if(objCombo.value==2)
        parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(71) + "\"}");
    else if(objCombo.value==1)
        parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(72) + "\"}");
    else if(objCombo.value==3)
        parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(73) + "\"}");  
    else if(objCombo.value==4)
        parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(90) + "\"}");   
  //parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +objCombo.value + "\"}");
  SA(GI("forsCveTipoBien"),"next","asignaEstado");
  loadElement(GI("forsCveTipoBien"));
}

function asignaEstado(){
  if(usarSetValuesFormObject)
    setValuesFormObject(catfBienesgar.getCatalogo());
  else
    GI("forsCveTipoBien").selectedIndex=0;
  
  formsLoaded();
}



function cargaParamComboEstadoP(objCombo,parametro2){
  usarSetValuesFormObject=parametro2;
  //alert(""+objCombo.value);
    if(objCombo.value==2)
        parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(71) + "\"}");
    else if(objCombo.value==1)
        parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(72) + "\"}");
    else if(objCombo.value==3)
        parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(73) + "\"}");    
    else if(objCombo.value==4)
        parametroComboEstado = JSON.parse("{\"llaveClave\": \"" +eval(90) + "\"}");    

  SA(GI("paramCveTipoBien"),"next","asignaEstadoP");//paramClasFide
  loadElement(GI("paramCveTipoBien"))//paramClasFide
}

function asignaEstadoP(){
  if(usarSetValuesFormObject)
    setValuesFormObject(catfBienesgar.getCatalogo());
  else
    GI("paramCveTipoBien").selectedIndex=0;//paramClasFide
  
  formsLoaded();
}
  
  
  
  
function siCambiaLaMoneda(){
    var numOperacion = GI("fbifMoneda").value;
    var tipoOperacion = eval(numOperacion);
    if(tipoOperacion!=1){
      muestraObj("tipoCambio");
      muestraObj("fbifTipoCambio");
    }
    else {
      ocultaObj("tipoCambio");
      ocultaObj("fbifTipoCambio");
    }
}



function actualizaComboBien() {
cargaParamComboProducto(GI("fbifIdTipoBien"),false);
}


function asignaProducto(){
  if(usarSetValuesFormObject)
    setValuesFormObject(catfBienesgar.getCatalogo());
  /*else
   alert("hola");
    GI("fbifIdCveBien").selectedIndex=0;*/
  
  formsLoaded();
}

function ejecutaFuncionParaSalidaDelBien() {
    if(confirm("Desea confirmar el procesamiento de datos?"))
     {   
      ejecutaFuncion();
    }
    else
    {
       if(modo==OP_SALIDA)
          onButtonClickPestania("Garantias.Garantias.PrincipalGarantias","");
    }   
}

function ejecutaFuncion(){
    var mesHab=null;
    if(fvcatfBienesgar.checkForm())
    {
          var objCargaBienesGarParam = JSON.parse("{\"id\":\"funRegistroBienesGar\"}");
          //alert(modo)
          objCargaBienesGarParam.TipoOperecion=eval(modo); 
          objCargaBienesGarParam.Fideicomiso=eval(GI("fgrsIdFideicomiso").value);  
          objCargaBienesGarParam.Subfiso=eval(GI("fgrsIdSubcuenta").value);
          //alert(eval(GI("forsIdGarantia").value))
          objCargaBienesGarParam.IdGarantia=eval(GI("forsIdGarantia").value);
          objCargaBienesGarParam.ClaveGar=eval(GI("forsCveTipoGarantia").value); 
          objCargaBienesGarParam.TipoBien=eval(GI("forsCveTipoBien").value);
          //objCargaBienesGarParam.TipoBien2=GI("fbifIdBien").value; 
          //objCargaBienesGarParam.Identificacion=GI("forsIdentificacion").value;
          objCargaBienesGarParam.DescBien= GI("forsTextoDescrip").value; 
          objCargaBienesGarParam.Comentario=GI("forsTexComentario").value;  
          objCargaBienesGarParam.Importe=""+GI("forsImpBien").value.replace(/,/g,""); 
          objCargaBienesGarParam.Moneda=eval(GI("forsMoneda").value);
          if(GI("forsCveRevaluaChk").value=="on")
              objCargaBienesGarParam.CveRevalua=1;
          else
              objCargaBienesGarParam.CveRevalua=0;
          objCargaBienesGarParam.PerValuacion=GI("forsCvePerValua").value;// 
          objCargaBienesGarParam.ImpUltValua=""+GI("forsImpUltValua").value.replace(/,/g,"");  
          //alert(""+GI("forsImpUltValua").value.replace(/,/g,""))
          objCargaBienesGarParam.FechaUltimo=GI("forsFecUltValua").value;
          objCargaBienesGarParam.FechaVenc=GI("forsFecVencimiento").value;  
          //objCargaBienesGarParam.FechaFin=GI("forsFecUltValua").value; 
          objCargaBienesGarParam.NumEscritura=GI("forsNumEscritura").value;  
          objCargaBienesGarParam.NumNotario=GI("forsNumNotario").value;
          //alert(GI("txtImporteRevaluacion").value)
          //alert(eval(GI("txtImporteRevaluacion").value.replace(/,/g,"")))
          objCargaBienesGarParam.Valuacion=eval(GI("txtImporteRevaluacion").value.replace(/,/g,""));
          console.log("importe revaluacion: " + eval(GI("txtImporteRevaluacion").value.replace(/,/g,"")));
          //alert(GI("txtFecha").value)
          if (eval(modo)!=3)
            objCargaBienesGarParam.FecValuacion=GI("forsFecUltValua").value; 
          else  
            objCargaBienesGarParam.FecValuacion=GI("txtFecha").value; 
          objCargaBienesGarParam.Gusuario=eval(GI("paramUsuario").value);
          if(GI("paramMesAbierto").value=="SI")
             var mesHab = 1;
          else
                mesHab = 0;
          objCargaBienesGarParam.GlMesa = mesHab;
          
        if(GI("forsRegimenChk").checked)
            objCargaBienesGarParam.CveRegimen=1;
        else
            objCargaBienesGarParam.CveRegimen=0;
            
        var url = ctxRoot + "/executeRef.do?json=" + JSON.stringify(objCargaBienesGarParam);
        //alert(url);
        makeAjaxRequest(url, "HTML", validaCargaFideicomitidos, null);
   }
}

function validaCargaFideicomitidos(obj, result){
  //alert(result);
  var mensaje;
  var codigo;
  var resultado = JSON.parse(result)[0];
  codigo=resultado.substring(0,1);
  mensaje=resultado.substring(2,resultado.length);
  if(codigo == 1 ) {
    alert("Ocurrió un error inesperado al registrar los datos para contabilizar el Folio "+mensaje);
  }
  else if(codigo == 2 )
  {
    alert("No existe Operación Contable "+mensaje);
  }
  else if(codigo == 8 )
  {
    alert("Ocurrió un error al registrar la contabilidad del Folio "+mensaje);
  }
  else if(codigo== 0)
  {
    alert("Proceso correcto, aplicado con Folio "+mensaje);
    onButtonClickPestania("Garantias.Garantias.PrincipalGarantias","");
  }
  else if(codigo== 4)
  {
    alert("Modificacion aplicada");
    onButtonClickPestania("Garantias.Garantias.PrincipalGarantias","");
  }
  else
  {
    alert("Error no identificado, Favor de reportar al Administrador.");
  }
 
 hideWaitLayer();
}


function muestraFechaActualBienesGar() {
  //fechaActual.tipoFecha="CONTABLE";
  var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(fechaActual);
  makeAjaxRequest(url, "HTML", insertaFechaActual, null);
}

function insertaFechaActual(obj, result) {
  var objResult = JSON.parse(result);
  
  GI("fcoDiaDia").value=objResult[0].fcoDiaDia;
  GI("fcoMesDia").value=objResult[0].fcoMesDia;
  GI("fcoAnoDia").value=objResult[0].fcoAnoDia;
  
  if(isDefinedAndNotNull(GI("forsFecUltValua"))) {
    GI("forsFecUltValua").value = formatString(GI("fcoDiaDia").value,"0",2,"Izquierda") + "/" + formatString(GI("fcoMesDia").value,"0",2,"Izquierda") + "/" + GI("fcoAnoDia").value;
  }
}


function muestraValor(obj){
  if(obj.checked){
    obj.value="on";
    }
  else{ obj.value="off";}
}



/***********************************************************************************************************************/
/***********************************************************************************************************************/

// modificacion de la garantia


function modificacionGarantia()
{
  if(isDefinedAndNotNull(pkInfo))
  {
    var objMGarantia = JSON.parse("{}");
    objMGarantia.id = "ejeFunModificacionGarantia";
    objMGarantia.numFiso = pkInfo.fgarIdFideicomiso;
    objMGarantia.numScta = pkInfo.fgarIdSubcuenta;
    objMGarantia.numIdGarantia = GI('cmbTipoGarantia').value; 
    
    if((pkInfo.fgarCveGarantia==objMGarantia.numIdGarantia)||(GI('cmbTipoGarantia').selectedIndex==0))
    {
      alert("Seleccione Tipo de Garantia diferente");
      return;
    }
    
    var url = ctxRoot+"/executeRef.do?json="+JSON.stringify(objMGarantia);
    
    makeAjaxRequest(url,"html",modificacionGarantiaRes,null);
  
  }
  else
  {
    alert("Seleccione Garantia");
  }
}

function modificacionGarantiaRes(obj,result)
{
  var res = JSON.parse(result);
  
  if(isDefinedAndNotNull(res))
  {
    switch(res.RESULTADO)
    {
      case 0:
        alert("Se ha modificado la Garantia");
        consultaGarantia();
        break;
      default:
        alert("Ocurrio un error inesperado");
        break;
    }
  
  }
  else
  {
    alert("Ocurrio un error inesperado");
  }
  
}


//--


function esInmueble(chkRegimen)
{
  bRegimen = chkRegimen.checked;
  
  if(bRegimen)
  {
    if(GI('forsCveTipoGarantia').value!=71) // NO ES INMUEBLE
    {
          chkRegimen.checked = false;
    }
  }

}

function number_format(amount, decimals) {
alert("llego aki 2")
    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '1' + ',' + '2');

    //return amount_parts.join('.');
    amount.value = amount_parts.join('.');
    alert(amount.value)
}

function format(input)
{
var num = input.value.replace(/\./g,'');
if(!isNaN(num)){
num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
num = num.split('').reverse().join('').replace(/^[\.]/,'');
input.value = num;
}
 
else{ alert('Solo se permiten numeros');
input.value = input.value.replace(/[^\d\.]*/g,'');
}
}

function numFormat(dec, miles)

{
alert("llego aki")
var num = this.valor, signo=3, expr;

var cad = ""+this.valor;

var ceros = "", pos, pdec, i;

for (i=0; i < dec; i++)

ceros += '0';

pos = cad.indexOf('.')

if (pos < 0)

    cad = cad+"."+ceros;

else

    {

    pdec = cad.length - pos -1;

    if (pdec <= dec)

        {

        for (i=0; i< (dec-pdec); i++)

            cad += '0';

        }

    else

        {

        num = num*Math.pow(10, dec);

        num = Math.round(num);

        num = num/Math.pow(10, dec);

        cad = new String(num);

        }

    }

pos = cad.indexOf('.')

if (pos < 0) pos = cad.lentgh

if (cad.substr(0,1)=='-' || cad.substr(0,1) == '+') 

       signo = 4;

if (miles && pos > signo)

    do{

        expr = /([+-]?\d)(\d{3}[\.\,]\d*)/

        cad.match(expr)

        cad=cad.replace(expr, RegExp.$1+','+RegExp.$2)

        }

while (cad.indexOf(',') > signo)

    if (dec<0) cad = cad.replace(/\./,'')

        return cad;

}

//Fin del objeto oNumero: