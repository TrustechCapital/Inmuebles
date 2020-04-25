package mx.com.inscitech.fiduciaweb.web.listeners;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ApplicationStartupListener implements ServletContextListener, HttpSessionListener {
    
    private static final Logger logger = LoggerFactory.getLogger(ApplicationStartupListener.class);
    
    private ServletContext context = null;
    private HttpSession session = null;

    public void contextInitialized(ServletContextEvent event) {
        logger.debug("Application Starting Up...");
        context = event.getServletContext();
    }

    public void contextDestroyed(ServletContextEvent event) {
        context = event.getServletContext();
    }

    public void sessionCreated(HttpSessionEvent event) {
        logger.debug("Session Created!");
        session = event.getSession();
    }

    public void sessionDestroyed(HttpSessionEvent event) {
        logger.debug("Session Destroyed!");
        session = event.getSession();
    }
}
