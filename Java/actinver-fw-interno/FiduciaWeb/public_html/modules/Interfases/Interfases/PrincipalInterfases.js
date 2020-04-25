// JavaScript Document

var pestanias = new Array();

// new pestania('urlpantalla','titulo')

  pestanias[0] = new pestania('Tesoreria/Interfaces/PrincipalTAS','CB Y BANCO / REPORTOS');
  pestanias[1] = new pestania('Interfases/InterfaseValuacion/PrincipalInterfaseValuacion','Precios');
  pestanias[2] = new pestania('Interfases/InterfaseSalomon/PrincipalInterfaseSalomon','Valoriza');
  pestanias[3] = new pestania('Interfases/InterfaseMains/PrincipalInterfaseMains','Lavado de Dinero');
  pestanias[4] = new pestania('Interfases/CashWindows/PrincipalCashWindows','Cash Windows');
  //pestanias[5] = new pestania('Interfases/InterfaseBanorte/PrincipalInterfaseBanorte','Banorte Salida');
  //pestanias[6] = new pestania('Interfases/InterfaseBanorteEntrada/PrincipalInterfaseBanorte','Banorte Salida');
  pestanias[5] = new pestania('Interfases/InterfaseBanorteEntrada/PrincipalInterfaseBanorte','Pagos Masivos');
  pestanias[6] = new pestania('Interfases/InterfaseMainsAnterior/PrincipalInterfaseMains','Lavado de Dinero Ant.');
  //pestanias[5] = new pestania('Interfases/InterfaseCreditos/PrincipalInterfaseCreditos','Créditos');
  //pestanias[6] = new pestania('Interfases/InterfaseClientes/PrincipalInterfaseClientes','Clientes');
  pestanias[7] = new pestania('Interfases/FacturacionElectronica/PrincipalFacturacionE','Facturacion Electronica'); 
  pestanias[8] = new pestania('Interfases/CargaMasiva/PrincipalCargaMasiva','Cuentas de Cheques');
  pestanias[9] = new pestania('Interfases/LayoutSistemas/PrincipalCargaMasiva','Cargas Masivas');
  pestanias[10] = new pestania('Interfases/InterfaseSalomon3/PrincipalInterfaseSalomon','Poliza Contable');
  


  

  
   
var objPes = new Object();
objPes.arPestanias=pestanias;
objPes.indice = 0;

iniciaPantalla(objPes,null);

