package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.Instrucc;

public class InstruccionesRepository {
    public InstruccionesRepository() {
        super();
    }

    public Instrucc findInstruccionPorFolioDeOperacion(BigDecimal folioOperacion) {
        Instrucc instruccion = new Instrucc();
        instruccion.setInsNumFolioInst(folioOperacion);

        return (Instrucc) instruccion.selectAsObject();
    }
}
