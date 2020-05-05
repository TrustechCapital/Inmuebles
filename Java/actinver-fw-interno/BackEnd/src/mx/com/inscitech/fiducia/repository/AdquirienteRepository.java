package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.FAdquirentes;

public class AdquirienteRepository {
    public AdquirienteRepository() {}
    
    public FAdquirentes findByPk(BigDecimal fideicomiso, BigDecimal subcuenta, String bien,
                                                   String depto, BigDecimal venta) {
        FAdquirentes adquiriente = new FAdquirentes(fideicomiso, subcuenta, bien, depto, venta);
        return (FAdquirentes) adquiriente.selectAsObject();
    }
    
    public void save(FAdquirentes adquirente){
        adquirente.doUpdate();
    }
}
