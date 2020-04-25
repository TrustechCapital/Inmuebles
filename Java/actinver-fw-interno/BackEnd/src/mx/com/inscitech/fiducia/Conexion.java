package mx.com.inscitech.fiducia;

import java.sql.Connection;
import java.sql.SQLException;

import mx.com.inscitech.fiducia.common.services.ConfigurationService;
import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.util.ServiceLocator;

public class Conexion {

    private LoggingService logger = null;

    private Connection con;

    public Conexion() {
        super();
        logger = LoggingService.getNewInstance();
    }

    public Connection conectarBD() throws SQLException, ClassNotFoundException {

        try {
            con = ServiceLocator.getInstance()
                                .getDatasource(ConfigurationService.getInstance().getProperty("systemDataSource"))
                                .getConnection();
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }

        return con;
    }
}
