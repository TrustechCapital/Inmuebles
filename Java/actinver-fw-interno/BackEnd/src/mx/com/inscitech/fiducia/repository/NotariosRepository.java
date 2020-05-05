package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.Notarios;

public class NotariosRepository {
    public NotariosRepository() {
        super();
    }

    public Notarios findByPK(BigDecimal numNotario) {
        return (Notarios) new Notarios(numNotario).selectAsObject();
    }
}
