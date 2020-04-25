package mx.com.inscitech.fiducia.web.services.spei;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "response" })
@XmlRootElement(name = "executeResponse")
public class SPEIConfirmationResponse {
    
    @XmlElement(name = "Ws_egresossdt", required = true)
    private SDTResponse response = null;
    
    public SPEIConfirmationResponse() {
        super();
    }

    public void setResponse(SDTResponse response) {
        this.response = response;
    }

    public SDTResponse getResponse() {
        return response;
    }
}
