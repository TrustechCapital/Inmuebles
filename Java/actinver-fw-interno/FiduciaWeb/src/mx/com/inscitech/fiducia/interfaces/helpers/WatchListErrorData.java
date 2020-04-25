package mx.com.inscitech.fiducia.interfaces.helpers;


public class WatchListErrorData {
    
    private String errorCode;
    private String message;
    private String stackTrace;
    
    public WatchListErrorData() {
        super();
    }

    public WatchListErrorData(String errorCode, String message, String stackTrace) {
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
