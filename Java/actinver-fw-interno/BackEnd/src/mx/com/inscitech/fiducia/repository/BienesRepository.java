package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.FBienes;

public class BienesRepository {
    public BienesRepository() {
    }

    public FBienes findByPk(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idTipoBien, String claveBien,
                            String idBien) {
        FBienes bien = new FBienes(idFideicomiso, idSubcuenta, idTipoBien, claveBien, idBien);
        return (FBienes) bien.selectAsObject();
    }

    public void insert(FBienes bien) {
        bien.doInsert();
    }

    public void save(FBienes bien) {
        bien.doUpdate();
    }

    public void delete(FBienes bien) {
        bien.doDelete();
    }
}
