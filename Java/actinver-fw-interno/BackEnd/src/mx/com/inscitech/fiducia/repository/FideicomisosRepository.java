package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import java.util.Arrays;

public class FideicomisosRepository {
    public FideicomisosRepository() {
        super();
    }

    // TODO: Verificar si no se necesita el parametro numProyecto
    public Integer getSecuencialFideicomiso(BigDecimal numProyecto) {
        String query = String.join("SELECT MAX(COALESCE(FSF_NUM_SECUENCIAL, 0)) + 1 as secuencial \n", //
                                   "FROM F_SECUENCIAL_FIDEICOMISO \n", //
                                   "WHERE FSF_ID_CVE_FIDEICOMISO = 'PROYECTO';");

        return DBUtils.getQueryAsModel(query, e -> Integer.valueOf(e.getString("secuencial")));
    }

    public void asignaNumeroFideicomiso(BigDecimal numFideicomiso) {
        String query = String.join("UPDATE F_SECUENCIAL_FIDEICOMISO \n", //
                                   "SET FSF_NUM_SECUENCIAL = ? \n", //
                                   "WHERE FSF_ID_CVE_FIDEICOMISO = 'PROYECTO';");

        DBUtils.executeUpdate(query, Arrays.asList(numFideicomiso));

    }
}
