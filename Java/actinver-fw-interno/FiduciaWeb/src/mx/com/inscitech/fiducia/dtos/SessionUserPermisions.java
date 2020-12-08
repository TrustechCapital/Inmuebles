package mx.com.inscitech.fiducia.dtos;


public class SessionUserPermisions {
    
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
