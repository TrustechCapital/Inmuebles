package mx.com.inscitech.fiducia.web.services.saml;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class SAMLServiceClient {
    
    public static final String SAML_PARAMETER_NAME = "SAMLResponse";
    
    public SAMLServiceClient() {
        super();
    }
    
    public AuthData authenticateUser(String samlResponse) {
        Client client = ClientBuilder.newClient();

        WebTarget target = client.target("http://localhost:3690");
        WebTarget resourceWebTarget = target.path("/saml/auth");

        Invocation.Builder invocationBuilder = resourceWebTarget.request(MediaType.APPLICATION_JSON_TYPE);
        
        Form form = new Form(SAML_PARAMETER_NAME, samlResponse);
        Entity requestEntity = Entity.form(form);

        Response response = invocationBuilder.post(requestEntity);

        AuthData authData = response.readEntity(AuthData.class);
        
        return authData;
    }
}
