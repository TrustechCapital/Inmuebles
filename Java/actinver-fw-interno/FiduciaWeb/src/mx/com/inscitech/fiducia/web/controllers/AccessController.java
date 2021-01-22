package mx.com.inscitech.fiducia.web.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mx.com.inscitech.fiducia.common.beans.UserInfoBean;
import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.services.UserInformationService;


import org.springframework.web.servlet.ModelAndView;

public class AccessController extends JsonActionController {

    private LoggingService logger = null;

    private static final String TEXTO_ERROR = "Error al validar el usuario con las credenciales especificadas";

    public AccessController() {
        super();
        logger = LoggingService.getNewInstance();
    }

    public ModelAndView validaAcceso(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(this.getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "validaAcceso");

        HttpSession session = request.getSession();

        AccessDataBean accesRequest =
            new AccessDataBean(request.getParameter("username"), request.getParameter("password"),
                               Boolean.parseBoolean(request.getParameter("expired")));
        AccessDataBean accessResponse = new AccessDataBean();

        UserInformationService userService = null;
        UserInfoBean userInfo = new UserInfoBean();
        int userServiceResponse = 0, tipo = 3;

        try {

            userService = UserInformationService.getInstance();
            if (!accesRequest.isExpired())
                userInfo = userService.getUserInfo(accesRequest.getUsername(), accesRequest.getPassword(), 1);
            else
                userInfo = userService.getUserInfo(accesRequest.getUsername(), accesRequest.getPassword(), 3);
            //userServiceResponse = userService.getResultado();
            userServiceResponse = 0;

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "UserServiceResponse: " + userServiceResponse);

            switch (userServiceResponse) {
            case -1: //Usuario no valido
                accessResponse.setMessage("Usuario o contrasenia no validos");
                accessResponse.setResponseCode("NVLD");
                break;
            case 0: //Usuario valido
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                           "User Service Response Valido: " + userServiceResponse + " User: " +
                           accesRequest.getUsername() + " Password: " + accesRequest.getPassword() + " Tipo: " +
                           userServiceResponse);
                accessResponse.setValid(true);
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                           "User Service Response Valido 2: " + userServiceResponse + " User: " +
                           accesRequest.getUsername() + " Password: " + accesRequest.getPassword() + " Tipo: " +
                           userServiceResponse);
                accessResponse.setMessage("Usuario valido");
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                           "User Service Response Valido 3: " + userServiceResponse + " User: " +
                           accesRequest.getUsername() + " Password: " + accesRequest.getPassword() + " Tipo: " +
                           userServiceResponse);
                accessResponse.setResponseCode("VLD");
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                           "User Service Response Valido 4: " + userServiceResponse + " User: " +
                           accesRequest.getUsername() + " Password: " + accesRequest.getPassword() + " Tipo: " +
                           userServiceResponse);
                setSessionAttributes(session, userInfo, userService.getEmpresa());
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                           "User Service Response Valido 5: " + userServiceResponse + " User: " +
                           accesRequest.getUsername() + " Password: " + accesRequest.getPassword() + " Tipo: " +
                           userServiceResponse);
                break;
            case 1: //Usuario no valido
                accessResponse.setMessage("Usuario o contrasenia no validos");
                accessResponse.setResponseCode("NVLD");
                break;
            case 2: //Bloqueado
                accessResponse.setBlocked(true);
                accessResponse.setMessage("El usuario ha sido bloqueado por intentos fallidos");
                accessResponse.setResponseCode("BLKD");
                break;
            case 3: //Cambio password
                accessResponse.setExpired(true);
                accessResponse.setPasswordChange(true);
                accessResponse.setMessage("La contrasena debe cambiarse");
                accessResponse.setResponseCode("PWDC");
                break;
            case 4: //No se cumplen las reglas
                accessResponse.setExpired(true);
                accessResponse.setPasswordChange(true);
                accessResponse.setMessage("La contrasena no cumple con las Reglas de PWD.");
                accessResponse.setResponseCode("FPWD");
                break;
            case 5: //Password repetido
                accessResponse.setExpired(true);
                accessResponse.setPasswordChange(true);
                accessResponse.setMessage("La contrasena ya esta en uso.");
                accessResponse.setResponseCode("UPWD");
                break;

                /*                default:
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "User Service Response Default: " + userServiceResponse +
                                   " User: " + accesRequest.getUsername() +
                                   " Password: " + accesRequest.getPassword() +
                                   " Tipo: " + tipo
                               );
                    accessResponse.setMessage("Usuario o contrasenia no validos");
                    accessResponse.setResponseCode("NVLD");
                    break;*/
            }

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "User Service Response Antes de isValid: " + userServiceResponse + " User: " +
                       accesRequest.getUsername() + " Password: " + accesRequest.getPassword() + " Tipo: " +
                       userServiceResponse);

            if (accessResponse.isValid()) {
                session.setAttribute("username", accesRequest.getUsername());
            }

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "User Service Response Despues de isValid: " + userServiceResponse + " User: " +
                       accesRequest.getUsername() + " Password: " + accesRequest.getPassword() + " Tipo: " +
                       userServiceResponse);

            return respondObject(response, accessResponse);

        } catch (Exception e) {

            //e.printStackTrace();
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, TEXTO_ERROR, e);

            accessResponse.setExpired(true);
            accessResponse.setPasswordChange(true);
            accessResponse.setMessage(TEXTO_ERROR);
            accessResponse.setResponseCode("NVLD");

            //return respondObject(response, new ErrorBean(ErrorBean.ERROR, "FW-ACCESS-01", e.getMessage()));
            return respondObject(response, accessResponse);
        }
    }

    private void setSessionAttributes(HttpSession session, UserInfoBean userInfo, Object empresas[]) throws Exception {
        try {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "setSessionAttributes userInfo: " + userInfo + " userid: " + userInfo.getUserId() +
                       " puestoId: " + userInfo.getPuestoId() + " nompuesto:" + userInfo.getPuesto());

            session.setAttribute("userInfo", (UserInfoBean) userInfo);
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
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR,
                       "setSessionAttributes Error: " + userInfo, e);
            e.printStackTrace();
        }
    }

    public class AccessDataBean {

        private boolean valid = false;
        private boolean expired = false;
        private boolean blocked = false;
        private boolean passwordChange = false;

        private String username = "";
        private String password = "";
        private String message = "";
        private String responseCode = "";

        public AccessDataBean() {
            super();
        }

        public AccessDataBean(String username, String password) {
            super();
            this.username = username;
            this.password = password;
        }

        public AccessDataBean(String username, String password, boolean expired) {
            super();
            this.username = username;
            this.password = password;
            this.expired = expired;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getUsername() {
            return username;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getPassword() {
            return password;
        }

        public void setResponseCode(String responseCode) {
            this.responseCode = responseCode;
        }

        public String getResponseCode() {
            return responseCode;
        }

        public void setValid(boolean valid) {
            this.valid = valid;
        }

        public boolean isValid() {
            return valid;
        }

        public void setExpired(boolean expired) {
            this.expired = expired;
        }

        public boolean isExpired() {
            return expired;
        }

        public void setBlocked(boolean blocked) {
            this.blocked = blocked;
        }

        public boolean isBlocked() {
            return blocked;
        }

        public void setPasswordChange(boolean passwordChange) {
            this.passwordChange = passwordChange;
        }

        public boolean isPasswordChange() {
            return passwordChange;
        }
    }
}
