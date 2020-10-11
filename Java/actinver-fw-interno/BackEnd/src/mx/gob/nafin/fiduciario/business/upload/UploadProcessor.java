package mx.gob.nafin.fiduciario.business.upload;

import java.math.BigDecimal;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Types;

import java.time.Duration;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import mx.gob.nafin.fiduciario.BusinessException;
import mx.gob.nafin.fiduciario.common.beans.ParametroQueryBean;

import mx.com.inscitech.fiducia.common.util.DateTimeUtils;

import mx.gob.nafin.fiduciario.dao.util.GenericRowMapper;

import mx.com.inscitech.fiducia.common.services.LoggingService;

import org.springframework.jdbc.core.JdbcTemplate;

/**
 * Clase que deben de extender los procesadores de archivos que son cargados al servidor.
 * @author Inscitech M�xico inscitech@inscitechmexico.com
 */
public abstract class UploadProcessor implements Runnable {

    protected LoggingService logger = null;

    protected int processID = 0;

    /**
     * Variable en la que se almacenan los archivos que se van a procesar.
     */
    protected List files;

    /**
     * Variable que contiene los parametros que utilizara el procesador.
     */
    protected Map parameters = new HashMap();

    /**
     * Miembro para el uso del ORM de Spring, JDBCTemplate
     */
    protected JdbcTemplate jdbcTemplate;

    protected boolean started = false;
    protected boolean finished = false;
    protected int percent = 0;

    protected String containmentPath = null;

    protected UploadStateMonitorBean stateMonitor = null;

    protected LocalDateTime startedAt = null;

    protected boolean filesFromFS = false;
    protected boolean asThread = false;

    public UploadProcessor() {
        super();
        logger = LoggingService.getNewInstance();
        stateMonitor = new UploadStateMonitorBean();
    }

    public void setProcessID(int processID) {
        this.processID = processID;
        stateMonitor.setProcessID(processID);
    }

