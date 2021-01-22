package mx.com.inscitech.security.controller;

import lombok.extern.log4j.Log4j2;
import mx.com.inscitech.security.dto.AuthData;
import mx.com.inscitech.security.service.SamlHandlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Log4j2
@RestController
public class SamlXMLHandlerController {

    private SamlHandlerService service;

    @Autowired
    public SamlXMLHandlerController(SamlHandlerService service) {
        this.service = service;
    }

    @PostMapping("/saml/auth")
    public ResponseEntity<AuthData> getAuth(HttpServletRequest request, HttpServletResponse response) {
        log.debug("getAuth {}", request.getParameter("SAMLResponse"));
        return ResponseEntity.ok(service.authenticate(request, response));
    }
}
