package mx.com.inscitech.fiduciaweb.services;

import java.util.ArrayList;
import java.util.List;


public class GenericServiceResponse {
    
    private boolean succeded = false;
    
    private String requestedOperation="FW-WLS-QUERY";
    private String exitCode = "FW-WLS-000";
    private String exitMessage = "ERROR";
    private String responseType = "";
    private String responseCategory = "ERROR";
    private String responseMessage = "";
    private String transactionID = "";

    private ErrorData errorDetail = null;
    
    private List<GenericMessage> messages = null;
    
    public GenericServiceResponse() {
        super();
        messages = new ArrayList<GenericMessage>();
    }

    public void setSucceded(boolean succeded) {
        this.succeded = succeded;
    }

    public boolean isSucceded() {
        return succeded;
    }

    public void setRequestedOperation(String requestedOperation) {
        this.requestedOperation = requestedOperation;
    }

    public String getRequestedOperation() {
        return requestedOperation;
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

    public void setResponseType(String responseType) {
        this.responseType = responseType;
    }

    public String getResponseType() {
        return responseType;
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

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setErrorDetail(ErrorData errorDetail) {
        this.errorDetail = errorDetail;
    }

    public ErrorData getErrorDetail() {
        return errorDetail;
    }

    public void setMessages(List<GenericMessage> messages) {
        this.messages = messages;
    }

    public List<GenericMessage> getMessages() {
        return messages;
    }
}
