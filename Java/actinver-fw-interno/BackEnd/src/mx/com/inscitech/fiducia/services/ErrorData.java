package mx.com.inscitech.fiducia.services;


public class ErrorData {
    
    protected String errorCode = "FW-WS-ERR-000";
    protected String message = "Error al ejecutar la operacion solicitada";
    protected String stackTrace = "";
    
    public ErrorData() {
        super();
    }

    public ErrorData(String errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
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
