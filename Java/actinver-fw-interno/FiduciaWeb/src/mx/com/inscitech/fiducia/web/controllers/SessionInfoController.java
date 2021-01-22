package mx.com.inscitech.fiducia.web.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mx.com.inscitech.fiducia.InvalidUserException;
import mx.com.inscitech.fiducia.common.beans.SessionUserPermisions;
import mx.com.inscitech.fiducia.common.beans.UserData;
import mx.com.inscitech.fiducia.common.beans.UserInfoBean;
import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.services.UserInformationService;
import mx.com.inscitech.fiducia.dml.GenericDML;
import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.dml.vo.DataSet;
import mx.com.inscitech.fiducia.dtos.SessionInfo;
import mx.com.inscitech.fiducia.dtos.SessionUser;
import mx.com.inscitech.fiducia.services.GenericServiceResponse;

import org.springframework.web.servlet.ModelAndView;

public class SessionInfoController extends JsonActionController {

    private static final String USER_MENU_SQL = "SELECT B.FFUN_ID_FUNCION, B.FFUN_ID_PADRE, B.FFUN_NOM_MENU, B.FFUN_NOMBRE_FUNCION, C.FFUN_LECTURA CAN_VIEW, " +
                                                "C.FFUN_ESCRITURA CAN_EDIT FROM F_PERFIL A, F_FUNCION B, F_PER_FUN C WHERE A.FPER_ID_PERFIL = ? AND " + 
                                                "A.FPER_ID_PERFIL = C.FPER_ID_PERFIL AND B.FFUN_ID_FUNCION = C.FFUN_ID_FUNCION ORDER BY B.FFUN_ORDEN";
        
    private static final boolean USE_CACHE = false;
    private static Map<String, List<SessionUserPermisions>> MENU_CACHE;
    
    static {
        MENU_CACHE = new HashMap<>();
    }
    
    public SessionInfoController() {
        super();
    }

    public ModelAndView getSessionInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Session info for user: " + request.getParameter("userId"));
        
        HttpSession session = request.getSession();
        
        if(session.getAttribute("userInfo") == null) {
            GenericServiceResponse responseData = new GenericServiceResponse();
            responseData.setExitCode("FWAUTH-ERROR-002");
            return respondObject(response, responseData);
        }
        
        UserInfoBean userInfo = (UserInfoBean)session.getAttribute("userInfo");
               
        SessionInfo sessionInfo = new SessionInfo(
            new SessionUser(userInfo.getUserName(), userInfo.getNombre()), 
            getSystemDate(), 
            getUserPermisions(userInfo.getPuestoId().toString())
        );
        
        this.useEncryption = true;
        return respondObject(response, sessionInfo);
    }
    
    public ModelAndView getAuthData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Session info for user: " + request.getParameter("userId"));
        
        HttpSession session = request.getSession();
        
        GenericServiceResponse responseData = new GenericServiceResponse();
        responseData.setRequestedOperation("FWAUTH-GET-DATA");
        responseData.setResponseCategory("SECURITY");
        
        String userName = ""+session.getAttribute(GoogleController.USERID);
        
        if(session.getAttribute("userInfo") != null) {
            responseData = getServiceResponse("FWAUTH-OK-001", session.getAttribute("userInfo"));
        } else if(!"".equals(userName) && !"null".equals(userName)){
            try {
                UserInfoBean userInfo = UserInformationService.getInstance().getUserInfo(userName, null, 1);                
                setSessionAttributes(session, userInfo, new Object[]{});
                responseData = getServiceResponse("FWAUTH-OK-002", new UserData(userInfo, getUserPermisions(userInfo.getPuestoId().toString())));
            } catch (InvalidUserException e) {
                responseData.setExitCode("FWAUTH-ERROR-001");
                responseData.setExitMessage("Unable to get user information! Error: " + e.getMessage());
            }
        } else {
            responseData.setExitCode("FWAUTH-001");
            responseData.setExitMessage("User information not available!");
        }
        
        this.useEncryption = true;
        return respondObject(response, responseData);
    }
    
    private GenericServiceResponse getServiceResponse(String exitCode, Object responseObj) {
        GenericServiceResponse responseData = new GenericServiceResponse();
        responseData.setRequestedOperation("FWAUTH-GET-DATA");
        responseData.setResponseCategory("SECURITY");

        responseData.setSucceded(true);
        responseData.setResponseObj(responseObj);        
        responseData.setExitCode(exitCode);
        responseData.setExitMessage("");
        responseData.setResponseType("INFO");
        responseData.setErrorDetail(null);
        responseData.setResponseMessage("Operation compleated successfully!");
        
        return responseData;
    }
    
    private String getSystemDate() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }
    
    private List<SessionUserPermisions> getUserPermisions(String roleId) {

        if(USE_CACHE && MENU_CACHE.containsKey(roleId)) {
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
        
        if(USE_CACHE) MENU_CACHE.put(roleId, up);
        return up;
    }
    
    //TODO: Remove code, same method @SecurityFilter
    private void setSessionAttributes(HttpSession session, UserInfoBean userInfo, Object empresas[]) {
                
        session.setAttribute("userInfo", userInfo);
        session.setAttribute("fechaContable", userInfo.getFechaContable());
        session.setAttribute("strFechaContable", userInfo.getStrFechaContable());
        session.setAttribute("userid", userInfo.getUserId());
        session.setAttribute("puestoId", userInfo.getPuestoId());
        session.setAttribute("puesto", userInfo.getPuesto());
        session.setAttribute("mesAbiertoLbl", userInfo.getMesAbiertoStr());
        session.setAttribute("mesAbierto", userInfo.getMesAbierto());        
        
        for (int s = 0; s < empresas.length; s++) {
            session.setAttribute("empresa_" + s, String.valueOf(empresas[s]));
        }
        
    }
    
}
