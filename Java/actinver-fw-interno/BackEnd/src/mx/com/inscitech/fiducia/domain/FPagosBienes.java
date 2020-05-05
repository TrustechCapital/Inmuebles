package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import java.util.List;

import java.util.stream.Collectors;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "F_PAGOS_BIENES_PK",
            columns =
            { "FPB_ID_FIDEICOMISO", "FPB_ID_SUBCUENTA", "FPB_ID_GARANTIA", "FPB_ID_COBRO", "FPB_ID_BIEN_GARANTIA"
    }, sequences = { "MANUAL" })
public class FPagosBienes extends DomainObject {

    private BigDecimal fpbIdFideicomiso;
    private BigDecimal fpbIdSubcuenta;
    private BigDecimal fpbIdGarantia;
    private BigDecimal fpbIdCobro;
    private BigDecimal fpbIdBienGarantia;
    private BigDecimal fpbImporte;
    private BigDecimal fpbCveMoneda;
    private BigDecimal fpbTipoCambio;
    private BigDecimal fpbImporteExt;
    private Date fpbFecha;
    private String fpbComentario;

    public FPagosBienes() {
        super();
        this.pkColumns = 5;
    }


    public FPagosBienes(BigDecimal fpbIdFideicomiso, BigDecimal fpbIdSubcuenta, BigDecimal fpbIdGarantia,
                        BigDecimal fpbIdCobro, BigDecimal fpbIdBienGarantia) {
        super();
        this.pkColumns = 5;
        this.fpbIdFideicomiso = fpbIdFideicomiso;
        this.fpbIdSubcuenta = fpbIdSubcuenta;
        this.fpbIdGarantia = fpbIdGarantia;
        this.fpbIdCobro = fpbIdCobro;
        this.fpbIdBienGarantia = fpbIdBienGarantia;
    }


    public FPagosBienes(BigDecimal fpbIdFideicomiso, BigDecimal fpbIdSubcuenta, BigDecimal fpbIdGarantia,
                        BigDecimal fpbIdCobro, BigDecimal fpbIdBienGarantia, BigDecimal fpbImporte,
                        BigDecimal fpbCveMoneda, BigDecimal fpbTipoCambio, BigDecimal fpbImporteExt, Date fpbFecha,
                        String fpbComentario) {
        super();
        this.fpbIdFideicomiso = fpbIdFideicomiso;
        this.fpbIdSubcuenta = fpbIdSubcuenta;
        this.fpbIdGarantia = fpbIdGarantia;
        this.fpbIdCobro = fpbIdCobro;
        this.fpbIdBienGarantia = fpbIdBienGarantia;
        this.fpbImporte = fpbImporte;
        this.fpbCveMoneda = fpbCveMoneda;
        this.fpbTipoCambio = fpbTipoCambio;
        this.fpbImporteExt = fpbImporteExt;
        this.fpbFecha = fpbFecha;
        this.fpbComentario = fpbComentario;
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
        FPagosBienes result = new FPagosBienes();

        result.setFpbIdFideicomiso((BigDecimal) dataRow.getData("FPB_ID_FIDEICOMISO"));
        result.setFpbIdSubcuenta((BigDecimal) dataRow.getData("FPB_ID_SUBCUENTA"));
        result.setFpbIdGarantia((BigDecimal) dataRow.getData("FPB_ID_GARANTIA"));
        result.setFpbIdCobro((BigDecimal) dataRow.getData("FPB_ID_COBRO"));
        result.setFpbIdBienGarantia((BigDecimal) dataRow.getData("FPB_ID_BIEN_GARANTIA"));
        result.setFpbImporte((BigDecimal) dataRow.getData("FPB_IMPORTE"));
        result.setFpbCveMoneda((BigDecimal) dataRow.getData("FPB_CVE_MONEDA"));
        result.setFpbTipoCambio((BigDecimal) dataRow.getData("FPB_TIPO_CAMBIO"));
        result.setFpbImporteExt((BigDecimal) dataRow.getData("FPB_IMPORTE_EXT"));
        result.setFpbFecha((Date) dataRow.getData("FPB_FECHA"));
        result.setFpbComentario((String) dataRow.getData("FPB_COMENTARIO"));

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
            "SELECT * FROM F_PAGOS_BIENES WHERE FPB_ID_FIDEICOMISO = ? AND FPB_ID_SUBCUENTA = ?" +
            " AND FPB_ID_GARANTIA = ? AND FPB_ID_COBRO = ? AND FPB_ID_BIEN_GARANTIA = ?";

        List<Object> parameters =
            Arrays.asList(this.fpbIdFideicomiso, this.fpbIdSubcuenta, this.fpbIdGarantia, this.fpbIdCobro,
                          this.fpbIdBienGarantia);

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

    public DMLObject getDelete() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql =
            "DELETE FROM F_PAGOS_BIENES WHERE FPB_ID_FIDEICOMISO = ? AND FPB_ID_SUBCUENTA = ?" +
            " AND FPB_ID_GARANTIA = ? AND FPB_ID_COBRO = ? AND FPB_ID_BIEN_GARANTIA = ?";

        List<Object> parameters =
            Arrays.asList(this.fpbIdFideicomiso, this.fpbIdSubcuenta, this.fpbIdGarantia, this.fpbIdCobro,
                          this.fpbIdBienGarantia);

        boolean allParametersAreValid = parameters.stream().anyMatch(e -> e == null);

        // TODO: Cambiar por una excepcion
        if (!allParametersAreValid) {
            return null;
        }

        result.setSql(sql);
        result.setParameters(parameters.toArray());
        return result;

    }


