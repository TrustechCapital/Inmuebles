package mx.com.inscitech.actinver.ws.contract.test;


public class ServiceTestResponse {
    
    private String exitCode = null;
    private String message = "";
    private String errorDetail = "";
    private String log = "";
    
    public ServiceTestResponse() {
        super();
    }

    public void setExitCode(String exitCode) {
        this.exitCode = exitCode;
    }

    public String getExitCode() {
        return exitCode;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setErrorDetail(String errorDetail) {
        this.errorDetail = errorDetail;
    }

    public String getErrorDetail() {
        return errorDetail;
    }

    public void setLog(String log) {
        this.log = log;
    }

    public String getLog() {
        return log;
    }
}
