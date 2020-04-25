package mx.com.inscitech.fiduciaweb.services.wl;


public class WLMatch {
    
    private String clientID = null;
    private String watchListPersonID = null;
    private String companyName = null;
    private String name = null;
    private String lastName = null;
    private String secondLastName = null;
    private String tin = null;
    private String curp = null;
    private String clientTypeID = null;
    private String watchListPersonStatus = null;
    private String watchListType = null;
    private String lastUpdateDate = null;
    private String activeDate = null;
    private String inactiveDate = null;
    private String matchPercentage = null;
    
    public WLMatch() {
        super();
    }

    public WLMatch(String clientID, String watchListPersonID, String companyName, String name, String lastName, String secondLastName, String tin, String curp, String clientTypeID,
                   String watchListPersonStatus, String watchListType, String lastUpdateDate, String activeDate, String inactiveDate, String matchPercentage) {
        this.clientID = clientID;
        this.watchListPersonID = watchListPersonID;
        this.companyName = companyName;
        this.name = name;
        this.lastName = lastName;
        this.secondLastName = secondLastName;
        this.tin = tin;
        this.curp = curp;
        this.clientTypeID = clientTypeID;
        this.watchListPersonStatus = watchListPersonStatus;
        this.watchListType = watchListType;
        this.lastUpdateDate = lastUpdateDate;
        this.activeDate = activeDate;
        this.inactiveDate = inactiveDate;
        this.matchPercentage = matchPercentage;
    }

    public void setClientID(String clientID) {
        this.clientID = clientID;
    }

    public String getClientID() {
        return clientID;
    }

    public void setWatchListPersonID(String watchListPersonID) {
        this.watchListPersonID = watchListPersonID;
    }

    public String getWatchListPersonID() {
        return watchListPersonID;
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

    public void setClientTypeID(String clientTypeID) {
        this.clientTypeID = clientTypeID;
    }

    public String getClientTypeID() {
        return clientTypeID;
    }

    public void setWatchListPersonStatus(String watchListPersonStatus) {
        this.watchListPersonStatus = watchListPersonStatus;
    }

    public String getWatchListPersonStatus() {
        return watchListPersonStatus;
    }

    public void setWatchListType(String watchListType) {
        this.watchListType = watchListType;
    }

    public String getWatchListType() {
        return watchListType;
    }

    public void setLastUpdateDate(String lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }

    public String getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setActiveDate(String activeDate) {
        this.activeDate = activeDate;
    }

    public String getActiveDate() {
        return activeDate;
    }

    public void setInactiveDate(String inactiveDate) {
        this.inactiveDate = inactiveDate;
    }

    public String getInactiveDate() {
        return inactiveDate;
    }

    public void setMatchPercentage(String matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public String getMatchPercentage() {
        return matchPercentage;
    }
}
