package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import java.util.List;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "F_PROCESO_LIBERACION_PK",
            columns = { "FPL_ID_FIDEICOMISO", "FPL_ID_SUBCUENTA", "FPL_ID_BIEN", "FPL_ID_EDIFICIO", "FPL_ID_DEPTO"
    }, sequences = { "MANUAL" })
public class FProcesoLiberacion extends DomainObject {

    private BigDecimal fplIdFideicomiso;
    private BigDecimal fplIdSubcuenta;
    private String fplIdBien;
    private String fplIdEdificio;
    private String fplIdDepto;
    private BigDecimal fplNotario;
    private String fplAdquirente;
    private String fplTercero;
    private String fplFideicomBenefici;
    private String fplNomPersona;
    private String fplNumLugar;
    private String fplNomPersona1;
    private String fplNumLugar1;
    private String fplFidBenSaneamiento;
    private String fplNomSaneamiento;
    private String fplNumLugarSaneamiento;
    private String fplNomSaneamiento1;
    private String fplNumLugarSaneamiento1;
    private String fplFidBenResponsabilidad;
    private String fplNomResponsabilidad;
    private String fplNumLugarResponsabilidad;
    private String fplNomResponsabilidad1;
    private String fplNumLugarResponsabilidad1;
    private String fplFidBenOtorgamiento;
    private String fplNomOtorgamiento;
    private String fplNumLugarOtorgamiento;
    private String fplNomOtorgamiento1;
    private String fplNumLugarOtorgamiento1;
    private String fplTransmisionReversion;
    private String fplParcialTotal;
    private BigDecimal fplSujetoRegimen;
    private String fplTipoInmueble;
    private String fplNomEnvio;
    private String fplEmailEnvio;
    private String fplObservacion;
    private String fplEscritura;
    private Date fplFecEscritura;
    private String fplDelegado;
    private Date fplFecFirma;
    private String fplCveStatus;

    public FProcesoLiberacion() {
        super();
        this.pkColumns = 5;
    }


