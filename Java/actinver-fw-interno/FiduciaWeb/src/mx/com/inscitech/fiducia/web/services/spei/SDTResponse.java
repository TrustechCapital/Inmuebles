package mx.com.inscitech.fiducia.web.services.spei;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ws_egresosSDT", namespace="FiduciaWebWS", propOrder = { "estatusConfirmacion", "responseSystemCode", "responseMessage", "responseType", "responseCategory" })
public class SDTResponse {

    @XmlElement(name = "Estatus_Confirmacion")
    private boolean estatusConfirmacion = false;
    
    @XmlElement(name = "ResponseSystemCode", required = true)
    private String responseSystemCode = "";
    
    @XmlElement(name = "ResponseMessage", required = true)
    private String responseMessage = "";
    
    @XmlElement(name = "ResponseType", required = true)
    private String responseType = "";
    
    @XmlElement(name = "ResponseCategory", required = true)
    private String responseCategory = "";
        
    public SDTResponse() {
        super();
    }

    public void setEstatusConfirmacion(boolean estatusConfirmacion) {
        this.estatusConfirmacion = estatusConfirmacion;
    }

    public boolean getEstatusConfirmacion() {
        return estatusConfirmacion;
    }

    public void setResponseSystemCode(String responseSystemCode) {
        this.responseSystemCode = responseSystemCode;
    }

    public String getResponseSystemCode() {
        return responseSystemCode;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseType(String responseType) {
        this.responseType = responseType;
    }

    public String getResponseType() {
        return responseType;
    }

    public void setResponseCategory(String responseCategory) {
        this.responseCategory = responseCategory;
    }

    public String getResponseCategory() {
        return responseCategory;
    }
}
