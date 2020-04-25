package mx.com.inscitech.fiducia.common.util;

import java.lang.reflect.Method;

import java.util.Date;

import mx.com.inscitech.fiducia.domain.base.DomainHelper;
import mx.com.inscitech.fiducia.common.services.LoggingService;

/**
 * Clase que contiene metodos de utileria para refleccion
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class ReflectionUtils {

    private LoggingService logger = null;

    public ReflectionUtils() {
        super();
        logger = LoggingService.getNewInstance();
    }

    /**
     * Metodo utilizado para asignar los valores de un bean a otro de la misma clase por medio de los metodos "set" y "get"
     * @param destination El objeto al que se le asignaran los nuevos atributos
     * @param source El objeto que contiene los valores a asignar al objeto destino
     */
    public void assignValues(Object source, Object destination) {
        if (destination.getClass().equals(source.getClass())) {

            try {
                Method[] methods = destination.getClass().getMethods();

                for (int i = 0; i < methods.length; i++) {
                    if (methods[i].getName().startsWith("set")) {
                        String getMethodName = "get" + methods[i].getName().substring(3);
                        Method getter = source.getClass().getMethod(getMethodName, null);
                        Object value = getter.invoke(source, null);
                        methods[i].invoke(destination, new Object[] { value });
                    }
                }
            } catch (Exception e) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
            }
        } else {
            //throw exception
        }
    }

    // Compatibilidad con DomainHelper
    public void cloneDomainObjectFromHelper(DomainHelper helper, Object domainObject) { /* Cambios WebSphere */
        //public void cloneDomainObjectFromHelper(Object helper, Object domainObject) {
        try {
            Method[] methods = domainObject.getClass().getMethods();

            for (int i = 0; i < methods.length; i++) {
                if (methods[i].getName().startsWith("set")) {
                    String fieldName = methods[i].getName().substring(3);
                    String getMethodName = "get" + fieldName;
                    Method getter = helper.getClass().getMethod(getMethodName, null);
                    Object value = getter.invoke(helper, null);

                    if (helper.isDateField(fieldName)) {
                        if (value != null && !((String) value).trim().equals(""))
                            methods[i]
                                .invoke(domainObject,
                                        new Object[] { new java.sql.Date(DateTimeUtils.parseDateTimeFromPattern(helper.getDatePattern(), (String) value).getTime()) });
                    } else {
                        methods[i].invoke(domainObject, new Object[] { value });
                    }
                }
            }
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }
    }


    // Compatibilidad con DomainHelper
    public void cloneHelperFromDomainObject(DomainHelper helper, Object domainObject) { /* Cambios WebSphere */
        //public void cloneHelperFromDomainObject(Object helper, Object domainObject) {
        try {
            Method[] methods = helper.getClass().getMethods();

            for (int i = 0; i < methods.length; i++) {
                if (methods[i].getName().startsWith("set")) {
                    try {
                        String fieldName = methods[i].getName().substring(3);
                        String getMethodName = "get" + fieldName;
                        Method getter = domainObject.getClass().getMethod(getMethodName, null);
                        Object value = getter.invoke(domainObject, null);

                        if (helper.isDateField(fieldName)) {
                            if (value != null)
                                methods[i].invoke(helper, new Object[] { DateTimeUtils.formatDateTimeFromPattern(helper.getDatePattern(), (Date) value) });
                        } else {
                            methods[i].invoke(helper, new Object[] { value });
                        }

                    } catch (Exception e) {
                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.INFO, e);
                    }
                }
            }
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }
    }


    public Class getClass(String className) {
        try {
            return Class.forName(className);
        } catch (ClassNotFoundException e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }

        return null;
    }
}
