package mx.com.inscitech.fiduciaweb.services;


public class ErrorData {
    
    private String errorCode = "FW-WLS-ERROR-000";
    private String message = "";
    private String stackTrace = "";
    
    public ErrorData() {
        super();
    }

    public ErrorData(String errorCode, String message, String stackTrace) {
        this.errorCode = errorCode;
        this.message = message;
        this.stackTrace = stackTrace;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setStackTrace(String stackTrace) {
        this.stackTrace = stackTrace;
    }

    public String getStackTrace() {
        return stackTrace;
    }
}
