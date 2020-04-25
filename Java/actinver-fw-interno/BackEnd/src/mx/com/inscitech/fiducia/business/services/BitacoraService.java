package mx.com.inscitech.fiducia.business.services;

import mx.com.inscitech.fiducia.common.services.LoggingService;


/**
 * Servicio que se encarga de registrar en bitacora las operaciones realizadas.
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class BitacoraService {

    /**
     * Sirve para indicar que se realiza una alta.
     */
    public static final String ALTA = "ALTA";

    /**
     * Sirve para indicar que se realiza una baja.
     */
    public static final String BAJA = "BAJA";

    /**
     * Sirve para indicar que se realiza una modificacion.
     */
    public static final String MODIFICACION = "MODIFICACION";

    /**
     * Sirve para indicar que se realiza una consulta.
     */
    public static final String CONSULTA = "CONSULTA";

    /**
     * Sirve para indicar que se realiza una consulta.
     */
    public static final String ERROR = "ERROR";

    /**
     * Instancia que provee el servicio de bitacora por medio del metodo @see getInstance()
     */
    private static BitacoraService _instance;

    /**
     * Instancia del servicio de logging para imprimir los eventos
     */
    private LoggingService logger;

    static {
        _instance = new BitacoraService();
    }

    /**
     * Constructor del Servicio de bitacora. Aqui se instancia el servicio de Logging.
     */
    private BitacoraService() {
        logger = LoggingService.getInstance();
    }

    /**
     * Metodo para obtener la instancia del singleton de bitacora.
     * @return la instancia del servicio de bitacora.
     */
    public static BitacoraService getInstance() {
        return _instance;
    }

    /**
     * Metodo para registrar en la bitacora un evento.
     * @param usuarioId Id del usuario que genera el evento
     * @param usuario Nombre de usuario que genera el evento
     * @param descripcion Descripcion del evento que se genero
     * @param componente Componente que se invoco para generar el evento
     * @param tipoFuncion El tipo de funcion u operacion que realiza el componente y/o evento. Usar BitacoraService.ALTA, BitacoraService.BAJA, BitacoraService.MODIFICACION, BitacoraService.CONUSLTA
     */
    public void registraBitacora(String tipoFuncion, String componente, String descripcion, String usuario, int usuarioId) {

        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, 
                   "tipoFuncion: " + tipoFuncion + 
                   " componente: " + componente + 
                   " descripcion: " + descripcion + 
                   " usuario: " + usuario + 
                   " usuarioId: " + usuarioId);

    }
}
