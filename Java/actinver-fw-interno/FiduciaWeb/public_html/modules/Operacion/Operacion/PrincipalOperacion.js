// JavaScript Document

var superPestanias = new Array(); //pestañas horizontales
var pestanias = new Array(); //pestañas verticales
// new pestania('urlpantalla','titulo')

  
  //Conciliaci\u00F3n
  pestanias[0] = new pestania('Operacion/Conciliacion/PrincipalInterfaseConciliacion','Conciliaci\u00F3n');
  pestanias[1] = new pestania('Operacion/Control/PrincipalControl','Control');


    superPestanias[0] = new superPestania(pestanias,'Conciliaci\u00F3n');
    pestanias = new Array();
    
  //Inicio/Cierre Día
  pestanias[0] = new pestania('Operacion/EjecutorPlanes/PrincipalEjecutorPlanes','Ejecuci\u00F3n');
    superPestanias[1] = new superPestania(pestanias,'Inicio/Cierre Día');
    pestanias = new Array();
  
  //Iniciar/Cerrar Sistema
  pestanias[0] = new pestania('Operacion/AbrirSistema/PrincipalAbrirSistema','Abrir Sistema');
  pestanias[1] = new pestania('Operacion/CerrarSistema/PrincipalCerrarSistema','Cerrar Sistema');
 
    superPestanias[2] = new superPestania(pestanias,'Iniciar/Cerrar Sistema');
    pestanias = new Array();
  
  //Cat\u00E1logos
  pestanias[0] = new pestania('Operacion/Planes/PrincipalCatalogoPlanes','Planes de Operaci\u00F3n');
  pestanias[1] = new pestania('Operacion/Conciliacion/LayoutBancos/PrincipalLayoutBancos','Layout Bancos');
  pestanias[2] = new pestania('EmisionTitulos/Indices/PrincipalCatalogoIndices','Índices');
 
    superPestanias[3] = new superPestania(pestanias,'Cat\u00E1logos');
    pestanias = new Array();
  
  //Sistema Externo
  pestanias[0] = new pestania('Operacion/Planes/PrincipalCatalogoPlanes','Planes de Operaci\u00F3n');
 
  //  superPestanias[4] = new superPestania(pestanias,'Sistema Externo');
    pestanias = new Array();
  

escribeSuperPantalla(superPestanias);
