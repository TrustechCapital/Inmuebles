package mx.com.inscitech.fiducia.interfaces;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;

import mx.com.inscitech.actinver.ws.contract.ClienteUnicoService;
import mx.com.inscitech.actinver.ws.contract.ClienteUnicoService_Service;
import mx.com.inscitech.actinver.ws.contract.ErrorData;
import mx.com.inscitech.actinver.ws.contract.EsbHeader;
import mx.com.inscitech.actinver.ws.contract.GenericServiceResponse;
import mx.com.inscitech.actinver.ws.contract.ServiceConfig;
import mx.com.inscitech.actinver.ws.contract.ServiceRequest;
import mx.com.inscitech.actinver.ws.contract.ServiceResponse;
import mx.com.inscitech.fiducia.common.services.LoggingService;


public class ClienteUnico {
    
    private LoggingService logger = LoggingService.getInstance();
    
    private String serviceURL = null;
    private String actinverURL = null;
    
    private ServiceConfig serviceConfig = null;
    
    private ServiceRequest serviceRequest = null;
    private ServiceResponse serviceResponse = null;    
    
    public ClienteUnico(String serviceURL, String actinverURL) {
        super();
        this.serviceURL = serviceURL;
        this.actinverURL = actinverURL;
    }
    
    public ServiceResponse getDatosCliente(String bankingArea, String contractNumber) {
        logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "ClienteUnico:getDatosCliente");
        
        try {
            
            QName serviceQName = new QName("http://contract.ws.actinver.inscitech.com.mx/", "ClienteUnicoServicePort");
            
            ClienteUnicoService_Service clienteUnicoService = new ClienteUnicoService_Service(null, serviceQName);
            ClienteUnicoService service = clienteUnicoService.getClienteUnicoServicePort();
            
            BindingProvider bp = (BindingProvider)service;
            bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, serviceURL);     
            logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, String.format("Service URL: [%s]", serviceURL));
                        
            setServiceConfig();
            service.setServiceConfig(serviceConfig);
            
            serviceRequest = new ServiceRequest();
            serviceRequest.setBankingArea(bankingArea);            
            serviceRequest.setContractNumber(contractNumber);
        
            logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, String.format("BankingArea: [%s], ContractNumber: [%s]", bankingArea, contractNumber));
            
            serviceResponse = service.getContractInfo(serviceRequest);
        
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
            
            logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error al obtener la informacion de cliente unico", e);
            
        }
        
        return serviceResponse;
    }
    
    private void setServiceConfig() {
        
        EsbHeader esbHdr = new EsbHeader();
        serviceConfig = new ServiceConfig();
        
        esbHdr.setClientID("");
        esbHdr.setIPAddress("127.0.0.1");
        esbHdr.setLanguage("SPA");
        esbHdr.setOperationName("ClientContractQuery");
        esbHdr.setOperationVersion("1_0");
        esbHdr.setSystemID("");
        esbHdr.setUseDateTime(true);
        esbHdr.setUserName("");
        
        serviceConfig.setServiceURL(actinverURL);
        serviceConfig.setNamespaceLocalPart("ContractInfoWS-service.serviceagent");
        serviceConfig.setNamespaceURI("http://actinver.com.mx/ws/ContractInfoWS");
        serviceConfig.setUseCommonHeader(true);
        serviceConfig.setHeaderData(esbHdr);
        
    }    
}
