
package mx.com.inscitech.actinver.ws.contract;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
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
 *         &lt;element name="clientNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="nativeErrorCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="result" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *         &lt;element name="serviceData" type="{http://contract.ws.actinver.inscitech.com.mx/}genericServiceResponse" minOccurs="0"/&gt;
 *         &lt;element name="transactionID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "serviceResponse", propOrder = { "clientNumber", "nativeErrorCode", "result", "serviceData", "transactionID" })
public class ServiceResponse {

    protected String clientNumber;
    protected String nativeErrorCode;
    protected short result;
    protected GenericServiceResponse serviceData;
    protected String transactionID;

    /**
     * Gets the value of the clientNumber property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getClientNumber() {
        return clientNumber;
    }

    /**
     * Sets the value of the clientNumber property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setClientNumber(String value) {
        this.clientNumber = value;
    }

    /**
     * Gets the value of the nativeErrorCode property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getNativeErrorCode() {
        return nativeErrorCode;
    }

    /**
     * Sets the value of the nativeErrorCode property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setNativeErrorCode(String value) {
        this.nativeErrorCode = value;
    }

    /**
     * Gets the value of the result property.
     *
     */
    public short getResult() {
        return result;
    }

    /**
     * Sets the value of the result property.
     *
     */
    public void setResult(short value) {
        this.result = value;
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

    /**
     * Gets the value of the transactionID property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getTransactionID() {
        return transactionID;
    }

    /**
     * Sets the value of the transactionID property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setTransactionID(String value) {
        this.transactionID = value;
    }

}
