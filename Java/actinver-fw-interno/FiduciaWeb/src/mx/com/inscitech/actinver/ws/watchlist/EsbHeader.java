
package mx.com.inscitech.actinver.ws.watchlist;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for esbHeader complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="esbHeader"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="IPAddress" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="clientID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="language" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="operationName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="operationVersion" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="systemID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="useDateTime" type="{http://www.w3.org/2001/XMLSchema}boolean"/&gt;
 *         &lt;element name="userName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "esbHeader", propOrder = { "ipAddress", "clientID", "language", "operationName", "operationVersion", "systemID", "useDateTime", "userName" })
public class EsbHeader {

    @XmlElement(name = "IPAddress")
    protected String ipAddress;
    protected String clientID;
    protected String language;
    protected String operationName;
    protected String operationVersion;
    protected String systemID;
    protected boolean useDateTime;
    protected String userName;

    /**
     * Gets the value of the ipAddress property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getIPAddress() {
        return ipAddress;
    }

    /**
     * Sets the value of the ipAddress property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setIPAddress(String value) {
        this.ipAddress = value;
    }

    /**
     * Gets the value of the clientID property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getClientID() {
        return clientID;
    }

    /**
     * Sets the value of the clientID property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setClientID(String value) {
        this.clientID = value;
    }

    /**
     * Gets the value of the language property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getLanguage() {
        return language;
    }

    /**
     * Sets the value of the language property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setLanguage(String value) {
        this.language = value;
    }

    /**
     * Gets the value of the operationName property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getOperationName() {
        return operationName;
    }

    /**
     * Sets the value of the operationName property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setOperationName(String value) {
        this.operationName = value;
    }

    /**
     * Gets the value of the operationVersion property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getOperationVersion() {
        return operationVersion;
    }

    /**
     * Sets the value of the operationVersion property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setOperationVersion(String value) {
        this.operationVersion = value;
    }

    /**
     * Gets the value of the systemID property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getSystemID() {
        return systemID;
    }

    /**
     * Sets the value of the systemID property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setSystemID(String value) {
        this.systemID = value;
    }

    /**
     * Gets the value of the useDateTime property.
     *
     */
    public boolean isUseDateTime() {
        return useDateTime;
    }

    /**
     * Sets the value of the useDateTime property.
     *
     */
    public void setUseDateTime(boolean value) {
        this.useDateTime = value;
    }

    /**
     * Gets the value of the userName property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getUserName() {
        return userName;
    }

    /**
     * Sets the value of the userName property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setUserName(String value) {
        this.userName = value;
    }

}
