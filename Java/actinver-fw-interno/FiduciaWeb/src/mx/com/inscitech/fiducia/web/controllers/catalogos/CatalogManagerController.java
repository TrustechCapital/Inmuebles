package mx.com.inscitech.fiducia.web.controllers.catalogos;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.beans.CatalogInfoBean;
import mx.com.inscitech.fiducia.beans.ErrorBean;
import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.util.ReflectionUtils;
import mx.com.inscitech.fiducia.domain.base.DomainHelper;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.web.controllers.JsonActionController;

import net.sf.json.JSONObject;

import org.springframework.web.servlet.ModelAndView;

/**
 * Controller que se encarga de las operaciones de catalogos
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public class CatalogManagerController extends JsonActionController {

    /**
     * Metodo utilizado para obtener del request la instancia del objeto a trabajar, mismo que es
     * generado a partir de la cadena JavaScript (JSON) que envia el cliente, por lo que dicho elemento
     * tiene ya los valores asignados segun sea necesarios para el tipo de operacion.
     * @return Una instancia del objeto a trabajar
     * @param request El request Http del cliente que contiene la cadena JSON del objeto con la informacion
     * necesaria para crear una instancia del objeto.
     */
    private Object getCatalogObject(HttpServletRequest request) { //private DomainObject getCatalogObject(HttpServletRequest request) {

        Object returnObject = null;
        DomainHelper helper = null;

        CatalogInfoBean catalogo = null;
        Object catalogInstance = null;

        JSONObject jsonCatalog = null;
        JSONObject jsonObject = null;

        ReflectionUtils reflection = new ReflectionUtils();

        jsonObject = getJSONRequestObject(request);

        catalogo = (CatalogInfoBean) JSONObject.toBean(jsonObject, CatalogInfoBean.class);

        jsonCatalog = JSONObject.fromObject(catalogo.getCatalogo());

        returnObject = JSONObject.toBean(JSONObject.fromObject(jsonCatalog), reflection.getClass(catalogo.getClaseCatalogo()));

        if (returnObject instanceof DomainHelper) {
            try {
                helper = (DomainHelper) reflection.getClass(catalogo.getClaseCatalogo()).newInstance();
                helper.setDatePattern(catalogo.getDateFormat());

                ((DomainHelper) returnObject).setDatePattern(catalogo.getDateFormat()); // TODO: What For?
                catalogInstance = ((DomainHelper) returnObject).getHelperClass().newInstance();
                reflection.cloneDomainObjectFromHelper((DomainHelper) returnObject, catalogInstance);

            } catch (Exception e) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
            }
        } else {
            helper = null;
        }


        return returnObject;
    }

    /**
     * Metodo que se encarga de obtener un elemento del catalogo basandose en el ID de la entidad
     * @throws java.lang.Exception Cuando no es posible obtener el elemento del catalogo
     * @return El objeto que contiene la informacion sobre el catalogo
     * @param response El response de http que se le envia al cliente, en este caso, una cadena de definicion de objeto JavaScript
     * @param request La peticion http del cliente con la informacion necesaria para obtener un elemento del catalogo, en este caso
     * la informacion de la llave primaria
     */
    public ModelAndView getItemCatalogo(HttpServletRequest request, HttpServletResponse response) throws Exception {
        DomainObject catalogoInstance = (DomainObject) getCatalogObject(request);

        try {

            catalogoInstance = (DomainObject) catalogoInstance.selectAsObject();

        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
        }

        return respondObject(response, catalogoInstance);
    }

    /**
     * Metodo utilizado para dar de alta una nueva entidad dentro del catalogo solicitado, en este caso el catalogo asociado a la clase
     * definida el el objeto @see mx.com.inscitech.fiducia.beans.CatalogInfoBean que se debe de enviar como parte de la cadena json
     * @throws java.lang.Exception Cuando no es posible dar de alta el elemento
     * @return Un bean de error @see mx.com.inscitech.fiducia.beans.ErrorBean que indica el estado de la operacion dentro
     * de la cadena de dejinicion de objeto JavaScript
     * @param response El response de http que se le envia al cliente, en este caso, una cadena de definicion de objeto JavaScript
     * @param request La peticion http del cliente con la informacion necesaria para dar de alta un elemento del catalogo
     */
    public ModelAndView altaCatalogo(HttpServletRequest request, HttpServletResponse response) throws Exception {

        DomainObject catalogoInstance = (DomainObject) getCatalogObject(request);

        ErrorBean responseBean = null;

        try {

            if (catalogoInstance.doInsert())
                responseBean = ErrorBean.ERROR_SUCCESS;

        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
            responseBean = new ErrorBean(ErrorBean.ERROR, e.toString(), "");
        }

        return respondObject(response, responseBean);
    }

    /**
     * Metodo utilizado para dar de baja una entidad dentro del catalogo solicitado, en este caso el catalogo asociado a la clase
     * definida el el objeto @see mx.com.inscitech.fiducia.beans.CatalogInfoBean que se debe de enviar como parte de la cadena json
     * @throws java.lang.Exception Cuando no es posible dar de baja el elemento
     * @return Un bean de error @see mx.com.inscitech.fiducia.beans.ErrorBean que indica el estado de la operacion dentro
     * de la cadena de dejinicion de objeto JavaScript
     * @param response El response de http que se le envia al cliente, en este caso, una cadena de definicion de objeto JavaScript
     * @param request La peticion http del cliente con la informacion necesaria para dar de baja un elemento del catalogo
     */
    public ModelAndView bajaCatalogo(HttpServletRequest request, HttpServletResponse response) throws Exception {

        DomainObject catalogoInstance = (DomainObject) getCatalogObject(request);

        ErrorBean responseBean = null;

        try {

            if (catalogoInstance.doDelete())
                responseBean = ErrorBean.ERROR_SUCCESS;

        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
            responseBean = new ErrorBean(ErrorBean.ERROR, e.toString(), "");

        }

        return respondObject(response, responseBean);
    }

    /**
     * Metodo utilizado para modificar una entidad dentro del catalogo solicitado, en este caso el catalogo asociado a la clase
     * definida el el objeto @see mx.com.inscitech.fiducia.beans.CatalogInfoBean que se debe de enviar como parte de la cadena json
     * @throws java.lang.Exception Cuando no es posible modificar el elemento
     * @return Un bean de error @see mx.com.inscitech.fiducia.beans.ErrorBean que indica el estado de la operacion dentro
     * de la cadena de dejinicion de objeto JavaScript
     * @param response El response de http que se le envia al cliente, en este caso, una cadena de definicion de objeto JavaScript
     * @param request La peticion http del cliente con la informacion necesaria para modificar un elemento del catalogo
     */
    public ModelAndView modificaCatalogo(HttpServletRequest request, HttpServletResponse response) throws Exception {

        DomainObject catalogoInstance = (DomainObject) getCatalogObject(request);
        DomainObject itemCatalogo = null;

        ErrorBean responseBean = null;

        ReflectionUtils reflection = new ReflectionUtils();

        try {

            itemCatalogo = (DomainObject) catalogoInstance.selectAsObject();
            reflection.assignValues(catalogoInstance, itemCatalogo);

            catalogoInstance.doUpdate();
            responseBean = ErrorBean.ERROR_SUCCESS;

        } catch (Exception e) {

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);
            responseBean = new ErrorBean(ErrorBean.ERROR, e.toString(), "");

        } finally {
            reflection = null;
        }

        return respondObject(response, responseBean);
    }
}
