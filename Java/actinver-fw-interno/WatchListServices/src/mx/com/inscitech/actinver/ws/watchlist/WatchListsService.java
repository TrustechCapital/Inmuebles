package mx.com.inscitech.actinver.ws.watchlist;

import com.actinver.mexico.systems.infrastructure.common.v1.InCommonHeader;
import com.actinver.mexico.systems.infrastructure.common.v1.OutCommonHeader;
import com.actinver.mexico.systems.services.watchlist.v1.InWatchListQuery;
import com.actinver.mexico.systems.services.watchlist.v1.OutWatchListQuery;
import com.actinver.mexico.systems.services.watchlist.v1.WatchListQueryRq;
import com.actinver.mexico.systems.services.watchlist.v1.WatchListQueryRs;

import java.io.PrintWriter;
import java.io.StringWriter;

import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;

import mx.com.actinver.ws.watchlistws.WatchListService;
import mx.com.actinver.ws.watchlistws.WatchListWSServiceServiceagent;
import mx.com.inscitech.fiduciaweb.services.ESBHeader;
import mx.com.inscitech.fiduciaweb.services.ErrorData;
import mx.com.inscitech.fiduciaweb.services.GenericMessage;
import mx.com.inscitech.fiduciaweb.services.GenericServiceResponse;
import mx.com.inscitech.fiduciaweb.services.ServiceConfig;
import mx.com.inscitech.fiduciaweb.services.wl.WLMatch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebService(serviceName = "WatchListsService")
public class WatchListsService {
    
    private static final Logger logger = LoggerFactory.getLogger(WatchListsService.class);
    
    private static ServiceConfig serviceConfig = null;
    
    public WatchListsService() {
        super();
    }

    @WebMethod
    public ServiceResponse setServiceConfig(@WebParam(name = "serviceConfig") ServiceConfig serviceConfig) {
        ServiceResponse theResponse = new ServiceResponse();
        
        GenericServiceResponse serviceData = new GenericServiceResponse();
        
        logger.debug("setServiceConfig()");
            
        if(serviceConfig != null) {
            WatchListsService.serviceConfig = serviceConfig;
            
            serviceData.setExitCode("WLSVC-CFGRQ-OK");
            serviceData.setExitMessage("Operation compleated successfully!");
            serviceData.setResponseType("SUCCESS");
            serviceData.setSucceded(true);
            
            logger.debug("setServiceConfig OK!");
            
        } else {
            serviceData.setExitCode("WLSVC-CFGRQ-ERROR");
            serviceData.setExitMessage("Operation failed! The configuration received is not valid!");
            serviceData.setResponseType("ERROR");
            serviceData.setSucceded(false);
            
            logger.debug("setServiceConfig Error!");
        }
        
        theResponse.setServiceData(serviceData);
        
        return theResponse;
    }

    @WebMethod
    public ServiceResponse searchEntity(@WebParam(name = "entityData") ServiceRequest entityData) {
        logger.debug("searchEntity()");
        
        ServiceResponse theResponse = new ServiceResponse();
        GenericServiceResponse serviceData = new GenericServiceResponse();
        
        WatchListQueryRs responseWLS = null;
        
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

            WatchListWSServiceServiceagent serviceAgent = new WatchListWSServiceServiceagent(null, serviceQName);                
            WatchListService service = serviceAgent.getWatchListWSEndpoint();
            
            BindingProvider bp = (BindingProvider)service;
            bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, serviceConfig.getServiceURL());     
            logger.debug(String.format("Service URL [%s]", serviceConfig.getServiceURL()));
            
            InWatchListQuery wlQuery = new InWatchListQuery();
            InWatchListQuery.Query query = new InWatchListQuery.Query();
            
            query.setClientID(entityData.getClientID());
            query.setSystemID(entityData.getSystemID());
            query.setCompanyName(entityData.getCompanyName());
            
