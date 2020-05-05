package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import java.util.Arrays;
import java.util.List;

import mx.com.inscitech.fiducia.domain.FLiquidacionesBienes;

public class LiquidacionesBienesRepository {
    public LiquidacionesBienesRepository() {
        super();
    }

    public FLiquidacionesBienes findByPK(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idGarantia,
                                         BigDecimal idBienGarantia, BigDecimal idLiquidacion) {
        FLiquidacionesBienes liquidacionBien =
            new FLiquidacionesBienes(idFideicomiso, idSubcuenta, idGarantia, idBienGarantia, idLiquidacion);
        return (FLiquidacionesBienes) liquidacionBien.selectAsObject();
    }

    public Integer getNumeroDePagos(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idGarantia,
                                    BigDecimal idBienGarantia) {

        String query =
            "SELECT count(*) as totalPagos FROM F_LIQUIDACIONES_BIENES WHERE FLB_ID_FIDEICOMISO = ? AND FLB_ID_SUBCUENTA = ?" +
            " AND FLB_ID_GARANTIA = ?  AND FLB_ID_BIEN_GARANTIA = ?";
        List<Object> parameters = Arrays.asList(idFideicomiso, idSubcuenta, idGarantia, idBienGarantia);

        return DBUtils.getQueryAsModel(query, parameters, e -> Integer.valueOf(e.getString("totalPagos")));
    }

    public void insert(FLiquidacionesBienes liqudacion) {
        liqudacion.doInsert();
    }
}
