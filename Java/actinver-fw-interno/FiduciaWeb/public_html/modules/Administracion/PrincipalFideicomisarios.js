var catFideicomisarios = new Catalogo("mx.com.inscitech.fiducia.domain.Benefici");

showWaitLayer();

var clavesCombo16 = JSON.parse("{\"llaveClave\":16}");
var clavesCombo23 = JSON.parse("{\"llaveClave\":23}");
var clavesCombo31 = JSON.parse("{\"llaveClave\":31}");
var consultaDatosInformativos = JSON.parse("{\"id\":\"muestraDatosFideicomisos\",\"NumFideicomiso\":0}");
var validacionExistenciaRegistro = JSON.parse("{\"id\":\"verificaExistenciaFideicomisarioAdmon\",\"numContrato\":0,\"beneficiario\":0}");
var validacionAlta = JSON.parse("{\"id\":\"verificaExistenciaContrato\",\"numContrato\":0}");
var validacionAlta2 = JSON.parse("{\"id\":\"verificaSeaActivo\",\"numContrato\":0}");

var contenedor = new Object();

initForms();

var tablaFideicomisariosData = new Array();
tablaFideicomisariosData[0] = "benNumContrato, 100px";
tablaFideicomisariosData[1] = "benNomBenef,300px";
tablaFideicomisariosData[2] = "benNomRepres,220px";
tablaFideicomisariosData[3] = "benCveStBenefic,90px";

var operacion = 0;
var numPantalla = 0;
var numParametroPantalla = 0;
pkInfo = null;
var fechaNacimiento = new Date();
var fvMantenimientoFideicomisarios = new FormValidator();

//No permitir editar el campo informativo de la pagina principal:
//1. Nombre del fiso
//deshabilitaPK("txtNomFiso".split(","));
var ALTA = 1;
var OPER_MODIFICAR = 2;
var OPER_CONSULTAR = 3
//////////////////////////////////////////////////////////////////////////////
//Funciones para la primera pantalla
function cargaPrincipalFideicomisarios() {
  onButtonClickPestania("Administracion.PrincipalFideicomisarios","");
}

function clickTabla(pk) {
  pkInfo = pk;
  cloneObject(pk,catFideicomisarios.getCatalogo());
}

function limpiar(objForma){
  RF(objForma);
  catFideicomisarios = new Catalogo("mx.gob.nafin.fiduciario.domain.Benefici");
  asignaEtiqueta("nomFideicomiso","");
  pkInfo = null;
}

/*function validarStatus() {
  alert(GI("nomFideicomiso").value);
  if(GI("nomFideicomiso").value == "EXTINTO")
  {
    alert("El Fideicomiso no esta Activo");
    limpiar(GI("frmDatosFideicomisariosConsulta"));
  }
}*/

function operacionExitosa() {
  alert("La operaci\u00F3n se realiz\u00F3 correctamente");
  cargaPrincipalFideicomisarios();
}

function operacionExitosaKYC() {
  alert("La operaci\u00F3n se realiz\u00F3 correctamente");
  //cargaPrincipalFideicomisarios();

  ocultaObjs("cmdAceptar"); //Mostrar el boton Aceptar y Cancelar
  SA(GI("cmdCancelar"), "value", "Regresar");//Colocar la leyenda Regresar en vez de Cancelar al boton
  deshabilitaObjetos(GI("frmDatosMantenimientoFideicomisarios"));
  
  cargaCheckList();
  hideWaitLayer();
}


function verificacionActivo() {
  if(GI("paramFideicomiso").value != "") {
    validacionAlta2.numContrato = GI("paramFideicomiso").value;
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta2);
    makeAjaxRequest(url, "HTML", funcionVerificacionActivo, null);
  }else
    asignaEtiqueta("nomFideicomiso","");
}

function funcionVerificacionActivo(obj,result) {
  var objResult = JSON.parse(result);
  if(objResult[0].ctoCveStContrat != 0)
  {
    alert("El Fideicomiso no esta ACTIVO");
    GI("paramFideicomiso").value="";
    asignaEtiqueta("nomFideicomiso","");
  }
  else
    consultaNombreFideicomiso("nomFideicomiso",GI("paramFideicomiso"));
}

