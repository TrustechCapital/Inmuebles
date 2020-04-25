package mx.com.inscitech.actinver.ws.contract;

import com.actinver.mexico.systems.business.client.v1.ClientContractQueryRq;
import com.actinver.mexico.systems.business.client.v1.ClientContractQueryRs;
import com.actinver.mexico.systems.business.client.v1.InClientContractQuery;
import com.actinver.mexico.systems.business.client.v1.OutClientContractQuery;
import com.actinver.mexico.systems.infrastructure.common.v1.InCommonHeader;
import com.actinver.mexico.systems.infrastructure.common.v1.OutCommonHeader;

import java.io.PrintWriter;
import java.io.StringWriter;

import java.util.Date;
import java.util.GregorianCalendar;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.BindingType;
import javax.xml.ws.soap.SOAPBinding;

import mx.com.actinver.ws.contractinfows.ContractInfoService;
import mx.com.actinver.ws.contractinfows.ContractInfoWSServiceServiceagent;
import mx.com.inscitech.fiduciaweb.services.ESBHeader;
import mx.com.inscitech.fiduciaweb.services.ErrorData;
import mx.com.inscitech.fiduciaweb.services.GenericMessage;
import mx.com.inscitech.fiduciaweb.services.GenericServiceResponse;
import mx.com.inscitech.fiduciaweb.services.ServiceConfig;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebService(serviceName = "ClienteUnicoService")
@BindingType(SOAPBinding.SOAP12HTTP_BINDING)
public class ClienteUnicoService {
    
    private static final Logger logger = LoggerFactory.getLogger(ClienteUnicoService.class);
    
    private static ServiceConfig serviceConfig = null;
    
    public ClienteUnicoService() {
        super();
    }

    @WebMethod
    public ServiceResponse setServiceConfig(@WebParam(name = "ServiceConfig") ServiceConfig serviceConfig) {
        ServiceResponse theResponse = new ServiceResponse();
        
        GenericServiceResponse serviceData = new GenericServiceResponse();
        
        logger.debug("setServiceConfig()");
            
        if(serviceConfig != null) {

            serviceData.setExitCode("CUSVC-CFGRQ-OK");
            serviceData.setExitMessage("Operation compleated successfully!");
            serviceData.setResponseType("SUCCESS");
            serviceData.setSucceded(true);

            ClienteUnicoService.serviceConfig = serviceConfig;
                        
            logger.debug("setServiceConfig OK!");
            
        } else {

            serviceData.setExitCode("CUSVC-CFGRQ-ERROR");
            serviceData.setExitMessage("Operation failed! The configuration received is not valid!");
            serviceData.setResponseType("ERROR");
            serviceData.setSucceded(false);
            
            logger.debug("setServiceConfig Error!");
        }
        
        return theResponse;
    }

