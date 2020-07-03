package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.Feriados;
import mx.com.inscitech.fiducia.dml.GenericDML;
import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;

public class FeriadosRepository {
    public FeriadosRepository() {
        super();
    }
    public Feriados findByPK(BigDecimal mes, BigDecimal dia, BigDecimal anio, BigDecimal numPais){
        Feriados feriado = new Feriados(mes,dia,anio, numPais);
        return findFeriado(feriado);
    
    }
    public Feriados findFeriado(Feriados feriado){
        DMLObject dmlData = feriado.getSelect();
        GenericDML genericDML = new GenericDML();
        DataRow dataRow = genericDML.getDataRow(dmlData.getSql(), dmlData.getParameters());
        
        if(!dataRow.hasData()){
            return null;
        }
        return (Feriados) feriado.transformDataRowtoObject(dataRow);
    }
}
