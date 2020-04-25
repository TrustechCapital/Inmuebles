package mx.com.inscitech.fiducia.web.services.spei;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "",
         propOrder = { 
            "lenguaje", "clientid", "speiReference", "businessType", "paymentStatusID", "paymentStatus", 
            "operationDate", "operationTime", "clientNumber", "accountType", "transferDescription", 
            "refundID", "refundReason", "cancellationUser", "trackingCode"
        })
@XmlRootElement(name = "ws_egresos")
public class SPEIConfirmationRequest {
    
    @XmlElement(name = "Lenguaje", required = true)
    private String lenguaje = "ES";
    
    @XmlElement(name = "Clientid", required = true)
    private String clientid = "09";
    
    @XmlElement(name = "SPEIReference", required = true)
    private String speiReference = "";
    
    @XmlElement(name = "BusinessType", required = true)
    private String businessType = "09";
    
    @XmlElement(name = "PaymentStatusID", required = true)
    private String paymentStatusID = "";
    
    @XmlElement(name = "PaymentStatus", required = true)
    private String paymentStatus = "";
    
    @XmlElement(name = "OperationDate", required = true)
    private String operationDate = "";
    
    @XmlElement(name = "OperationTime", required = true)
    private String operationTime = "";
    
    @XmlElement(name = "ClientNumber", required = true)
    private String clientNumber = "";
    
    @XmlElement(name = "AccountType", required = true)
    private String accountType = "";
    
    @XmlElement(name = "TransferDescription", required = true)
    private String transferDescription = "";
    
    @XmlElement(name = "RefundID", required = true)
    private String refundID = "";
    
    @XmlElement(name = "RefundReason", required = true)
    private String refundReason = "";
    
    @XmlElement(name = "CancellationUser", required = true)        
    private String cancellationUser = "";
    
    @XmlElement(name = "TrackingCode", required = true)
    private String trackingCode = "";
    
    public SPEIConfirmationRequest() {
        super();
    }

    public void setLenguaje(String lenguaje) {
        this.lenguaje = lenguaje;
    }

    public String getLenguaje() {
        return lenguaje;
    }

    public void setClientid(String clientid) {
        this.clientid = clientid;
    }

    public String getClientid() {
        return clientid;
    }

    public void setSpeiReference(String speiReference) {
        this.speiReference = speiReference;
    }

    public String getSpeiReference() {
        return speiReference;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setPaymentStatusID(String paymentStatusID) {
        this.paymentStatusID = paymentStatusID;
    }

    public String getPaymentStatusID() {
        return paymentStatusID;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setOperationDate(String operationDate) {
        this.operationDate = operationDate;
    }

    public String getOperationDate() {
        return operationDate;
    }

    public void setOperationTime(String operationTime) {
        this.operationTime = operationTime;
    }

    public String getOperationTime() {
        return operationTime;
    }

    public void setClientNumber(String clientNumber) {
        this.clientNumber = clientNumber;
    }

    public String getClientNumber() {
        return clientNumber;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setTransferDescription(String transferDescription) {
        this.transferDescription = transferDescription;
    }

    public String getTransferDescription() {
        return transferDescription;
    }

    public void setRefundID(String refundID) {
        this.refundID = refundID;
    }

    public String getRefundID() {
        return refundID;
    }

    public void setRefundReason(String refundReason) {
        this.refundReason = refundReason;
    }

    public String getRefundReason() {
        return refundReason;
    }

    public void setCancellationUser(String cancellationUser) {
        this.cancellationUser = cancellationUser;
    }

    public String getCancellationUser() {
        return cancellationUser;
    }

    public void setTrackingCode(String trackingCode) {
        this.trackingCode = trackingCode;
    }

    public String getTrackingCode() {
        return trackingCode;
    }
}
