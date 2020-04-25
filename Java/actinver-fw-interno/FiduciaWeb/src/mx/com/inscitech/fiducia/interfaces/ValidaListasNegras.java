package mx.com.inscitech.fiducia.interfaces;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;

import mx.com.inscitech.actinver.ws.watchlist.ErrorData;
import mx.com.inscitech.actinver.ws.watchlist.EsbHeader;
import mx.com.inscitech.actinver.ws.watchlist.GenericServiceResponse;
import mx.com.inscitech.actinver.ws.watchlist.ServiceConfig;
import mx.com.inscitech.actinver.ws.watchlist.ServiceRequest;
import mx.com.inscitech.actinver.ws.watchlist.ServiceResponse;
import mx.com.inscitech.actinver.ws.watchlist.WatchListsService;
import mx.com.inscitech.actinver.ws.watchlist.WatchListsService_Service;
import mx.com.inscitech.fiducia.common.services.LoggingService;

public class ValidaListasNegras {

    private LoggingService logger = LoggingService.getInstance();
    
    private ByteArrayOutputStream archivoSalida = null;

    private String serviceURL = null;
    private String actinverURL = null;
    
    private ServiceConfig serviceConfig = null;
    
    private ServiceRequest serviceRequest = null;
    private ServiceResponse serviceResponse = null;    
    
    public ValidaListasNegras(String serviceURL, String actinverURL) {
        super();
        this.serviceURL = serviceURL;
        this.actinverURL = actinverURL;
    }

    public ServiceResponse queryListasNegras(String name, String lastName, String secondLastName, String tin, String curp, String clientTypeID) {

        logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "ValidaListasNegras:ejecutarListasNegras");

     
        try {
            
            QName serviceQName = new QName("http://watchlist.ws.actinver.inscitech.com.mx/", "WatchListsService");
            
            WatchListsService_Service watchListsService_Service = new WatchListsService_Service(null, serviceQName);
            WatchListsService service = watchListsService_Service.getWatchListsServicePort();
            
            BindingProvider bp = (BindingProvider)service;
            bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, serviceURL);     
            logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, String.format("Service URL: [%s]", serviceURL));
                        
            setServiceConfig();
            //TODO: Implementar la logica de procesar la respuesta para identificar si lo hizo bien o no y para no estar llamando todo el tiempo este metodo
            service.setServiceConfig(serviceConfig);
            
            serviceRequest = new ServiceRequest();
            serviceRequest.setClientID(""); //TODO: Evaluar el removerlo de la cfg o del request
            serviceRequest.setClientTypeID(clientTypeID);            
            serviceRequest.setCompanyName("");
            serviceRequest.setCurp(curp);
            serviceRequest.setLastName(lastName);
            serviceRequest.setName(name);
            serviceRequest.setSecondLastName(secondLastName);
            serviceRequest.setSystemID(""); //TODO: Evaluar el removerlo de la cfg o del request
            serviceRequest.setTin(tin);
            serviceRequest.setUserName(""); //TODO: Evaluar el removerlo de la cfg o del request
            
            serviceResponse = service.searchEntity(serviceRequest);
            
        } catch(Exception e) {
            
            serviceResponse = new ServiceResponse();
            serviceResponse.setServiceData(new GenericServiceResponse());
            serviceResponse.getServiceData().setExitCode("ERROR");
            serviceResponse.getServiceData().setExitMessage(e.getMessage());
            serviceResponse.getServiceData().setSucceded(false);
            
            StringWriter stackTrace = new StringWriter();
            PrintWriter printWriter = new PrintWriter(stackTrace);
            e.printStackTrace(printWriter);
            printWriter.flush();
            
            serviceResponse.getServiceData().setErrorDetail(new ErrorData());
            serviceResponse.getServiceData().getErrorDetail().setErrorCode("FW-WLOP-ERR-001");
            serviceResponse.getServiceData().getErrorDetail().setMessage("Operation Falied!");
            serviceResponse.getServiceData().getErrorDetail().setStackTrace(stackTrace.toString());
            
            logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error al validar en listas negras", e);
        }

        return serviceResponse;
    }
    
    private void setServiceConfig() {
        
        EsbHeader esbHdr = new EsbHeader();
        serviceConfig = new ServiceConfig();
        
        esbHdr.setClientID("");
        esbHdr.setIPAddress("127.0.0.1");
        esbHdr.setLanguage("SPA");
        esbHdr.setOperationName("WatchListQuery");
        esbHdr.setOperationVersion("1_0");
        esbHdr.setSystemID("");
        esbHdr.setUseDateTime(true);
        esbHdr.setUserName("");
        
        serviceConfig.setServiceURL(actinverURL);
        serviceConfig.setNamespaceLocalPart("WatchListWS-service.serviceagent");
        serviceConfig.setNamespaceURI("http://actinver.com.mx/ws/WatchListWS");
        serviceConfig.setUseCommonHeader(true);
        serviceConfig.setHeaderData(esbHdr);
        
    }

    public void setArchivoSalida(ByteArrayOutputStream archivoSalida) {
        this.archivoSalida = archivoSalida;
    }

    public ByteArrayOutputStream getArchivoSalida() {
        return archivoSalida;
    }

}