    public FProcesoLiberacion(BigDecimal fplIdFideicomiso, BigDecimal fplIdSubcuenta, String fplIdBien,
                              String fplIdEdificio, String fplIdDepto) {
        super();
        this.pkColumns = 5;
        this.fplIdFideicomiso = fplIdFideicomiso;
        this.fplIdSubcuenta = fplIdSubcuenta;
        this.fplIdBien = fplIdBien;
        this.fplIdEdificio = fplIdEdificio;
        this.fplIdDepto = fplIdDepto;
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
        FProcesoLiberacion result = new FProcesoLiberacion();

        result.setFplIdFideicomiso((BigDecimal) dataRow.getData("FPL_ID_FIDEICOMISO"));
        result.setFplIdSubcuenta((BigDecimal) dataRow.getData("FPL_ID_SUBCUENTA"));
        result.setFplIdBien((String) dataRow.getData("FPL_ID_BIEN"));
        result.setFplIdEdificio((String) dataRow.getData("FPL_ID_EDIFICIO"));
        result.setFplIdDepto((String) dataRow.getData("FPL_ID_DEPTO"));
        result.setFplNotario((BigDecimal) dataRow.getData("FPL_NOTARIO"));
        result.setFplAdquirente((String) dataRow.getData("FPL_ADQUIRENTE"));
        result.setFplTercero((String) dataRow.getData("FPL_TERCERO"));
        result.setFplFideicomBenefici((String) dataRow.getData("FPL_FIDEICOM_BENEFICI"));
        result.setFplNomPersona((String) dataRow.getData("FPL_NOM_PERSONA"));
        result.setFplNumLugar((String) dataRow.getData("FPL_NUM_LUGAR"));
        result.setFplNomPersona1((String) dataRow.getData("FPL_NOM_PERSONA1"));
        result.setFplNumLugar1((String) dataRow.getData("FPL_NUM_LUGAR1"));
        result.setFplFidBenSaneamiento((String) dataRow.getData("FPL_FID_BEN_SANEAMIENTO"));
        result.setFplNomSaneamiento((String) dataRow.getData("FPL_NOM_SANEAMIENTO"));
        result.setFplNumLugarSaneamiento((String) dataRow.getData("FPL_NUM_LUGAR_SANEAMIENTO"));
        result.setFplNomSaneamiento1((String) dataRow.getData("FPL_NOM_SANEAMIENTO1"));
        result.setFplNumLugarSaneamiento1((String) dataRow.getData("FPL_NUM_LUGAR_SANEAMIENTO1"));
        result.setFplFidBenResponsabilidad((String) dataRow.getData("FPL_FID_BEN_RESPONSABILIDAD"));
        result.setFplNomResponsabilidad((String) dataRow.getData("FPL_NOM_RESPONSABILIDAD"));
        result.setFplNumLugarResponsabilidad((String) dataRow.getData("FPL_NUM_LUGAR_RESPONSABILIDAD"));
        result.setFplNomResponsabilidad1((String) dataRow.getData("FPL_NOM_RESPONSABILIDAD1"));
        result.setFplNumLugarResponsabilidad1((String) dataRow.getData("FPL_NUM_LUGAR_RESPONSABILIDAD1"));
        result.setFplFidBenOtorgamiento((String) dataRow.getData("FPL_FID_BEN_OTORGAMIENTO"));
        result.setFplNomOtorgamiento((String) dataRow.getData("FPL_NOM_OTORGAMIENTO"));
        result.setFplNumLugarOtorgamiento((String) dataRow.getData("FPL_NUM_LUGAR_OTORGAMIENTO"));
        result.setFplNomOtorgamiento1((String) dataRow.getData("FPL_NOM_OTORGAMIENTO1"));
        result.setFplNumLugarOtorgamiento1((String) dataRow.getData("FPL_NUM_LUGAR_OTORGAMIENTO1"));
        result.setFplTransmisionReversion((String) dataRow.getData("FPL_TRANSMISION_REVERSION"));
        result.setFplParcialTotal((String) dataRow.getData("FPL_PARCIAL_TOTAL"));
        result.setFplSujetoRegimen((BigDecimal) dataRow.getData("FPL_SUJETO_REGIMEN"));
        result.setFplTipoInmueble((String) dataRow.getData("FPL_TIPO_INMUEBLE"));
        result.setFplNomEnvio((String) dataRow.getData("FPL_NOM_ENVIO"));
        result.setFplEmailEnvio((String) dataRow.getData("FPL_EMAIL_ENVIO"));
        result.setFplObservacion((String) dataRow.getData("FPL_OBSERVACION"));
        result.setFplEscritura((String) dataRow.getData("FPL_ESCRITURA"));
        result.setFplFecEscritura((Date) dataRow.getData("FPL_FEC_ESCRITURA"));
        result.setFplDelegado((String) dataRow.getData("FPL_DELEGADO"));
        result.setFplFecFirma((Date) dataRow.getData("FPL_FEC_FIRMA"));
        result.setFplCveStatus((String) dataRow.getData("FPL_CVE_STATUS"));

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
            "SELECT * FROM F_PROCESO_LIBERACION WHERE FPL_ID_FIDEICOMISO = ? AND FPL_ID_SUBCUENTA = ?" +
            " AND FPL_ID_BIEN = ? AND FPL_ID_EDIFICIO = ? AND FPL_ID_DEPTO = ?";

        List<Object> parameters =
            Arrays.asList(this.getFplIdFideicomiso(), this.fplIdSubcuenta, this.getFplIdBien(), this.getFplIdEdificio(),
                          this.getFplIdDepto());

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


    public void setFplIdFideicomiso(BigDecimal fplIdFideicomiso) {
        this.fplIdFideicomiso = fplIdFideicomiso;
    }

    public BigDecimal getFplIdFideicomiso() {
        return fplIdFideicomiso;
    }

    public void setFplIdSubcuenta(BigDecimal fplIdSubcuenta) {
        this.fplIdSubcuenta = fplIdSubcuenta;
    }

    public BigDecimal getFplIdSubcuenta() {
        return fplIdSubcuenta;
    }

    public void setFplIdBien(String fplIdBien) {
        this.fplIdBien = fplIdBien;
    }

    public String getFplIdBien() {
        return fplIdBien;
    }

    public void setFplIdEdificio(String fplIdEdificio) {
        this.fplIdEdificio = fplIdEdificio;
    }

    public String getFplIdEdificio() {
        return fplIdEdificio;
    }


    public void setFplIdDepto(String fplIdDepto) {
        this.fplIdDepto = fplIdDepto;
    }

    public String getFplIdDepto() {
        return fplIdDepto;
    }

    public void setFplNotario(BigDecimal fplNotario) {
        this.fplNotario = fplNotario;
    }

    public BigDecimal getFplNotario() {
        return fplNotario;
    }

    public void setFplAdquirente(String fplAdquirente) {
        this.fplAdquirente = fplAdquirente;
    }

    public String getFplAdquirente() {
        return fplAdquirente;
    }

    public void setFplTercero(String fplTercero) {
        this.fplTercero = fplTercero;
    }

    public String getFplTercero() {
        return fplTercero;
    }

    public void setFplFideicomBenefici(String fplFideicomBenefici) {
        this.fplFideicomBenefici = fplFideicomBenefici;
    }

    public String getFplFideicomBenefici() {
        return fplFideicomBenefici;
    }

    public void setFplNomPersona(String fplNomPersona) {
        this.fplNomPersona = fplNomPersona;
    }

    public String getFplNomPersona() {
        return fplNomPersona;
    }

    public void setFplNumLugar(String fplNumLugar) {
        this.fplNumLugar = fplNumLugar;
    }

    public String getFplNumLugar() {
        return fplNumLugar;
    }

    public void setFplNomPersona1(String fplNomPersona1) {
        this.fplNomPersona1 = fplNomPersona1;
    }

    public String getFplNomPersona1() {
        return fplNomPersona1;
    }

    public void setFplNumLugar1(String fplNumLugar1) {
        this.fplNumLugar1 = fplNumLugar1;
    }

    public String getFplNumLugar1() {
        return fplNumLugar1;
    }

    public void setFplFidBenSaneamiento(String fplFidBenSaneamiento) {
        this.fplFidBenSaneamiento = fplFidBenSaneamiento;
    }

    public String getFplFidBenSaneamiento() {
        return fplFidBenSaneamiento;
    }

    public void setFplNomSaneamiento(String fplNomSaneamiento) {
        this.fplNomSaneamiento = fplNomSaneamiento;
    }

    public String getFplNomSaneamiento() {
        return fplNomSaneamiento;
    }

    public void setFplNumLugarSaneamiento(String fplNumLugarSaneamiento) {
        this.fplNumLugarSaneamiento = fplNumLugarSaneamiento;
    }

    public String getFplNumLugarSaneamiento() {
        return fplNumLugarSaneamiento;
    }

    public void setFplNomSaneamiento1(String fplNomSaneamiento1) {
        this.fplNomSaneamiento1 = fplNomSaneamiento1;
    }

    public String getFplNomSaneamiento1() {
        return fplNomSaneamiento1;
    }

    public void setFplNumLugarSaneamiento1(String fplNumLugarSaneamiento1) {
        this.fplNumLugarSaneamiento1 = fplNumLugarSaneamiento1;
    }

    public String getFplNumLugarSaneamiento1() {
        return fplNumLugarSaneamiento1;
    }

    public void setFplFidBenResponsabilidad(String fplFidBenResponsabilidad) {
        this.fplFidBenResponsabilidad = fplFidBenResponsabilidad;
    }

    public String getFplFidBenResponsabilidad() {
        return fplFidBenResponsabilidad;
    }

    public void setFplNomResponsabilidad(String fplNomResponsabilidad) {
        this.fplNomResponsabilidad = fplNomResponsabilidad;
    }

    public String getFplNomResponsabilidad() {
        return fplNomResponsabilidad;
    }

    public void setFplNumLugarResponsabilidad(String fplNumLugarResponsabilidad) {
        this.fplNumLugarResponsabilidad = fplNumLugarResponsabilidad;
    }

    public String getFplNumLugarResponsabilidad() {
        return fplNumLugarResponsabilidad;
    }

    public void setFplNomResponsabilidad1(String fplNomResponsabilidad1) {
        this.fplNomResponsabilidad1 = fplNomResponsabilidad1;
    }

    public String getFplNomResponsabilidad1() {
        return fplNomResponsabilidad1;
    }

    public void setFplNumLugarResponsabilidad1(String fplNumLugarResponsabilidad1) {
        this.fplNumLugarResponsabilidad1 = fplNumLugarResponsabilidad1;
    }

    public String getFplNumLugarResponsabilidad1() {
        return fplNumLugarResponsabilidad1;
    }

    public void setFplFidBenOtorgamiento(String fplFidBenOtorgamiento) {
        this.fplFidBenOtorgamiento = fplFidBenOtorgamiento;
    }

    public String getFplFidBenOtorgamiento() {
        return fplFidBenOtorgamiento;
    }

    public void setFplNomOtorgamiento(String fplNomOtorgamiento) {
        this.fplNomOtorgamiento = fplNomOtorgamiento;
    }

    public String getFplNomOtorgamiento() {
        return fplNomOtorgamiento;
    }

    public void setFplNumLugarOtorgamiento(String fplNumLugarOtorgamiento) {
        this.fplNumLugarOtorgamiento = fplNumLugarOtorgamiento;
    }

    public String getFplNumLugarOtorgamiento() {
        return fplNumLugarOtorgamiento;
    }

    public void setFplNomOtorgamiento1(String fplNomOtorgamiento1) {
        this.fplNomOtorgamiento1 = fplNomOtorgamiento1;
    }

    public String getFplNomOtorgamiento1() {
        return fplNomOtorgamiento1;
    }

    public void setFplNumLugarOtorgamiento1(String fplNumLugarOtorgamiento1) {
        this.fplNumLugarOtorgamiento1 = fplNumLugarOtorgamiento1;
    }

    public String getFplNumLugarOtorgamiento1() {
        return fplNumLugarOtorgamiento1;
    }

    public void setFplTransmisionReversion(String fplTransmisionReversion) {
        this.fplTransmisionReversion = fplTransmisionReversion;
    }

    public String getFplTransmisionReversion() {
        return fplTransmisionReversion;
    }

    public void setFplParcialTotal(String fplParcialTotal) {
        this.fplParcialTotal = fplParcialTotal;
    }

    public String getFplParcialTotal() {
        return fplParcialTotal;
    }

    public void setFplSujetoRegimen(BigDecimal fplSujetoRegimen) {
        this.fplSujetoRegimen = fplSujetoRegimen;
    }

    public BigDecimal getFplSujetoRegimen() {
        return fplSujetoRegimen;
    }

    public void setFplTipoInmueble(String fplTipoInmueble) {
        this.fplTipoInmueble = fplTipoInmueble;
    }

    public String getFplTipoInmueble() {
        return fplTipoInmueble;
    }

    public void setFplNomEnvio(String fplNomEnvio) {
        this.fplNomEnvio = fplNomEnvio;
    }

    public String getFplNomEnvio() {
        return fplNomEnvio;
    }

    public void setFplEmailEnvio(String fplEmailEnvio) {
        this.fplEmailEnvio = fplEmailEnvio;
    }

    public String getFplEmailEnvio() {
        return fplEmailEnvio;
    }

    public void setFplObservacion(String fplObservacion) {
        this.fplObservacion = fplObservacion;
    }

    public String getFplObservacion() {
        return fplObservacion;
    }

    public void setFplEscritura(String fplEscritura) {
        this.fplEscritura = fplEscritura;
    }

    public String getFplEscritura() {
        return fplEscritura;
    }

    public void setFplFecEscritura(Date fplFecEscritura) {
        this.fplFecEscritura = fplFecEscritura;
    }

    public Date getFplFecEscritura() {
        return fplFecEscritura;
    }

    public void setFplDelegado(String fplDelegado) {
        this.fplDelegado = fplDelegado;
    }

    public String getFplDelegado() {
        return fplDelegado;
    }

    public void setFplFecFirma(Date fplFecFirma) {
        this.fplFecFirma = fplFecFirma;
    }

    public Date getFplFecFirma() {
        return fplFecFirma;
    }

    public void setFplCveStatus(String fplCveStatus) {
        this.fplCveStatus = fplCveStatus;
    }

    public String getFplCveStatus() {
        return fplCveStatus;
    }
}
