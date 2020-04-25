
package mx.com.inscitech.actinver.ws.contract;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for serviceRequest complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="serviceRequest"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="bankingArea" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="contractNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "serviceRequest", propOrder = { "bankingArea", "contractNumber" })
public class ServiceRequest {

    protected String bankingArea;
    protected String contractNumber;

    /**
     * Gets the value of the bankingArea property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getBankingArea() {
        return bankingArea;
    }

    /**
     * Sets the value of the bankingArea property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setBankingArea(String value) {
        this.bankingArea = value;
    }

    /**
     * Gets the value of the contractNumber property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getContractNumber() {
        return contractNumber;
    }

    /**
     * Sets the value of the contractNumber property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setContractNumber(String value) {
        this.contractNumber = value;
    }

}
