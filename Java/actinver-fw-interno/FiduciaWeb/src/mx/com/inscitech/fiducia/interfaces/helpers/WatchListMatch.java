package mx.com.inscitech.fiducia.interfaces.helpers;


public class WatchListMatch {
    
    private Object activeDate;
    private String clientID;
    private String clientTypeID;
    private String companyName;
    private String curp;
    private Object inactiveDate;
    private String lastName;
    private Object lastUpdateDate;
    private String matchPercentage;
    private String name;
    private String secondLastName;
    private String tin;
    private String watchListPersonID;
    private String watchListPersonStatus;
    private String watchListType;
    
    public WatchListMatch() {
        super();
    }

    public WatchListMatch(Object activeDate, String clientID, String clientTypeID, String companyName, String curp, Object inactiveDate, String lastName, Object lastUpdateDate,
                          String matchPercentage, String name, String secondLastName, String tin, String watchListPersonID, String watchListPersonStatus, String watchListType) {
        this.activeDate = activeDate;
        this.clientID = clientID;
        this.clientTypeID = clientTypeID;
        this.companyName = companyName;
        this.curp = curp;
        this.inactiveDate = inactiveDate;
        this.lastName = lastName;
        this.lastUpdateDate = lastUpdateDate;
        this.matchPercentage = matchPercentage;
        this.name = name;
        this.secondLastName = secondLastName;
        this.tin = tin;
        this.watchListPersonID = watchListPersonID;
        this.watchListPersonStatus = watchListPersonStatus;
        this.watchListType = watchListType;
    }

    public void setActiveDate(Object activeDate) {
        this.activeDate = activeDate;
    }

    public Object getActiveDate() {
        return activeDate;
    }

    public void setClientID(String clientID) {
        this.clientID = clientID;
    }

    public String getClientID() {
        return clientID;
    }

    public void setClientTypeID(String clientTypeID) {
        this.clientTypeID = clientTypeID;
    }

    public String getClientTypeID() {
        return clientTypeID;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCurp(String curp) {
        this.curp = curp;
    }

    public String getCurp() {
        return curp;
    }

    public void setInactiveDate(Object inactiveDate) {
        this.inactiveDate = inactiveDate;
    }

    public Object getInactiveDate() {
        return inactiveDate;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastUpdateDate(Object lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }

    public Object getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setMatchPercentage(String matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public String getMatchPercentage() {
        return matchPercentage;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
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

    public void setWatchListPersonID(String watchListPersonID) {
        this.watchListPersonID = watchListPersonID;
    }

    public String getWatchListPersonID() {
        return watchListPersonID;
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
}
