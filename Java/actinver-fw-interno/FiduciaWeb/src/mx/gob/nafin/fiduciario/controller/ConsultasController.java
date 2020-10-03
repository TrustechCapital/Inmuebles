package mx.gob.nafin.fiduciario.controller;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;

import java.lang.reflect.Method;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.common.ParameterInfo;
import mx.com.inscitech.fiducia.common.ProceadureData;
import mx.com.inscitech.fiducia.common.ProcedureInfo;
import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.negocio.bienes.OperacionesBienes;
import mx.com.inscitech.fiducia.negocio.bienes.OperacionesDetalleBienes;
import mx.com.inscitech.fiducia.util.ExecuteRefAsyncResponse;
import mx.com.inscitech.fiducia.util.ExecuteRefAsyncRunner;
import mx.com.inscitech.fiducia.util.XLSDataWriter;
import mx.com.inscitech.fiducia.util.XLSXDataWriter;

import mx.gob.nafin.fiduciario.BusinessException;
import mx.gob.nafin.fiduciario.business.services.GenericDataAccessService;
import mx.gob.nafin.fiduciario.common.beans.ErrorBean;

import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

import org.springframework.web.servlet.ModelAndView;

import weblogic.sqlserver.externals.com.google.gson.JsonElement;

/**
 * Clase que se encarga de ejecutar las consultas generiacas del sistema, definidas en el archivo
 * WEB-INF/modules/consultas.xml; cada consulta puede o no tener parametros, los cuales son procesados
 * por el servicio de acceso a datos @see mx.gob.nafin.fiduciario.business.services.GenericDataAccessService
 * Tambien son enviados como parametros los atributos que se encuentran en session, los cuales sobreescriben a
 * los de request.
 * @author Inscitech M�xico inscitech@inscitechmexico.com
 */
public class ConsultasController extends JsonActionController {

    Class[] proceadureClasses = new Class[] { OperacionesBienes.class, OperacionesDetalleBienes.class };
    private static HashMap<String, ProcedureInfo> processesMapping = new HashMap<>();

    protected GenericDataAccessService genericDataAccessService;

    private Map<String, Object> parametros;

    static {
        new ConsultasController().startup();
    }

    public void setGenericDataAccessService(GenericDataAccessService genericDataAccessService) {
        this.genericDataAccessService = genericDataAccessService;
    }

    public GenericDataAccessService getGenericDataAccessService() {
        return genericDataAccessService;
    }

    private void startup() {

        try {

            for (Class c : proceadureClasses) {
                for (Method m : c.getMethods()) {

                    ProceadureData pd = m.getAnnotation(ProceadureData.class);

                    if (pd != null && pd.id() != "") {

                        String methodID = pd.id();
                        String[] fields = pd.fields();

                        ArrayList<ParameterInfo> parameters = new ArrayList<>();

                        ProcedureInfo pi = new ProcedureInfo();
                        pi.setTheClass(c);
                        pi.setTheMethod(m);

                        Class[] pt = m.getParameterTypes();
                        for (int i = 0; i < pt.length; i++) {
                            parameters.add(new ParameterInfo(fields[i], pt[i]));
                        }

                        pi.setParameters(parameters);
                        processesMapping.put(methodID, pi);
                    }
                }
            }

        } catch (Exception e) {
            logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                       "Error loading Processes: " + e.getMessage());
        }

    }

    private void setParameterMapping(HttpServletRequest request) {
        JSONObject jsonObject = getJSONRequestObject(request);
        parametros = (Map) JSONObject.toBean(jsonObject, Map.class);
        setSessionAttributesAsParameters(request.getSession(), parametros);
    }

    /**
     * Metodo utilizado para ejecutar las consultas definidas en el archivo de consultas.
     * @throws java.lang.Exception
     * @return
     * @param response
     * @param request
     */
    public ModelAndView ejecutaConsulta(HttpServletRequest request, HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                   "Cadena JSON: " + request.getParameter("json"));

        try {
            setParameterMapping(request);
            List consulta = genericDataAccessService.ejecutaConsulta(parametros);
            return respondObject(response, consulta);

        } catch (BusinessException e) {
            response.setStatus(500);
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
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                   "Cadena JSON: " + request.getParameter("json"));

        try {
            setParameterMapping(request);

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
    public ModelAndView ejecutaProcedimiento(HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                   "Cadena JSON: " + request.getParameter("json"));

        try {
            setParameterMapping(request);
            return respondObject(response, genericDataAccessService.ejecutaProcedimiento(parametros));

        } catch (Exception e) {
            response.setStatus(500);
            return respondObject(response, jsonObjectFromError(e));
        }
    }

    /**
     * Metodo utilizado para ejecutar metodos de java de manera dinamica
     *
     * @throws java.lang.Exception
     * @return
     * @param response
     * @param request
     */
    public ModelAndView ejecutaMetodoJava(HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            setParameterMapping(request);
            String parameterId = parametros.get("id").toString();

            if (processesMapping.containsKey(parameterId)) {
                ProcedureInfo pi = processesMapping.get(parameterId);
                List<Object> paramArray = new ArrayList<>();

                for (ParameterInfo param : pi.getParameters()) {

                    Object rawValue = parametros.get(param.getId());

                    if (rawValue == null || rawValue instanceof JSONNull) {
                        paramArray.add(null);
                    } else {
                        String pv = String.valueOf(rawValue);

                        Class<?> type = param.getType();

                        if (DomainObject.class.isAssignableFrom(type)) {
                            Object modelObject = JSONObject.toBean(JSONObject.fromObject(pv), type);
                            paramArray.add(modelObject);
                        } else {
                            Object value = type.getConstructor(String.class).newInstance(pv);
                            paramArray.add(value);
                        }

                    }
                }

                Object procObj = pi.getTheClass().newInstance();
                Method method = pi.getTheMethod();

                Object result = method.invoke(procObj, paramArray.toArray());

                JSONObject responseObject = new JSONObject();
                responseObject.put("result", result);

                return respondObject(response, responseObject);
            }

            throw new Exception("Nombre de funcion no encontrado");

        } catch (Exception e) {
            response.setStatus(500);
            return respondObject(response, jsonObjectFromError(e));
        }
    }

    public ModelAndView ejecutaConsultaExcel(HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                   "Cadena JSON: " + request.getParameter("json"));

        response.setHeader("Cache-Control", "no-cache");

        ByteArrayOutputStream outByteStream = null;

        try {
            setParameterMapping(request);

            //TODO: Optimizar este codigo para que no de tantas vueltas la informacion... la mejor es: De base de datos a excel sin pasar por otros componentes
            List consulta = genericDataAccessService.ejecutaConsulta(parametros);

            String[] tableHeaders = new String[] { };
            if (request.getParameter("headers") != null) {
                tableHeaders = request.getParameter("headers").split(",");
            }

            boolean esXLSX = false;
            if (("" + request.getRequestURL()).indexOf("XLSX") != -1)
                esXLSX = true;

            if (esXLSX) {

                response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                response.setContentType("Content-Disposition: inline; filename=\"DatosFiduciarios.xlsx\""); //Content-Disposition: attachment; filename="DatosFiduciarios.xlsx"
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

    public ModelAndView ejecutaProcedimientoAsync(HttpServletRequest request,
                                                  HttpServletResponse response) throws Exception {
        logger.log(Thread.currentThread().getClass(), Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                   "Cadena JSON: " + request.getParameter("json"));

        ExecuteRefAsyncResponse responseObj = new ExecuteRefAsyncResponse();

        try {
            setParameterMapping(request);

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
