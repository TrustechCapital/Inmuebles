package mx.com.inscitech.fiducia.common.services;

import mx.com.inscitech.fiducia.InvalidUserException;
import mx.com.inscitech.fiducia.common.beans.UserInfoBean;
import mx.com.inscitech.fiducia.dml.GenericDML;
import mx.com.inscitech.fiducia.dml.vo.DataRow;

import net.sf.json.JSONObject;

/**
 * Servicio que sirve para obtener y/o modificar la informacion de un usuario.
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class UserInformationService {

    private static final String GET_USER_INFO_SQL = "SELECT A.FUSU_NOMBRE_USUARIO, A.FPER_ID_PERFIL, A.FUSU_EMAIL, A.FUSU_ULT_ACCESO, B.USU_NUM_USUARIO, " +
                                                    "B.USU_TIPO_USUARIO, B.USU_NUM_PUESTO, B.USU_NOM_PUESTO FROM F_USUARIO A,USUARIOS B WHERE " +
                                                    "A.FUSU_ID_USUARIO = B.USU_NOM_USUARIO AND A.FUSU_ID_USUARIO = ? AND A.FUSU_STATUS = 'ACTIVO'";
    
    private static final String GET_USER_INFO_SQL_FW = "SELECT A.FUSU_NOMBRE_USUARIO, A.FPER_ID_PERFIL, A.FUSU_EMAIL, A.FUSU_ULT_ACCESO, B.USU_NUM_USUARIO, " +
                                                    "B.USU_TIPO_USUARIO, B.USU_NUM_PUESTO, B.USU_NOM_PUESTO FROM \"FIDUCIAWEB\".F_USUARIO A, \"FIDUCIAWEB\".USUARIOS B WHERE " +
                                                    "A.FUSU_ID_USUARIO = B.USU_NOM_USUARIO AND A.FUSU_ID_USUARIO = ? AND A.FUSU_STATUS = 'ACTIVO'";
    
    private static final String GET_FECHA_CONTABLE_SQL = "SELECT FCO_DIA_APLI_CONTA, FCO_MES_APLI_CONTA, FCO_ANO_APLI_CONTA, FCO_MES_APLI_CONTA, FCO_ANO_APLI_CONTA FROM FECCONT";
    
    private static final String GET_EMPRESAS_SQL = "SELECT EMP_NUM_EMPRESA, EMP_NOM_EMPRESA, EMP_NOM_AREA, EMP_DIRECCION, EMP_NOM_AUTORIZA, EMP_NOM_FIRMA,EMP_IDIOMA, EMP_ESTILO, EMP_FEC_CAMBIO, EMP_LLAVE_EMPRESA FROM F_EMPRESA WHERE EMP_NUM_EMPRESA = 0";

    private LoggingService logger;
    private int resultadoFuncion = -1;

    private Object obj_empresa[] = new Object[10]; // objeto empresas

    public static synchronized UserInformationService getInstance() {
        return new UserInformationService();
    }

    public UserInformationService() {
        logger = LoggingService.getInstance();
    }

    public UserInfoBean getUserInfo(String userId, String userPassword, int tipoCambio) throws InvalidUserException {
        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, String.format("getUserInfo(%s, *, %d)", userId, tipoCambio));

        GenericDML dml = new GenericDML();

        try {

            DataRow userData = dml.getDataRowX(GET_USER_INFO_SQL, userId);
            if(userData == null || !userData.hasData()) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "User info found! User: " + userId);
                throw new InvalidUserException(userId);
            }
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, 
                       String.format("userData hasData: %s, fields: %d, fieldNames: %s USU_NUM_USUARIO: %s", 
                                     ""+userData.hasData(), userData.getFieldCount(), ""+userData.getFieldNames(), userData.getString("USU_NUM_USUARIO")));

            for(String field : userData.getFieldNames()) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Field: " + field + " Value: " + userData.getString(field));
            }
    
            if(userData.getString("USU_NUM_USUARIO") == null) {
                userData = dml.getDataRowX(GET_USER_INFO_SQL_FW, userId);
                if(userData == null || !userData.hasData()) {
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "User info found! User: " + userId);
                    throw new InvalidUserException(userId);
                }
            }

            for(String field : userData.getFieldNames()) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "v2.Field: " + field + " Value: " + userData.getString(field));
            }
                            
            UserInfoBean result = new UserInfoBean();

            result.setUserName(userId);
            
            result.setUserId(1); //result.setUserId(new Integer(userData.getString("USU_NUM_USUARIO")));
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "UserId: " + userData.getString("USU_NUM_USUARIO"));
            
            result.setNombre(userData.getString("FUSU_NOMBRE_USUARIO"));
            result.setPuesto(userData.getString("USU_NOM_PUESTO"));
            
            result.setPuestoId(2);//result.setPuestoId(new Integer(userData.getString("USU_NUM_PUESTO")));
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "PuestoId: " + userData.getString("USU_NUM_PUESTO"));
            
            userData.close();
            
            DataRow data = dml.getDataRow(GET_FECHA_CONTABLE_SQL);
            if(data != null && data.hasData()) {
                String diaContable = "00"+data.getString("FCO_DIA_APLI_CONTA");
                String mesContable = "00"+data.getString("FCO_MES_APLI_CONTA");
                String anioContable = data.getString("FCO_ANO_APLI_CONTA");
                
                if(Integer.parseInt(data.getString("FCO_MES_APLI_CONTA")) == 1) {
                    mesContable = "0012";
                    anioContable = ""+(Integer.parseInt(data.getString("FCO_ANO_APLI_CONTA")) - 1);
                }
                result.setFechaContable(diaContable.substring(diaContable.length() - 2) + "/" + mesContable.substring(mesContable.length() - 2) + "/" + anioContable);
                data.close();
            }            
            
            result.setMesAbierto(0); // EN OCASIONES SERA EL ACCESO A LA PAGINA
            
            try {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, String.format("UserInfo: %s", ""+JSONObject.fromObject(result)));
            } catch(Exception e) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.WARN, "Unable to get JSON from userInfo", e);
            }
            
            data = dml.getDataRow(GET_EMPRESAS_SQL); //TODO: Usar objeto, remover o???
            if(data != null && data.hasData()) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Corporate information found!");

                obj_empresa[0] = data.getString("EMP_NUM_EMPRESA");
                obj_empresa[1] = data.getString("EMP_NOM_EMPRESA");
                obj_empresa[2] = data.getString("EMP_NOM_AREA");
                obj_empresa[3] = data.getString("EMP_DIRECCION");
                obj_empresa[4] = data.getString("EMP_NOM_AUTORIZA");
                obj_empresa[5] = data.getString("EMP_NOM_FIRMA");
                obj_empresa[6] = data.getString("EMP_IDIOMA");
                obj_empresa[7] = data.getString("EMP_ESTILO");
                obj_empresa[8] = data.getString("EMP_FEC_CAMBIO");
                obj_empresa[9] = data.getString("EMP_LLAVE_EMPRESA");
            }

            return result;
            
        } catch (Exception e) {

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
            throw new InvalidUserException(userId);

        } finally {

        }
    }

    public int getResultado() {
        return resultadoFuncion;
    }

    public Object[] getEmpresa() {
        return obj_empresa;
    }
}