//////////////////////////////////////////////////////////////////////////////
//Funciones para la segunda pantalla
function cargaMantenimientoFideicomisarios(tipoPantalla) {
  if ((tipoPantalla==2 || tipoPantalla==3) && pkInfo==null)
    alert("No ha seleccionado campo alguno de la tabla");
  else
  {
    operacion = tipoPantalla;
    numPantalla = 1;
    showWaitLayer();
    var urlCliente = ctxRoot + "/modules/Administracion/MantenimientoFideicomisarios.do";
    makeAjaxRequest(urlCliente, "HTML", despliegaPantallaMantenimientoFideicomisarios, null);
  }
}

function despliegaPantallaMantenimientoFideicomisarios(obj, result) {
  GI("dvPantalla").innerHTML = result;
  initForms();
  
  //Agregando la funcionalidad del required
  fvMantenimientoFideicomisarios.setup({
    formName      : "frmDatosMantenimientoFideicomisarios",
    tipoAlert     : 1,
    alertFunction : BaloonAlert,
    sendObjToAlert: true
  });
  
  //Agregando la funcionalidad del calendario
  Calendar.setup({
    inputField     :    "benFecNac",   // id of the input field
    button         :    "benFecNac",
    ifFormat       :    "%d/%m/%Y", //"%a %e/%b/%Y",       // format of the input field
    showsTime      :    false,
    timeFormat     :    "24",
    onUpdate       :    setFechaCal,
    disableFunc    :    isValidDate,
    date           :    fechaNacimiento,
    weekNumbers    :    false,
    cache          :    true,
    step           :    1
  });
  
  deshabilitaPK("benBeneficiario".split(","));
  
  GI('btnViewDoc').style.visibility='hidden';
	GI('cboNombre').style.visibility='hidden';
  
}

function loadCatalogo() {
  catFideicomisarios.setOnUpdate(catLoaded);
  if(operacion==2 || operacion==3)
    catFideicomisarios.buscaCatalogoPK(false);
  else
    formsLoaded();
}

function catLoaded() {
  if(operacion==2)//Si se trata de una modificacion, no permitir modificar la PK
    deshabilitaPK("benNumContrato,benBeneficiario".split(","));
  else if(operacion==3)//Si se trata de una consulta, deshabilitar
  {
    deshabilitaObjetos(GI("frmDatosMantenimientoFideicomisarios"));  
    //muestraObjs("cmdKYC");
    
    var tp="P"+GI("benCveTipoPer").value.substring(0,1)+((GI("benNomNacional").value=="MEXICANA")?"NAC":"EXT");
        var tipof=0;
        switch(tp){
            case "PFNAC":
                //alert("Persona Fisica Nacional 30001");
                tipof=30001;
                break;
            case "PMNAC":
                //alert("Persona Moral Nacional 30002");
                tipof=30002;
                break;
            case "PFEXT":
                //alert("Persona Fisica Extranjera 30003");
                tipof=30003;
                break;    
            case "PMEXT":
                //alert("Persona Moral Extranjera 30004");
                tipof=30004;
                break;    
            default:
                //alert("CONTRATOS DE FIDEICOMISO 30000");
                tipof=30000;
                break;
        }
    	paramsQryDocumentsCbo = JSON.parse("{\"Tipo\":\"" +tipof+ "\"}");
        //alert(JSON.stringify(paramsQryDocumentsCbo));
	loadElement(GI("cboNombre"));
	GI('btnViewDoc').style.visibility='visible';
	GI('cboNombre').style.visibility='visible';
	GI('cboNombre').disabled=false;
    
    //Deshabilita objetos (excepto botones)
    SA(GI("cmdCancelar"), "value", "Regresar");//Colocar la leyenda Regresar en vez de Cancelar al boton
    SA(GI("frmDatosMantenimientoFideicomisarios").cmdAceptar, "LKD", "true");
    SA(GI("frmDatosMantenimientoFideicomisarios").cmdAceptar, "disabled", "true");   //Deshabilita boton Aceptar
    cargaCheckList();
    
     
    
  }
  
  //Mostrar el nombre del fiso (informativo)
  //mostrarDatosInformativos(3);
  //cargaRadiosConMaster("benCveSexo","benCveSexo2,benCveSexo3");
  formsLoaded();
}

