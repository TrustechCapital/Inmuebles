package mx.com.inscitech.fiducia.services;

import java.util.List;

public class GenericServiceResponse {
    
    protected ErrorData errorDetail = new ErrorData();

    protected boolean succeded = false;

    protected List<String> messages = new java.util.ArrayList<String>();

    protected String exitCode = "FW-WS-ERR-000";
    protected String exitMessage = "Operation Failed!";
    protected String requestedOperation = "FW-WSOP-000";
    protected String responseCategory = "SERVICES";
    protected String responseMessage = "Operation Failed!";
    protected String responseType = "ERROR";
    protected String transactionID = "FW-WSOP-TR-000";
    
    protected Object responseObj = null;
    
    public GenericServiceResponse() {
        super();
    }

    public void setErrorDetail(ErrorData errorDetail) {
        this.errorDetail = errorDetail;
    }

    public ErrorData getErrorDetail() {
        return errorDetail;
    }

    public void setSucceded(boolean succeded) {
        this.succeded = succeded;
    }

    public boolean isSucceded() {
        return succeded;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setExitCode(String exitCode) {
        this.exitCode = exitCode;
    }

    public String getExitCode() {
        return exitCode;
    }

    public void setExitMessage(String exitMessage) {
        this.exitMessage = exitMessage;
    }

    public String getExitMessage() {
        return exitMessage;
    }

    public void setRequestedOperation(String requestedOperation) {
        this.requestedOperation = requestedOperation;
    }

    public String getRequestedOperation() {
        return requestedOperation;
    }

    public void setResponseCategory(String responseCategory) {
        this.responseCategory = responseCategory;
    }

    public String getResponseCategory() {
        return responseCategory;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseType(String responseType) {
        this.responseType = responseType;
    }

    public String getResponseType() {
        return responseType;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setResponseObj(Object responseObj) {
        this.responseObj = responseObj;
    }

    public Object getResponseObj() {
        return responseObj;
    }
}
