// JavaScript Document

var superPestanias = new Array(); //pestañas horizontales
var pestanias = new Array(); //pestañas verticales
// new pestania('urlpantalla','titulo')

  //Fideicomisos
  pestanias[0] = new pestania('Administracion/PrincipalFideicomisos','Fideicomisos');
  pestanias[1] = new pestania('Administracion/PrincipalContactosFideicomisos','Contactos');
  pestanias[2] = new pestania('Administracion/PrincipalFideicomitentes','Fideicomitentes');
  pestanias[3] = new pestania('Administracion/PrincipalFideicomisarios','Fideicomisarios');
  pestanias[4] = new pestania('Administracion/PrincipalTerceros','Terceros');
  pestanias[5] = new pestania('Administracion/AlternaSubCuentas/PrincipalSubCuentas','Subcuentas');
  pestanias[6] = new pestania('Tesoreria/ContratosInversion/PrincipalCatalogoContratosInversion','Contratos de Inversi\u00F3n');
  pestanias[7] = new pestania('Administracion/PrincipalFinalidadesContrato','Finalidades');
  
  superPestanias[0] = new superPestania(pestanias,'Fideicomisos');
  pestanias = new Array();
  
  //Comités Técnicos
  /*pestanias[0] = new pestania('Administracion/PrincipalComiteTecnico','Comités Técnicos');
  pestanias[1] = new pestania('Administracion/PrincipalCalendarioSesionesComiteTecnico','Calendarios de Sesiones');
  //pestanias[2] = new pestania('Administracion/PrincipalMiembrosComiteTecnico','Miembros');
  
  superPestanias[1] = new superPestania(pestanias,'Comités Técnicos');
  pestanias = new Array();*/
  
  //Constituci\u00F3n/Extinci\u00F3n
  //pestanias[0] = new pestania('ControlGestion/PrincipalConstitucion','Ficha Constituci\u00F3n');
  pestanias[0] = new pestania('ControlGestion/PrincipalExtincionControlGestion','Extinci\u00F3n');
  
  superPestanias[1] = new superPestania(pestanias,'Extinci\u00F3n');
  pestanias = new Array();
  
  //Agenda
  pestanias[0] = new pestania('Administracion/Agenda/PrincipalAgenda','Agenda');
  
  superPestanias[2] = new superPestania(pestanias,'Agenda');
  pestanias = new Array();
  
  //Charola Solicitud No Monetaria
 //pestanias[0] = new pestania('Administracion/CharolaSolicitudAdmon2/CharolaSolicitudAdmon','Evaluacion Proyecto Negocio');
 //Charola Solicitud Monetaria
 pestanias[0] = new pestania('Administracion/CharolaSolicitudAdmon3/CharolaSolicitudAdmon','Instrucci\u00F3n Monetaria');
   
  superPestanias[3] = new superPestania(pestanias,'WorkFlow');
  
  pestanias = new Array();
  
  //Reglas de Operacion del Fideicomiso
 pestanias[0] = new pestania('Administracion/ReglasOperacion/PrincipalReglasOperacion','C\u00e9dula Administrativa');
   
  superPestanias[4] = new superPestania(pestanias,'C\u00e9dula Administrativa');
  
  pestanias = new Array();  

escribeSuperPantalla(superPestanias);

  

  