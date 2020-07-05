package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.Movimien;

public class MovimientosRepository {
    public MovimientosRepository() {
        super();
    }

    public Integer getNextId() {
        String query = String.join("\n", "SELECT COALESCE(MAX(MOV_FOLIO_OPERA), 0) + 1 as SECUENCIAL", //
                                   "FROM MOVIMIEN");

        return DBUtils.getQueryAsModel(query, e -> Integer.valueOf(e.getString("SECUENCIAL")));
    }

    public void insert(Movimien movimiento) {
        movimiento.doInsert();
    }
}
