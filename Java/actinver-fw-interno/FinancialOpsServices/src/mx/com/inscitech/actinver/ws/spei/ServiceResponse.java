package mx.com.inscitech.actinver.ws.spei;

import mx.com.inscitech.fiduciaweb.services.GenericServiceResponse;

public class ServiceResponse {
    
    private GenericServiceResponse serviceData = null;
    
    private String trackingCode = null;
    private String transferReference = null;
    private String transactionDate = null;
    private String transactionTime = null;
    
    private String nativeErrorCode = null;
    private String transactionID = null;
    private String result = null;
        
    public ServiceResponse() {
        super();
    }

    public void setServiceData(GenericServiceResponse serviceData) {
        this.serviceData = serviceData;
    }

    public GenericServiceResponse getServiceData() {
        return serviceData;
    }

    public void setTrackingCode(String trackingCode) {
        this.trackingCode = trackingCode;
    }

    public String getTrackingCode() {
        return trackingCode;
    }

    public void setTransferReference(String transferReference) {
        this.transferReference = transferReference;
    }

    public String getTransferReference() {
        return transferReference;
    }

    public void setTransactionDate(String transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionTime(String transactionTime) {
        this.transactionTime = transactionTime;
    }

    public String getTransactionTime() {
        return transactionTime;
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

    public void setResult(String result) {
        this.result = result;
    }

    public String getResult() {
        return result;
    }
}
