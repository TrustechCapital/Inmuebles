package mx.com.inscitech.fiducia.common.services;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;

import mx.com.inscitech.fiducia.InvalidUserException;
import mx.com.inscitech.fiducia.common.beans.UserInfoBean;
import mx.com.inscitech.fiducia.common.util.ServiceLocator;

import net.sf.json.JSONObject;

/**
 * Servicio que sirve para obtener y/o modificar la informacion de un usuario.
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class UserInformationService {

    private LoggingService logger;
    private int resultadoFuncion = -1;

    private Object obj_empresa[] = new Object[10]; // objeto empresas

    private static final String queryUserInfo = "SELECT * FROM TABLE(FN_GET_USER_INFO(?,?,?))";

    private static String SYSTEM_DATA_SOURCE = null;

    public static synchronized UserInformationService getInstance() {
        return new UserInformationService();
    }

    public UserInformationService() {
        logger = LoggingService.getInstance();
    }

    public UserInfoBean getUserInfo(String userName, String userPassword, int tipoCambio) throws InvalidUserException {
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, String.format("getUserInfo(%s, *, %d)", userName, tipoCambio));

        UserInfoBean result = null;

        Connection cn = null;
        ResultSet rs = null;
        PreparedStatement ps = null;

        CallableStatement sentencia = null;

        try {

            if (SYSTEM_DATA_SOURCE == null) SYSTEM_DATA_SOURCE = ConfigurationService.getInstance().getProperty("systemDataSource");

            cn = ServiceLocator.getInstance()
                               .getDatasource(SYSTEM_DATA_SOURCE)
                               .getConnection();
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Connected to DS [" + SYSTEM_DATA_SOURCE + "]!");

            ps = cn.prepareStatement(queryUserInfo);

            String password = userPassword;
            int tipo = tipoCambio;

            ps.setString(1, userName);
            ps.setString(2, password);
            ps.setInt(3, tipo);

            rs = ps.executeQuery();

            if (rs.next()) {

                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "User info found!");

                result = new UserInfoBean();

                result.setUserName(rs.getString("USERNAME"));
                result.setUserId(new Integer(rs.getInt("USERID")));
                result.setNombre(rs.getString("NOMBRE"));
                result.setPuesto(rs.getString("PUESTO"));
                result.setPuestoId(new Integer(rs.getInt("PUESTOID")));
                result.setFechaContable(rs.getString("FECHACONTABLE"));
                result.setMesAbierto(new Integer(rs.getInt("MESABIERTO"))); // EN OCASIONES SERA EL ACCESO A LA PAGINA
                
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, String.format("UserInfo: %s", ""+JSONObject.fromObject(result)));

            } else {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "User info not found!");
            }

            //-----------PARAMETROS EMPRESAS-------------------------

            ResultSet rs_emp = null;
            PreparedStatement ps_emp = null;

            String qry_emp =
                "SELECT EMP_NUM_EMPRESA, EMP_NOM_EMPRESA, EMP_NOM_AREA, EMP_DIRECCION, EMP_NOM_AUTORIZA, EMP_NOM_FIRMA, " +
                "EMP_IDIOMA, EMP_ESTILO, EMP_FEC_CAMBIO, EMP_LLAVE_EMPRESA FROM F_EMPRESA WHERE EMP_NUM_EMPRESA = 0";

            ps_emp = cn.prepareStatement(qry_emp);
            rs_emp = ps_emp.executeQuery();

            if (rs_emp.next()) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Corporate information found!");

                obj_empresa[0] = rs_emp.getObject("EMP_NUM_EMPRESA");
                obj_empresa[1] = rs_emp.getObject("EMP_NOM_EMPRESA");
                obj_empresa[2] = rs_emp.getObject("EMP_NOM_AREA");
                obj_empresa[3] = rs_emp.getObject("EMP_DIRECCION");
                obj_empresa[4] = rs_emp.getObject("EMP_NOM_AUTORIZA");
                obj_empresa[5] = rs_emp.getObject("EMP_NOM_FIRMA");
                obj_empresa[6] = rs_emp.getObject("EMP_IDIOMA");
                obj_empresa[7] = rs_emp.getObject("EMP_ESTILO");
                obj_empresa[8] = rs_emp.getObject("EMP_FEC_CAMBIO");
                obj_empresa[9] = rs_emp.getObject("EMP_LLAVE_EMPRESA");
            }

            //-----------PARAMETROS EMPRESAS-------------------------

            String sql = null;

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Tipo = "+tipo);
            
            if(tipo!=3){
                sql = "{? = call SEGURIDAD.VALIDA_ACCESO(?,?)}";
    
                sentencia = cn.prepareCall(sql); //Declarar la sentencia.
    
                sentencia.registerOutParameter(1, Types.INTEGER);
                sentencia.setString(2, userName);
                sentencia.setString(3, userPassword);
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Usuario: " + userName);
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Password: " + userPassword);
                sentencia.executeQuery(); //Realizar la llamada
    
                resultadoFuncion = sentencia.getInt(1);
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "resultadoFuncion Valida Acceso: " + resultadoFuncion);
            }
            else{
                sql = "{? = call SEGURIDAD.CAMBIA_PW(?,?)}";
                sentencia = cn.prepareCall(sql); //Declarar la sentencia.

                sentencia.registerOutParameter(1, Types.INTEGER);
                sentencia.setString(2, userName);
                sentencia.setString(3, userPassword);
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Usuario: " + userName);
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Password: " + userPassword);

                sentencia.executeQuery(); //Realizar la llamada

                resultadoFuncion = sentencia.getInt(1);
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "resultadoFuncion Cambia PWD: " + resultadoFuncion);
            }

            //Erick, te diria que programes aqui los diferentes escenarios usando un switch como en el ejemplo*/
/*            switch (tipo) {
            case 3:
                sql = "{? = call SEGURIDAD.CAMBIA_PW(?,?)}";
                sentencia = cn.prepareCall(sql); //Declarar la sentencia.

                sentencia.registerOutParameter(1, Types.INTEGER);
                sentencia.setString(2, userName);
                sentencia.setString(3, userPassword);

                sentencia.executeQuery(); //Realizar la llamada

                resultadoFuncion = sentencia.getInt(1);
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "resultadoFuncion Cambia PWD: " + resultadoFuncion);

                break;
            }
*/
        } catch (Exception e) {

            e.printStackTrace();
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
            throw new InvalidUserException(userName);

        } finally {

            if (rs != null) try { rs.close(); } catch (Exception e) { }
            if (ps != null) try { ps.close(); } catch (Exception e) { }            
            if (cn != null) try { cn.close(); } catch (Exception e) { }

            rs = null;
            ps = null;
            cn = null;
        }

        if (result == null) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "result == null");
            throw new InvalidUserException(userName);
        }

        return result;
    }

    public int getResultado() {
        return resultadoFuncion;
    }

    public Object[] getEmpresa() {
        return obj_empresa;
    }
}
