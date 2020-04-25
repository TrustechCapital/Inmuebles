// JavaScript Document

var pestanias = new Array();

// new pestania('urlpantalla','titulo')

  pestanias[0] = new pestania('Contabilidad/SaldosSAT/PrincipalSaldosSAT','Saldos SAT');
  pestanias[1] = new pestania('Contabilidad/InformacionMasivaSAT/PrincipalInformacionMasivaSAT','Informacion SAT');
  pestanias[2] = new pestania('Contabilidad/ArchivoSAT/PrincipalArchivoSAT','Archivo SAT');
  //pestanias[3] = new pestania('Contabilidad/ParametrizacionArchivosSAT/PrincipalParamArchSat','Parametrizaci\u00F3n');
  //pestanias[4] = new pestania('Contabilidad/Bitacora/PrincipalBitacora','Bit\u00E1cora');

var objPes = new Object();
objPes.arPestanias=pestanias;
objPes.indice = 0;

iniciaPantalla(objPes,null);

