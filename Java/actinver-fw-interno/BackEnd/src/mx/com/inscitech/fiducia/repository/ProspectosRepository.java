package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.Prospect;

public class ProspectosRepository {
    public ProspectosRepository() {
        super();
    }

    public Prospect findByPK(BigDecimal numProspecto) {
        return (Prospect) new Prospect(numProspecto).selectAsObject();
    }

    public void save(Prospect prospecto) {
        prospecto.doUpdate();
    }
}
