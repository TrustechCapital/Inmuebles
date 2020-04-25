package mx.com.inscitech.actinver.ws.spei;

import com.actinver.mexico.systems.business.financialops.v1.BankSPEITransferRq;
import com.actinver.mexico.systems.business.financialops.v1.BankSPEITransferRs;
import com.actinver.mexico.systems.business.financialops.v1.InBankSPEITransfer;
import com.actinver.mexico.systems.business.financialops.v1.OutBankSPEITransfer;
import com.actinver.mexico.systems.infrastructure.common.v1.InCommonHeader;
import com.actinver.mexico.systems.infrastructure.common.v1.OutCommonHeader;

import java.io.PrintWriter;
import java.io.StringWriter;

import java.math.BigDecimal;

import java.util.Date;
import java.util.GregorianCalendar;

import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;

import mx.com.actinver.ws.financialopsws.FinancialOpsService;
import mx.com.actinver.ws.financialopsws.FinancialOpsWSServiceServiceagent;
import mx.com.inscitech.fiduciaweb.services.ESBHeader;
import mx.com.inscitech.fiduciaweb.services.ErrorData;
import mx.com.inscitech.fiduciaweb.services.GenericMessage;
import mx.com.inscitech.fiduciaweb.services.GenericServiceResponse;
import mx.com.inscitech.fiduciaweb.services.ServiceConfig;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class SPEIServiceOperations {
    
    private static final Logger logger = LoggerFactory.getLogger(SPEIServiceOperations.class);
    
    private static ServiceConfig serviceConfig = null;
    
    public SPEIServiceOperations() {
        super();
    }
        
    public ServiceResponse setServiceConfig(ServiceConfig serviceConfig) {
        ServiceResponse theResponse = new ServiceResponse();
        
        GenericServiceResponse serviceData = new GenericServiceResponse();
        
        logger.debug("setServiceConfig()");
            
        if(serviceConfig != null) {
            SPEIServiceOperations.serviceConfig = serviceConfig;
            
            serviceData.setExitCode("SPEISVC-CFGRQ-OK");
            serviceData.setExitMessage("Operation compleated successfully!");
            serviceData.setResponseType("SUCCESS");
            serviceData.setSucceded(true);
            
            logger.debug("setServiceConfig OK!");
            
        } else {
            serviceData.setExitCode("SPEISVC-CFGRQ-ERROR");
            serviceData.setExitMessage("Operation failed! The configuration received is not valid!");
            serviceData.setResponseType("ERROR");
            serviceData.setSucceded(false);
            
            logger.debug("setServiceConfig Error!");
        }
        
        theResponse.setServiceData(serviceData);
        
        return theResponse;
    }

    public ServiceResponse makeSPEITransfer(ServiceRequest transferData) {
        ServiceResponse theResponse = new ServiceResponse();

        GenericServiceResponse serviceData = new GenericServiceResponse();
        
        logger.debug("makeSPEITransfer() serviceConfig: " + serviceConfig);

        BankSPEITransferRs speiServiceResponse = null;
                
        if(serviceConfig == null) {
            serviceData.setExitCode("SPEISVC-RQ-ERROR-01");
            serviceData.setExitMessage("Operation failed! The configuration received is not valid!");
            serviceData.setResponseType("ERROR");
            serviceData.setSucceded(false);            
            
            theResponse.setServiceData(serviceData);
            logger.debug("No service config available!");
            
            return theResponse;
        }
        
        //TODO: Validar el agregar validaciones
        
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
            
            FinancialOpsWSServiceServiceagent serviceAgent = new FinancialOpsWSServiceServiceagent(null, serviceQName); //null o new URL(serviceURL)
            FinancialOpsService service = serviceAgent.getFinancialOpsWSEndpoint();
            
            BindingProvider bp = (BindingProvider)service;
            bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, serviceConfig.getServiceURL());     
            logger.debug(String.format("Service URL [%s]",serviceConfig.getServiceURL()));

            InBankSPEITransfer.Transfer speiData = new InBankSPEITransfer.Transfer();
            speiData.setSPEIType(transferData.getSPEIType());
            logger.debug(String.format("SPEIType [%s]", speiData.getSPEIType()));
            
            InBankSPEITransfer.Transfer.Mandator theMandator = new InBankSPEITransfer.Transfer.Mandator();
            theMandator.setMandatorAccountNumber(transferData.getMandatorAccountNumber());
            theMandator.setMandatorName(transferData.getMandatorName());
            logger.debug("mandatorAccountNumber: " + transferData.getMandatorAccountNumber() + " mandatorName: " + transferData.getMandatorName() + "<br/>");
                        
            speiData.setMandator(theMandator);                        
            
            InBankSPEITransfer.Transfer.Recipient theRecipient = new InBankSPEITransfer.Transfer.Recipient();
            theRecipient.setBankID(transferData.getBankID());
            theRecipient.setRecipientName(transferData.getRecipientName());
            theRecipient.setAccountTypeID(transferData.getAccountTypeID());
            theRecipient.setAccountNumber(transferData.getAccountNumber());
            
            logger.debug("bankID: " + transferData.getBankID() + " recipientName: " + transferData.getRecipientName() + " accountTypeID: " + transferData.getAccountTypeID() + " accountNumber: " + transferData.getAccountNumber() + "<br/>");
            
            speiData.setRecipient(theRecipient);
            
            speiData.setAmount(new BigDecimal(transferData.getAmount()));
            speiData.setISOCurrency(transferData.getISOCurrency());                
            speiData.setVAT(new BigDecimal(transferData.getVAT()));
            speiData.setSPEIReference(transferData.getSPEIReference());
            speiData.setPaymentConcept(transferData.getPaymentConcept());
            speiData.setOperationType(transferData.getOperationType());
            speiData.setSettlementInstructionID(transferData.getSettlementInstructionID());
            speiData.setMovementType(transferData.getMovementType());
            speiData.setFeeExemptionIndicator(transferData.getFeeExemptionIndicator());
            speiData.setExcludeValidationFlag(transferData.isExcludeValidationFlag());
                
            logger.debug("Transfer data set ok!");
            
            InBankSPEITransfer speiTransfer = new InBankSPEITransfer();
            speiTransfer.setTransfer(speiData);
            
            BankSPEITransferRq bstop = new BankSPEITransferRq(); 
            bstop.setInBankSPEITransfer(speiTransfer);
            bstop.setInCommonHeader(header);
            
            logger.debug("Ready to make call...");
            
            speiServiceResponse = service.bankSPEITransferOp(bstop);            
            logger.debug("speiServiceResponse: " + speiServiceResponse);
            
            if(speiServiceResponse != null) {
                
                OutBankSPEITransfer transferOutput = speiServiceResponse.getOutBankSPEITransfer();
                OutCommonHeader outHd = speiServiceResponse.getOutCommonHeader();
                
                if(transferOutput.getTransferResult() != null) {
                    
                    OutBankSPEITransfer.TransferResult tansferRslt = transferOutput.getTransferResult();
                    if(tansferRslt != null) {
                        
                        theResponse.setTrackingCode(tansferRslt.getTrackingCode());
                        theResponse.setTransferReference(tansferRslt.getTransferReference());
                        theResponse.setTransactionDate(""+tansferRslt.getTransactionDate());
                        theResponse.setTransactionTime(""+tansferRslt.getTransactionTime().toString());
                        
                        if(outHd.getResult() != null) {
                            OutCommonHeader.Result result = outHd.getResult();
                            
                            theResponse.setNativeErrorCode(result.getNativeErrorCode());
                            theResponse.setTransactionID(result.getTransactionID());
                            
                            if(result.getMessages() != null) {
                                for(OutCommonHeader.Result.Messages msg : result.getMessages()) {
                                    serviceData.getMessages().add(new GenericMessage(
                                        msg.getResponseCategory(), 
                                        msg.getResponseType(), 
                                        msg.getResponseSystemCode(), 
                                        msg.getResponseMessage()
                                    ));
                                }
                            } else {
                                //TODO: Evaluar accion a tomar
                                logger.debug("result.getMessages() is null!");
                            }
                        } else {
                            //TODO: Evaluar accion a tomar
                            logger.debug("outHd.getResult() is null!");
                        }
                        
                    } else {
                        //TODO: Evaluar accion a tomar
                        logger.debug("tansferRslt is null!");
                    }
                    
                } else {
                    //TODO: Evaluar accion a tomar
                    logger.debug("transferOutput.getTransferResult is null!");
                }
                
                serviceData.setExitCode("SPEISVC-RQ-OK");
                serviceData.setExitMessage("Operation succedded!");
                serviceData.setResponseType("SUCCESS");
                serviceData.setSucceded(true);                            
                
            } else {
                serviceData.setExitCode("SPEISVC-RQ-ERROR-03");
                serviceData.setExitMessage("Operation failed! The service response is not valid!");
                serviceData.setResponseType("ERROR");
                serviceData.setSucceded(false);                            
            }
            
            theResponse.setServiceData(serviceData);
        
        } catch(Exception e) {
            
            StringWriter stackTrace = new StringWriter();
            PrintWriter printWriter = new PrintWriter(stackTrace);
            e.printStackTrace(printWriter);
            printWriter.flush();
            
            ErrorData errorDetail = new ErrorData("SPEISVC-RQ-ERROR-02", e.getMessage(), stackTrace.toString());
            theResponse.getServiceData().setErrorDetail(errorDetail);
            
            serviceData.setResponseMessage(e.getMessage());

            logger.error("Operation failed! Exception Message: " + e.getMessage(), e);

        }
        
        return theResponse;
    }
}
