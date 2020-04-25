
package mx.com.inscitech.actinver.ws.watchlist;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for serviceConfig complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="serviceConfig"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="headerData" type="{http://watchlist.ws.actinver.inscitech.com.mx/}esbHeader" minOccurs="0"/&gt;
 *         &lt;element name="namespaceLocalPart" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="namespaceURI" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="serviceURL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="useCommonHeader" type="{http://www.w3.org/2001/XMLSchema}boolean"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "serviceConfig", propOrder = { "headerData", "namespaceLocalPart", "namespaceURI", "serviceURL", "useCommonHeader" })
public class ServiceConfig {

    protected EsbHeader headerData;
    protected String namespaceLocalPart;
    protected String namespaceURI;
    protected String serviceURL;
    protected boolean useCommonHeader;

    /**
     * Gets the value of the headerData property.
     *
     * @return
     *     possible object is
     *     {@link EsbHeader }
     *
     */
    public EsbHeader getHeaderData() {
        return headerData;
    }

    /**
     * Sets the value of the headerData property.
     *
     * @param value
     *     allowed object is
     *     {@link EsbHeader }
     *
     */
    public void setHeaderData(EsbHeader value) {
        this.headerData = value;
    }

    /**
     * Gets the value of the namespaceLocalPart property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getNamespaceLocalPart() {
        return namespaceLocalPart;
    }

    /**
     * Sets the value of the namespaceLocalPart property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setNamespaceLocalPart(String value) {
        this.namespaceLocalPart = value;
    }

    /**
     * Gets the value of the namespaceURI property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getNamespaceURI() {
        return namespaceURI;
    }

    /**
     * Sets the value of the namespaceURI property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setNamespaceURI(String value) {
        this.namespaceURI = value;
    }

    /**
     * Gets the value of the serviceURL property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getServiceURL() {
        return serviceURL;
    }

    /**
     * Sets the value of the serviceURL property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setServiceURL(String value) {
        this.serviceURL = value;
    }

    /**
     * Gets the value of the useCommonHeader property.
     *
     */
    public boolean isUseCommonHeader() {
        return useCommonHeader;
    }

    /**
     * Sets the value of the useCommonHeader property.
     *
     */
    public void setUseCommonHeader(boolean value) {
        this.useCommonHeader = value;
    }

}
