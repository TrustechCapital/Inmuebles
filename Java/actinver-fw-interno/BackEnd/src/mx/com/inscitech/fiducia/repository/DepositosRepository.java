package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.Deposit;

public class DepositosRepository {
    public DepositosRepository() {
        super();
    }

    public Deposit findDepositoPorFolioDeOperacion(BigDecimal folioOperacion) {
        Deposit deposito = new Deposit();
        deposito.setDpoFolioOpera(folioOperacion);

        return (Deposit) deposito.selectAsObject();
    }

    public BigDecimal getMonedaDepositoPorFolioDeOperacion(BigDecimal folioOperacion) {
        Deposit deposito = findDepositoPorFolioDeOperacion(folioOperacion);
        return deposito == null ? null : deposito.getDpoNumMoneda();
    }
}
