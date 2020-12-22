package mx.com.inscitech.fiducia.web.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.dml.GenericDML;
import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.dml.vo.DataSet;
import mx.com.inscitech.fiducia.dtos.SessionInfo;
import mx.com.inscitech.fiducia.dtos.SessionUser;
import mx.com.inscitech.fiducia.dtos.SessionUserPermisions;

import org.springframework.web.servlet.ModelAndView;

public class SessionInfoController extends JsonActionController {

    private static final String USER_MENU_SQL = "SELECT B.FFUN_ID_FUNCION, B.FFUN_ID_PADRE, B.FFUN_NOM_MENU, B.FFUN_NOMBRE_FUNCION, C.FFUN_LECTURA CAN_VIEW, " +
                                                "C.FFUN_LECTURA CAN_EDIT FROM F_PERFIL A, F_FUNCION B, F_PER_FUN C WHERE A.FPER_ID_PERFIL = ? AND " + 
                                                "A.FPER_ID_PERFIL = C.FPER_ID_PERFIL AND B.FFUN_ID_FUNCION = C.FFUN_ID_FUNCION ORDER BY B.FFUN_ORDEN";
        
    private static Map<String, List<SessionUserPermisions>> MENU_CACHE;
    
    static {
        MENU_CACHE = new HashMap<>();
    }
    
    public SessionInfoController() {
        super();
    }

    public ModelAndView getSessionInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Session info for user: " + request.getParameter("userId"));
        
        String userId = "admin";
        String name = "Administrador";
        String roleId = getUserRole(userId);
        
        SessionInfo sessionInfo = new SessionInfo(
            new SessionUser(userId, name), 
            getSystemDate(), 
            getUserPermisions(roleId)
        );

        return respondObject(response, sessionInfo);
    }
 
    private String getSystemDate() {
        return "10/12/2020";
    }
    
    private String getUserRole(String userId) {
        return "1";
    }
    
    private List<SessionUserPermisions> getUserPermisions(String roleId) {

        if(MENU_CACHE.containsKey(roleId)) {
            return MENU_CACHE.get(roleId);          
        }

        List<SessionUserPermisions> up = new ArrayList<>();
        
        DataRow row = null;
        GenericDML genericDML = new GenericDML();
        DataSet userPermisions = genericDML.getDataSetX(USER_MENU_SQL, new Integer(roleId));
        for(int i = 0; i < userPermisions.getRowCount(); i++) {
            row = userPermisions.getRow(i);
            up.add(new SessionUserPermisions(
                row.getString("FFUN_NOM_MENU"), 
                "1".equals(row.getString("CAN_VIEW")), 
                "1".equals(row.getString("CAN_EDIT"))));               
        }
        
        MENU_CACHE.put(roleId, up);
        return up;
    }
}
