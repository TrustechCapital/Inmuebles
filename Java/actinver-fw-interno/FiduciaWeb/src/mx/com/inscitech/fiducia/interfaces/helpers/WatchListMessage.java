package mx.com.inscitech.fiducia.interfaces.helpers;


public class WatchListMessage {
    
    private String responseCategory = null;
    private String responseMessage = null;
    private String responseSystemCode = null;
    private String responseType = null;
    
    public WatchListMessage() {
        super();
    }

    public WatchListMessage(String responseCategory, String responseMessage, String responseSystemCode, String responseType) {
        this.responseCategory = responseCategory;
        this.responseMessage = responseMessage;
        this.responseSystemCode = responseSystemCode;
        this.responseType = responseType;
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

    public void setResponseSystemCode(String responseSystemCode) {
        this.responseSystemCode = responseSystemCode;
    }

    public String getResponseSystemCode() {
        return responseSystemCode;
    }

    public void setResponseType(String responseType) {
        this.responseType = responseType;
    }

    public String getResponseType() {
        return responseType;
    }
}
