package mx.gob.nafin.fiduciario.business.test;

import java.util.List;
import java.util.Map;
import mx.gob.nafin.fiduciario.BusinessException;

/**
 * Interfase de ejemplo para la implementacion de servicios
 * @author Inscitech México inscitech@inscitechmexico.com
 */
public interface EjemploServicio {
  public List ejecutaConsultaPaises() throws BusinessException;
  public List ejecutaConsultaAvanzada(Map parametros) throws BusinessException;
}