function AltaOModificaInfo() {
  catFideicomisarios.setOnUpdate(operacionExitosaKYC);
    //VALIDACION DE PORCENTAJES
    vgContenedorDatos=null;
    vgContenedorDatos=JSON.parse("{\"id\":\"funcionPorcentajes\"}");//PRIMERO SE PROCESA LA BITACORA
    vgContenedorDatos.etapa='FIDEICOMISO';
    vgContenedorDatos.fiso=eval(GI("benNumContrato").value); 
    vgContenedorDatos.tipopersona='BENEFICIARIO';
    vgContenedorDatos.porcentaje=eval(GI("benCurp").value);
    var url = ctxRoot + "/executeRef.do?json=" + JSON.stringify(vgContenedorDatos);
    //alert(url)
    makeAjaxRequest(url, "HTML", ejecutaFuncionPorcentaje, null);     
}

var nombre;
var anteproy;
var numsec;

function ejecutaFuncionPorcentaje(tp,result){
    //alert(result);
    var rusultado= JSON.parse(result);
    var res=rusultado.result
    if(res==0){
     if((operacion == ALTA || operacion == MODIFICAR) && fvMantenimientoFideicomisarios.checkForm())//Se trata de una alta
        {
            //catFideicomisarios.altaCatalogo();
            var vgContenedorDatos=null;
            vgContenedorDatos=JSON.parse("{\"id\":\"funcionIncorporaTipoPers\"}");//PRIMERO SE PROCESA LA BITACORA
            vgContenedorDatos.Etapa='FIDEICOMISO';
            vgContenedorDatos.NumProyFid=eval(GI("benNumContrato").value);
            anteproy = eval(GI("benNumContrato").value);
            vgContenedorDatos.TipoPers='BENEFICIARIO';
            vgContenedorDatos.NumPers=eval(GI("benBeneficiario").value);
            numsec = eval(GI("benBeneficiario").value);
            vgContenedorDatos.Nombre=GI("benNomBenef").value;
            nombre = GI("benNomBenef").value;
            vgContenedorDatos.CatPersona=  GI("benCveTipoPer").value; 
            vgContenedorDatos.Pais=GI("benNomNacional").value;    
            vgContenedorDatos.Calidad=GI("benNomRepres").value;
            vgContenedorDatos.Status='PENDIENTE';
            var url = ctxRoot + "/executeRef.do?json=" + JSON.stringify(vgContenedorDatos);
            //alert(url)  
            makeAjaxRequest(url, "HTML", ejecutaFuncion, null);    
        }  
        else if(operacion==2 && fvMantenimientoFideicomisarios.checkForm())//Se trata de una modificacion
            catFideicomisarios.modificaCatalogo();
    } 
    else if(res==1){
      alert("El Porcentaje Total del Fideicomiso supera el 100%, Favor de revisar");
    }
    hideWaitLayer();     
  }

  function ejecutaFuncion(tp,result){
    //alert(result);
    var rusultado= JSON.parse(result);
    var res=rusultado.result
    if(res==0){
        alert("Operacion Realizada Satisfactoriamente");
    } 
    else if(res==1){
      alert("El Registro ya existe");
    }
    else if(res==2){
      alert("Existen Registros PENDIENTES por Autorizar");
    }        
    else {
      alert("Ocurrio un error al realizar la Operacion.")
    }
    hideWaitLayer();     
    
    //FUNCION PARA ACTUALIZAR NOMBRE
        var objParametros = null;
        objParametros = JSON.parse("{\"id\":\"updNombreBenefici\"}");
        //alert(GI("afbAnteproyecto").value);
        objParametros.anteproy = anteproy;
        objParametros.numpers = numsec;
        objParametros.nomb = nombre;
        var url = ctxRoot + "/doRef.do?json=" + JSON.stringify(objParametros);
        //console.log(url);
        makeAjaxRequest(url, "HTML", respuestaAltaNombre, null);
    //onButtonClickPestania("Administracion.PrincipalFideicomisarios","");
  }
function respuestaAltaNombre(obj, result) {
    //alert("aqui")
    var resultado = JSON.parse(result);
    /*console.log(result);
  console.log(obj);*/
    if (isDefinedAndNotNull(resultado) && resultado.codigoError == 0) {
        //alert("Cambio de nombre realizado exitosamente!");
        onButtonClickPestania("Administracion.PrincipalFideicomisarios","");
    }
    else {
        //alert("Ocurri\u00F3 un error al realizar el cambio de nombre!");
        onButtonClickPestania("Administracion.PrincipalFideicomisarios","");
    }
}

function eliminarRegistro() {
  if(pkInfo==null)
    alert("No se ha seleccionado campo alguno de la tabla");
  else
  {
    catFideicomisarios.setOnUpdate(operacionExitosa);
    eliminaCatalogo(catFideicomisarios);
  }
}


