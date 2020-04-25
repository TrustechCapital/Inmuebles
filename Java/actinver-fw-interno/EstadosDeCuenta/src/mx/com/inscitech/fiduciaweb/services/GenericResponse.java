package mx.com.inscitech.fiduciaweb.services;


public class GenericResponse {
    
    private boolean succeded = false;
    
    private String exitCode = "FW-EDOCTA-ERR-000";
    private String exitMessage = "Operation Failed!";
    private String errorDetail = "";
    
    public GenericResponse() {
        super();
    }

    public void setSucceded(boolean succeded) {
        this.succeded = succeded;
    }

    public boolean getSucceded() {
        return succeded;
    }

    public void setExitCode(String exitCode) {
        this.exitCode = exitCode;
    }

    public String getExitCode() {
        return exitCode;
    }

    public void setExitMessage(String exitMessage) {
        this.exitMessage = exitMessage;
    }

    public String getExitMessage() {
        return exitMessage;
    }

    public void setErrorDetail(String errorDetail) {
        this.errorDetail = errorDetail;
    }

    public String getErrorDetail() {
        return errorDetail;
    }
}
