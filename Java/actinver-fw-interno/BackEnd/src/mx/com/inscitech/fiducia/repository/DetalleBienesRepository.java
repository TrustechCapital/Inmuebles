package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import java.util.Arrays;

import mx.com.inscitech.fiducia.domain.FBienesgar;

public class DetalleBienesRepository {
    public DetalleBienesRepository() {
        super();
    }

    public FBienesgar findByPk(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idDetalleBien) {
        FBienesgar detalleBien = new FBienesgar(idFideicomiso, idSubcuenta, idDetalleBien);
        return (FBienesgar) detalleBien.selectAsObject();
    }

    private Integer getNexId(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idTipoBien) {

        String query = String.join("\n", "SELECT COALESCE(MAX(FORS_ID_GARANTIA), 0) + 1 as SECUENCIAL ", //
                                   "FROM F_BIENESGAR ", //
                                   "WHERE FGRS_ID_FIDEICOMISO = ? ", //
                                   "AND FGRS_ID_SUBCUENTA = ? ", //
                                   "AND FORS_CVE_TIPO_GARANTIA = ?");

        return DBUtils.getQueryAsModel(query, Arrays.asList(idFideicomiso, idSubcuenta, idTipoBien),
                                       e -> Integer.valueOf(e.getString("SECUENCIAL")));
    }

    public Integer insert(FBienesgar detalleBien) {
        Integer nextId =
            getNexId(detalleBien.getFgrsIdFideicomiso(), detalleBien.getFgrsIdSubcuenta(),
                     detalleBien.getForsCveTipoGarantia());
        detalleBien.setForsIdGarantia(BigDecimal.valueOf(nextId));
        detalleBien.doInsert();
        return nextId;
    }

    public void save(FBienesgar detalleBien) {
        detalleBien.doUpdate();
    }

    public void delete(FBienesgar detalleBien) {
        detalleBien.doDelete();
    }
}
