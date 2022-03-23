package mx.gob.nafin.fiduciario.business.upload.processors;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

import java.math.BigDecimal;

import java.util.ArrayList;
import java.util.List;

import mx.com.inscitech.fiducia.BusinessException;
import mx.com.inscitech.fiducia.business.upload.UploadProcessor;
import mx.com.inscitech.fiducia.common.services.LoggingService;

import mx.com.inscitech.fiducia.domain.ArchivosPlanos;
import mx.com.inscitech.fiducia.models.LayoutCargaBienes;
import mx.com.inscitech.fiducia.negocio.bienes.OperacionesCargaMasivaBienes;
import mx.com.inscitech.fiducia.util.ExcelDataReader;
import mx.com.inscitech.fiducia.util.ExcelDataReader.InvalidRowException;
import mx.com.inscitech.fiducia.util.XLSDataReader;
import mx.com.inscitech.fiducia.util.XLSXDataReader;
import mx.com.inscitech.fiducia.negocio.bienes.*;


import org.apache.commons.fileupload.FileItem;

public class CargaMasivaBienesImpl extends UploadProcessor {
    
            /*** Variable que tiene la informacion del header del archivo del TAS*/
            private static List headerInfo;

            /*** Variable que tiene la informacion del cuerpo del archivo del TAS*/
            private static List bodyInfo; /*** Variable para el uso del ORM de Oracle Toplink*/

            /*** Metodo utilizado para conectarse a la base de datos*/
            static {
                headerInfo = new ArrayList();
                bodyInfo = new ArrayList();
            }
            
    public CargaMasivaBienesImpl() {
        super();
    }
    
