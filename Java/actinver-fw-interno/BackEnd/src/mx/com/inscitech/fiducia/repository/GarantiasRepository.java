package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import java.util.List;

import java.util.stream.Collectors;

import mx.com.inscitech.fiducia.dml.GenericDML;
import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.dml.vo.DataSet;
import mx.com.inscitech.fiducia.domain.Claves;
import mx.com.inscitech.fiducia.domain.FGarantias;
import mx.com.inscitech.fiducia.domain.base.DMLObject;

public class GarantiasRepository {
    public GarantiasRepository() {
    }

    public FGarantias findByPk(BigDecimal fideicomiso, BigDecimal subcuenta, BigDecimal claveGarantia) {
        FGarantias garantia = new FGarantias(fideicomiso, subcuenta, claveGarantia);
        return (FGarantias) garantia.selectAsObject();
    }

    public List<FGarantias> findByFideicomisoYSubcuenta(BigDecimal fideicomiso, BigDecimal subcuenta) {
        FGarantias garantia = new FGarantias();
        garantia.setFgarIdFideicomiso(fideicomiso);
        garantia.setFgarIdSubcuenta(subcuenta);
        return findGarantias(garantia);
    }

    public void save(FGarantias garantia) {
        garantia.doUpdate();
    }

    public void saveForHistory(FGarantias garantia) {
        GenericDML genericDML = new GenericDML();
        DMLObject dmlData = garantia.getHistoryInsert();

        genericDML.executeUpdate(dmlData.getSql(), dmlData.getParameters());
    }

    private List<FGarantias> findGarantias(FGarantias garantia) {
        DMLObject dmlData = garantia.getSelect();

        GenericDML genericDML = new GenericDML();

        DataSet dataSet = genericDML.getDataSet(dmlData.getSql(), dmlData.getParameters());
        List<DataRow> dataList = dataSet.getArDatos();

        return dataList.stream()
                       .map(row -> (FGarantias) FGarantias.transformDataRowtoObject(row))
                       .collect(Collectors.toList());
    }
}
