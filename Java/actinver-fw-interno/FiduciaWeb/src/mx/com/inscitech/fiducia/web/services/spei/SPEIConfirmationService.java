package mx.com.inscitech.fiducia.web.services.spei;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

import javax.xml.ws.BindingType;
import javax.xml.ws.soap.SOAPBinding;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.dml.GenericDML;


@WebService(name = "ws_egresosSoapPort", serviceName = "ws_egresos", portName = "ws_egresosSoapPort")
@BindingType(SOAPBinding.SOAP12HTTP_BINDING)
public class SPEIConfirmationService {
    
    private LoggingService logger = null;
    
    public SPEIConfirmationService() {
        super();
        logger = LoggingService.getNewInstance();
    }

    @WebResult(name = "executeResponse")
    @WebMethod(operationName = "Execute")
    public SPEIConfirmationResponse execute(@WebParam(name = "parameters") SPEIConfirmationRequest parameters) {
        SPEIConfirmationResponse response = new SPEIConfirmationResponse();
        SDTResponse responseBody = new SDTResponse();
        
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "SPEI Service Parameters: " + parameters);
        
        GenericDML dml = new GenericDML();
        dml.executeUpdate("SPEI.F_CAMBIA_ESTATUS(?, ?)", new Object[] { parameters.getSpeiReference(), parameters.getSpeiReference() });
        
        responseBody.setResponseMessage("Operacion realizada con exito");
        responseBody.setEstatusConfirmacion(true);
        
        response.setResponse(responseBody);
        
        return response;
    }
    
}
