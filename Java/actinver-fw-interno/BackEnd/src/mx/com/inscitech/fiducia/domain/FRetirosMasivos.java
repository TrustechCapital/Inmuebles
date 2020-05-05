package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "F_RETIROS_MASIVOS_PK", columns = { "FRMA_FOLIO", "FRMA_SECUENCIAL" },
            sequences = { "MANUAL" })
public class FRetirosMasivos extends DomainObject {

    private BigDecimal frmaFolio;
    private BigDecimal frmaFolioDef;
    private BigDecimal frmaFolioInd;
    private BigDecimal frmaSecuencial;
    private String frmaBeneficiario;
    private String frmaRfc;
    private String frmaCuenta;
    private BigDecimal frmaImporte;
    private BigDecimal frmaSubcto;
    private BigDecimal frmaTipoPersona;
    private BigDecimal frmaNumPersona;
    private BigDecimal frmaNumGarantia;
    private BigDecimal frmaNumBienGar;
    private BigDecimal frmaAfectaGarantia;

    public FRetirosMasivos() {
        super();
        this.pkColumns = 2;
    }

    @Override
    public Object selectAsObject() {
        DataRow objectData = selectAsDataRow();
        return transformDataRowtoObject(objectData);
    }

    public Object transformDataRowtoObject(DataRow dataRow) {
        FRetirosMasivos result = new FRetirosMasivos();

        result.setFrmaFolio((BigDecimal) dataRow.getData("FRMA_FOLIO"));
        result.setFrmaFolioDef((BigDecimal) dataRow.getData("FRMA_FOLIO_DEF"));
        result.setFrmaFolioInd((BigDecimal) dataRow.getData("FRMA_FOLIO_IND"));
        result.setFrmaSecuencial((BigDecimal) dataRow.getData("FRMA_SECUENCIAL"));
        result.setFrmaBeneficiario((String) dataRow.getData("FRMA_BENEFICIARIO"));
        result.setFrmaRfc((String) dataRow.getData("FRMA_RFC"));
        result.setFrmaCuenta((String) dataRow.getData("FRMA_CUENTA"));
        result.setFrmaImporte((BigDecimal) dataRow.getData("FRMA_IMPORTE"));
        result.setFrmaSubcto((BigDecimal) dataRow.getData("FRMA_SUBCTO"));
        result.setFrmaTipoPersona((BigDecimal) dataRow.getData("FRMA_TIPO_PERSONA"));
        result.setFrmaNumPersona((BigDecimal) dataRow.getData("FRMA_NUM_PERSONA"));
        result.setFrmaNumGarantia((BigDecimal) dataRow.getData("FRMA_NUM_GARANTIA"));
        result.setFrmaNumBienGar((BigDecimal) dataRow.getData("FRMA_NUM_BIEN_GAR"));
        result.setFrmaAfectaGarantia((BigDecimal) dataRow.getData("FRMA_AFECTA_GARANTIA"));

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
        // TODO Implement this method
        return null;
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


    public void setFrmaFolio(BigDecimal frmaFolio) {
        this.frmaFolio = frmaFolio;
    }

    public BigDecimal getFrmaFolio() {
        return frmaFolio;
    }

    public void setFrmaFolioDef(BigDecimal frmaFolioDef) {
        this.frmaFolioDef = frmaFolioDef;
    }

    public BigDecimal getFrmaFolioDef() {
        return frmaFolioDef;
    }

    public void setFrmaFolioInd(BigDecimal frmaFolioInd) {
        this.frmaFolioInd = frmaFolioInd;
    }

    public BigDecimal getFrmaFolioInd() {
        return frmaFolioInd;
    }

    public void setFrmaSecuencial(BigDecimal frmaSecuencial) {
        this.frmaSecuencial = frmaSecuencial;
    }

    public BigDecimal getFrmaSecuencial() {
        return frmaSecuencial;
    }

    public void setFrmaBeneficiario(String frmaBeneficiario) {
        this.frmaBeneficiario = frmaBeneficiario;
    }

    public String getFrmaBeneficiario() {
        return frmaBeneficiario;
    }

    public void setFrmaRfc(String frmaRfc) {
        this.frmaRfc = frmaRfc;
    }

    public String getFrmaRfc() {
        return frmaRfc;
    }

    public void setFrmaCuenta(String frmaCuenta) {
        this.frmaCuenta = frmaCuenta;
    }

    public String getFrmaCuenta() {
        return frmaCuenta;
    }

    public void setFrmaImporte(BigDecimal frmaImporte) {
        this.frmaImporte = frmaImporte;
    }

    public BigDecimal getFrmaImporte() {
        return frmaImporte;
    }

    public void setFrmaSubcto(BigDecimal frmaSubcto) {
        this.frmaSubcto = frmaSubcto;
    }

    public BigDecimal getFrmaSubcto() {
        return frmaSubcto;
    }

    public void setFrmaTipoPersona(BigDecimal frmaTipoPersona) {
        this.frmaTipoPersona = frmaTipoPersona;
    }

    public BigDecimal getFrmaTipoPersona() {
        return frmaTipoPersona;
    }

    public void setFrmaNumPersona(BigDecimal frmaNumPersona) {
        this.frmaNumPersona = frmaNumPersona;
    }

    public BigDecimal getFrmaNumPersona() {
        return frmaNumPersona;
    }

    public void setFrmaNumGarantia(BigDecimal frmaNumGarantia) {
        this.frmaNumGarantia = frmaNumGarantia;
    }

    public BigDecimal getFrmaNumGarantia() {
        return frmaNumGarantia;
    }

    public void setFrmaNumBienGar(BigDecimal frmaNumBienGar) {
        this.frmaNumBienGar = frmaNumBienGar;
    }

    public BigDecimal getFrmaNumBienGar() {
        return frmaNumBienGar;
    }

    public void setFrmaAfectaGarantia(BigDecimal frmaAfectaGarantia) {
        this.frmaAfectaGarantia = frmaAfectaGarantia;
    }

    public BigDecimal getFrmaAfectaGarantia() {
        return frmaAfectaGarantia;
    }
}
