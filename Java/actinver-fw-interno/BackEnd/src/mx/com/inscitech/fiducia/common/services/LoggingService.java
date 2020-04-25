package mx.com.inscitech.fiducia.common.services;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Singleton used by the application lo log the messages
 * an exceptions thrown by the application based on the Log4J
 * configuration specified by the log4j.properties file.
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class LoggingService {

    public static enum LEVEL {
        DEBUG(Level.DEBUG),
        ERROR(Level.ERROR),
        FATAL(Level.FATAL),
        INFO(Level.INFO),
        WARN(Level.WARN);
        
        private final Level theLevel;

        private LEVEL(Level level) {
            theLevel = level;
        }
    }
    
    /**
     * Variable that contains the instance of the service.
     */
    private static LoggingService _instance = null;

    private static Boolean useSystemOut = false;

    /**
     * Variable used to log the application messages
     */
    private Logger logger = null;

    /**
     * Static block that creates the instance of the Logging Service
     */
    static {
        _instance = new LoggingService();
    }

    /**
     * Constructor of the Logging Servie
     */
    private LoggingService() {
        ConfigurationService config = null;
        try {
            config = ConfigurationService.getInstance();
            if (config == null || config.getProperty("LogSystemOut") == null) {
                useSystemOut = true;
            } else {
                useSystemOut = "enabled".equals(config.getProperty("LogSystemOut"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        ;

        config = null;
    }

    /**
     * Static method used to get an instance of the Logging Service
     * @return The instance of the Logging Service
     */
    public static LoggingService getInstance() {
        return _instance;
    }

    public static LoggingService getNewInstance() {
        return new LoggingService();
    }

    public void log(Class clazz, Thread thread, LEVEL level, String message) {
        log(clazz, thread, level, message, null);
    }

    public void log(Class clazz, Thread thread, LEVEL level, Throwable e) {
        log(clazz, thread, level, null, e);
    }

    /**
     * Method used to log an exception
     * @param message A String containing the message to be logged.
     * @param level A java.util.logging.Level object used to identify the priority of the message.
     * @param thread A java.lang.Thread object used to identify the thread that owns the message.
     * @param obj The object that throws the exception.
     */
    public void log(Object obj, Thread thread, LEVEL level, String message) {
        log(obj, thread, level, message, null);
    }

    /**
     * Method used to log an exception
     * @param e The exception that will be logged.
     * @param level A java.util.logging.Level object used to identify the priority of the message.
     * @param thread A java.lang.Thread object used to identify the thread that owns the message.
     * @param obj The object that throws the exception.
     */
    public void log(Object obj, Thread thread, LEVEL level, Throwable e) {
        log(obj, thread, level, null, e);
    }

    /**
     * Method used to log an exception
     * @param e The exception that will be logged.
     * @param message A String containing the message to be logged.
     * @param level A java.util.logging.Level object used to identify the priority of the message.
     * @param thread A java.lang.Thread object used to identify the thread that owns the message.
     * @param obj The object that throws the exception.
     */
    public void log(Object obj, Thread thread, LEVEL level, String message, Throwable e) {
        log(obj.getClass(), thread, level, message, e);
    }

    public void log(Class clazz, Thread thread, LEVEL level, String message, Throwable e) {
        //Logger logger = LogManager.getLogger(clazz);
        Logger logger = LogManager.getLogger(LoggingService.class);

        if (useSystemOut) {
            System.out.println("\n<\nClass: " + clazz.getName() + "\n" + "Thread: " + thread.getName() + "\n" + "Level: " + level + "\n" +
                               (message != null ? "Message:" + message + "\n" : "") + (e != null ? "Exception: " + e + "\n" : "") + ">");
        }

        if (e != null) {
            e.printStackTrace();
            logger.log(level.theLevel, clazz.getName() + " [" + thread.getId() + (message != null ? "] Message: " + message + "\n" : ""), e);
        } else {
            logger.log(level.theLevel, (message != null ? clazz.getName() + " Message: [" + message + "]" : ""));
        }
    }

    public void log(Class clazz, String message) {
        //logger = LogManager.getLogger(clazz);
        logger = LogManager.getLogger(LoggingService.class);
        logger.debug(clazz.getName() + " [" + message + "]");
    }

    public void log(Class clazz, Thread t, String message) {
        //logger = LogManager.getLogger(clazz);
        logger = LogManager.getLogger(LoggingService.class);
        logger.debug(" Thread[" + t.getName() + "] " + clazz.getName() + " [" + message + "]");
    }
}
