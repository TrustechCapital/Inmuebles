
package mx.com.inscitech.actinver.ws.watchlist;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for serviceResponse complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="serviceResponse"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="matches" type="{http://watchlist.ws.actinver.inscitech.com.mx/}wlMatch" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element name="serviceData" type="{http://watchlist.ws.actinver.inscitech.com.mx/}genericServiceResponse" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "serviceResponse", propOrder = { "matches", "serviceData" })
public class ServiceResponse {

    @XmlElement(nillable = true)
    protected List<WlMatch> matches;
    protected GenericServiceResponse serviceData;

    /**
     * Gets the value of the matches property.
     *
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the matches property.
     *
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getMatches().add(newItem);
     * </pre>
     *
     *
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link WlMatch }
     *
     *
     */
    public List<WlMatch> getMatches() {
        if (matches == null) {
            matches = new ArrayList<WlMatch>();
        }
        return this.matches;
    }

    /**
     * Gets the value of the serviceData property.
     *
     * @return
     *     possible object is
     *     {@link GenericServiceResponse }
     *
     */
    public GenericServiceResponse getServiceData() {
        return serviceData;
    }

    /**
     * Sets the value of the serviceData property.
     *
     * @param value
     *     allowed object is
     *     {@link GenericServiceResponse }
     *
     */
    public void setServiceData(GenericServiceResponse value) {
        this.serviceData = value;
    }

}
