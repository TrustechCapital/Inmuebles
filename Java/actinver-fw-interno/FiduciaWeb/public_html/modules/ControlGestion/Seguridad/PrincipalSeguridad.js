// JavaScript Document

var superPestanias = new Array(); //pestañas horizontales
var pestanias = new Array(); //pestañas verticales
// new pestania('urlpantalla','titulo')

  //Seguridad
  //pestanias[0] = new pestania('ControlGestion/PrincipalSeguridadEstructuraControlGestion','Estructura Organizacional'); // mandar a cat\u00E1logos generales
  pestanias[0] = new pestania('ControlGestion/PrincipalSeguridadModulos','Funciones');
  pestanias[1] = new pestania('ControlGestion/PrincipalSeguridadPuestos','Perfiles');
  pestanias[2] = new pestania('ControlGestion/PrincipalSeguridadFuncionesXPuesto','Funciones por Perfil');
  
  //superPestanias[0] = new superPestania(pestanias,'Seguridad');
  pestanias = new Array();
  
  //Usuarios
  pestanias[0] = new pestania('ControlGestion/PrincipalSeguridadUsuariosControlGestion','Internos');
  pestanias[1] = new pestania('ControlGestion/PrincipalSeguridadUsuariosInternet','Internet');
  pestanias[2] = new pestania('ControlGestion/PrincipalAutorizacionesControlGestion','Autorizaciones');
  
  superPestanias[0] = new superPestania(pestanias,'Usuarios');
  pestanias = new Array();
  
  //Personal
  pestanias[0] = new pestania('ControlGestion/PrincipalSeguridadPersonal','Personal');
  
  superPestanias[1] = new superPestania(pestanias,'Personal');
  pestanias = new Array();

  //Bit\u00E1cora
  pestanias[0] = new pestania('ControlGestion/PrincipalBitacoraControlGestion','Bit\u00E1cora');
  pestanias[1] = new pestania('ControlGestion/PrincipalConfiguracionAccesoInternetControlGestion','Cerrar/Abrir Línea Internet');
  
  superPestanias[2] = new superPestania(pestanias,'Bit\u00E1cora');
  pestanias = new Array();  
  
  //Fiducia Web
  pestanias[0] = new pestania('ControlGestion/ParametrosEmpresa/PrincipalParametrosEmpresa','Par\u00E1metros Instituci\u00F3n');
  pestanias[1] = new pestania('ControlGestion/ParametrosContrasena/PrincipalParametrosContrasena','Configuraci\u00F3n Passwords');
  
  superPestanias[3] = new superPestania(pestanias,'Fiducia Web');
  pestanias = new Array();  
  
  // Errores
  
  pestanias[0] = new pestania('Operacion/BitacoraOperativa/PrincipalConsultaBitacoraOperativa','Bit\u00E1cora');
  
    superPestanias[4] = new superPestania(pestanias,'Errores');
    pestanias = new Array();
    


escribeSuperPantalla(superPestanias);