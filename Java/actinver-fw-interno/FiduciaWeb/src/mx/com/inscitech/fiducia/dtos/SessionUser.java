package mx.com.inscitech.fiducia.dtos;


public class SessionUser {
    
    private String username;
    private String name;
    
    public SessionUser() {
        super();
    }

    public SessionUser(String username, String name) {
        this.username = username;
        this.name = name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
