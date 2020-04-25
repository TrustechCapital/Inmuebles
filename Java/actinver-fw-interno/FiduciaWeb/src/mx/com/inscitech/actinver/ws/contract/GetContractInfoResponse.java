
package mx.com.inscitech.actinver.ws.contract;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for getContractInfoResponse complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="getContractInfoResponse"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="return" type="{http://contract.ws.actinver.inscitech.com.mx/}serviceResponse" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getContractInfoResponse", propOrder = { "_return" })
public class GetContractInfoResponse {

    @XmlElement(name = "return")
    protected ServiceResponse _return;

    /**
     * Gets the value of the return property.
     *
     * @return
     *     possible object is
     *     {@link ServiceResponse }
     *
     */
    public ServiceResponse getReturn() {
        return _return;
    }

    /**
     * Sets the value of the return property.
     *
     * @param value
     *     allowed object is
     *     {@link ServiceResponse }
     *
     */
    public void setReturn(ServiceResponse value) {
        this._return = value;
    }

}
