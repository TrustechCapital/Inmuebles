package mx.gob.nafin.fiduciario.controller;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.util.ExecuteRefAsyncResponse;
import mx.com.inscitech.fiducia.util.ExecuteRefAsyncRunner;
import mx.com.inscitech.fiducia.util.XLSDataWriter;
import mx.com.inscitech.fiducia.util.XLSXDataWriter;

import mx.gob.nafin.fiduciario.BusinessException;
import mx.gob.nafin.fiduciario.business.services.GenericDataAccessService;
import mx.gob.nafin.fiduciario.common.beans.ErrorBean;

import net.sf.json.JSONObject;

import org.springframework.web.servlet.ModelAndView;


/**
 * Clase que se encarga de ejecutar las consultas generiacas del sistema, definidas en el archivo
 * WEB-INF/modules/consultas.xml; cada consulta puede o no tener parametros, los cuales son procesados
 * por el servicio de acceso a datos @see mx.gob.nafin.fiduciario.business.services.GenericDataAccessService
 * Tambien son enviados como parametros los atributos que se encuentran en session, los cuales sobreescriben a
 * los de request.
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class ConsultasController extends JsonActionController {

    protected GenericDataAccessService genericDataAccessService;

    public void setGenericDataAccessService(GenericDataAccessService genericDataAccessService) {
        this.genericDataAccessService = genericDataAccessService;
    }

    public GenericDataAccessService getGenericDataAccessService() {
        return genericDataAccessService;
    }

    /**
     * Metodo utilizado para ejecutar las consultas definidas en el archivo de consultas.
     * @throws java.lang.Exception
     * @return
     * @param response
     * @param request
     */
    public ModelAndView ejecutaConsulta(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Cadena JSON: " + request.getParameter("json"));

        try {
            
            JSONObject jsonObject = getJSONRequestObject(request);
            Map parametros = (Map) JSONObject.toBean(jsonObject, Map.class);
            setSessionAttributesAsParameters(request.getSession(), parametros);

            List consulta = genericDataAccessService.ejecutaConsulta(parametros);
            //response.addHeader("Access-Control-Allow-Origin", "*");
            //response.addHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
            //response.addHeader("Access-Control-Allow-Headers","Origin, Content-Type, X-Auth-Token");
            return respondObject(response, consulta);

        } catch (BusinessException e) {
            return respondObject(response, new ErrorBean(ErrorBean.ERROR, e.getErrorCode(), e.getErrorMessage()));
        }
    }

    /**
     * Metodo utilizado para ejecutar query's genericos
     * @throws java.lang.Exception
     * @return
     * @param response
     * @param request
     */
    public ModelAndView ejecutaQuery(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Cadena JSON: " + request.getParameter("json"));
        
        try {
            
            JSONObject jsonObject = getJSONRequestObject(request);
            Map parametros = (Map) JSONObject.toBean(jsonObject, Map.class);
            setSessionAttributesAsParameters(request.getSession(), parametros);

            int registrosAfectados = 0;
            List result = genericDataAccessService.ejecutaQuery(parametros);
            Object firstObjet = result.isEmpty() ? new Integer(0) : result.get(0);

            if (firstObjet instanceof Integer) {
                registrosAfectados = ((Integer) firstObjet).intValue();
                return respondObject(response, ErrorBean.ERROR_SUCCESS);
            } else {
                return respondObject(response, result);
            }
            
        } catch (BusinessException e) {
            return respondObject(response, new ErrorBean(ErrorBean.ERROR, e.getErrorCode(), e.getErrorMessage()));
        }
    }

    /**
     * Metodo utilizado para ejecutar procedimientos almacenados y funciones
     * @throws java.lang.Exception
     * @return
     * @param response
     * @param request
     */
    public ModelAndView ejecutaProcedimiento(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Cadena JSON: " + request.getParameter("json"));
        
        try {
            
            JSONObject jsonObject = getJSONRequestObject(request);
            Map parametros = (Map) JSONObject.toBean(jsonObject, Map.class);
            setSessionAttributesAsParameters(request.getSession(), parametros);

            return respondObject(response, genericDataAccessService.ejecutaProcedimiento(parametros));

        } catch (BusinessException e) {
            return respondObject(response, new ErrorBean(ErrorBean.ERROR, e.getErrorCode(), e.getErrorMessage()));
        }
    }

    public ModelAndView ejecutaConsultaExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Cadena JSON: " + request.getParameter("json"));

        response.setHeader("Cache-Control", "no-cache");        
            
        ByteArrayOutputStream outByteStream = null;
        
        try {
            
            JSONObject jsonObject = getJSONRequestObject(request);
            Map parametros = (Map) JSONObject.toBean(jsonObject, Map.class);
            
            setSessionAttributesAsParameters(request.getSession(), parametros);

            //TODO: Optimizar este codigo para que no de tantas vueltas la informacion... la mejor es: De base de datos a excel sin pasar por otros componentes
            List consulta = genericDataAccessService.ejecutaConsulta(parametros);
            
            String[] tableHeaders = new String[]{};
            if(request.getParameter("headers") != null) {
                tableHeaders = request.getParameter("headers").split(",");
            }
            
            boolean esXLSX = false;
            if((""+request.getRequestURL()).indexOf("XLSX") != -1) esXLSX = true;
            
            if(esXLSX) {
                
                response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                response.setContentType("Content-Disposition: inline; filename=\"DatosFiduciarios.xlsx\"");//Content-Disposition: attachment; filename="DatosFiduciarios.xlsx"
                XLSXDataWriter xlsx = new XLSXDataWriter();
                outByteStream = xlsx.generateExcel(consulta, tableHeaders);
                
            } else {

                response.setContentType("application/vnd.ms-excel");
                response.setContentType("Content-Disposition: inline; filename=\"DatosFiduciarios.xls\"");
                
                XLSDataWriter xlsx = new XLSDataWriter();
                outByteStream = xlsx.generateExcel(consulta, tableHeaders);
                                
            }
            
            OutputStream outStream = response.getOutputStream();
            outStream.write(outByteStream.toByteArray());
            outStream.flush();
            
        } catch (BusinessException e) {
            return respondObject(response, new ErrorBean(ErrorBean.ERROR, e.getErrorCode(), e.getErrorMessage()));
        }
        
        return null;
    }

    public ModelAndView ejecutaProcedimientoAsync(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Cadena JSON: " + request.getParameter("json"));
        
        ExecuteRefAsyncResponse responseObj = new ExecuteRefAsyncResponse();
        
        try {
            
            JSONObject jsonObject = getJSONRequestObject(request);
            Map parametros = (Map) JSONObject.toBean(jsonObject, Map.class);
            setSessionAttributesAsParameters(request.getSession(), parametros);
            
            ExecuteRefAsyncRunner runner = new ExecuteRefAsyncRunner();
            runner.getParametros().putAll(parametros);            
            runner.setDataService(genericDataAccessService);
            new Thread(runner).start();            
            
            responseObj.setMessage("Operacion solicitada iniciada exitosamente");
            responseObj.setSuccedded(true);
            
        } catch (Exception e) {
            responseObj.setErrorCode("FIDW-CON-001");
            responseObj.setErrorMessage(e.getMessage());
        }
        
        return respondObject(response, responseObj);
    }
    
}
