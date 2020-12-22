package mx.com.inscitech.fiducia.dtos;

import java.io.Serializable;

import java.util.Map;

public class FiduciaWebErrorBean implements Serializable {
    
    @SuppressWarnings("compatibility:3411097367191451419")
    private static final long serialVersionUID = -1055199937601575026L;

    private String errorCode;
    private String errorMessage;
    private Object errorDeatils;
    private Map<String, Object> metaData;
    private FiduciaWebErrorBean details;
    
    public FiduciaWebErrorBean() {
        super();
    }

    public FiduciaWebErrorBean(String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public FiduciaWebErrorBean(String errorCode, String errorMessage, Object errorDeatils) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.errorDeatils = errorDeatils;
    }

    public FiduciaWebErrorBean(String errorCode, String errorMessage, Map<String, Object> metaData) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.metaData = metaData;
    }

    public FiduciaWebErrorBean(String errorCode, String errorMessage, Object errorDeatils, Map<String, Object> metaData) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.errorDeatils = errorDeatils;
        this.metaData = metaData;
    }

    public FiduciaWebErrorBean(String errorCode, String errorMessage, Object errorDeatils, Map<String, Object> metaData,
                               FiduciaWebErrorBean details) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.errorDeatils = errorDeatils;
        this.metaData = metaData;
        this.details = details;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorDeatils(Object errorDeatils) {
        this.errorDeatils = errorDeatils;
    }

    public Object getErrorDeatils() {
        return errorDeatils;
    }

    public void setMetaData(Map<String, Object> metaData) {
        this.metaData = metaData;
    }

    public Map<String, Object> getMetaData() {
        return metaData;
    }

    public void setDetails(FiduciaWebErrorBean details) {
        this.details = details;
    }

    public FiduciaWebErrorBean getDetails() {
        return details;
    }
}