    public void run() {

            FileItem file = null;
            String fileName = null;

            ArchivosPlanos archivosPlanos = null;
            ExcelDataReader excelReader = null;
            String sValorTotal = "";
            OperacionesCargaMasivaBienes Carga = new OperacionesCargaMasivaBienes();
            Integer pTipoOperacion = Integer.valueOf(parameters.get("tipoCarga")!=null? (String)parameters.get("tipoCarga"):"0").intValue();
            Integer pIdFideicomiso = Integer.valueOf(parameters.get("idFideicomiso")!=null? (String)parameters.get("idFideicomiso"):"0").intValue();
            List<LayoutCargaBienes> datosCarga   = new ArrayList();
            LayoutCargaBienes Bienes;
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Parametro Tipo: " + String.valueOf(pTipoOperacion) );
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Parametro Fideicomiso: " + String.valueOf(pIdFideicomiso));
            /*Variables para lectura de excel*/
            Integer idfideicomiso=0; Integer idBien=0; String edificio=""; String depto=""; String niveles="";
                                         String calle=""; String colonia=""; String poblacion=""; String codigoPostal=""; String estado="";
                                         String pais=""; String colindancia=""; String medidas=""; String estacionamiento1="";
                                         String superficie1=""; String numeroCatastro=""; Double valorBien=0.0; String tipoValorBien="";
                                         String nombreAdquirente=""; String escritura=""; String fechaEscritura=""; String nombreNotario="";
                                         Integer notario=0; Integer status=0;Integer SubCuenta=0;            
            
            try {

                setStarted(true);
                
                file = (FileItem) this.files.get(0);
                fileName = file.getName();

                if (fileName.indexOf("\\") != -1) {
                    fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
                }

                if (fileName.indexOf("/") != -1) {
                    fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
                }

                if(fileName.toLowerCase().indexOf(".xlsx") != -1) {
                    excelReader = new XLSXDataReader();
                } else {
                    excelReader = new XLSDataReader();
                }

                File theExcelFile = new File(this.getContainmentPath() + File.separator + fileName);
                file.write(theExcelFile);
                setPercent(5);
                
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "About to open the Excel File: [" + theExcelFile.getAbsolutePath() + "]");
                excelReader.openWorkBook(theExcelFile);
                setPercent(10);
                
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Excel File Opened Succesfully! Sheets: " + excelReader.getSheetCount());
                excelReader.setActiveSheetByNumber(0);
                
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Sheet Data { Column Count: " + excelReader.getColumnCount() + ", Row Count: " + excelReader.getRowCount() + " }");
                //excelReader.setCurrentCell(2, 3);
                
                String cellValue = excelReader.getStringCellValue(false, "");            
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Test cellValue: " + cellValue);
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Test RowCount: " +  excelReader.getRowCount());
                int secuencial = 0, col = 0, rowCount = excelReader.getRowCount();
                for(int i = 1; i < rowCount; i++) {
                    excelReader.setCurrentCell(i, 17);
                    if(excelReader.getStringCellValue(false, "0")!=""){
                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Linea: " + String.valueOf(i));                
                        setPercent(new BigDecimal((i * 90)/rowCount).intValue() + 10);
                          
                        String line = "";
                        //System.out.println("linea no.:"+String.valueOf(i));
                        if(i==2)
                            i=2;
                        try {
                            excelReader.setCurrentCell(i, col);
                            idfideicomiso=pIdFideicomiso; idBien=0; edificio=""; depto=""; niveles="";
                                                         calle=""; colonia=""; poblacion=""; codigoPostal=""; estado="";
                                                         pais=""; colindancia=""; medidas=""; estacionamiento1="";
                                                         superficie1=""; numeroCatastro="0"; valorBien=0.0; tipoValorBien="FINCA RUSTICA";
                                                         nombreAdquirente=""; escritura=""; fechaEscritura=""; nombreNotario="";
                                                         notario=0; status=0; SubCuenta=0;                        
                            for(col = 0; col < 25; col++) {
                                excelReader.setCurrentCell(i, col);                        
                                switch(col){
                                case 0:
                                    idfideicomiso=pIdFideicomiso;
                                    break;
                                case 1:
                                    idBien=excelReader.getNumericCellValue(false, "0").intValue();    
                                    break;                        
                                case 2:
                                    edificio=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 3:
                                    depto=excelReader.getStringCellValue(false, "0");   
                                    break;                        
                                case 4:
                                    niveles=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 5:
                                    calle=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 6:
                                    colonia=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 7:
                                    poblacion=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 8:
                                    codigoPostal=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 9:
                                    estado=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 10:
                                    pais=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 11:
                                    colindancia=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 12:
                                    medidas=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 13:
                                    estacionamiento1=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 14:
                                    superficie1=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 15:
                                    numeroCatastro=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 16:
                                    valorBien=excelReader.getNumericCellValue(false, "0").doubleValue();
                                    break;                        
                                case 17:
                                    tipoValorBien=excelReader.getStringCellValue(false, "0");    
                                    break;                        
                                case 18:
                                    nombreAdquirente=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 19:
                                    escritura=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 20:
                                    fechaEscritura=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 21:
                                    nombreNotario=excelReader.getStringCellValue(false, "0");
                                    break;                        
                                case 22:
                                    notario=excelReader.getNumericCellValue(false, "0").intValue();    
                                    break;                        
                                case 23:
                                    status=excelReader.getNumericCellValue(false, "0").intValue();    
                                    break;  
                                case 24:
                                    SubCuenta=excelReader.getNumericCellValue(false, "0").intValue();    
                                    break;                              
                                default:
                                    break;
                                }
                            }
                            Bienes = new LayoutCargaBienes(idfideicomiso, idBien, edificio, depto, niveles,
                                 calle, colonia, poblacion, codigoPostal, estado,
                                 pais, colindancia, medidas, estacionamiento1,
                                 superficie1, numeroCatastro,  valorBien, tipoValorBien,
                                 nombreAdquirente, escritura, fechaEscritura, nombreNotario,
                                 notario, status,SubCuenta);
                            Bienes.setCalle(calle);
                            Bienes.setCodigoPostal(codigoPostal);
                            Bienes.setColindancia(colindancia);
                            Bienes.setColonia(colonia);
                            Bienes.setDepto(depto);
                            Bienes.setEdificio(edificio);
                            Bienes.setEscritura(escritura);
                            Bienes.setEstacionamiento1(estacionamiento1);
                            Bienes.setEstado(estado);
                            Bienes.setFechaEscritura(fechaEscritura);
                            Bienes.setIdBien(idBien);
                            Bienes.setIdfideicomiso(idfideicomiso);
                            Bienes.setMedidas(medidas);
                            Bienes.setNiveles(niveles);
                            Bienes.setNombreAdquiriente(nombreAdquirente);
                            Bienes.setNombreNotario(nombreNotario);
                            Bienes.setNotario(notario);
                            Bienes.setNumeroCatastro(numeroCatastro);
                            Bienes.setPais(pais);
                            Bienes.setPoblacion(poblacion);
                            Bienes.setStatus(status);
                            Bienes.setSuperficie1(superficie1);
                            System.out.println("Tipo Valor Bien"+tipoValorBien);
                            Bienes.setTipoValorBien(tipoValorBien);
                            Bienes.setValorBien(valorBien);
                            Bienes.setSubCuenta(SubCuenta);
                            
                            datosCarga.add(Bienes);  
                            secuencial++;
                        } catch(InvalidRowException ire) {
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Rows ended at: " + i);
                            break;
                        }                        
                    }
                    
                }                
                if(Carga.ejecutaCarga(pTipoOperacion,  pIdFideicomiso, datosCarga)!=0){
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error en el Proceso ejecutaCarga!");
                }
                else{
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Total de Registros Cargados en el Proceso ejecutaCarga!: " + secuencial);
                    if(excelReader != null) excelReader.closeWorkBook();
                    excelReader = null;
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Operacion realizada con exito! Carga Efectuada 1.");
                    setSucceeded(true);  
                    setPercent(100);
                    setFinished(true);                    
                }

                
            } catch (Exception e) {
                
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error en la carga de archivos.", e);
                setMessage(e.getMessage());
                
            }  finally {
                if(excelReader != null) excelReader.closeWorkBook();
                excelReader = null;
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Operacion realizada con exito! Carga Efectuada 2.");
                setSucceeded(true);                   
            }
            
            setPercent(100);
            setFinished(true);
            
    }
 
    public Object getStateInfo() {
        return null;
    }
   
}
