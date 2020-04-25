package mx.com.inscitech.actinver.ws.contract;

import mx.com.inscitech.fiduciaweb.services.GenericServiceResponse;


public class ServiceResponse {
    
    private short result;

    private String nativeErrorCode = null;
    private String transactionID = null;
    private String clientNumber = null;
   
    private GenericServiceResponse serviceData = null;
        
    public ServiceResponse() {
        super();
    }

    public void setResult(short result) {
        this.result = result;
    }

    public short getResult() {
        return result;
    }

    public void setNativeErrorCode(String nativeErrorCode) {
        this.nativeErrorCode = nativeErrorCode;
    }

    public String getNativeErrorCode() {
        return nativeErrorCode;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setClientNumber(String clientNumber) {
        this.clientNumber = clientNumber;
    }

    public String getClientNumber() {
        return clientNumber;
    }

    public void setServiceData(GenericServiceResponse serviceData) {
        this.serviceData = serviceData;
    }

    public GenericServiceResponse getServiceData() {
        return serviceData;
    }
}
