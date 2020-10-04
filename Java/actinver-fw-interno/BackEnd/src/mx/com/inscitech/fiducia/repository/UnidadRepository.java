package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.FAdquirentes;
import mx.com.inscitech.fiducia.domain.FUnidades;

public class UnidadRepository {
    public UnidadRepository() {
        super();
    }

    public FUnidades findByPk(BigDecimal fideicomiso, BigDecimal subcuenta, BigDecimal idBien, String edificio,
                              String depto) {
        FUnidades unidad = new FUnidades(fideicomiso, subcuenta, idBien, edificio, depto);
        return (FUnidades) unidad.selectAsObject();
    }

    public void insert(FUnidades unidad) {
        unidad.doInsert();
    }

    public void update(FUnidades unidad) {
        unidad.doUpdate();
    }

}
