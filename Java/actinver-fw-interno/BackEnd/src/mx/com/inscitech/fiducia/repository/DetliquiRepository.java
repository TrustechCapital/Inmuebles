package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.Detliqui;

public class DetliquiRepository {
    public DetliquiRepository() {
        super();
    }

    public Detliqui findDepositoPorFolioDeOperacion(BigDecimal folioOperacion) {
        Detliqui detliqui = new Detliqui();
        detliqui.setDelFolioOpera(folioOperacion);

        return (Detliqui) detliqui.selectAsObject();
    }

    public BigDecimal getMonedaDepositoPorFolioDeOperacion(BigDecimal folioOperacion) {
        Detliqui detliqui = findDepositoPorFolioDeOperacion(folioOperacion);
        return detliqui == null ? null : detliqui.getDelNumMoneda();
    }
}
