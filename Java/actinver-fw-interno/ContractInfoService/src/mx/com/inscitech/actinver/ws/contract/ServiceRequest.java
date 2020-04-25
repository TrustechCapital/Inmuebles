package mx.com.inscitech.actinver.ws.contract;


public class ServiceRequest {
    
    private String contractNumber = "";
    private String bankingArea = "";
    
    public ServiceRequest() {
        super();
    }

    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public String getContractNumber() {
        return contractNumber;
    }

    public void setBankingArea(String bankingArea) {
        this.bankingArea = bankingArea;
    }

    public String getBankingArea() {
        return bankingArea;
    }

}