            query.setName(entityData.getName());
            query.setLastName(entityData.getLastName());
            query.setSecondLastName(entityData.getSecondLastName());
            query.setTIN(entityData.getTin());
            query.setCURP(entityData.getCurp());            
            query.setClientTypeID(entityData.getClientTypeID());
            
            query.setUserName(entityData.getUserName());
            if("CURRENT".equals(entityData.getUserName())) {
                logger.debug("UserName: CURRENT");
                query.setUserName(""); //Obtener de la app
            }
            
            wlQuery.setQuery(query);
            logger.debug("Query data set Ok!");
                        
            WatchListQueryRq request = new WatchListQueryRq();
            
            request.setInCommonHeader(header);
            request.setInWatchListQuery(wlQuery);
            
            responseWLS = service.watchListQueryOp(request);
            
            if(responseWLS != null) {
                
                if(responseWLS.getOutCommonHeader() != null) {
                    
                    OutCommonHeader.Result resultWLS = responseWLS.getOutCommonHeader().getResult();
                    
                    if(resultWLS.getMessages() != null && resultWLS.getMessages().size() > 0) {
                        
                        for(OutCommonHeader.Result.Messages msg : resultWLS.getMessages()) {
                            serviceData.getMessages().add(new GenericMessage(
                                msg.getResponseCategory(),
                                msg.getResponseType(),
                                msg.getResponseSystemCode(),
                                msg.getResponseMessage()
                            ));
                        }                        
                        
                    } else {
                        //TODO: Evaluar accion a tomar
                        logger.info("responseWLS have no messages!");                    
                    }
                    
                } else {
                    //TODO: Evaluar accion a tomar
                    logger.debug("responseWLS is null!");
                }
                
                if(responseWLS.getOutWatchListQuery() != null && responseWLS.getOutWatchListQuery().getMatch() != null) {
            
                    List<OutWatchListQuery.Match> matches = responseWLS.getOutWatchListQuery().getMatch();
                    for(OutWatchListQuery.Match match : matches) {
                        theResponse.getMatches().add(new WLMatch(
                            match.getClientID(),
                            match.getWatchListPersonID(),
                            match.getCompanyName(),
                            match.getName(),
                            match.getLastName(),
                            match.getSecondLastName(),
                            match.getTIN(),
                            match.getCURP(),
                            match.getClientTypeID(),
                            match.getWatchListPersonStatus(),
                            match.getWatchListType(),
                            ""+match.getLastUpdateDate(),
                            ""+match.getActiveDate(),
                            ""+match.getInactiveDate(),
                            match.getMatchPercentage()
                        ));
                    }

                } else {
                    //TODO: Evaluar accion a tomar
                    logger.debug("responseWLS.getOutWatchListQuery() is null o no matches found!");
                }
                
                serviceData.setExitCode("WLSVC-RQ-OK");
                serviceData.setExitMessage("Operation succedded!");
                serviceData.setResponseType("SUCCESS");
                serviceData.setSucceded(true);                            
                
            } else {
                //TODO: Evaluar accion a tomar
                logger.debug("responseWLS is null!");
                
                serviceData.setExitCode("WLSVC-RQ-ERROR-02");
                serviceData.setExitMessage("Operation failed! The service response is not valid!");
                serviceData.setResponseType("ERROR");
                serviceData.setSucceded(false);                                            
            }
            
        } catch(Exception e) {

            StringWriter stackTrace = new StringWriter();
            PrintWriter printWriter = new PrintWriter(stackTrace);
            e.printStackTrace(printWriter);
            printWriter.flush();
            
            ErrorData errorDetail = new ErrorData("WLSVC-RQ-ERROR-01", e.getMessage(), stackTrace.toString());
            
            serviceData.setErrorDetail(errorDetail);            
            serviceData.setResponseMessage(e.getMessage());

            logger.error("Operation failed! Exception Message: " + e.getMessage(), e);
            
        }
        
        theResponse.setServiceData(serviceData);
        return theResponse;
    }
}
