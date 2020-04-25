// JavaScript Document

var superPestanias = new Array(); //pestañas horizontales
var pestanias = new Array(); //pestañas verticales
// new pestania('urlpantalla','titulo')

  //Operaci\u00F3n
  pestanias[0] = new pestania('Tesoreria/ComprasVentas/PrincipalComprasVentas','Compras y Ventas');
  pestanias[1] = new pestania('Tesoreria/Reportos/PrincipalReportos','Reportos');
  pestanias[2] = new pestania('Tesoreria/Pagares/PrincipalPagares','Pagar\u00e9s');
  pestanias[3] = new pestania('Tesoreria/EntradasSalidas/PrincipalEntradasSalidas','Entradas y Salidas');
  pestanias[4] = new pestania('Tesoreria/VencimientoManualReportos/PrincipalVencimientoManualReportos','Vencimiento Reportos');
  pestanias[5] = new pestania('Tesoreria/ArchivosDepositos/PrincipalArchivosDepositos','Archivo Dep\u00F3sitos');
  pestanias[6] = new pestania('Tesoreria/ArchivosRetiros/PrincipalArchivosRetiros','Archivo Retiros');
  pestanias[7] = new pestania('Tesoreria/InstruccionesAcuerdosComiteTecnico/PrincipalInstruccionesAcuerdosComiteTecnico','Acuerdos C\u00F3mite T\u00e9cnico');

    superPestanias[0] = new superPestania(pestanias,'Operaci\u00F3n');
    pestanias = new Array();
    

  // Consultas
  
  pestanias[0] = new pestania('Tesoreria/PosicionContratos/PrincipalConsultaPosicionContratos','Posici\u00F3n por Fideicomiso');
  pestanias[1] = new pestania('Tesoreria/MovimientosFOSEG/PrincipalConsultaMovimientosFOSEG','Movimientos Presupuesto');
  
    superPestanias[1] = new superPestania(pestanias,'Consultas');
    pestanias = new Array();
  
   // Reportes
  
  pestanias[0] = new pestania('Tesoreria/Reportes/PrincipalReportes','Reportes');
  
    superPestanias[2] = new superPestania(pestanias,'Reportes');
    pestanias = new Array();
  
  
  //Cat\u00E1logos
  pestanias[0] = new pestania('Tesoreria/Instrumentos/PrincipalCatalogoInstrumentos','Instrumentos');
  pestanias[1] = new pestania('Tesoreria/Emisiones/PrincipalCatalogoEmisiones','Emisiones');
  pestanias[2] = new pestania('Tesoreria/Emisores/PrincipalCatalogoEmisores','Emisores');
  pestanias[3] = new pestania('Tesoreria/Intermediarios/PrincipalCatalogoIntermediarios','Intermediarios');
  pestanias[4] = new pestania('Tesoreria/ContratosInversion/PrincipalCatalogoContratosInversion','Contratos de Inversi\u00F3n');
  pestanias[5] = new pestania('Tesoreria/PreciosMercado/PrincipalCatalogoPreciosMercado','Precios de Mercado');
  pestanias[6] = new pestania('Tesoreria/TiposCambio/PrincipalCatalogoTiposCambio','Tipo de Cambio');
  pestanias[7] = new pestania('Tesoreria/CargaMasiva/PrincipalCargaMasiva','Carga Masiva de Contratos');
    superPestanias[3] = new superPestania(pestanias,'Cat\u00E1logos');
    pestanias = new Array();

escribeSuperPantalla(superPestanias);
