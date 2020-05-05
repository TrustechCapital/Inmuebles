package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.FBienesgar;

public class BienesGarantiasRepository {
    public BienesGarantiasRepository() {
        super();
    }

    public FBienesgar findByPk(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idGarantia) {
        FBienesgar bienesGarantia = new FBienesgar(idFideicomiso, idSubcuenta, idGarantia);
        return (FBienesgar) bienesGarantia.selectAsObject();
    }

    public void insert(FBienesgar bienesGarantia) {
        bienesGarantia.doInsert();
    }

    public void save(FBienesgar bienesGarantia) {
        bienesGarantia.doUpdate();
    }

    public void delete(FBienesgar bienesGarantia) {
        bienesGarantia.doDelete();
    }
}
