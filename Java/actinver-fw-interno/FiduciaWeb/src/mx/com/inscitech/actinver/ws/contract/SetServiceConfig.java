
package mx.com.inscitech.actinver.ws.contract;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for setServiceConfig complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="setServiceConfig"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ServiceConfig" type="{http://contract.ws.actinver.inscitech.com.mx/}serviceConfig" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "setServiceConfig", propOrder = { "serviceConfig" })
public class SetServiceConfig {

    @XmlElement(name = "ServiceConfig")
    protected ServiceConfig serviceConfig;

    /**
     * Gets the value of the serviceConfig property.
     *
     * @return
     *     possible object is
     *     {@link ServiceConfig }
     *
     */
    public ServiceConfig getServiceConfig() {
        return serviceConfig;
    }

    /**
     * Sets the value of the serviceConfig property.
     *
     * @param value
     *     allowed object is
     *     {@link ServiceConfig }
     *
     */
    public void setServiceConfig(ServiceConfig value) {
        this.serviceConfig = value;
    }

}
