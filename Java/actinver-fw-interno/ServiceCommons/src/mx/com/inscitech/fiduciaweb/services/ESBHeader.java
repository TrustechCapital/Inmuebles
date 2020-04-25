package mx.com.inscitech.fiduciaweb.services;


public class ESBHeader {
    
    private boolean useDateTime = true;
    
    private String IPAddress = "127.0.0.1";
    private String clientID = "";
    private String operationName = "BankSPEITransfer";
    private String operationVersion = "1_0";
    private String language = "SPA";
    private String systemID = "";
    private String userName = "";    
    
    public ESBHeader() {
        super();
    }

    public void setUseDateTime(boolean useDateTime) {
        this.useDateTime = useDateTime;
    }

    public boolean isUseDateTime() {
        return useDateTime;
    }

    public void setIPAddress(String IPAddress) {
        this.IPAddress = IPAddress;
    }

    public String getIPAddress() {
        return IPAddress;
    }

    public void setClientID(String clientID) {
        this.clientID = clientID;
    }

    public String getClientID() {
        return clientID;
    }

    public void setOperationName(String operationName) {
        this.operationName = operationName;
    }

    public String getOperationName() {
        return operationName;
    }

    public void setOperationVersion(String operationVersion) {
        this.operationVersion = operationVersion;
    }

    public String getOperationVersion() {
        return operationVersion;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getLanguage() {
        return language;
    }

    public void setSystemID(String systemID) {
        this.systemID = systemID;
    }

    public String getSystemID() {
        return systemID;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }
}
