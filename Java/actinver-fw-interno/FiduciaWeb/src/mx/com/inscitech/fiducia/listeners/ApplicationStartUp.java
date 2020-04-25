package mx.com.inscitech.fiducia.listeners;

import java.io.File;

import java.util.Locale;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import mx.com.inscitech.fiducia.common.ConfigurationException;
import mx.com.inscitech.fiducia.common.services.ConfigurationService;
import mx.com.inscitech.fiducia.common.services.LoggingService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.core.config.ConfigurationFactory;

/**
 * Clase en la que se inicializan las variables y se configura el entorno para el funcionamiento
 * de la aplciacion
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class ApplicationStartUp implements ServletContextListener {

    private LoggingService logger = null;
    
    public static final String CURRENT_VERSION = "v1.0.0";

    private ServletContext context = null;

    static {
        ConfigurationFactory.resetConfigurationFactory();
    }

    public void contextInitialized(ServletContextEvent event) {
        context = event.getServletContext();

        try {
            
            String logFileContainer = context.getRealPath("/logs");
            if(logFileContainer.indexOf("/") != -1) {
                logFileContainer += "/";
            } else {
                logFileContainer += "\\";
            }
            
            logFileContainer += "FiduciaWeb.log";
            System.out.println("logFileContainer: " + logFileContainer);
            
            System.setProperty("FiduciaWebLogFile", logFileContainer);
                
            Logger logger4j = LogManager.getLogger("mx.com.inscitech");
            
            org.apache.logging.log4j.core.Logger coreLogger = (org.apache.logging.log4j.core.Logger)logger4j;
            org.apache.logging.log4j.core.LoggerContext context = coreLogger.getContext();
            
            context.reconfigure();
            
        } catch(Exception e) {
            e.printStackTrace();
        }

        logger = LoggingService.getNewInstance();
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.INFO, "Starting up Fiduciario Web Application .... " + CURRENT_VERSION);

        Locale.setDefault(new Locale("ES", "MX"));
        ConfigurationService config = ConfigurationService.getInstance();

        try {

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.INFO, "Loading Configuration File from: " + context.getRealPath("/WEB-INF/config/fiduciario_config.xml"));
            config.loadConfiguration(new File(context.getRealPath("/WEB-INF/config/fiduciario_config.xml")));

        } catch (ConfigurationException e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }

        // Propiedad que permite establecer el factory de transformacion utilizado por FOP
        //System.setProperty("javax.xml.transform.TransformerFactory", config.getProperty("fopTransformerFactory"));
        //logger.log(this, Thread.currentThread(), INFO, "javax.xml.transform.TransformerFactory set to: " + config.getProperty("fopTransformerFactory"));

        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.INFO, "config.getProperty(\"LoadToplinkSessions\"): " + config.getProperty("LoadToplinkSessions"));
        boolean loadToplinkSessions = new Boolean((config.getProperty("LoadToplinkSessions") == null ? "true" : config.getProperty("LoadToplinkSessions"))).booleanValue();
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.INFO, "loadToplinkSessions: " + loadToplinkSessions);

        if (loadToplinkSessions) {

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.INFO, "Toplink sessions File: " + config.getProperty("toplinkSessionsFile"));

            ClassLoader classLoader = null;

            try {

                classLoader = Thread.currentThread().getContextClassLoader(); //this.getClass().getClassLoader();

            } catch (Exception e) {
                e.printStackTrace();
            }

            try {

                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.INFO, "property: " + config.getProperty("toplinkSessionName"));
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.INFO, "classloader: " + classLoader);
                
            } catch (Exception e) {

                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.INFO, "----> " + config.getProperty("toplinkSessionName"));
                e.printStackTrace();

            }

        } else {
            config.setProperty("LoadToplinkSessions", "true");
        }

        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.INFO, "Fiduciario Web Application Started up!");
    }

    public void contextDestroyed(ServletContextEvent event) {
        context = event.getServletContext();
    }
}
