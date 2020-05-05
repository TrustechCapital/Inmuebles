package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import java.util.Date;

public class MonedasRepository {
    public MonedasRepository() {
        super();
    }

    public BigDecimal getTipoCambioParaMoneda(BigDecimal numMoneda, Date fecha) {

        // TODO: impementar metodo que lea de tabla "tipocamb"

        // Moneda nacional
        return BigDecimal.valueOf(1);
    }
}
