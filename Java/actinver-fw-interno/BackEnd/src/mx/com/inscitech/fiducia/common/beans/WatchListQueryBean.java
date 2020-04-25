package mx.com.inscitech.fiducia.common.beans;


public class WatchListQueryBean {
    
    private String name = "";
    private String lastName = "";
    private String secondLastName = "";
    private String tin = "";
    private String curp = "";
    private String clientTypeID = "";

    public WatchListQueryBean() {
        super();
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
}
