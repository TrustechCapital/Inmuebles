package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import java.util.Arrays;

import java.util.List;

import mx.com.inscitech.fiducia.domain.FPagosBienes;

public class PagosBienesRepository {
    public PagosBienesRepository() {
        super();
    }

    public FPagosBienes findByPK(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idGarantia,
                                 BigDecimal idCobro, BigDecimal idBienGarantia) {
        FPagosBienes pagoBien = new FPagosBienes(idFideicomiso, idSubcuenta, idGarantia, idCobro, idBienGarantia);
        return (FPagosBienes) pagoBien.selectAsObject();
    }

    public Integer getNumeroDePagos(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idGarantia,
                                    BigDecimal idBienGarantia) {

        String query =
            "SELECT count(*) from totalPagos FROM F_PAGOS_BIENES WHERE FPB_ID_FIDEICOMISO = ? AND FPB_ID_SUBCUENTA = ?" +
            " AND FPB_ID_GARANTIA = ?  AND FPB_ID_BIEN_GARANTIA = ?";
        List<Object> parameters = Arrays.asList(idFideicomiso, idSubcuenta, idGarantia, idBienGarantia);

        return DBUtils.getQueryAsModel(query, parameters, e -> Integer.valueOf(e.getString("totalPagos")));
    }

    public void insert(FPagosBienes pagoBien) {
        pagoBien.doInsert();
    }

    public void delete(FPagosBienes pagoBien) {
        pagoBien.doDelete();
    }
}
