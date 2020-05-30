package mx.com.inscitech.fiducia.common;


public class ParameterInfo {
    
    String id;
    Class<?> type;
    
    public ParameterInfo() {
        super();
    }

    public ParameterInfo(String id, Class<?> type) {
        this.id = id;
        this.type = type;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setType(Class<?> type) {
        this.type = type;
    }

    public Class<?> getType() {
        return type;
    }
}