////////////////////////////////////////////////////////////////////////
//Funcion para mostrar los datos del Fideicomiso (Informativo)
function mostrarDatosInformativos(parametroPantalla) {
  numParametroPantalla = parametroPantalla;
  GI("txtNomFiso").value="";
  
  if(parametroPantalla==1 && GI("paramFideicomiso").value!="")
  {
    consultaDatosInformativos.NumFideicomiso = GI("paramFideicomiso").value;
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(consultaDatosInformativos);
    makeAjaxRequest(url, "HTML", insertaDatosInformativos, null);
  }
  else
    GI("txtNomFiso").value="";
  //Para el caso de que se muestre el dato informativo en la segunda pantalla
  /*else if(parametroPantalla==2)
  {
    consultaDatosInformativos.NumFideicomiso = GI("benNumContrato").value;
    validacionAlta.numContrato = GI("benNumContrato").value;
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta);
    makeAjaxRequest(url, "HTML", verificarAlta, null);
  }
  else
  {
    consultaDatosInformativos.NumFideicomiso = GI("benNumContrato").value;
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(consultaDatosInformativos);
    makeAjaxRequest(url, "HTML", insertaDatosInformativos, null);
  }*/
}

function verificarAlta() {
  if(GI("benNumContrato").value!="")
  {
    validacionAlta.numContrato = GI("benNumContrato").value;
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta);
    makeAjaxRequest(url, "HTML", verificarAltaFunction, null);
  }
}

function verificarAltaFunction(obj, result) {
  var objResult = JSON.parse(result);
  if(objResult[0].ctoNumContrato > 0)
  {
    validacionAlta2.numContrato = GI("benNumContrato").value;
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionAlta2);
    makeAjaxRequest(url, "HTML", verificarAlta2, null);
  }
  else
  {
    alert("El Fideicomiso no existe, verifique");
    GI("benNumContrato").value="";
  }
}

function verificarAlta2(obj,result) {
  var objResult = JSON.parse(result);
  if(objResult[0].ctoCveStContrat != 0)
  {
    alert("El Fideicomiso no esta ACTIVO");
    GI("benNumContrato").value="";
  }
  else
  {
    var ingresaSecuencial = JSON.parse("{\"id\":\"conADFideicomisariosSec\",\"numContrato\":" + GI("benNumContrato").value + "}");
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(ingresaSecuencial);
    makeAjaxRequest(url, "HTML", funcionIngresaSecuencial, null);
  }
  
  //Si se coloca el dato informativo en la segunda pantalla
  /*if(objResult[0].ctoCveStContrat == 0)
  {
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(consultaDatosInformativos);
    makeAjaxRequest(url, "HTML", insertaDatosInformativos, null);
  }*/
}

function funcionIngresaSecuencial(obj, result) {
  var objResult = JSON.parse(result);
  GI("benBeneficiario").value = objResult[0].beneficiario;
  verificacionExistenciaRegistro();
}


function insertaDatosInformativos(obj, result) {
  var objResult = JSON.parse(result);
  GI("txtNomFiso").value=objResult[0].ctoNomContrato;
}

//Verificar que no exista el registro que se desea dar de alta
function verificacionExistenciaRegistro() {
  if(GI("benNumContrato").value!="" && GI("benBeneficiario").value!="")
  {
    validacionExistenciaRegistro.numContrato = GI("benNumContrato").value;
    validacionExistenciaRegistro.beneficiario = GI("benBeneficiario").value;
    var url = ctxRoot + "/getRef.do?json=" + JSON.stringify(validacionExistenciaRegistro);
    makeAjaxRequest(url, "HTML", verificacionExistenciaRegistroFunction, null);
  }
}

function verificacionExistenciaRegistroFunction(obj,result) {
  var objResult = JSON.parse(result);
  if(objResult[0].existeRegistro > 0)
  {
    alert("El Registro ya existe, verifique");
    GI("benNumContrato").value="";
    GI("benBeneficiario").value="";
  }
}

////////////////////////////////////////////////////////////////////////
//Funciones para la funcionalidad de la Fecha
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

/// enlace CHECKLIST-----------------

