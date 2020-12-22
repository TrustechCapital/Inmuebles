package mx.com.inscitech.fiducia;

import mx.com.inscitech.fiducia.business.services.BitacoraService;


/**
 * Excepcion que es arrojada cuando se consulta un usuario y no es encontrado en la tabla de usuarios del sistema.
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class InvalidUserException extends Exception {
    @SuppressWarnings("compatibility:406914457360355617")
    private static final long serialVersionUID = 1L;

    public InvalidUserException(String usuario) {
    super();
    BitacoraService.getInstance().registraBitacora(BitacoraService.ERROR, "login.jsp", "Intento de Acceso Fallido para el usuario", usuario, 0);
  }
}