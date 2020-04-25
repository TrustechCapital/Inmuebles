// JavaScript Document

var superPestanias = new Array(); //pestañas horizontales
var pestanias = new Array(); //pestañas verticales
// new pestania('urlpantalla','titulo')

  
  //Operaci\u00F3n
  pestanias[0] = new pestania('Honorarios/PrincipalPresupuestoAnualHonorarios','Presupuesto de Honorarios');
  pestanias[1] = new pestania('Honorarios/PrincipalFiduciariosGeneracionOtrosIngresosHonorarios','Provisiones');
  pestanias[2] = new pestania('Honorarios/PrincipalPagoHonorariosConsulta','Cobro');
  pestanias[3] = new pestania('Honorarios/PrincipalCondonacionHonorarios','Condonaciones');
  pestanias[4] = new pestania('Honorarios/PrincipalCondonacionHonorariosQuebrantos','Quebrantos');  
  pestanias[5] = new pestania('Honorarios/PrincipalFacturacion','Facturaci\u00F3n');
  pestanias[6] = new pestania('Honorarios/CargaProvisiones/PrincipalCargaMasivaProvisiones','Carga Masiva'); 
  pestanias[7] = new pestania('Honorarios/EjecutorPlanes/PrincipalEjecutorPlanes','Calculo Honorarios'); 
  //pestanias[7] = new pestania('Honorarios/PrincipalContactosHonorarios','Notificaciones');


    superPestanias[0] = new superPestania(pestanias,'Operaci\u00F3n');
    pestanias = new Array();
    
  // Consultas
  
  pestanias[0] = new pestania('Honorarios/PrincipalCarteraContratoHonorarios','Cartera por Fideicomiso');

    superPestanias[1] = new superPestania(pestanias,'Consultas');
    pestanias = new Array();
    
  //Reportes
  pestanias[0] = new pestania('Honorarios/Reportes/PrincipalReportes','Reportes');

    superPestanias[2] = new superPestania(pestanias,'Reportes');
    pestanias = new Array();
    
  //Cat\u00E1logos
  pestanias[0] = new pestania('Honorarios/PrincipalParametrosHonorarios','Par\u00E1metros Honorarios');
  pestanias[1] = new pestania('Honorarios/PrincipalCatalogoDomicilioFiscal','Domicilio Fiscal');
  pestanias[2] = new pestania('Honorarios/PrincipalCatalogoINPC','INPC');
  pestanias[3] = new pestania('Honorarios/PrincipalCatalogoDatosAvisos','Avisos de Cobro');
  
    superPestanias[3] = new superPestania(pestanias,'Cat\u00E1logos');
    pestanias = new Array();

escribeSuperPantalla(superPestanias);