function cargaCheckList()
{
  contenedor.Fideicomiso = GI("benNumContrato").value;
  contenedor.NumPersona = GI("benBeneficiario").value;
  contenedor.NomPersona = GI("benNomBenef").value;
  contenedor.TPersona = "P"+GI("benCveTipoPer").value.substring(0,1)+((GI("benNomNacional").value=="MEXICANA")?"NAC":"EXT");
  var url = ctxRoot + "/modules/KYC/PrincipalCheckList.do";
  makeAjaxRequest(url, "HTML", cargaParametros, contenedor);
  loadDynamicJS(ctxRoot + "/modules/KYC/PrincipalCheckList.js");
}


function cargaParametros(obj,result)
{
  GI("cargaCheck").innerHTML = result;
  //initForms();
  GI("paramProyecto").value= obj.Fideicomiso;
  GI("paramTPersona").value= obj.TPersona;
  GI("paramNumPersona").value= obj.NumPersona;
  GI("paramNomPersona").value= obj.NomPersona;
  GI("idRegresar").value = 2;
   GI("paramTipo").value =2;
  
 var url = ctxRoot + "/executeRef.do?json={\"id\":\"ejeFunCargaConceptosKYC\",\"TPersona\":\"" + obj.TPersona + "\",\"Fideicomiso\":" + obj.Fideicomiso + ",\"Tipo\":" + 2 + ",\"NumPersona\":" + obj.NumPersona + "}";
 makeAjaxRequest(url, "HTML",cargaConceptosKYC,null);
}

function cargaConceptosKYC(obj,result){
  var resultado = JSON.parse(result).result;
  switch(resultado){
    case 0:
          consultar(GI("cmdCargar"), GI('frmCheckList'), false);
    break;
    case 1:
      alert("No hay Conceptos para esta Persona");
    break;
  }
  hideWaitLayer();
  GI('ContenedorKYC').style.visibility='visible';
  GI('cargaConceptos').innerHTML='<div style="color: #CCCCCC;font-size: 70px;font-weight: bold;">KYC</div>';
}


//para cargar actividades economicas hijas dinamicamente

var objComboParamAlt;

function cambiaCombo(item)
{

  if(item.selectedIndex>0 && item.selectedIndex<=item.options.length){     
      
     var combohijo=GI('benNumSrama'); 
     SA(eval(combohijo), "param","objComboParamAlt");
      objComboParamAlt = JSON.parse("{\"numRama\":"+item.value+"}");  
      RA(combohijo,"next");
      loadElement(combohijo);  
  }

}

 function viewDoc(objBtn) {
	var objSel = GI('cboNombre');
	var objLnk = GI('docLink');
	var url = "#";
	//alert(objSel.value)
	switch(parseInt(objSel.value)) {
		case 100: //Solicitud de Revocacion Firmada
			url = ctxRoot + "/temp/solicitud.pdf";
			break;
		case 101: case 301: //Identificacion Oficial vigente
			url = ctxRoot + "/temp/identificacion.pdf";
			break;
		case 102: //En su caso Acuerdo del Comite
			url = ctxRoot + "/temp/acuerdo.pdf";
			break;
		case 103: //Copia del Poder a Revocar
			url = ctxRoot + "/temp/poder.pdf";
			break;
		case 103: //Copia del Poder a Revocar
			url = ctxRoot + "/temp/poder.pdf";
			break;
		case 205: //proyecto de negocio
			url = ctxRoot + "/temp/proyecto.PDF";
			break;			
		case 300: //Copia del Poder a Revocar
			url = ctxRoot + "/temp/instruccionpago.pdf";
			break;	
		case 302: //Copia FATCA
			url = ctxRoot + "/temp/FormatoFATCA.pdf";
			break;	
		case 303: //RFC
			url = ctxRoot + "/temp/RFC.pdf";
			break;	
		case 304: //CURP
			url = ctxRoot + "/temp/CURP.pdf";
			break;				
		default:
			alert('Seleccione un documento');
	}
	
	SA(objLnk, "href", url);
	objLnk.click();
}
//A peticion de QA se agregan validaciones de campos 9/12/19
function validaNombre() {
    if (!/^([a-zA-Z\s])*$/.test(GI("benNomBenef").value)) {
        alert("Verificar nombre");
        GI("benNomBenef").value = "";
    }
    else {
        return (true);
    }

}

function validaParticipacion() {
    var validNum = /^[0-9]*$/;
    if (!validNum.test(GI("benCurp").value)) {
        alert('Participacion invalida');
        GI("benCurp").value = "";
    }
    else {
        return (true);
    }
}

function ValidateEmail() {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(GI("benRfc").value)) {
        return (true);
    }
    else {
        alert("E-mail invalido");
        GI("benRfc").value = "";
    }
}