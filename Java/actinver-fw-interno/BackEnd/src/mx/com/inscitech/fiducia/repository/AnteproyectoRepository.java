package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import java.util.Arrays;

import mx.com.inscitech.fiducia.domain.Anteproy;

public class AnteproyectoRepository {
    public AnteproyectoRepository() {
        super();
    }

    public Anteproy findByPK(BigDecimal numAnteproyecto) {
        return (Anteproy) new Anteproy(numAnteproyecto).selectAsObject();
    }

    public BigDecimal findMonedaPorFideicomiso(BigDecimal idFideicomiso) {
        String query = String.join("SELECT MON_NUM_PAIS as numMoneda \n", //
                                   "FROM ANTEPROY \n", //
                                   " INNER JOIN MONEDAS \n", //
                                   "ON MON_NOM_MONEDA = ANT_MONEDA \n", //
                                   "WHERE ANT_NUM_CONTRATO = ?;");

        return DBUtils.getQueryAsModel(query, Arrays.asList(idFideicomiso),
                                       e -> BigDecimal.valueOf(Integer.valueOf(e.getString("numMoneda"))));
    }

    public void save(Anteproy anteproyecto) {
        anteproyecto.doUpdate();
    }
}
