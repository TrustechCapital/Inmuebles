package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

public class FoliosRepository {
    public FoliosRepository() {
        super();
    }

    public BigDecimal generaFolio() {
        return BigDecimal.valueOf(1000);
    }
}
