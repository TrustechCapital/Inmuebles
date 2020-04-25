showWaitLayer();

var fvCancelacionInstruccionesInternet = new FormValidator();

//Agregando la funcionalidad del required
fvCancelacionInstruccionesInternet.setup({
formName      : "frmPrincipalCancelacionInstruccionesInternet",
tipoAlert     : 1,
alertFunction : BaloonAlert,
sendObjToAlert: true
});

//Valor de la afirmacion
var afirmacion=0;

hideWaitLayer();


function botonAceptar() {
  if(fvCancelacionInstruccionesInternet.checkForm())
    ejecutaFuncionCancelaInternet();
}

function ejecutaFuncionCancelaInternet() {
  var objParametros = JSON.parse("{\"id\":\"funcionCancelacionInstruccionesInternet\"}");
  
  eval("objParametros.Folio=" + GI("txtFolio").value);
  eval("objParametros.Usuario=300");
  eval("objParametros.Afirmacion="+ afirmacion);
  
  showWaitLayer();
  var urlFuncCancelInternet = ctxRoot + "/executeRef.do?json=" + JSON.stringify(objParametros);
  makeAjaxRequest(urlFuncCancelInternet, "HTML", respuestaFuncionCancelInternet, null);
}

function respuestaFuncionCancelInternet(obj, result){
  var res=JSON.parse(result).resultado;
  
  if(afirmacion==1)
    afirmacion=0;
      
  switch(res)
  {
    case 0: alert("Cancelaci\u00F3n satisfactoria"); break;
    case 1: alert("No existe la instrucci\u00F3n para este folio"); break;
    case 2: alert("La instrucci\u00F3n ya ha sido cancelada"); break;
    case 3: alert("La instrucci\u00F3n se encuentra en espera de autorizaci\u00F3n"); break;
    case 4: 
            if(confirm("¿Est\u00E1 seguro de cancelar la instrucci\u00F3n?")==true)
            {
              afirmacion=1;
              ejecutaFuncionCancelaInternet();
              break;
            }
            else
              break;
            
    case 5: alert("No es posible cancelar una instrucci\u00F3n contabilizada"); break;
    case 6: alert("No es posible cancelar instrucciones con fechas donde el fideicomiso haya sido cerrado contablemente"); break;
    case 7: alert("Esta instrucci\u00F3n fue contabilizada por p\u00F3liza manual, para poder cancelar la FUOF es necesario solicitar a contabilidad que realice su cancelaci\u00F3n"); break;
    case 8: alert("Error en el proceso de cancelaci\u00F3n de esta instrucci\u00F3n"); break;
    case 9: alert("La instrucci\u00F3n presupuestal ya ha sido cancelada"); break;
    case 10: alert("No es posible cancelar esta instrucci\u00F3n, ya que el folio pertenece al movimiento presupuestal de una instrucci\u00F3n de retiro"); break;
    case -1: alert("Ocurri\u00F3 un error de Oracle"); break;
    default: break;
  }
  
  hideWaitLayer();
}
