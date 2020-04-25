package mx.com.inscitech.fiducia.interfaces;

import java.util.ArrayList;
import java.util.List;

import mx.com.inscitech.fiducia.interfaces.helpers.WatchListErrorData;
import mx.com.inscitech.fiducia.interfaces.helpers.WatchListMatch;
import mx.com.inscitech.fiducia.interfaces.helpers.WatchListMessage;

public class ActinverWatchListsInfo {
    
    private String requestedOperation = null;
    private String responseCategory = null;
    private String responseMessage = null;
    private String responseType = null;
    private String transactionID = null;
    
    private List<WatchListMatch> matches = null;
    private List<WatchListMessage> messages = null;
    
    private String exitCode = "";
    private String exitMessage = "";
    private WatchListErrorData errorData = null;
    
    public ActinverWatchListsInfo() {
        super();
        matches = new ArrayList<WatchListMatch>();
        messages = new ArrayList<WatchListMessage>();
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

    public void setMatches(List<WatchListMatch> matches) {
        this.matches = matches;
    }

    public List<WatchListMatch> getMatches() {
        return matches;
    }

    public void setMessages(List<WatchListMessage> messages) {
        this.messages = messages;
    }

    public List<WatchListMessage> getMessages() {
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

    public void setErrorData(WatchListErrorData errorData) {
        this.errorData = errorData;
    }

    public WatchListErrorData getErrorData() {
        return errorData;
    }
}
