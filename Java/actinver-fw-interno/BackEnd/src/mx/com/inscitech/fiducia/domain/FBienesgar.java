package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;
import mx.com.inscitech.fiducia.domain.base.Reference;
import mx.com.inscitech.fiducia.domain.base.DMLObject;

import mx.com.inscitech.fiducia.dml.vo.DataRow;

@PrimaryKey(constraintName = "F_BIENESGAR_PK",
            columns = { "FGRS_ID_FIDEICOMISO", "FGRS_ID_SUBCUENTA", "FORS_ID_GARANTIA" }, sequences = { "MANUAL" })
public class FBienesgar extends DomainObject {

    BigDecimal fgrsIdFideicomiso = null;
    BigDecimal fgrsIdSubcuenta = null;
    BigDecimal forsIdGarantia = null;
    BigDecimal forsCveTipoGarantia = null;
    BigDecimal forsCveTipoBien = null;
    String forsIdentificacion = null;
    String forsTextoDescrip = null;
    String forsTexComentario = null;
    BigDecimal forsImpBien = null;
    BigDecimal forsMoneda = null;
    BigDecimal forsCveRevalua = null;
    String forsCvePerValua = null;
    BigDecimal forsImpUltValua = null;
    String forsFecUltValua = null;
    String forsFecVencimiento = null;
    String forsNumEscritura = null;
    String forsNumNotario = null;
    String forsCveStatus = null;
    BigDecimal forsRegimen = null;


    public FBienesgar() {
        super();
        this.pkColumns = 3;
    }


