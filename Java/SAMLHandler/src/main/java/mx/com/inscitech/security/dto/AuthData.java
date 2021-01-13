package mx.com.inscitech.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