    public void setFpbIdFideicomiso(BigDecimal fpbIdFideicomiso) {
        this.fpbIdFideicomiso = fpbIdFideicomiso;
    }

    public BigDecimal getFpbIdFideicomiso() {
        return fpbIdFideicomiso;
    }

    public void setFpbIdSubcuenta(BigDecimal fpbIdSubcuenta) {
        this.fpbIdSubcuenta = fpbIdSubcuenta;
    }

    public BigDecimal getFpbIdSubcuenta() {
        return fpbIdSubcuenta;
    }

    public void setFpbIdGarantia(BigDecimal fpbIdGarantia) {
        this.fpbIdGarantia = fpbIdGarantia;
    }

    public BigDecimal getFpbIdGarantia() {
        return fpbIdGarantia;
    }

    public void setFpbIdCobro(BigDecimal fpbIdCobro) {
        this.fpbIdCobro = fpbIdCobro;
    }

    public BigDecimal getFpbIdCobro() {
        return fpbIdCobro;
    }

    public void setFpbIdBienGarantia(BigDecimal fpbIdBienGarantia) {
        this.fpbIdBienGarantia = fpbIdBienGarantia;
    }

    public BigDecimal getFpbIdBienGarantia() {
        return fpbIdBienGarantia;
    }

    public void setFpbImporte(BigDecimal fpbImporte) {
        this.fpbImporte = fpbImporte;
    }

    public BigDecimal getFpbImporte() {
        return fpbImporte;
    }

    public void setFpbCveMoneda(BigDecimal fpbCveMoneda) {
        this.fpbCveMoneda = fpbCveMoneda;
    }

    public BigDecimal getFpbCveMoneda() {
        return fpbCveMoneda;
    }

    public void setFpbTipoCambio(BigDecimal fpbTipoCambio) {
        this.fpbTipoCambio = fpbTipoCambio;
    }

    public BigDecimal getFpbTipoCambio() {
        return fpbTipoCambio;
    }

    public void setFpbImporteExt(BigDecimal fpbImporteExt) {
        this.fpbImporteExt = fpbImporteExt;
    }

    public BigDecimal getFpbImporteExt() {
        return fpbImporteExt;
    }

    public void setFpbFecha(Date fpbFecha) {
        this.fpbFecha = fpbFecha;
    }

    public Date getFpbFecha() {
        return fpbFecha;
    }

    public void setFpbComentario(String fpbComentario) {
        this.fpbComentario = fpbComentario;
    }

    public String getFpbComentario() {
        return fpbComentario;
    }
}
