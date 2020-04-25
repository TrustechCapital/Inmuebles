
package mx.com.inscitech.actinver.ws.watchlist;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each
 * Java content interface and Java element interface
 * generated in the mx.com.inscitech.actinver.ws.watchlist package.
 * <p>An ObjectFactory allows you to programatically
 * construct new instances of the Java representation
 * for XML content. The Java representation of XML
 * content can consist of schema derived interfaces
 * and classes representing the binding of schema
 * type definitions, element declarations and model
 * groups.  Factory methods for each of these are
 * provided in this class.
 *
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _SearchEntity_QNAME = new QName("http://watchlist.ws.actinver.inscitech.com.mx/", "searchEntity");
    private final static QName _SearchEntityResponse_QNAME = new QName("http://watchlist.ws.actinver.inscitech.com.mx/", "searchEntityResponse");
    private final static QName _SetServiceConfig_QNAME = new QName("http://watchlist.ws.actinver.inscitech.com.mx/", "setServiceConfig");
    private final static QName _SetServiceConfigResponse_QNAME = new QName("http://watchlist.ws.actinver.inscitech.com.mx/", "setServiceConfigResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: mx.com.inscitech.actinver.ws.watchlist
     *
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link SearchEntity }
     *
     */
    public SearchEntity createSearchEntity() {
        return new SearchEntity();
    }

    /**
     * Create an instance of {@link SearchEntityResponse }
     *
     */
    public SearchEntityResponse createSearchEntityResponse() {
        return new SearchEntityResponse();
    }

    /**
     * Create an instance of {@link SetServiceConfig }
     *
     */
    public SetServiceConfig createSetServiceConfig() {
        return new SetServiceConfig();
    }

    /**
     * Create an instance of {@link SetServiceConfigResponse }
     *
     */
    public SetServiceConfigResponse createSetServiceConfigResponse() {
        return new SetServiceConfigResponse();
    }

    /**
     * Create an instance of {@link ServiceRequest }
     *
     */
    public ServiceRequest createServiceRequest() {
        return new ServiceRequest();
    }

    /**
     * Create an instance of {@link ServiceResponse }
     *
     */
    public ServiceResponse createServiceResponse() {
        return new ServiceResponse();
    }

    /**
     * Create an instance of {@link WlMatch }
     *
     */
    public WlMatch createWlMatch() {
        return new WlMatch();
    }

    /**
     * Create an instance of {@link GenericServiceResponse }
     *
     */
    public GenericServiceResponse createGenericServiceResponse() {
        return new GenericServiceResponse();
    }

    /**
     * Create an instance of {@link ErrorData }
     *
     */
    public ErrorData createErrorData() {
        return new ErrorData();
    }

    /**
     * Create an instance of {@link GenericMessage }
     *
     */
    public GenericMessage createGenericMessage() {
        return new GenericMessage();
    }

    /**
     * Create an instance of {@link ServiceConfig }
     *
     */
    public ServiceConfig createServiceConfig() {
        return new ServiceConfig();
    }

    /**
     * Create an instance of {@link EsbHeader }
     *
     */
    public EsbHeader createEsbHeader() {
        return new EsbHeader();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SearchEntity }{@code >}
     *
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link SearchEntity }{@code >}
     */
    @XmlElementDecl(namespace = "http://watchlist.ws.actinver.inscitech.com.mx/", name = "searchEntity")
    public JAXBElement<SearchEntity> createSearchEntity(SearchEntity value) {
        return new JAXBElement<SearchEntity>(_SearchEntity_QNAME, SearchEntity.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SearchEntityResponse }{@code >}
     *
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link SearchEntityResponse }{@code >}
     */
    @XmlElementDecl(namespace = "http://watchlist.ws.actinver.inscitech.com.mx/", name = "searchEntityResponse")
    public JAXBElement<SearchEntityResponse> createSearchEntityResponse(SearchEntityResponse value) {
        return new JAXBElement<SearchEntityResponse>(_SearchEntityResponse_QNAME, SearchEntityResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetServiceConfig }{@code >}
     *
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link SetServiceConfig }{@code >}
     */
    @XmlElementDecl(namespace = "http://watchlist.ws.actinver.inscitech.com.mx/", name = "setServiceConfig")
    public JAXBElement<SetServiceConfig> createSetServiceConfig(SetServiceConfig value) {
        return new JAXBElement<SetServiceConfig>(_SetServiceConfig_QNAME, SetServiceConfig.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetServiceConfigResponse }{@code >}
     *
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link SetServiceConfigResponse }{@code >}
     */
    @XmlElementDecl(namespace = "http://watchlist.ws.actinver.inscitech.com.mx/", name = "setServiceConfigResponse")
    public JAXBElement<SetServiceConfigResponse> createSetServiceConfigResponse(SetServiceConfigResponse value) {
        return new JAXBElement<SetServiceConfigResponse>(_SetServiceConfigResponse_QNAME, SetServiceConfigResponse.class, null, value);
    }

}
