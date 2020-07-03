package mx.com.inscitech.fiducia.repository;

import mx.com.inscitech.fiducia.domain.FBienes;
import mx.com.inscitech.fiducia.domain.Feccont;

public class FechaContableRepository {
    public FechaContableRepository() {
        super();
    }
    public Feccont getFecha(String fcoCveTipoFecha){
        
        Feccont fecha = new Feccont(fcoCveTipoFecha);
        return (Feccont)fecha.selectAsObject();
    }
    public void update(Feccont fechaContable) {
        fechaContable.doUpdate();
    }

}
