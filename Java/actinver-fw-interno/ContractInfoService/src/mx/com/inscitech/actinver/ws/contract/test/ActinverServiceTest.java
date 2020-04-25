package mx.com.inscitech.actinver.ws.contract.test;

import javax.servlet.http.HttpServletRequest;

import mx.com.inscitech.actinver.ws.contract.ClienteUnicoService;
import mx.com.inscitech.actinver.ws.contract.ServiceRequest;
import mx.com.inscitech.actinver.ws.contract.ServiceResponse;
import mx.com.inscitech.fiduciaweb.services.ESBHeader;
import mx.com.inscitech.fiduciaweb.services.ServiceConfig;

public class ActinverServiceTest {
    
    private ClienteUnicoService service = null;
    private ServiceConfig serviceConfig = null;
    
    public ActinverServiceTest() {
        super();
        service = new ClienteUnicoService();
    }
    
    public void setConfig(HttpServletRequest request) {
        serviceConfig = new ServiceConfig();

        HelperClass h = new HelperClass(request);

        ESBHeader headerData = new ESBHeader();
        headerData.setClientID(h.getValue("clientID", ""));
        headerData.setIPAddress(h.getValue("IPAddress", ""));
        headerData.setLanguage(h.getValue("language", "SPA"));
        headerData.setOperationName(h.getValue("operationName", "ClientContractQuery"));
        headerData.setOperationVersion(h.getValue("operationVersion", "1_0"));
        headerData.setSystemID(h.getValue("systemID", ""));
        headerData.setUseDateTime(new Boolean(h.getValue("useDateTime", "true")));
        headerData.setUserName("");

        serviceConfig.setHeaderData(headerData);
        
        serviceConfig.setNamespaceLocalPart(h.getValue("namespaceLocalPart", "ContractInfoWS-service.serviceagent"));
        serviceConfig.setNamespaceURI(h.getValue("namespaceURI", "http://actinver.com.mx/ws/ContractInfoWS"));
        serviceConfig.setServiceURL(h.getValue("serviceURL", "http://esb-qa.actinver.com.mx/ContractInfoWS"));
        serviceConfig.setUseCommonHeader(new Boolean(h.getValue("useCommonHeader", "true")));
        
        service.setServiceConfig(serviceConfig);
    }
    
    public ServiceResponse getClient(String contractNumber, String bankingArea) {
        
        ServiceRequest sr = new ServiceRequest();
        ServiceResponse rsp = null;
            
        sr.setBankingArea(bankingArea);
        sr.setContractNumber(contractNumber);
        
        rsp = service.getContractInfo(sr);
        
        return rsp;
    }
    
    class HelperClass {
        private javax.servlet.ServletRequest rq = null;
        
        HelperClass(javax.servlet.ServletRequest rq) {
            this.rq = rq;
        }
        
        public String getValue(String name, String defaultValue) {
            return getValue(name, defaultValue, "");
        }
        
        public String getValue(String name, String defaultValue, String ifEmpty) {
            String value = rq.getParameter(name);
            if(value == null) {
                return defaultValue;
            } else if("".equals(value)) {
                return ifEmpty;
            } else {
                return value;
            }
        }
    }    
    
}