    @WebMethod
    public ServiceResponse getContractInfo(@WebParam(name = "contractInfo") ServiceRequest contractInfo) {        
        logger.debug("getContractInfo()");
        
        ServiceResponse theResponse = new ServiceResponse();
        GenericServiceResponse serviceData = new GenericServiceResponse();

        try {
            
            GregorianCalendar gc = new GregorianCalendar();
            gc.setTime(new Date());
            XMLGregorianCalendar today = DatatypeFactory.newInstance().newXMLGregorianCalendar(gc);
            
            InCommonHeader header = new InCommonHeader();        
            logger.debug("UseCommonHeader? " + serviceConfig.isUseCommonHeader());
            
            if(serviceConfig.isUseCommonHeader()) {
                ESBHeader h = serviceConfig.getHeaderData();
                
                if(h.isUseDateTime()) {
                    header.setDate(today);
                    header.setTime(today);
                }

                header.setIPAddress(h.getIPAddress());
                header.setClientID(h.getClientID());
                header.setOperationName(h.getOperationName());
                header.setOperationVersion(h.getOperationVersion());
                header.setLanguage(h.getLanguage());
                
                logger.debug("Header set OK");
            }
            
            QName serviceQName = new QName(serviceConfig.getNamespaceURI(), serviceConfig.getNamespaceLocalPart());
            logger.debug(String.format("Service QName(%s, %s)", serviceConfig.getNamespaceURI(), serviceConfig.getNamespaceLocalPart()));

            ContractInfoWSServiceServiceagent serviceAgent = new ContractInfoWSServiceServiceagent(null, serviceQName);
            ContractInfoService service = serviceAgent.getContractInfoWSEndpoint();
            
            BindingProvider bp = (BindingProvider)service;
            bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, serviceConfig.getServiceURL());     
            logger.debug(String.format("Service URL [%s]", serviceConfig.getServiceURL()));
            
            InClientContractQuery.Client theClient = new InClientContractQuery.Client();
            theClient.setContractNumber(contractInfo.getContractNumber());
            logger.debug(String.format("ContractNumber: [%s]", contractInfo.getContractNumber()));
            
            InClientContractQuery cqIn = new InClientContractQuery();
            cqIn.setBankingArea(contractInfo.getBankingArea());
            logger.debug(String.format("BankingArea: [%s]", contractInfo.getBankingArea()));
            
            cqIn.setClient(theClient);

            ClientContractQueryRq rq = new ClientContractQueryRq();
            rq.setInClientContractQuery(cqIn);
            rq.setInCommonHeader(header);

            ClientContractQueryRs resp = service.clientContractQueryOp(rq);
            logger.debug(String.format("resp: [%s]", resp.toString()));
                
            OutCommonHeader outH = resp.getOutCommonHeader();
            if(outH != null && outH.getResult() != null) {
                
                OutCommonHeader.Result result = outH.getResult();
                theResponse.setResult(result.getResult());
                theResponse.setNativeErrorCode(result.getNativeErrorCode());
                theResponse.setTransactionID(result.getTransactionID());
                
                if(result.getMessages() != null && result.getMessages().size() > 0) {
                    for(OutCommonHeader.Result.Messages msg : result.getMessages()) {
                        serviceData.getMessages().add(new GenericMessage(
                            msg.getResponseCategory(), 
                            msg.getResponseType(), 
                            msg.getResponseSystemCode(), 
                            msg.getResponseMessage()
                        ));
                    }
                }
                
            } else {

                serviceData.getMessages().add(new GenericMessage(
                    "FW-CUWS-001", 
                    "WARN", 
                    "FWCUWS-WRN-OH-ND", 
                    "The OutCommonHeader or de Result are null!"
                ));

                //TODO: Evaluar accion a tomar
                logger.debug("The OutCommonHeader or de Result are null!");
            }
            
            OutClientContractQuery outC = resp.getOutClientContractQuery();
            
            if(outC != null) {
                theResponse.setClientNumber(outC.getClientNumber());                
            } else {

                serviceData.getMessages().add(new GenericMessage(
                    "FW-CUWS-002", 
                    "ERROR", 
                    "FWCUWS-ERROR-OCCQ-ND", 
                    "OutClientContractQuery is null!"
                ));

                serviceData.setSucceded(true);
                serviceData.setExitCode("FW-CUWS-000");
                serviceData.setExitMessage("Operation compleated successfully!");
                
                //TODO: Evaluar accion a tomar
                logger.debug("The OutClientContractQuery or de Result are null!");
            }
            
        } catch(Exception e) {

            StringWriter stackTrace = new StringWriter();
            PrintWriter printWriter = new PrintWriter(stackTrace);
            e.printStackTrace(printWriter);
            printWriter.flush();
            
            ErrorData errorDetail = new ErrorData("CUSVC-RQ-ERROR-01", e.getMessage(), stackTrace.toString());
            
            serviceData.setErrorDetail(errorDetail);            
            serviceData.setResponseMessage(e.getMessage());

            logger.error("Operation failed! Exception Message: " + e.getMessage(), e);
            
        }    
        
        theResponse.setServiceData(serviceData);
        
        return theResponse;
    }
    
}
