package mx.com.inscitech.fiduciaweb.services;


public class GenericMessage {
    
    private String category = null;
    private String type = null;
    private String systemCode = null;
    private String message = null;
    
    public GenericMessage() {
        super();
    }

    public GenericMessage(String category, String type, String systemCode, String message) {
        this.category = category;
        this.type = type;
        this.systemCode = systemCode;
        this.message = message;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setSystemCode(String systemCode) {
        this.systemCode = systemCode;
    }

    public String getSystemCode() {
        return systemCode;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
