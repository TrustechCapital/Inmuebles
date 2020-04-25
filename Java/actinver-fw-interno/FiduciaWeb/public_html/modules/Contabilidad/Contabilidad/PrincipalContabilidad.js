// JavaScript Document

var superPestanias = new Array(); //pestañas horizontales
var pestanias = new Array(); //pestañas verticales
// new pestania('urlpantalla','titulo')

  
  //Operaci\u00F3n
  pestanias[0] = new pestania('Contabilidad/Polizas/PrincipalOperativasPolizas','P\u00F3lizas');
  pestanias[1] = new pestania('Contabilidad/CancelacionOperaciones/PrincipalCancelacionOperaciones','Cancelaci\u00F3n Operaciones');
  pestanias[2] = new pestania('Contabilidad/BloqueoOperaciones/PrincipalBloqueoOperacionesMesAnterior','Cancelaci\u00F3n Operaciones Mes Anterior');
  //pestanias[3] = new pestania('Contabilidad/CierreContableMesAnterior/PrincipalCierreContableMesAnteriorFideicomiso','Cierre Mes Anterior Fideicomiso');
  pestanias[3] = new pestania('ControlGestion/PrincipalTraspasoInterFideicomisosControlGestion','Traspasos Inter Fideicomisos');
  pestanias[4] = new pestania('ControlGestion/AdministracionCuentas/PrincipalAdministracionCuentas','Administraci\u00F3n de Cuentas');

    superPestanias[0] = new superPestania(pestanias,'Operaci\u00F3n');
    pestanias = new Array();
    
  // Consultas
  
  pestanias[0] = new pestania('Contabilidad/Asientos/PrincipalConsultaAsientos','Asientos');
  pestanias[1] = new pestania('Contabilidad/Movimientos/PrincipalConsultaMovimientos','Movimientos');
  pestanias[2] = new pestania('Contabilidad/SaldosFideicomiso/PrincipalConsultaSaldosFideicomiso','Saldos por Fideicomiso');
  pestanias[3] = new pestania('Contabilidad/SaldosCuenta/PrincipalConsultaSaldosCuenta','Saldos por Cuenta');
  pestanias[4] = new pestania('Contabilidad/SaldosHFideicomiso/PrincipalConsultaSaldosHFideicomiso','Saldos Hist\u00F3ricos');
  pestanias[5] = new pestania('Contabilidad/OperacionesNoExistentes/PrincipalConsultaOperacionesNoExistentes','Operaciones no existentes');
  pestanias[6] = new pestania('Contabilidad/CuentasBancarias/PrincipalCuentas','Cuentas Bancarias');
  

    superPestanias[1] = new superPestania(pestanias,'Consultas');
    pestanias = new Array();
    
  //Reportes
  pestanias[0] = new pestania('Contabilidad/Reportes/PrincipalReportes','Reportes');

    superPestanias[2] = new superPestania(pestanias,'Reportes');
    pestanias = new Array();
    
   //Reportes Din\u00E1micos
  pestanias[0] = new pestania('Contabilidad/Agrupaciones/PrincipalAgrupaciones','Agrupaciones');
  pestanias[1] = new pestania('Contabilidad/ReportesAgrupacion/PrincipalReporte','Formar Reportes');

    superPestanias[3] = new superPestania(pestanias,'Reportes Din\u00E1micos');
    pestanias = new Array();
    
  //Cat\u00E1logos
  pestanias[0] = new pestania('Contabilidad/Cuentas/PrincipalCatalogoCuentas','Cat\u00E1logo de Cuentas');
  pestanias[1] = new pestania('Contabilidad/Guias/PrincipalCatalogoGuias','Conceptos Contables');
  pestanias[2] = new pestania('Contabilidad/Transacciones/PrincipalTransacciones','Transacciones');
  pestanias[3] = new pestania('Contabilidad/Operaciones/PrincipalOperaciones','Operaciones');
  pestanias[4] = new pestania('Contabilidad/Matriz/PrincipalMatrizCuentas','Matriz de Cuentas');
  //pestanias[5] = new pestania('ControlGestion/OperacionesFideicomiso/PrincipalOperacionesFideicomiso','Operaciones por Fideicomiso');
  
  

    superPestanias[4] = new superPestania(pestanias,'Cat\u00E1logos');
    pestanias = new Array();

 pestanias[0] = new pestania('Contabilidad/CharolaSolicitudAdmon3/CharolaSolicitudAdmon','Instrucciones Monetarias');
   
  superPestanias[5] = new superPestania(pestanias,'WorkFlow'); 
pestanias = new Array();

escribeSuperPantalla(superPestanias);