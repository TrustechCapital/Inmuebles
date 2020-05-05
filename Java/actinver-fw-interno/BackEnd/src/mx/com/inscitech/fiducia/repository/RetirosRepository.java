package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import java.util.Arrays;
import java.util.List;

import mx.com.inscitech.fiducia.domain.FRetiro;
import mx.com.inscitech.fiducia.domain.FRetirosMasivos;

public class RetirosRepository {
    public RetirosRepository() {
        super();
    }

    public FRetiro findByPK(BigDecimal idRetiro) {
        return (FRetiro) new FRetiro(idRetiro).selectAsObject();
    }


    public List<FRetirosMasivos> getRetirosMasivosPorFolio(BigDecimal folio) {
        String query = String.join("SELECT * FROM F_RETIROS_MASIVOS WHERE FRMA_FOLIO = ?;");

        List<Object> parameters = Arrays.asList(folio);
        FRetirosMasivos retirosMasivos = new FRetirosMasivos();

        return DBUtils.getQueryAsList(query, parameters,
                                      e -> (FRetirosMasivos) retirosMasivos.transformDataRowtoObject(e));
    }


}
