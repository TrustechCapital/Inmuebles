package mx.com.inscitech.security;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class SamlHandlerApp {

    public static void main(String[] args) {
        SpringApplication.run(SamlHandlerApp.class, args);
    }

}
