package mx.com.inscitech.fiducia.interfaces;


public class PriceVectorServices {
    
    /*private LoggingService logger = LoggingService.getInstance();
    
    private static PriceVectorConfigBean serviceConfig = null;
    
    private GenericServiceResponse serviceResponse = null;*/
    
    public PriceVectorServices() {
        super();
    }

    /*public boolean queryVectorPrecios(String name, String lastName, String secondLastName, String tin, String curp, String clientTypeID) {
        boolean operacionOK = false;
        logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "queryVectorPrecios");

        try {
            
            GregorianCalendar gc = new GregorianCalendar();
            gc.setTime(DateTimeUtils.parseDateTimeFromPattern("dd/MM/yyyy", ""));
            XMLGregorianCalendar sendingDate = DatatypeFactory.newInstance().newXMLGregorianCalendar(gc);

        } catch (Exception e) {

            logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error al validar en listas negras", e);

        }


        return operacionOK;
    }
    
    public static void setServiceConfig(PriceVectorConfigBean serviceConfig) {
        PriceVectorServices.serviceConfig = serviceConfig;
    }

    public static PriceVectorConfigBean getServiceConfig() {
        return serviceConfig;
    }

    public void setServiceResponse(GenericServiceResponse serviceResponse) {
        this.serviceResponse = serviceResponse;
    }

    public GenericServiceResponse getServiceResponse() {
        return serviceResponse;
    }*/
}