    public int getProcessID() {
        return processID;
    }

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }

    public void setFiles(List files) {
        this.files = files;
    }

    public List getFiles() {
        return files;
    }

    public void setParameters(Map parameters) {
        this.parameters = parameters;
    }

    public Map getParameters() {
        return parameters;
    }

    public void setContainmentPath(String containmentPath) {
        this.containmentPath = containmentPath;
    }

    public String getContainmentPath() {
        return containmentPath;
    }

    /**
     * Metodo con el cual se obtiene el detalle del estado en el que se encuentra el procesador.
     * @return Un Objeto con el detalle del estado del procesador.
     */
    public abstract Object getStateInfo();

    /**
     * Metodo que se utiliza para ejecutar sentencias SQL previamente definidas como update's, insert's y delete's en el archivo xml de consultas.
     * @throws mx.gob.nafin.fiduciario.BusinessException Cuando la consutla a ejecutar no existe u ocurre un error al ejecutar la sentecia.
     * @return El numero de registros afectados.
     * @param parametrosRequest Los parametros del request entre los cuales se encuentra el identificador de la consulta a ejecutar
     * en la llave "id" del mapa asi como los demas parametros definidos en el xml.
     */
    public List ejecutaQuery(String query, Object[] parametrosQry) throws BusinessException {
        List result = new ArrayList();
        boolean isSelect = false;

        if (query == null)
            throw new BusinessException("QUERY_NO_VALIDO");
        if (query.toUpperCase().indexOf("SELECT") == 0)
            isSelect = true;

        if (isSelect)
            result = jdbcTemplate.query(query, parametrosQry, new GenericRowMapper());
        else
            result.add(new Integer(jdbcTemplate.update(query, parametrosQry)));

        return result;
    }

    /**
     * Metodo utilizado para mandar llamar funciones o procedimientos que requieren de parametros de salida.
     * @throws mx.gob.nafin.fiduciario.BusinessException Cuando no es posible ejecutar la operacion
     * @return Una mapa o un objeto con los parametros de salida en caso de existir alguno
     * @param parametrosRequest Los parametros de entrada
     */
    public Map ejecutaProcedimiento(String query, List parametros) throws BusinessException {

        if (query == null)
            throw new BusinessException("QUERY_NO_VALIDO");

        Connection cn = null;
        CallableStatement cs = null;

        boolean haveOutParameters = false;

        int paramIndex = 1;
        int i = 0;

        ArrayList pSalida = new ArrayList();
        Map result = null;
        Object parameterValue = null;
        String parameterType = null;
        ParametroQueryBean paramBean = null;

        try {
            cn = jdbcTemplate.getDataSource().getConnection();
            cs = cn.prepareCall(query);

            for (i = 0; i < parametros.size(); i++) {
                paramBean = (ParametroQueryBean) parametros.get(i);

                parameterType = paramBean.getType() == null ? "" : paramBean.getType()
                                                                            .trim()
                                                                            .toUpperCase();
                parameterValue = paramBean.getValue();

                if (parameterValue != null) {

                    if (paramBean.isOut()) {

                        haveOutParameters = true;
                        paramBean.setIndex(paramIndex);
                        pSalida.add(paramBean);

                        if (parameterValue instanceof String)
                            cs.registerOutParameter(paramIndex, Types.VARCHAR);
                        else if (parameterValue instanceof Long || parameterValue instanceof Integer)
                            cs.registerOutParameter(paramIndex, Types.NUMERIC);
                        else if (parameterValue instanceof Date)
                            cs.registerOutParameter(paramIndex, Types.DATE);
                        else if (parameterValue instanceof Double)
                            cs.registerOutParameter(paramIndex, Types.DOUBLE);
                        else if (parameterValue instanceof Boolean)
                            cs.registerOutParameter(paramIndex, Types.BOOLEAN);
                        else
                            cs.registerOutParameter(paramIndex, Types.VARCHAR);

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Parameter " + paramBean.getName() + " registered as OUT parameter. Index: " +
                                   paramIndex);

                        paramIndex++;

                    } else {

                        if (parameterType.equals("VARCHAR"))
                            cs.setString(paramIndex++, String.valueOf(parameterValue));
                        else if (parameterType.equals("NUMBER"))
                            cs.setInt(paramIndex++, ((Integer) parameterValue).intValue());
                        else if (parameterValue instanceof Long || parameterValue instanceof Integer ||
                                 parameterValue instanceof Double) {
                            if (parameterValue instanceof String)
                                cs.setLong(paramIndex++, Long.parseLong((String) parameterValue));
                            else if (parameterValue instanceof Long)
                                cs.setLong(paramIndex++, ((Long) parameterValue).longValue());
                            else if (parameterValue instanceof Integer)
                                cs.setInt(paramIndex++, ((Integer) parameterValue).intValue());
                            else if (parameterValue instanceof Double)
                                cs.setDouble(paramIndex++, ((Double) parameterValue).doubleValue());
                        } else if (parameterType.equals("DATE")) {
                            Date theDate =
                                new Date(DateTimeUtils.parseDateTimeFromPattern(paramBean.getPattern(),
                                                                                (String) parameterValue).getTime());
                            cs.setDate(paramIndex++, theDate);
                        } else if (parameterType.equals("DOUBLE"))
                            cs.setBigDecimal(paramIndex++, new BigDecimal(Double.parseDouble((String) parameterValue)));
                        else if (parameterType.equals("BOOLEAN"))
                            cs.setBoolean(paramIndex++, Boolean.getBoolean((String) parameterValue));
                        else
                            cs.setString(paramIndex++, (String) parameterValue);

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Parameter " + paramBean.getName() + " registered as IN parameter type: " +
                                   parameterValue.getClass() + " value: " + parameterValue + " Index: " + paramIndex);

                    }
                } else {
                    cs.setNull(paramIndex, Types.NULL);
                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                               "Parameter " + paramBean.getName() + " registered as NULL. Index: " + paramIndex);
                    paramIndex++;
                }
            }

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "Parameters Registered: " + paramIndex);

            cs.execute();

            for (i = 0; i < pSalida.size(); i++) {
                paramBean = (ParametroQueryBean) pSalida.get(i);

                if (result == null)
                    result = new HashMap();
                ((Map) result).put(paramBean.getName(), cs.getObject(paramBean.getIndex()));
            }

            pSalida.clear();
            pSalida = null;

        } catch (SQLException e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
            throw new BusinessException("500", e.getMessage());
        } finally {
            try {
                cs.close();
            } catch (Exception e) {
            }
            try {
                cn.close();
            } catch (Exception e) {
            }

            cs = null;
            cn = null;
        }

        return result;
    }


    public void limpiaRegistrosTransaccion(Integer numTransaccion, String nombreTransaccion) {
        try {
            this.ejecutaQuery("DELETE FROM async_transactions WHERE transaction_id = ? AND transaction_name = ?",
                              new Object[] { numTransaccion, nombreTransaccion });
        } catch (Exception e) {

        }

    }

    public void grabaErrorTransaccion(Integer numTransaccion, String nombreTransaccion, String error) {
        try {
            this.ejecutaQuery("INSERT INTO async_transactions VALUES(?,?,?,?)",
                              new Object[] { numTransaccion, nombreTransaccion, 0, error });
        } catch (Exception e) {

        }

    }

    public void grabaTransaccionCompleta(Integer numTransaccion, String nombreTransaccion) {
        try {
            this.ejecutaQuery("INSERT INTO async_transactions VALUES(?,?,?,?)",
                              new Object[] { numTransaccion, nombreTransaccion, 1, null });
        } catch (Exception e) {

        }

    }

    public void setStarted(boolean started) {
        this.started = started;
        stateMonitor.setStarted(started); //Esto es para no cambiar el codigo que ya esta
        stateMonitor.setStartedAt(DateTimeUtils.formatThisTime());
        startedAt = LocalDateTime.now();
    }

    public boolean isStarted() {
        return started;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
        stateMonitor.setFinished(started);
        stateMonitor.setEndedAt(DateTimeUtils.formatThisTime());
        Duration duration = Duration.between(startedAt, LocalDateTime.now());
        stateMonitor.setElapsedTime("" + duration.getSeconds() + "s");
    }

    public boolean isFinished() {
        return finished;
    }

    public void setPercent(int percent) {
        this.percent = percent;
        stateMonitor.setPercent(percent);
    }

    public int getPercent() {
        return percent;
    }

    public void setSucceeded(boolean succeeded) {
        stateMonitor.setSucceeded(succeeded);
    }

    public void setMessage(String theMessage) {
        stateMonitor.setOutputMessage(theMessage);
    }

    public void setStateMonitor(UploadStateMonitorBean stateMonitor) {
        this.stateMonitor = stateMonitor;
    }

    public UploadStateMonitorBean getStateMonitor() {
        return stateMonitor;
    }

    public boolean getFilesFromFS() {
        return filesFromFS;
    }

    public boolean doAsThreadThread() {
        return asThread;
    }
}
