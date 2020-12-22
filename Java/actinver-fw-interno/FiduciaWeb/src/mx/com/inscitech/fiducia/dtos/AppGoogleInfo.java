package mx.com.inscitech.fiducia.dtos;

public class AppGoogleInfo {
    
    private String appToken;
    
    public AppGoogleInfo() {
        super();
    }

    public AppGoogleInfo(String appToken) {
        this.appToken = appToken;
    }

    public void setAppToken(String appToken) {
        this.appToken = appToken;
    }

    public String getAppToken() {
        return appToken;
    }
}
