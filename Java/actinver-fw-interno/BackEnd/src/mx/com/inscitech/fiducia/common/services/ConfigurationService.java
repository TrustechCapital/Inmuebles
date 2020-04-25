package mx.com.inscitech.fiducia.common.services;

import java.io.File;

import java.util.HashMap;
import java.util.Iterator;

import mx.com.inscitech.fiducia.common.ConfigurationException;

import org.apache.commons.configuration.SubnodeConfiguration;
import org.apache.commons.configuration.XMLConfiguration;

/**
 * Clase que para procesar y almacenar la configuracion del sistema
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class ConfigurationService {

    private LoggingService logger = LoggingService.getNewInstance();

    private static ConfigurationService instance;

    private HashMap properties;

    private HashMap messages;

    private File configFile;

    private long lastModified;

    static {
        instance = new ConfigurationService();
    }

    private ConfigurationService() {
        super();
        properties = new HashMap();
        messages = new HashMap();
    }

    public static ConfigurationService getInstance() {
        return instance;
    }

    public void loadConfiguration(File configFile) throws ConfigurationException {
        this.configFile = configFile;
        this.lastModified = configFile.lastModified();

        XMLConfiguration config = null;

        try {
            config = new XMLConfiguration(configFile);

            Iterator itProperties = config.configurationsAt("properties.property").iterator();

            while (itProperties.hasNext()) {
                SubnodeConfiguration property = (SubnodeConfiguration) itProperties.next();

                //this.logger.info("Configuration property " + property.getRootNode().getAttribute(0).getValue() + ": " + property.getString(""));

                properties.put(property.getRootNode()
                                       .getAttribute(0)
                                       .getValue(), property.getString(""));
            }

        } catch (Exception e) {
            throw new ConfigurationException(e);
        }
    }

    private void verificaCambios() {
        if (configFile == null)
            return;
        if (lastModified != configFile.lastModified()) {
            try {
                loadConfiguration(this.configFile);
            } catch (ConfigurationException e) {
                //logger.fatal(this, e);
            }
        }
    }

    public String getProperty(String key) {
        verificaCambios();
        return (String) properties.get(key);
    }

    public void setProperty(String key, String value) {
        XMLConfiguration config = null;

        try {
            config = new XMLConfiguration(configFile);

            Iterator itProperties = config.configurationsAt("properties.property").iterator();

            while (itProperties.hasNext()) {
                SubnodeConfiguration property = (SubnodeConfiguration) itProperties.next();
                if (!property.getRootNode()
                             .getAttribute(0)
                             .getValue()
                             .equals(key))
                    continue;

                //this.logger.info("Set Configuration property \"" + key + "\"  from: " + property.getString("") + " to: " + value);

                property.getRootNode().setValue(value);

                properties.put(key, value);
            }

            config.save();

        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }
    }
}
