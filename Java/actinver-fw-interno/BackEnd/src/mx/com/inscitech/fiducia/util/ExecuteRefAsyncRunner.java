package mx.com.inscitech.fiducia.util;

import java.util.HashMap;
import java.util.Map;

import mx.com.inscitech.fiducia.common.services.LoggingService;

import mx.gob.nafin.fiduciario.BusinessException;
import mx.gob.nafin.fiduciario.business.services.GenericDataAccessService;
import mx.gob.nafin.fiduciario.common.beans.ErrorBean;

import org.springframework.jdbc.core.JdbcTemplate;

public class ExecuteRefAsyncRunner implements Runnable {
    
    private static LoggingService logger;
    
    private static final String ERROR_MESSAGE = "Error al realizar la operacion solicitada! ErrorCode: [%s] ErrorMessage: [%s]";
    
    private JdbcTemplate jdbcTemplate;
    
    private GenericDataAccessService dataService;

    private Map parametros = null;
    
    static {
        logger = LoggingService.getNewInstance();
    }
    
    public ExecuteRefAsyncRunner() {
        super();
        parametros = new HashMap();
    }
    
    public void run() {
        
        try {
            dataService.ejecutaProcedimiento(parametros);
        } catch (BusinessException e) {            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, String.format(ERROR_MESSAGE, ErrorBean.ERROR, e.getErrorCode(), e.getErrorMessage()));
        }
    }
    
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }

    public void setDataService(GenericDataAccessService dataService) {
        this.dataService = dataService;
    }

    public GenericDataAccessService getDataService() {
        return dataService;
    }

    public void setParametros(Map parametros) {
        this.parametros = parametros;
    }

    public Map getParametros() {
        return parametros;
    }
}
