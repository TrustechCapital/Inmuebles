package mx.com.inscitech.actinver.ws.spei;


public class ServiceRequest {    

    private boolean excludeValidationFlag = false;
    private boolean notificationFlag = false;

    private String method = "";
    private String comments = "";
    private String scheduledDateTime = "01/01/2019";
    
    private String SPEIType = "1";
    private String mandatorAccountNumber = "";
    private String mandatorName = "";
    private String bankID = "";
    private String recipientName = "";
    private String accountTypeID = "";
    private String accountNumber = "";
    private String amount = "";
    private String ISOCurrency = "MXN";
    private String VAT = "0";
    private String SPEIReference = "";
    private String paymentConcept = "";
    private String operationType = "10";
    private String settlementInstructionID = "";
    private String movementType = "";
    private String feeExemptionIndicator = "";
    
    public ServiceRequest() {
        super();
    }

    public void setExcludeValidationFlag(boolean excludeValidationFlag) {
        this.excludeValidationFlag = excludeValidationFlag;
    }

    public boolean isExcludeValidationFlag() {
        return excludeValidationFlag;
    }

    public void setNotificationFlag(boolean notificationFlag) {
        this.notificationFlag = notificationFlag;
    }

    public boolean isNotificationFlag() {
        return notificationFlag;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getMethod() {
        return method;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getComments() {
        return comments;
    }

    public void setScheduledDateTime(String scheduledDateTime) {
        this.scheduledDateTime = scheduledDateTime;
    }

    public String getScheduledDateTime() {
        return scheduledDateTime;
    }

    public void setSPEIType(String SPEIType) {
        this.SPEIType = SPEIType;
    }

    public String getSPEIType() {
        return SPEIType;
    }

    public void setMandatorAccountNumber(String mandatorAccountNumber) {
        this.mandatorAccountNumber = mandatorAccountNumber;
    }

    public String getMandatorAccountNumber() {
        return mandatorAccountNumber;
    }

    public void setMandatorName(String mandatorName) {
        this.mandatorName = mandatorName;
    }

    public String getMandatorName() {
        return mandatorName;
    }

    public void setBankID(String bankID) {
        this.bankID = bankID;
    }

    public String getBankID() {
        return bankID;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setAccountTypeID(String accountTypeID) {
        this.accountTypeID = accountTypeID;
    }

    public String getAccountTypeID() {
        return accountTypeID;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getAmount() {
        return amount;
    }

    public void setISOCurrency(String ISOCurrency) {
        this.ISOCurrency = ISOCurrency;
    }

    public String getISOCurrency() {
        return ISOCurrency;
    }

    public void setVAT(String VAT) {
        this.VAT = VAT;
    }

    public String getVAT() {
        return VAT;
    }

    public void setSPEIReference(String SPEIReference) {
        this.SPEIReference = SPEIReference;
    }

    public String getSPEIReference() {
        return SPEIReference;
    }

    public void setPaymentConcept(String paymentConcept) {
        this.paymentConcept = paymentConcept;
    }

    public String getPaymentConcept() {
        return paymentConcept;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setSettlementInstructionID(String settlementInstructionID) {
        this.settlementInstructionID = settlementInstructionID;
    }

    public String getSettlementInstructionID() {
        return settlementInstructionID;
    }

    public void setMovementType(String movementType) {
        this.movementType = movementType;
    }

    public String getMovementType() {
        return movementType;
    }

    public void setFeeExemptionIndicator(String feeExemptionIndicator) {
        this.feeExemptionIndicator = feeExemptionIndicator;
    }

    public String getFeeExemptionIndicator() {
        return feeExemptionIndicator;
    }
}
