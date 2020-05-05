package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.dml.GenericDML;
import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.Claves;
import mx.com.inscitech.fiducia.domain.Notarios;
import mx.com.inscitech.fiducia.domain.base.DMLObject;

public class ClavesRepository {
    public ClavesRepository() {
        super();
    }

    public Claves findByPK(BigDecimal numClave, BigDecimal secuencialClave) {
        Claves clave = new Claves(numClave, secuencialClave);
        return findClave(clave);
    }

    public Claves findClaveByNumeroYDescripcion(BigDecimal numClave, String descripcionClave) {
        Claves clave = new Claves();
        clave.setCveNumClave(numClave);
        clave.setCveDescClave(descripcionClave);

        return findClave(clave);
    }


    private Claves findClave(Claves clave) {
        DMLObject dmlData = clave.getSelect();

        GenericDML genericDML = new GenericDML();
        DataRow dataRow = genericDML.getDataRow(dmlData.getSql(), dmlData.getParameters());

        if (!dataRow.hasData()) {
            return null;
        }

        return (Claves) clave.transformDataRowtoObject(dataRow);
    }
}
