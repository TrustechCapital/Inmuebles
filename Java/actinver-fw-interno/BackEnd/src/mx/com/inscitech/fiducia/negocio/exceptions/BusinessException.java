package mx.com.inscitech.fiducia.negocio.exceptions;

public class BusinessException extends Exception {
    @SuppressWarnings("compatibility:-980750484585655228")
    private static final long serialVersionUID = -7061574719120350786L;

    private String errorMessage;

    public BusinessException(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
