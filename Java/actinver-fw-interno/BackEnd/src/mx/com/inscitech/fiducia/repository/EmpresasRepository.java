package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.FEmpresa;

public class EmpresasRepository {
    public EmpresasRepository() {
        super();
    }

    public FEmpresa findByPk(BigDecimal numEmpresa) {
        FEmpresa bien = new FEmpresa(numEmpresa);
        return (FEmpresa) bien.selectAsObject();
    }
}
