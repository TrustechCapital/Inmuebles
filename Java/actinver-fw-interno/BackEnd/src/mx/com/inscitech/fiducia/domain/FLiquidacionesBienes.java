package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.Arrays;
import java.util.Date;

import java.util.List;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "F_LIQUIDACIONES_BIENES_PK",
            columns =
            { "FLB_ID_FIDEICOMISO", "FLB_ID_SUBCUENTA", "FLB_ID_GARANTIA", "FLB_ID_BIEN_GARANTIA", "FLB_ID_LIQUIDACION"
    }, sequences = { "MANUAL" })
public class FLiquidacionesBienes extends DomainObject {

    private BigDecimal flbIdFideicomiso;
    private BigDecimal flbIdSubcuenta;
    private BigDecimal flbIdGarantia;
    private BigDecimal flbIdBienGarantia;
    private BigDecimal flbIdLiquidacion;
    private BigDecimal flbImporte;
    private BigDecimal flbCveMoneda;
    private BigDecimal flbTipoCambio;
    private BigDecimal flbImporteExt;
    private Date flbFecha;
    private String flbComentario;
    private BigDecimal flbAfecta;

    public FLiquidacionesBienes() {
        super();
        this.pkColumns = 5;
    }


    public FLiquidacionesBienes(BigDecimal flbIdFideicomiso, BigDecimal flbIdSubcuenta, BigDecimal flbIdGarantia,
                                BigDecimal flbIdBienGarantia, BigDecimal flbIdLiquidacion) {
        super();
        this.pkColumns = 5;
        this.flbIdFideicomiso = flbIdFideicomiso;
        this.flbIdSubcuenta = flbIdSubcuenta;
        this.flbIdGarantia = flbIdGarantia;
        this.flbIdBienGarantia = flbIdBienGarantia;
        this.flbIdLiquidacion = flbIdLiquidacion;
    }


    @Override
    public Object selectAsObject() {
        DataRow objectData = selectAsDataRow();

        if (!objectData.hasData()) {
            return null;
        }
        return transformDataRowtoObject(objectData);
    }

    public Object transformDataRowtoObject(DataRow dataRow) {
        FLiquidacionesBienes result = new FLiquidacionesBienes();

        result.setFlbIdFideicomiso((BigDecimal) dataRow.getData("FLB_ID_FIDEICOMISO"));
        result.setFlbIdSubcuenta((BigDecimal) dataRow.getData("FLB_ID_SUBCUENTA"));
        result.setFlbIdGarantia((BigDecimal) dataRow.getData("FLB_ID_GARANTIA"));
        result.setFlbIdBienGarantia((BigDecimal) dataRow.getData("FLB_ID_BIEN_GARANTIA"));
        result.setFlbIdLiquidacion((BigDecimal) dataRow.getData("FLB_ID_LIQUIDACION"));
        result.setFlbImporte((BigDecimal) dataRow.getData("FLB_IMPORTE"));
        result.setFlbCveMoneda((BigDecimal) dataRow.getData("FLB_CVE_MONEDA"));
        result.setFlbTipoCambio((BigDecimal) dataRow.getData("FLB_TIPO_CAMBIO"));
        result.setFlbImporteExt((BigDecimal) dataRow.getData("FLB_IMPORTE_EXT"));
        result.setFlbFecha((Date) dataRow.getData("FLB_FECHA"));
        result.setFlbComentario((String) dataRow.getData("FLB_COMENTARIO"));
        result.setFlbAfecta((BigDecimal) dataRow.getData("FLB_AFECTA"));

        return result;
    }

    @Override
    public boolean doCompare(Object compareWith) {
        // TODO Implement this method
        return false;
    }

    @Override
    public boolean validate() {
        // TODO Implement this method
        return false;
    }

    @Override
    public DMLObject getSelect() {
        // TODO Implement this method
        return null;
    }

    @Override
    public DMLObject getSelectByPK() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();

        String sql =
            "SELECT * FROM F_LIQUIDACIONES_BIENES WHERE FLB_ID_FIDEICOMISO = ? AND FLB_ID_SUBCUENTA = ?" +
            " AND FLB_ID_GARANTIA = ? AND FLB_ID_BIEN_GARANTIA = ? AND FLB_ID_LIQUIDACION = ?";

        List<Object> parameters =
            Arrays.asList(this.flbIdFideicomiso, this.flbIdSubcuenta, this.flbIdGarantia, this.flbIdBienGarantia,
                          this.flbIdLiquidacion);

        result.setSql(sql);
        result.setParameters(parameters.toArray());

        return result;
    }

    @Override
    public DMLObject getInsert() {
        // TODO Implement this method
        return null;
    }

    @Override
    public DMLObject getUpdate() {
        // TODO Implement this method
        return null;
    }

    @Override
    public DMLObject getDelete() {
        // TODO Implement this method
        return null;
    }


    public void setFlbIdFideicomiso(BigDecimal flbIdFideicomiso) {
        this.flbIdFideicomiso = flbIdFideicomiso;
    }

    public BigDecimal getFlbIdFideicomiso() {
        return flbIdFideicomiso;
    }

    public void setFlbIdSubcuenta(BigDecimal flbIdSubcuenta) {
        this.flbIdSubcuenta = flbIdSubcuenta;
    }

    public BigDecimal getFlbIdSubcuenta() {
        return flbIdSubcuenta;
    }

    public void setFlbIdGarantia(BigDecimal flbIdGarantia) {
        this.flbIdGarantia = flbIdGarantia;
    }

    public BigDecimal getFlbIdGarantia() {
        return flbIdGarantia;
    }

    public void setFlbIdBienGarantia(BigDecimal flbIdBienGarantia) {
        this.flbIdBienGarantia = flbIdBienGarantia;
    }

    public BigDecimal getFlbIdBienGarantia() {
        return flbIdBienGarantia;
    }

    public void setFlbIdLiquidacion(BigDecimal flbIdLiquidacion) {
        this.flbIdLiquidacion = flbIdLiquidacion;
    }

    public BigDecimal getFlbIdLiquidacion() {
        return flbIdLiquidacion;
    }

    public void setFlbImporte(BigDecimal flbImporte) {
        this.flbImporte = flbImporte;
    }

    public BigDecimal getFlbImporte() {
        return flbImporte;
    }

    public void setFlbCveMoneda(BigDecimal flbCveMoneda) {
        this.flbCveMoneda = flbCveMoneda;
    }

    public BigDecimal getFlbCveMoneda() {
        return flbCveMoneda;
    }

    public void setFlbTipoCambio(BigDecimal flbTipoCambio) {
        this.flbTipoCambio = flbTipoCambio;
    }

    public BigDecimal getFlbTipoCambio() {
        return flbTipoCambio;
    }

    public void setFlbImporteExt(BigDecimal flbImporteExt) {
        this.flbImporteExt = flbImporteExt;
    }

    public BigDecimal getFlbImporteExt() {
        return flbImporteExt;
    }

    public void setFlbFecha(Date flbFecha) {
        this.flbFecha = flbFecha;
    }

    public Date getFlbFecha() {
        return flbFecha;
    }

    public void setFlbComentario(String flbComentario) {
        this.flbComentario = flbComentario;
    }

    public String getFlbComentario() {
        return flbComentario;
    }

    public void setFlbAfecta(BigDecimal flbAfecta) {
        this.flbAfecta = flbAfecta;
    }

    public BigDecimal getFlbAfecta() {
        return flbAfecta;
    }
}
