// JavaScript Document

var superPestanias = new Array(); //pestañas horizontales
var pestanias = new Array(); //pestañas verticales
// new pestania('urlpantalla','titulo')

  //Prospecto
  pestanias[0] = new pestania('Formalizacion/PrincipalProspectos','Prospectos');
  pestanias[1] = new pestania('Formalizacion/PrincipalProspectosFideicomitentesFideicomisarios','Fideicomitentes/Fideicomisarios');
  
  superPestanias[0] = new superPestania(pestanias,'Prospecto');
  pestanias = new Array();

  //Proyecto
  pestanias[0] = new pestania('Formalizacion/PrincipalProspectosAnteproyecto','Proyectos');
  pestanias[1] = new pestania('Formalizacion/PrincipalFinalidadesContrato','Finalidades');
  pestanias[2] = new pestania('Formalizacion/PrincipalProspectosHonorarios','Honorarios');

  
  superPestanias[1] = new superPestania(pestanias,'Proyecto');
  pestanias = new Array();


  //DICTAMINACION
    pestanias[0] = new pestania('Formalizacion/PrincipalProspectosFideicomitentes','Fideicomitentes');
    pestanias[1] = new pestania('Formalizacion/PrincipalProspectosFideicomisarios','Fideicomisarios');
    pestanias[2] = new pestania('Formalizacion/PrincipalProspectosOtrasPersonas','Otros');
    pestanias[3] = new pestania('Otros/ClonacionKYC/PrincipalClonacionKYC','Clonaci\u00F3n KYC');
    pestanias[4] = new pestania('Formalizacion/CharolaSolicitudAdmon2/CharolaSolicitudAdmon','Dictaminaci\u00F3n');
    pestanias[5] = new pestania('ControlGestion/PrincipalConstitucion','Ficha Constituci\u00F3n');
   
  superPestanias[2] = new superPestania(pestanias,'Dictaminaci\u00F3n');  
pestanias = new Array()  

  //PLD
 pestanias[0] = new pestania('Formalizacion/CharolaSolicitudAdmon3/CharolaSolicitudAdmon','Dictaminaci\u00F3n Persona');
   
  superPestanias[3] = new superPestania(pestanias,'PLD');  
  
pestanias = new Array()
  
  //KYC
  pestanias[0] = new pestania('KYC/Conceptos/PrincipalConceptos','Conceptos');
  
  superPestanias[4] = new superPestania(pestanias,'Parametrizaci\u00F3n de Formatos');
  pestanias = new Array();

    
//Persona No Grata
  pestanias[0] = new pestania('Formalizacion/NoGratas/PrincipalNoGratas','Listas Negras');
  
  superPestanias[5] = new superPestania(pestanias,'Personas No Gratas');
  pestanias = new Array();

escribeSuperPantalla(superPestanias);

  









