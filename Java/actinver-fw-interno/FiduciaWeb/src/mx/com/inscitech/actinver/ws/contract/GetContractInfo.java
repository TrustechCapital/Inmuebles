
package mx.com.inscitech.actinver.ws.contract;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for getContractInfo complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="getContractInfo"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="contractInfo" type="{http://contract.ws.actinver.inscitech.com.mx/}serviceRequest" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "getContractInfo", propOrder = { "contractInfo" })
public class GetContractInfo {

    protected ServiceRequest contractInfo;

    /**
     * Gets the value of the contractInfo property.
     *
     * @return
     *     possible object is
     *     {@link ServiceRequest }
     *
     */
    public ServiceRequest getContractInfo() {
        return contractInfo;
    }

    /**
     * Sets the value of the contractInfo property.
     *
     * @param value
     *     allowed object is
     *     {@link ServiceRequest }
     *
     */
    public void setContractInfo(ServiceRequest value) {
        this.contractInfo = value;
    }

}
