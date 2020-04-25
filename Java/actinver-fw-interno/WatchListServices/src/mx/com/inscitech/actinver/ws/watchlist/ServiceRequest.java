package mx.com.inscitech.actinver.ws.watchlist;


public class ServiceRequest {
    
    private String clientID = null;
    private String systemID = null;
    private String companyName = null;
    private String name = null;
    private String lastName = null;
    private String secondLastName = null;
    private String tin = null;
    private String curp = null;
    private String userName = null;
    private String clientTypeID = null;
    
    public ServiceRequest() {
        super();
    }

    public void setClientID(String clientID) {
        this.clientID = clientID;
    }

    public String getClientID() {
        return clientID;
    }

    public void setSystemID(String systemID) {
        this.systemID = systemID;
    }

    public String getSystemID() {
        return systemID;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setSecondLastName(String secondLastName) {
        this.secondLastName = secondLastName;
    }

    public String getSecondLastName() {
        return secondLastName;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }

    public String getTin() {
        return tin;
    }

    public void setCurp(String curp) {
        this.curp = curp;
    }

    public String getCurp() {
        return curp;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setClientTypeID(String clientTypeID) {
        this.clientTypeID = clientTypeID;
    }

    public String getClientTypeID() {
        return clientTypeID;
    }
}
