package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.FAdquirentes;
import mx.com.inscitech.fiducia.domain.FUnidades;

public class UnidadRepository {
    public UnidadRepository() {
        super();
    }

    public FUnidades findByPk(BigDecimal fideicomiso, BigDecimal subcuenta, String bien, String depto) {
        FUnidades unidad = new FUnidades(fideicomiso, subcuenta, bien, depto);
        return (FUnidades) unidad.selectAsObject();
    }

    public void insert(FUnidades unidad) {
        unidad.doInsert();
    }

    public void update(FUnidades unidad) {
        unidad.doUpdate();
    }

}
