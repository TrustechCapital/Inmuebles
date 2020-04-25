package mx.gob.nafin.fiduciario.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import mx.com.inscitech.fiducia.common.services.LoggingService;

import mx.gob.nafin.fiduciario.BusinessException;
import mx.gob.nafin.fiduciario.business.reportes.processors.BaseProcessor;
import mx.gob.nafin.fiduciario.common.beans.ErrorBean;
import mx.com.inscitech.fiducia.common.util.ReflectionUtils;

import net.sf.json.JSONObject;

import org.apache.fop.apps.FOUserAgent;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.MimeConstants;

import org.springframework.web.servlet.ModelAndView;


/**
 * Controller encargado de la generacion de reportes.
 * @author Gerardo Hernandez Rojas gerardohr09@gmail.com
 */
public class ReportesController extends ConsultasController {

    private static final LoggingService LOG;
    
    static {
        LOG = LoggingService.getNewInstance();    
    }
    
    public ReportesController() {
        super();
    }

    /**
     * Metodo utilizado para ejecutar las consultas definidas en el archivo de consultas.
     * @throws java.lang.Exception
     * @return
     * @param response
     * @param request
     */
    public ModelAndView imprimirReporte(HttpServletRequest request, HttpServletResponse response) throws Exception {
        
        LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "imprimirReporte");
        
        try {
            
            JSONObject jsonObject = getJSONRequestObject(request);
            Map parametros = (Map) JSONObject.toBean(jsonObject, Map.class);
            setSessionAttributesAsParameters(request.getSession(), parametros);

            LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "jsonObject: " + jsonObject + " parametros: " + parametros);

            List consulta = null;

            boolean dontTakeParameters = parametros.get("takeParameters") == null;
            boolean sendToJSP = parametros.get("sendToJSP") != null;
            String urlReporte = ""+parametros.get("urlReporte");

            LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "dontTakeParameters: " + dontTakeParameters + " sendToJSP: " + sendToJSP + " urlReporte: " + urlReporte);

            if (dontTakeParameters) {
                consulta = genericDataAccessService.ejecutaQuery(parametros);
            } else {
                consulta = genericDataAccessService.ejecutaConsulta(parametros);
            }
            
            LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "consulta: " + consulta);
            
            if (sendToJSP) {
                request.setAttribute("consulta", consulta);
                request.getRequestDispatcher(urlReporte).include(request, response);
                return null;
            }
            
            LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "No se enviara al JSP. Continua...");

            String consultaProcessor = "mx.gob.nafin.fiduciario.business.reportes.processors.impl.";
            consultaProcessor += parametros.get("XmlProcessor") == null ? "GenericProcessor" : (String) parametros.get("XmlProcessor");

            LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "consultaProcessor: " + consultaProcessor);
            
            BaseProcessor xmlProcessor = (BaseProcessor) new ReflectionUtils().getClass(consultaProcessor).newInstance();
            ByteArrayOutputStream xmlReporte = xmlProcessor.getXmlReporte(consulta, parametros);

            LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "XML: " + new String(xmlReporte.toByteArray()));

            String ext = parametros.get("extencionReporte") == null ? ".pdf" : (String) parametros.get("extencionReporte");
            String nombreReporte = (parametros.get("nombreReporte") == null ? "Reporte" : (String) parametros.get("nombreReporte")) + ext;
            String archivoXSLT = (String) parametros.get("template");
            String rutaXSLT = this.getServletContext().getRealPath(archivoXSLT);

            TransformerFactory factory = null;
            FopFactory fopFactory = null;
            Transformer transformer = null;
            Fop fop = null;

            ByteArrayOutputStream xmlFO = null;
            ByteArrayOutputStream pdfSalida = null;

            byte[] result = null;

            try {

                xmlFO = convertXML2FO(new ByteArrayInputStream(xmlReporte.toByteArray()), new File(rutaXSLT));

                fopFactory = FopFactory.newInstance();
                FOUserAgent foUserAgent = fopFactory.newFOUserAgent();

                pdfSalida = new ByteArrayOutputStream();

                fop = fopFactory.newFop(MimeConstants.MIME_PDF, foUserAgent, pdfSalida);

                factory = TransformerFactory.newInstance();
                transformer = factory.newTransformer();

                LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "XML FOP: " + new String(xmlFO.toByteArray()));

                ByteArrayInputStream fo = new ByteArrayInputStream(xmlFO.toByteArray());
                Source src = new StreamSource(fo);

                Result res = new SAXResult(fop.getDefaultHandler());

                LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "ext: " + ext);
                
                if (ext.equalsIgnoreCase(".xls")) { //para excel
                    //ByteArrayOutputStream Salida = null;
                    //Salida = new ByteArrayOutputStream();
                    //Salida = xmlFO.   .toByteArray();
                    String Plantilla = null, xml = null;
                    String[][] Valores = null;
                    Valores = new String[200][2];
                    String Cadaux = null;
                    int contreng = 0;
                    Plantilla = xmlFO.toString();
                    xml = xmlReporte.toString();
                    Cadaux = "";
                    //empieza el ciclo para determinar las variables y valores en el xml
                    int i = xml.indexOf("<RowInfo>") + 9;
                    do {
                        if (!xml.substring(i, i + 1).equalsIgnoreCase(">")) //se almacena la variable
                            Cadaux = Cadaux + xml.substring(i, i + 1);
                        else if (xml.substring(i, i + 1).equals(">")) {
                            if (Cadaux.trim()
                                      .toUpperCase()
                                      .compareTo("</ROWINFO") == 0) {
                                break;
                                //i+=10;
                                //Cadaux="";
                                //continue;
                            }
                            Cadaux = Cadaux + xml.substring(i, i + 1);
                            Valores[contreng][0] = Cadaux;
                            //se determina el valor de la variable
                            i++;
                            if (i >= xml.length())
                                break;
                            if (Cadaux.trim()
                                      .toUpperCase()
                                      .compareTo("ADITIONALINF") == 0)
                                break;
                            Valores[contreng][1] = xml.substring(i, i + xml.substring(i).indexOf("</"));
                            i += Cadaux.length() + Valores[contreng][1].length();
                            Cadaux = "";
                            contreng++;
                        }
                        i++;
                    } while (i < xml.length());
                    //se procede a reemplazar las variables por los valores del arreglo
                    for (i = 0; i < contreng; i++) {
                        Valores[i][0] = Valores[i][0].replaceAll("<", "");
                        Valores[i][0] = Valores[i][0].replaceAll(">", "<");
                        //Valores[i][1]=Valores[i][1].replaceAll(" ","");
                        Valores[i][1] = Valores[i][1] + "<";
                    }
                    for (i = 0; i < contreng; i++)
                        Plantilla = Plantilla.replaceAll(Valores[i][0], Valores[i][1]);
                    result = Plantilla.getBytes();
                    //result = xmlFO.toByteArray();
                } else //para pdf
                {
                    transformer.transform(src, res);
                    result = pdfSalida.toByteArray();
                }


                //fopFactory.getImageFactory().clearCaches();

                if (ext.equalsIgnoreCase(".xls")) { //para excel
                    response.setContentType("application/vnd.ms-excel");
                } else { //para pdf
                    response.setContentType("application/pdf");
                }
                
                response.setHeader("Content-Disposition", "attachment; filename=\"" + nombreReporte + "\"");

                response.setContentLength(result.length);
                response.getOutputStream().write(result);

            } catch (Exception e) {
                LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
                throw new BusinessException("500", "No fue posible generar el reporte solicitado!");
            } finally {

                if (xmlFO != null)
                    xmlFO.close();
                if (pdfSalida != null)
                    pdfSalida.close();

                pdfSalida = null;
                xmlFO = null;
                fopFactory = null;
                fop = null;
                factory = null;
                transformer = null;
            }
            
        } catch (BusinessException e) {
            LOG.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
            return respondObject(response, new ErrorBean(ErrorBean.ERROR, e.getErrorCode(), e.getErrorMessage()));
        }

        return null;
    }

    /**
     * Metodo que se encarga de convertir un XML de FOP a PDF
     * @throws javax.xml.transform.TransformerException Cuando ocurre un error al realizar la conversion a PDF.
     * @throws javax.xml.transform.TransformerConfigurationException Cuando la configuracion de la implementacion de la clase de Transformacion o un error de configuracion ocurre.
     * @return Un arreglo de Bytes que representan el Archivo PDF.
     * @param xslt El archivo XSLT con el cual se realizara la transformacion.
     * @param xml El archivo XML a transformar en FOP
     */
    private ByteArrayOutputStream convertXML2FO(ByteArrayInputStream xml, File xslt) throws TransformerConfigurationException, TransformerException {
        ByteArrayOutputStream xmlFO = null;

        try {

            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer(new StreamSource(xslt));

            Source src = new StreamSource(xml);

            xmlFO = new ByteArrayOutputStream();

            Result res = new StreamResult(xmlFO);

            transformer.transform(src, res);
            
        } finally {
            //xmlFO.close();
        }

        return xmlFO;
    }
}
