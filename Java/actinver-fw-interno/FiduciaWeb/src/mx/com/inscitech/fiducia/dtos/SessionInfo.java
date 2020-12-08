package mx.com.inscitech.fiducia.dtos;

import java.util.List;

public class SessionInfo {
    
    private SessionUser user;
    private String systemDate;
    private List<SessionUserPermisions> permissions;
    
    public SessionInfo() {
        super();
    }

    public SessionInfo(SessionUser user, String systemDate, List<SessionUserPermisions> permissions) {
        this.user = user;
        this.systemDate = systemDate;
        this.permissions = permissions;
    }

    public void setUser(SessionUser user) {
        this.user = user;
    }

    public SessionUser getUser() {
        return user;
    }

    public void setSystemDate(String systemDate) {
        this.systemDate = systemDate;
    }

    public String getSystemDate() {
        return systemDate;
    }

    public void setPermissions(List<SessionUserPermisions> permissions) {
        this.permissions = permissions;
    }

    public List<SessionUserPermisions> getPermissions() {
        return permissions;
    }
}
