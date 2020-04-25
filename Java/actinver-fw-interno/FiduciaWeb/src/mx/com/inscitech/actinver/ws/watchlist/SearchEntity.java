
package mx.com.inscitech.actinver.ws.watchlist;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for searchEntity complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="searchEntity"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="entityData" type="{http://watchlist.ws.actinver.inscitech.com.mx/}serviceRequest" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "searchEntity", propOrder = { "entityData" })
public class SearchEntity {

    protected ServiceRequest entityData;

    /**
     * Gets the value of the entityData property.
     *
     * @return
     *     possible object is
     *     {@link ServiceRequest }
     *
     */
    public ServiceRequest getEntityData() {
        return entityData;
    }

    /**
     * Sets the value of the entityData property.
     *
     * @param value
     *     allowed object is
     *     {@link ServiceRequest }
     *
     */
    public void setEntityData(ServiceRequest value) {
        this.entityData = value;
    }

}
