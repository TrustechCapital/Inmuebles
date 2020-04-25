package mx.com.inscitech.fiduciaweb.services;


public class ServiceConfig {

    private boolean useCommonHeader = false;
    
    private String serviceURL = null;
    private String namespaceURI = null;
    private String namespaceLocalPart = null;
    
    private ESBHeader headerData = null;
    
    public ServiceConfig() {
        super();
    }

    public void setUseCommonHeader(boolean useCommonHeader) {
        this.useCommonHeader = useCommonHeader;
    }

    public boolean isUseCommonHeader() {
        return useCommonHeader;
    }

    public void setServiceURL(String serviceURL) {
        this.serviceURL = serviceURL;
    }

    public String getServiceURL() {
        return serviceURL;
    }

    public void setNamespaceURI(String namespaceURI) {
        this.namespaceURI = namespaceURI;
    }

    public String getNamespaceURI() {
        return namespaceURI;
    }

    public void setNamespaceLocalPart(String namespaceLocalPart) {
        this.namespaceLocalPart = namespaceLocalPart;
    }

    public String getNamespaceLocalPart() {
        return namespaceLocalPart;
    }

    public void setHeaderData(ESBHeader headerData) {
        this.headerData = headerData;
    }

    public ESBHeader getHeaderData() {
        return headerData;
    }
}
