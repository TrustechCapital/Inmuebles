package mx.com.inscitech.fiducia.web.services.saml;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AuthData {
    
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String exitMessage = "Operation completed successfully!";

    /**
     * Sirve para indicar que el proceso se completo pero el usuario no es valido
     */
    private boolean isValid = false;

    /**
     * Sirve para indicar que el proceso no se completo de manera adecuada
     */
    private boolean succeeded = false;
    
    public AuthData() {
        super();
    }

    public AuthData(String id, String email, String firstName, String lastName, String exitMessage, boolean isValid,
                    boolean succeeded) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.exitMessage = exitMessage;
        this.isValid = isValid;
        this.succeeded = succeeded;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setExitMessage(String exitMessage) {
        this.exitMessage = exitMessage;
    }

    public String getExitMessage() {
        return exitMessage;
    }

    public void setIsValid(boolean isValid) {
        this.isValid = isValid;
    }

    public boolean isIsValid() {
        return isValid;
    }

    public void setSucceeded(boolean succeeded) {
        this.succeeded = succeeded;
    }

    public boolean isSucceeded() {
        return succeeded;
    }
}