    public FBienesgar(BigDecimal fgrsIdFideicomiso, BigDecimal fgrsIdSubcuenta, BigDecimal forsIdGarantia) {
        super();
        this.fgrsIdFideicomiso = fgrsIdFideicomiso;
        this.fgrsIdSubcuenta = fgrsIdSubcuenta;
        this.forsIdGarantia = forsIdGarantia;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFgrsIdFideicomiso(BigDecimal fgrsIdFideicomiso) {
        this.fgrsIdFideicomiso = fgrsIdFideicomiso;
    }

    public BigDecimal getFgrsIdFideicomiso() {
        return this.fgrsIdFideicomiso;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFgrsIdSubcuenta(BigDecimal fgrsIdSubcuenta) {
        this.fgrsIdSubcuenta = fgrsIdSubcuenta;
    }

    public BigDecimal getFgrsIdSubcuenta() {
        return this.fgrsIdSubcuenta;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setForsIdGarantia(BigDecimal forsIdGarantia) {
        this.forsIdGarantia = forsIdGarantia;
    }

    public BigDecimal getForsIdGarantia() {
        return this.forsIdGarantia;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setForsCveTipoGarantia(BigDecimal forsCveTipoGarantia) {
        this.forsCveTipoGarantia = forsCveTipoGarantia;
    }

    public BigDecimal getForsCveTipoGarantia() {
        return this.forsCveTipoGarantia;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setForsCveTipoBien(BigDecimal forsCveTipoBien) {
        this.forsCveTipoBien = forsCveTipoBien;
    }

    public BigDecimal getForsCveTipoBien() {
        return this.forsCveTipoBien;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setForsIdentificacion(String forsIdentificacion) {
        this.forsIdentificacion = forsIdentificacion;
    }

    public String getForsIdentificacion() {
        return this.forsIdentificacion;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setForsTextoDescrip(String forsTextoDescrip) {
        this.forsTextoDescrip = forsTextoDescrip;
    }

    public String getForsTextoDescrip() {
        return this.forsTextoDescrip;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setForsTexComentario(String forsTexComentario) {
        this.forsTexComentario = forsTexComentario;
    }

    public String getForsTexComentario() {
        return this.forsTexComentario;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 16, scale = 2, javaClass = BigDecimal.class)
    public void setForsImpBien(BigDecimal forsImpBien) {
        this.forsImpBien = forsImpBien;
    }

    public BigDecimal getForsImpBien() {
        return this.forsImpBien;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setForsMoneda(BigDecimal forsMoneda) {
        this.forsMoneda = forsMoneda;
    }

    public BigDecimal getForsMoneda() {
        return this.forsMoneda;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 2, scale = 0, javaClass = BigDecimal.class)
    public void setForsCveRevalua(BigDecimal forsCveRevalua) {
        this.forsCveRevalua = forsCveRevalua;
    }

    public BigDecimal getForsCveRevalua() {
        return this.forsCveRevalua;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setForsCvePerValua(String forsCvePerValua) {
        this.forsCvePerValua = forsCvePerValua;
    }

    public String getForsCvePerValua() {
        return this.forsCvePerValua;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 16, scale = 2, javaClass = BigDecimal.class)
    public void setForsImpUltValua(BigDecimal forsImpUltValua) {
        this.forsImpUltValua = forsImpUltValua;
    }

    public BigDecimal getForsImpUltValua() {
        return this.forsImpUltValua;
    }

    @FieldInfo(nullable = true, dataType = "DATE", javaClass = String.class)
    public void setForsFecUltValua(String forsFecUltValua) {
        this.forsFecUltValua = forsFecUltValua;
    }

    public String getForsFecUltValua() {
        return this.forsFecUltValua;
    }

    @FieldInfo(nullable = true, dataType = "DATE", javaClass = String.class)
    public void setForsFecVencimiento(String forsFecVencimiento) {
        this.forsFecVencimiento = forsFecVencimiento;
    }

    public String getForsFecVencimiento() {
        return this.forsFecVencimiento;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setForsNumEscritura(String forsNumEscritura) {
        this.forsNumEscritura = forsNumEscritura;
    }

    public String getForsNumEscritura() {
        return this.forsNumEscritura;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setForsNumNotario(String forsNumNotario) {
        this.forsNumNotario = forsNumNotario;
    }

    public String getForsNumNotario() {
        return this.forsNumNotario;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setForsCveStatus(String forsCveStatus) {
        this.forsCveStatus = forsCveStatus;
    }

    public String getForsCveStatus() {
        return this.forsCveStatus;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setForsRegimen(BigDecimal forsRegimen) {
        this.forsRegimen = forsRegimen;
    }

    public BigDecimal getForsRegimen() {
        return forsRegimen;
    }

    public DMLObject getSelectByPK() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "SELECT * FROM F_BIENESGAR ";

        String conditions = "";
        ArrayList values = new ArrayList();

        conditions += " AND FGRS_ID_FIDEICOMISO = ?";
        values.add(this.getFgrsIdFideicomiso());

        conditions += " AND FGRS_ID_SUBCUENTA = ?";
        values.add(this.getFgrsIdSubcuenta());

        conditions += " AND FORS_ID_GARANTIA = ?";
        values.add(this.getForsIdGarantia());

        conditions = conditions.substring(4).trim();
        sql += "WHERE " + conditions;
        result.setSql(sql);
        result.setParameters(values.toArray());

        return result;

    }

    public DMLObject getSelect() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "SELECT * FROM F_BIENESGAR ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getFgrsIdFideicomiso() != null && this.getFgrsIdFideicomiso().longValue() == -999) {
            conditions += " AND FGRS_ID_FIDEICOMISO IS NULL";
        } else if (this.getFgrsIdFideicomiso() != null) {
            conditions += " AND FGRS_ID_FIDEICOMISO = ?";
            values.add(this.getFgrsIdFideicomiso());
        }

        if (this.getFgrsIdSubcuenta() != null && this.getFgrsIdSubcuenta().longValue() == -999) {
            conditions += " AND FGRS_ID_SUBCUENTA IS NULL";
        } else if (this.getFgrsIdSubcuenta() != null) {
            conditions += " AND FGRS_ID_SUBCUENTA = ?";
            values.add(this.getFgrsIdSubcuenta());
        }

        if (this.getForsIdGarantia() != null && this.getForsIdGarantia().longValue() == -999) {
            conditions += " AND FORS_ID_GARANTIA IS NULL";
        } else if (this.getForsIdGarantia() != null) {
            conditions += " AND FORS_ID_GARANTIA = ?";
            values.add(this.getForsIdGarantia());
        }

        if (this.getForsCveTipoGarantia() != null && this.getForsCveTipoGarantia().longValue() == -999) {
            conditions += " AND FORS_CVE_TIPO_GARANTIA IS NULL";
        } else if (this.getForsCveTipoGarantia() != null) {
            conditions += " AND FORS_CVE_TIPO_GARANTIA = ?";
            values.add(this.getForsCveTipoGarantia());
        }

        if (this.getForsCveTipoBien() != null && this.getForsCveTipoBien().longValue() == -999) {
            conditions += " AND FORS_CVE_TIPO_BIEN IS NULL";
        } else if (this.getForsCveTipoBien() != null) {
            conditions += " AND FORS_CVE_TIPO_BIEN = ?";
            values.add(this.getForsCveTipoBien());
        }

        if (this.getForsIdentificacion() != null && "null".equals(this.getForsIdentificacion())) {
            conditions += " AND FORS_IDENTIFICACION IS NULL";
        } else if (this.getForsIdentificacion() != null) {
            conditions += " AND FORS_IDENTIFICACION = ?";
            values.add(this.getForsIdentificacion());
        }

        if (this.getForsTextoDescrip() != null && "null".equals(this.getForsTextoDescrip())) {
            conditions += " AND FORS_TEXTO_DESCRIP IS NULL";
        } else if (this.getForsTextoDescrip() != null) {
            conditions += " AND FORS_TEXTO_DESCRIP = ?";
            values.add(this.getForsTextoDescrip());
        }

        if (this.getForsTexComentario() != null && "null".equals(this.getForsTexComentario())) {
            conditions += " AND FORS_TEX_COMENTARIO IS NULL";
        } else if (this.getForsTexComentario() != null) {
            conditions += " AND FORS_TEX_COMENTARIO = ?";
            values.add(this.getForsTexComentario());
        }

        if (this.getForsImpBien() != null && this.getForsImpBien().longValue() == -999) {
            conditions += " AND FORS_IMP_BIEN IS NULL";
        } else if (this.getForsImpBien() != null) {
            conditions += " AND FORS_IMP_BIEN = ?";
            values.add(this.getForsImpBien());
        }

        if (this.getForsMoneda() != null && this.getForsMoneda().longValue() == -999) {
            conditions += " AND FORS_MONEDA IS NULL";
        } else if (this.getForsMoneda() != null) {
            conditions += " AND FORS_MONEDA = ?";
            values.add(this.getForsMoneda());
        }

        if (this.getForsCveRevalua() != null && this.getForsCveRevalua().longValue() == -999) {
            conditions += " AND FORS_CVE_REVALUA IS NULL";
        } else if (this.getForsCveRevalua() != null) {
            conditions += " AND FORS_CVE_REVALUA = ?";
            values.add(this.getForsCveRevalua());
        }

        if (this.getForsCvePerValua() != null && "null".equals(this.getForsCvePerValua())) {
            conditions += " AND FORS_CVE_PER_VALUA IS NULL";
        } else if (this.getForsCvePerValua() != null) {
            conditions += " AND FORS_CVE_PER_VALUA = ?";
            values.add(this.getForsCvePerValua());
        }

        if (this.getForsImpUltValua() != null && this.getForsImpUltValua().longValue() == -999) {
            conditions += " AND FORS_IMP_ULT_VALUA IS NULL";
        } else if (this.getForsImpUltValua() != null) {
            conditions += " AND FORS_IMP_ULT_VALUA = ?";
            values.add(this.getForsImpUltValua());
        }

        if (this.getForsFecUltValua() != null && "null".equals(this.getForsFecUltValua())) {
            conditions += " AND FORS_FEC_ULT_VALUA IS NULL";
        } else if (this.getForsFecUltValua() != null) {
            conditions += " AND FORS_FEC_ULT_VALUA = TO_DATE(?,'dd/MM/yyyy')";
            values.add(this.getForsFecUltValua());
        }

        if (this.getForsFecVencimiento() != null && "null".equals(this.getForsFecVencimiento())) {
            conditions += " AND FORS_FEC_VENCIMIENTO IS NULL";
        } else if (this.getForsFecVencimiento() != null) {
            conditions += " AND FORS_FEC_VENCIMIENTO = TO_DATE(?,'dd/MM/yyyy')";
            values.add(this.getForsFecVencimiento());
        }

        if (this.getForsNumEscritura() != null && "null".equals(this.getForsNumEscritura())) {
            conditions += " AND FORS_NUM_ESCRITURA IS NULL";
        } else if (this.getForsNumEscritura() != null) {
            conditions += " AND FORS_NUM_ESCRITURA = ?";
            values.add(this.getForsNumEscritura());
        }

        if (this.getForsNumNotario() != null && "null".equals(this.getForsNumNotario())) {
            conditions += " AND FORS_NUM_NOTARIO IS NULL";
        } else if (this.getForsNumNotario() != null) {
            conditions += " AND FORS_NUM_NOTARIO = ?";
            values.add(this.getForsNumNotario());
        }

        if (this.getForsCveStatus() != null && "null".equals(this.getForsCveStatus())) {
            conditions += " AND FORS_CVE_STATUS IS NULL";
        } else if (this.getForsCveStatus() != null) {
            conditions += " AND FORS_CVE_STATUS = ?";
            values.add(this.getForsCveStatus());
        }

        if (!"".equals(conditions)) {

            conditions = conditions.substring(4).trim();
            sql += "WHERE " + conditions;
            result.setSql(sql);
            result.setParameters(values.toArray());
        }

        return result;

    }

    public DMLObject getUpdate() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "UPDATE F_BIENESGAR SET ";

        String fields = "";
        String conditions = "";
        ArrayList pkValues = new ArrayList();
        ArrayList values = new ArrayList();

        conditions += " AND FGRS_ID_FIDEICOMISO = ?";
        pkValues.add(this.getFgrsIdFideicomiso());
        conditions += " AND FGRS_ID_SUBCUENTA = ?";
        pkValues.add(this.getFgrsIdSubcuenta());
        conditions += " AND FORS_ID_GARANTIA = ?";
        pkValues.add(this.getForsIdGarantia());
        fields += " FORS_CVE_TIPO_GARANTIA = ?, ";
        values.add(this.getForsCveTipoGarantia());
        fields += " FORS_CVE_TIPO_BIEN = ?, ";
        values.add(this.getForsCveTipoBien());
        fields += " FORS_IDENTIFICACION = ?, ";
        values.add(this.getForsIdentificacion());
        fields += " FORS_TEXTO_DESCRIP = ?, ";
        values.add(this.getForsTextoDescrip());
        fields += " FORS_TEX_COMENTARIO = ?, ";
        values.add(this.getForsTexComentario());
        fields += " FORS_IMP_BIEN = ?, ";
        values.add(this.getForsImpBien());
        fields += " FORS_MONEDA = ?, ";
        values.add(this.getForsMoneda());
        fields += " FORS_CVE_REVALUA = ?, ";
        values.add(this.getForsCveRevalua());
        fields += " FORS_CVE_PER_VALUA = ?, ";
        values.add(this.getForsCvePerValua());
        fields += " FORS_IMP_ULT_VALUA = ?, ";
        values.add(this.getForsImpUltValua());
        fields += " FORS_FEC_ULT_VALUA = TO_DATE(?, 'dd/MM/yyyy'), ";
        values.add(this.getForsFecUltValua());
        fields += " FORS_FEC_VENCIMIENTO = TO_DATE(?, 'dd/MM/yyyy'), ";
        values.add(this.getForsFecVencimiento());
        fields += " FORS_NUM_ESCRITURA = ?, ";
        values.add(this.getForsNumEscritura());
        fields += " FORS_NUM_NOTARIO = ?, ";
        values.add(this.getForsNumNotario());
        fields += " FORS_CVE_STATUS = ?, ";
        values.add(this.getForsCveStatus());
        for (int i = 0; i < pkValues.size(); i++) {
            values.add(pkValues.get(i));
        }
        ;

        fields = fields.substring(0, fields.length() - 2).trim();
        conditions = conditions.substring(4).trim();
        sql += fields + " WHERE " + conditions;
        result.setSql(sql);
        result.setParameters(values.toArray());

        return result;
    }

    public DMLObject getInsert() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "INSERT INTO F_BIENESGAR ( ";

        String fields = "";
        String fieldValues = "";
        ArrayList values = new ArrayList();

        fields += ", FGRS_ID_FIDEICOMISO";
        fieldValues += ", ?";
        values.add(this.getFgrsIdFideicomiso());

        fields += ", FGRS_ID_SUBCUENTA";
        fieldValues += ", ?";
        values.add(this.getFgrsIdSubcuenta());

        fields += ", FORS_ID_GARANTIA";
        fieldValues += ", ?";
        values.add(this.getForsIdGarantia());

        fields += ", FORS_CVE_TIPO_GARANTIA";
        fieldValues += ", ?";
        values.add(this.getForsCveTipoGarantia());

        fields += ", FORS_CVE_TIPO_BIEN";
        fieldValues += ", ?";
        values.add(this.getForsCveTipoBien());

        fields += ", FORS_IDENTIFICACION";
        fieldValues += ", ?";
        values.add(this.getForsIdentificacion());

        fields += ", FORS_TEXTO_DESCRIP";
        fieldValues += ", ?";
        values.add(this.getForsTextoDescrip());

        fields += ", FORS_TEX_COMENTARIO";
        fieldValues += ", ?";
        values.add(this.getForsTexComentario());

        fields += ", FORS_IMP_BIEN";
        fieldValues += ", ?";
        values.add(this.getForsImpBien());

        fields += ", FORS_MONEDA";
        fieldValues += ", ?";
        values.add(this.getForsMoneda());

        fields += ", FORS_CVE_REVALUA";
        fieldValues += ", ?";
        values.add(this.getForsCveRevalua());

        fields += ", FORS_CVE_PER_VALUA";
        fieldValues += ", ?";
        values.add(this.getForsCvePerValua());

        fields += ", FORS_IMP_ULT_VALUA";
        fieldValues += ", ?";
        values.add(this.getForsImpUltValua());

        fields += ", FORS_FEC_ULT_VALUA";
        fieldValues += ", TO_DATE(?, 'dd/MM/yyyy') ";
        values.add(this.getForsFecUltValua());

        fields += ", FORS_FEC_VENCIMIENTO";
        fieldValues += ", TO_DATE(?, 'dd/MM/yyyy') ";
        values.add(this.getForsFecVencimiento());

        fields += ", FORS_NUM_ESCRITURA";
        fieldValues += ", ?";
        values.add(this.getForsNumEscritura());

        fields += ", FORS_NUM_NOTARIO";
        fieldValues += ", ?";
        values.add(this.getForsNumNotario());

        fields += ", FORS_CVE_STATUS";
        fieldValues += ", ?";
        values.add(this.getForsCveStatus());

        fields = fields.substring(1).trim();
        fieldValues = fieldValues.substring(1).trim();

        sql += fields + " ) VALUES (" + fieldValues + ")";

        result.setSql(sql);
        result.setParameters(values.toArray());

        return result;
    }

    public DMLObject getDelete() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "DELETE FROM F_BIENESGAR WHERE ";

        String conditions = "";
        ArrayList values = new ArrayList();

        conditions += " AND FGRS_ID_FIDEICOMISO = ?";
        values.add(this.getFgrsIdFideicomiso());
        conditions += " AND FGRS_ID_SUBCUENTA = ?";
        values.add(this.getFgrsIdSubcuenta());
        conditions += " AND FORS_ID_GARANTIA = ?";
        values.add(this.getForsIdGarantia());
        conditions = conditions.substring(4).trim();
        result.setSql(sql + conditions);
        result.setParameters(values.toArray());
        return result;

    }

    public boolean validate() {
        return true;
    }

    public boolean doCompare(Object compareWith) {
        FBienesgar instance = (FBienesgar) compareWith;
        boolean equalObjects = true;
        if (equalObjects && !this.getFgrsIdFideicomiso().equals(instance.getFgrsIdFideicomiso()))
            equalObjects = false;
        if (equalObjects && !this.getFgrsIdSubcuenta().equals(instance.getFgrsIdSubcuenta()))
            equalObjects = false;
        if (equalObjects && !this.getForsIdGarantia().equals(instance.getForsIdGarantia()))
            equalObjects = false;
        if (equalObjects && !this.getForsCveTipoGarantia().equals(instance.getForsCveTipoGarantia()))
            equalObjects = false;
        if (equalObjects && !this.getForsCveTipoBien().equals(instance.getForsCveTipoBien()))
            equalObjects = false;
        if (equalObjects && !this.getForsIdentificacion().equals(instance.getForsIdentificacion()))
            equalObjects = false;
        if (equalObjects && !this.getForsTextoDescrip().equals(instance.getForsTextoDescrip()))
            equalObjects = false;
        if (equalObjects && !this.getForsTexComentario().equals(instance.getForsTexComentario()))
            equalObjects = false;
        if (equalObjects && !this.getForsImpBien().equals(instance.getForsImpBien()))
            equalObjects = false;
        if (equalObjects && !this.getForsMoneda().equals(instance.getForsMoneda()))
            equalObjects = false;
        if (equalObjects && !this.getForsCveRevalua().equals(instance.getForsCveRevalua()))
            equalObjects = false;
        if (equalObjects && !this.getForsCvePerValua().equals(instance.getForsCvePerValua()))
            equalObjects = false;
        if (equalObjects && !this.getForsImpUltValua().equals(instance.getForsImpUltValua()))
            equalObjects = false;
        if (equalObjects && !this.getForsFecUltValua().equals(instance.getForsFecUltValua()))
            equalObjects = false;
        if (equalObjects && !this.getForsFecVencimiento().equals(instance.getForsFecVencimiento()))
            equalObjects = false;
        if (equalObjects && !this.getForsNumEscritura().equals(instance.getForsNumEscritura()))
            equalObjects = false;
        if (equalObjects && !this.getForsNumNotario().equals(instance.getForsNumNotario()))
            equalObjects = false;
        if (equalObjects && !this.getForsCveStatus().equals(instance.getForsCveStatus()))
            equalObjects = false;
        return equalObjects;
    }

    public Object selectAsObject() {
        FBienesgar result = new FBienesgar();
        DataRow objectData = null;
        objectData = selectAsDataRow();

        if (!objectData.hasData()) {
            return null;
        }

        result.setFgrsIdFideicomiso((BigDecimal) objectData.getData("FGRS_ID_FIDEICOMISO"));
        result.setFgrsIdSubcuenta((BigDecimal) objectData.getData("FGRS_ID_SUBCUENTA"));
        result.setForsIdGarantia((BigDecimal) objectData.getData("FORS_ID_GARANTIA"));
        result.setForsCveTipoGarantia((BigDecimal) objectData.getData("FORS_CVE_TIPO_GARANTIA"));
        result.setForsCveTipoBien((BigDecimal) objectData.getData("FORS_CVE_TIPO_BIEN"));
        result.setForsIdentificacion((String) objectData.getData("FORS_IDENTIFICACION"));
        result.setForsTextoDescrip((String) objectData.getData("FORS_TEXTO_DESCRIP"));
        result.setForsTexComentario((String) objectData.getData("FORS_TEX_COMENTARIO"));
        result.setForsImpBien((BigDecimal) objectData.getData("FORS_IMP_BIEN"));
        result.setForsMoneda((BigDecimal) objectData.getData("FORS_MONEDA"));
        result.setForsCveRevalua((BigDecimal) objectData.getData("FORS_CVE_REVALUA"));
        result.setForsCvePerValua((String) objectData.getData("FORS_CVE_PER_VALUA"));
        result.setForsImpUltValua((BigDecimal) objectData.getData("FORS_IMP_ULT_VALUA"));
        result.setForsFecUltValua((String) objectData.getData("FORS_FEC_ULT_VALUA"));
        result.setForsFecVencimiento((String) objectData.getData("FORS_FEC_VENCIMIENTO"));
        result.setForsNumEscritura((String) objectData.getData("FORS_NUM_ESCRITURA"));
        result.setForsNumNotario((String) objectData.getData("FORS_NUM_NOTARIO"));
        result.setForsCveStatus((String) objectData.getData("FORS_CVE_STATUS"));

        return result;

    }

}
