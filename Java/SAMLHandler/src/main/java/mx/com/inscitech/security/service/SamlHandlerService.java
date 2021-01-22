package mx.com.inscitech.security.service;

import com.onelogin.saml2.exception.Error;
import com.onelogin.saml2.exception.SettingsException;
import lombok.extern.log4j.Log4j2;
import mx.com.inscitech.security.dto.AuthData;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.onelogin.saml2.Auth;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Log4j2
@Service
public class SamlHandlerService {

    private static final String AUTH_CONFIG_FILE = "fw.local.saml";
    //private static final String AUTH_CONFIG_FILE = "fw.saml";
    //private static final String AUTH_CONFIG_FILE = "fw.banregio.saml";

    private static final String GOOGLE_FIRST_NAME_ATTRIBUTE = "nombre";
    private static final String GOOGLE_lAST_NAME_ATTRIBUTE = "apellido";
    private static final String GOOGLE_EMAIL_ATTRIBUTE = "correo";

    public AuthData authenticate(HttpServletRequest request, HttpServletResponse response) {

        AuthData authData = new AuthData();

        try {

            //Auth auth = new Auth(AUTH_CONFIG_FILE, request, response);
            Auth auth = new Auth(request, response);

            auth.processResponse();
            if (auth.isAuthenticated()) {

                Map<String, List<String>> attrs = auth.getAttributes();
                log.debug(
                    "user-email: [{}] user-name: [{}] user-lastname: [{}]",
                    attrs.get(GOOGLE_EMAIL_ATTRIBUTE),
                    attrs.get(GOOGLE_FIRST_NAME_ATTRIBUTE),
                    attrs.get(GOOGLE_lAST_NAME_ATTRIBUTE)
                );

                authData.setId(auth.getNameId());
                authData.setEmail(attrs.get(GOOGLE_EMAIL_ATTRIBUTE).get(0));
                authData.setFirstName(attrs.get(GOOGLE_FIRST_NAME_ATTRIBUTE).get(0));
                authData.setLastName(attrs.get(GOOGLE_lAST_NAME_ATTRIBUTE).get(0));
            }

            authData.setSucceeded(true);

        } catch (SettingsException e) {
            log.error("Unable to load settings!", e);
            authData.setExitMessage(e.getMessage());
        } catch (IOException e) {
            log.error("Unable to load settings!", e);
            authData.setExitMessage(e.getMessage());
        } catch (Error error) {
            log.error("SAML Auth error!", error);
            authData.setExitMessage(error.getMessage());
        } catch (Exception e) {
            log.error("Unknown error!", e);
            authData.setExitMessage(e.getMessage());
        }

        return authData;
    }

}
