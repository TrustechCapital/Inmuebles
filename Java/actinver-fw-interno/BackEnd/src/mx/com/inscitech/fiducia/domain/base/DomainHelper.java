package mx.com.inscitech.fiducia.domain.base;

/**
 * Clase para identificar clases de dominio que tienen campos de tipo fecha.
 * La justificacion de esta fecha, es que en general, las implementaciones de JSON tienen problemas
 * con los campos que son de tipo fecha.
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public abstract class DomainHelper {

    /**
     * Variable que debera de contener los nombres de los campos que deben ser convertidos a fecha
     */
    protected String dateFields;

    /**
     * Clase del Objeto de domino a con la cual se hara la clonacion.
     * Se debera de hacer el set de esta propiedad en el constructor de la clase.
     */
    protected Class helperClass;

    /**
     * Patron del formato de fecha a cambiar.
     */
    protected String datePattern;

    public boolean isDateField(String fieldName) {
        return (dateFields.toUpperCase().indexOf(fieldName.toUpperCase()) != -1);
    }


    public void setDateFields(String dateFields) {
        this.dateFields = dateFields;
    }


    public String getDateFields() {
        return dateFields;
    }


    public void setHelperClass(Class helperClass) {
        this.helperClass = helperClass;
    }


    public Class getHelperClass() {
        return helperClass;
    }


    public void setDatePattern(String datePattern) {
        this.datePattern = datePattern;
    }


    public String getDatePattern() {
        return datePattern;
    }

}
