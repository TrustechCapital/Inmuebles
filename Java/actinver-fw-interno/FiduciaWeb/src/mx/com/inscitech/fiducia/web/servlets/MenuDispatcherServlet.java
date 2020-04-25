package mx.com.inscitech.fiducia.web.servlets;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mx.com.inscitech.fiducia.business.services.MenuService;
import mx.com.inscitech.fiducia.common.beans.MenuBean;
import mx.com.inscitech.fiducia.common.services.ConfigurationService;
import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.util.ObjectCache;


public class MenuDispatcherServlet extends HttpServlet {

    private static String CONTENT_TYPE;
    private static String GUEST_PROFILE_ID;
    private LoggingService logSrv = null;

    static {
        CONTENT_TYPE = ConfigurationService.getInstance().getProperty("defalutXMLContentType");
        GUEST_PROFILE_ID = ConfigurationService.getInstance().getProperty("guestProfileID");
    }

    @SuppressWarnings("compatibility:-7251114465230553497")
    private static final long serialVersionUID = 4630062595118152655L;

    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    public void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        logSrv = LoggingService.getNewInstance();
        logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "MenuDispatcherServlet inicio!");
        
        response.setContentType(CONTENT_TYPE);

        HttpSession session = request.getSession();

        String puesto = "" + session.getAttribute("puestoId");
        if ("null".equals(puesto)) puesto = GUEST_PROFILE_ID;
        logSrv.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Puesto para MenuDispatcherServlet "+puesto);
        String uri = request.getRequestURI();
        uri = uri.substring(0, uri.indexOf(".xml")) + puesto;

        ObjectCache cache = ObjectCache.getInstance();
        MenuBean menu = null;
        MenuService menuService = null;

        // TODO: Verificar si no es mucha carga el obtener los bytes con getMenuInfo, si es asi, guardar en el cache los bytes en lugar del objeto
        if (cache.get(uri) == null) {
            menuService = MenuService.getInstance();
            menu = menuService.getMenu(new Integer(puesto));
            menuService.finalize();
            menuService = null;
            cache.put(uri, menu);
        } else {
            menu = (MenuBean) cache.get(uri);
        }

        response.getOutputStream().write(menu.getMenuInfo());
    }
}
