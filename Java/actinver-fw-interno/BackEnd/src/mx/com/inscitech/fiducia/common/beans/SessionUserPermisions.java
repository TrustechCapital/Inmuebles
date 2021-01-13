package mx.com.inscitech.fiducia.common.beans;

import java.io.Serializable;


public class SessionUserPermisions implements Serializable {
    @SuppressWarnings("compatibility:-3614577615828034168")
    private static final long serialVersionUID = -5537319460322980261L;

    private String name;
    private Boolean canView;
    private Boolean canEdit;
    
    public SessionUserPermisions() {
        super();
    }

    public SessionUserPermisions(String name, Boolean canView, Boolean canEdit) {
        this.name = name;
        this.canView = canView;
        this.canEdit = canEdit;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setCanView(Boolean canView) {
        this.canView = canView;
    }

    public Boolean getCanView() {
        return canView;
    }

    public void setCanEdit(Boolean canEdit) {
        this.canEdit = canEdit;
    }

    public Boolean getCanEdit() {
        return canEdit;
    }
}