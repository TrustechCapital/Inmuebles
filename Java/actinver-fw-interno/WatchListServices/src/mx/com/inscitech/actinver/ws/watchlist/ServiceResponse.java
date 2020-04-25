package mx.com.inscitech.actinver.ws.watchlist;

import java.util.ArrayList;
import java.util.List;

import mx.com.inscitech.fiduciaweb.services.GenericServiceResponse;
import mx.com.inscitech.fiduciaweb.services.wl.WLMatch;

public class ServiceResponse {
    
    private GenericServiceResponse serviceData = null;
    
    private List<WLMatch> matches = null;
    
    public ServiceResponse() {
        super();
        matches = new ArrayList<WLMatch>();
    }

    public void setServiceData(GenericServiceResponse serviceData) {
        this.serviceData = serviceData;
    }

    public GenericServiceResponse getServiceData() {
        return serviceData;
    }

    public void setMatches(List<WLMatch> matches) {
        this.matches = matches;
    }

    public List<WLMatch> getMatches() {
        return matches;
    }
}
