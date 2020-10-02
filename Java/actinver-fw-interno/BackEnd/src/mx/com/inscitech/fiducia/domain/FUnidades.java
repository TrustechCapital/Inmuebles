package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import java.util.Date;

import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;
import mx.com.inscitech.fiducia.domain.base.Reference;
import mx.com.inscitech.fiducia.domain.base.DMLObject;

import mx.com.inscitech.fiducia.dml.vo.DataRow;

@PrimaryKey(constraintName = "F_UNIDADES_PK",
            columns = { "FUNI_ID_FIDEICOMISO", "FUNI_ID_SUBCUENTA", "FUNI_ID_BIEN", "FUNI_ID_EDIFICIO", "FUNI_ID_DEPTO"
    }, sequences = { "MANUAL" })
public class FUnidades extends DomainObject {

    private BigDecimal funiIdFideicomiso = null;
    private BigDecimal funiIdSubcuenta = null;
    private String funiIdBien = null;
    private String funiIdEdificio = null;
    private String funiIdDepto = null;
    private String funiTipo = null;
    private String funiNiveles = null;
    private String funiCalleNum = null;
    private String funiNomColonia = null;
    private String funiNomPoblacion = null;
    private String funiCodigoPostal = null;
    private String funiClaveEstado = null;
    private String funiClavePais = null;
    private String funiColindancias = null;
    private String funiMedidas = null;
    private BigDecimal funiPrecio = null;
    private BigDecimal funiUltimoAvaluo = null;
    private String funiFechaUltimoAvaluo = null;
    private BigDecimal funiMoneda = null;
    private BigDecimal funiNotario = null;
    private String funiLocalidadNota = null;
    private String funiNumEscritura = null;
    private String funiFolioReal = null;
    private String funiFechaTrasladoDominio = null;
    private String funiStatus = null;
    private String funiEstacionamiento1 = null;
    private String funiSuperficie1 = null;
    private String funiEstacionamiento2 = null;
    private String funiSuperficie2 = null;
    private String funiEstacionamiento3 = null;
    private String funiSuperficie3 = null;
    private String funiRoofGarden = null;
    private String funiRoofSuperficie = null;
    private String funiSotano = null;
    private String funiSotanoSuperficie = null;
    private BigDecimal funiIndiviso = null;
    private BigDecimal funiNumeroCatastro = null;
    private BigDecimal funiPrecioCatastro = null;
    private String funiActo1 = null;
    private String funiActo2 = null;
    private String funiActo3 = null;
    private String funiActo4 = null;
    private String funiFechaReversion = null;
    private BigDecimal funiCveGrahipo = null;
    private String funiNumHipoteca = null;
    private String funiAFavor = null;
    private String funiNombreAdquiriente = null;
    private String funiNombreNotario = null;

    public FUnidades() {
        super();
        this.pkColumns = 5;
    }

    public FUnidades(BigDecimal funiIdFideicomiso, BigDecimal funiIdSubcuenta, String funiIdBien, String funiIdEdificio,
                     String funiIdDepto) {
        super();
        this.funiIdFideicomiso = funiIdFideicomiso;
        this.funiIdSubcuenta = funiIdSubcuenta;
        this.funiIdBien = funiIdBien;
        this.funiIdEdificio = funiIdEdificio;
        this.funiIdDepto = funiIdDepto;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFuniIdFideicomiso(BigDecimal funiIdFideicomiso) {
        this.funiIdFideicomiso = funiIdFideicomiso;
    }

    public BigDecimal getFuniIdFideicomiso() {
        return this.funiIdFideicomiso;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFuniIdSubcuenta(BigDecimal funiIdSubcuenta) {
        this.funiIdSubcuenta = funiIdSubcuenta;
    }

    public BigDecimal getFuniIdSubcuenta() {
        return this.funiIdSubcuenta;
    }

    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniIdBien(String funiIdBien) {
        this.funiIdBien = funiIdBien;
    }

    public String getFuniIdBien() {
        return this.funiIdBien;
    }

    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniIdEdificio(String funiIdEdificio) {
        this.funiIdEdificio = funiIdEdificio;
    }

    public String getFuniIdEdificio() {
        return this.funiIdEdificio;
    }

    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniIdDepto(String funiIdDepto) {
        this.funiIdDepto = funiIdDepto;
    }

    public String getFuniIdDepto() {
        return this.funiIdDepto;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniTipo(String funiTipo) {
        this.funiTipo = funiTipo;
    }

    public String getFuniTipo() {
        return this.funiTipo;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniNiveles(String funiNiveles) {
        this.funiNiveles = funiNiveles;
    }

    public String getFuniNiveles() {
        return this.funiNiveles;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniCalleNum(String funiCalleNum) {
        this.funiCalleNum = funiCalleNum;
    }

    public String getFuniCalleNum() {
        return this.funiCalleNum;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniNomColonia(String funiNomColonia) {
        this.funiNomColonia = funiNomColonia;
    }

    public String getFuniNomColonia() {
        return this.funiNomColonia;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniNomPoblacion(String funiNomPoblacion) {
        this.funiNomPoblacion = funiNomPoblacion;
    }

    public String getFuniNomPoblacion() {
        return this.funiNomPoblacion;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniCodigoPostal(String funiCodigoPostal) {
        this.funiCodigoPostal = funiCodigoPostal;
    }

    public String getFuniCodigoPostal() {
        return this.funiCodigoPostal;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniClaveEstado(String funiNumEstado) {
        this.funiClaveEstado = funiNumEstado;
    }

    public String getFuniClaveEstado() {
        return this.funiClaveEstado;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniClavePais(String funiNumPais) {
        this.funiClavePais = funiNumPais;
    }

    public String getFuniClavePais() {
        return this.funiClavePais;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniColindancias(String funiColindancias) {
        this.funiColindancias = funiColindancias;
    }

    public String getFuniColindancias() {
        return this.funiColindancias;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniMedidas(String funiMedidas) {
        this.funiMedidas = funiMedidas;
    }

    public String getFuniMedidas() {
        return this.funiMedidas;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 16, scale = 2, javaClass = BigDecimal.class)
    public void setFuniPrecio(BigDecimal funiPrecio) {
        this.funiPrecio = funiPrecio;
    }

    public BigDecimal getFuniPrecio() {
        return this.funiPrecio;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 16, scale = 2, javaClass = BigDecimal.class)
    public void setFuniUltimoAvaluo(BigDecimal funiUltimoAvaluo) {
        this.funiUltimoAvaluo = funiUltimoAvaluo;
    }

    public BigDecimal getFuniUltimoAvaluo() {
        return this.funiUltimoAvaluo;
    }

    @FieldInfo(nullable = true, dataType = "DATE", javaClass = String.class)
    public void setFuniFechaUltimoAvaluo(String funiFechaUltimoAvaluo) {
        this.funiFechaUltimoAvaluo = funiFechaUltimoAvaluo;
    }

    public String getFuniFechaUltimoAvaluo() {
        return this.funiFechaUltimoAvaluo;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFuniMoneda(BigDecimal funiMoneda) {
        this.funiMoneda = funiMoneda;
    }

    public BigDecimal getFuniMoneda() {
        return this.funiMoneda;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFuniNotario(BigDecimal funiNotario) {
        this.funiNotario = funiNotario;
    }

    public BigDecimal getFuniNotario() {
        return this.funiNotario;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniLocalidadNota(String funiLocalidadNota) {
        this.funiLocalidadNota = funiLocalidadNota;
    }

    public String getFuniLocalidadNota() {
        return this.funiLocalidadNota;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniNumEscritura(String funiNumEscritura) {
        this.funiNumEscritura = funiNumEscritura;
    }

    public String getFuniNumEscritura() {
        return this.funiNumEscritura;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniFolioReal(String funiFolioReal) {
        this.funiFolioReal = funiFolioReal;
    }

    public String getFuniFolioReal() {
        return this.funiFolioReal;
    }

    @FieldInfo(nullable = true, dataType = "DATE", javaClass = String.class)
    public void setFuniFechaTrasladoDominio(String funiFechaTrasladoDominio) {
        this.funiFechaTrasladoDominio = funiFechaTrasladoDominio;
    }

    public String getFuniFechaTrasladoDominio() {
        return this.funiFechaTrasladoDominio;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniStatus(String funiStatus) {
        this.funiStatus = funiStatus;
    }

    public String getFuniStatus() {
        return this.funiStatus;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniNombreAdquiriente(String funiNombreAdquiriente) {
        this.funiNombreAdquiriente = funiNombreAdquiriente;
    }

    public String getFuniNombreAdquiriente() {
        return funiNombreAdquiriente;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFuniNombreNotario(String funiNombreNotario) {
        this.funiNombreNotario = funiNombreNotario;
    }

    public String getFuniNombreNotario() {
        return funiNombreNotario;
    }

    public DMLObject getSelectByPK() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "SELECT * FROM F_UNIDADES ";

        String conditions = "";
        ArrayList values = new ArrayList();

        conditions += " AND FUNI_ID_FIDEICOMISO = ?";
        values.add(this.getFuniIdFideicomiso());

        conditions += " AND FUNI_ID_SUBCUENTA = ?";
        values.add(this.getFuniIdSubcuenta());

        conditions += " AND FUNI_ID_BIEN = ?";
        values.add(this.getFuniIdBien());

        conditions += " AND FUNI_ID_EDIFICIO = ?";
        values.add(this.getFuniIdEdificio());

        conditions += " AND FUNI_ID_DEPTO = ?";
        values.add(this.getFuniIdDepto());


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
        String sql = "SELECT * FROM F_UNIDADES ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getFuniIdFideicomiso() != null && this.getFuniIdFideicomiso().longValue() == -999) {
            conditions += " AND FUNI_ID_FIDEICOMISO IS NULL";
        } else if (this.getFuniIdFideicomiso() != null) {
            conditions += " AND FUNI_ID_FIDEICOMISO = ?";
            values.add(this.getFuniIdFideicomiso());
        }

        if (this.getFuniIdSubcuenta() != null && this.getFuniIdSubcuenta().longValue() == -999) {
            conditions += " AND FUNI_ID_SUBCUENTA IS NULL";
        } else if (this.getFuniIdSubcuenta() != null) {
            conditions += " AND FUNI_ID_SUBCUENTA = ?";
            values.add(this.getFuniIdSubcuenta());
        }

        if (this.getFuniIdBien() != null && "null".equals(this.getFuniIdBien())) {
            conditions += " AND FUNI_ID_BIEN IS NULL";
        } else if (this.getFuniIdBien() != null) {
            conditions += " AND FUNI_ID_BIEN = ?";
            values.add(this.getFuniIdBien());
        }

        if (this.getFuniIdDepto() != null && "null".equals(this.getFuniIdDepto())) {
            conditions += " AND FUNI_ID_DEPTO IS NULL";
        } else if (this.getFuniIdDepto() != null) {
            conditions += " AND FUNI_ID_DEPTO = ?";
            values.add(this.getFuniIdDepto());
        }

        if (this.getFuniTipo() != null && "null".equals(this.getFuniTipo())) {
            conditions += " AND FUNI_TIPO IS NULL";
        } else if (this.getFuniTipo() != null) {
            conditions += " AND FUNI_TIPO = ?";
            values.add(this.getFuniTipo());
        }

        if (this.getFuniNiveles() != null && "null".equals(this.getFuniNiveles())) {
            conditions += " AND FUNI_NIVELES IS NULL";
        } else if (this.getFuniNiveles() != null) {
            conditions += " AND FUNI_NIVELES = ?";
            values.add(this.getFuniNiveles());
        }

        if (this.getFuniCalleNum() != null && "null".equals(this.getFuniCalleNum())) {
            conditions += " AND FUNI_CALLE_NUM IS NULL";
        } else if (this.getFuniCalleNum() != null) {
            conditions += " AND FUNI_CALLE_NUM = ?";
            values.add(this.getFuniCalleNum());
        }

        if (this.getFuniNomColonia() != null && "null".equals(this.getFuniNomColonia())) {
            conditions += " AND FUNI_NOM_COLONIA IS NULL";
        } else if (this.getFuniNomColonia() != null) {
            conditions += " AND FUNI_NOM_COLONIA = ?";
            values.add(this.getFuniNomColonia());
        }

        if (this.getFuniNomPoblacion() != null && "null".equals(this.getFuniNomPoblacion())) {
            conditions += " AND FUNI_NOM_POBLACION IS NULL";
        } else if (this.getFuniNomPoblacion() != null) {
            conditions += " AND FUNI_NOM_POBLACION = ?";
            values.add(this.getFuniNomPoblacion());
        }

        if (this.getFuniCodigoPostal() != null && "null".equals(this.getFuniCodigoPostal())) {
            conditions += " AND FUNI_CODIGO_POSTAL IS NULL";
        } else if (this.getFuniCodigoPostal() != null) {
            conditions += " AND FUNI_CODIGO_POSTAL = ?";
            values.add(this.getFuniCodigoPostal());
        }

        if (this.getFuniClaveEstado() != null && "null".equals(this.getFuniClaveEstado())) {
            conditions += " AND FUNI_NUM_ESTADO IS NULL";
        } else if (this.getFuniClaveEstado() != null) {
            conditions += " AND FUNI_NUM_ESTADO = ?";
            values.add(this.getFuniClaveEstado());
        }

        if (this.getFuniClavePais() != null && "null".equals(this.getFuniClavePais())) {
            conditions += " AND FUNI_NUM_PAIS IS NULL";
        } else if (this.getFuniClavePais() != null) {
            conditions += " AND FUNI_NUM_PAIS = ?";
            values.add(this.getFuniClavePais());
        }

        if (this.getFuniColindancias() != null && "null".equals(this.getFuniColindancias())) {
            conditions += " AND FUNI_COLINDANCIAS IS NULL";
        } else if (this.getFuniColindancias() != null) {
            conditions += " AND FUNI_COLINDANCIAS = ?";
            values.add(this.getFuniColindancias());
        }

        if (this.getFuniMedidas() != null && "null".equals(this.getFuniMedidas())) {
            conditions += " AND FUNI_MEDIDAS IS NULL";
        } else if (this.getFuniMedidas() != null) {
            conditions += " AND FUNI_MEDIDAS = ?";
            values.add(this.getFuniMedidas());
        }

        if (this.getFuniPrecio() != null && this.getFuniPrecio().longValue() == -999) {
            conditions += " AND FUNI_PRECIO IS NULL";
        } else if (this.getFuniPrecio() != null) {
            conditions += " AND FUNI_PRECIO = ?";
            values.add(this.getFuniPrecio());
        }

        if (this.getFuniUltimoAvaluo() != null && this.getFuniUltimoAvaluo().longValue() == -999) {
            conditions += " AND FUNI_ULTIMO_AVALUO IS NULL";
        } else if (this.getFuniUltimoAvaluo() != null) {
            conditions += " AND FUNI_ULTIMO_AVALUO = ?";
            values.add(this.getFuniUltimoAvaluo());
        }

        if (this.getFuniFechaUltimoAvaluo() != null && "null".equals(this.getFuniFechaUltimoAvaluo())) {
            conditions += " AND FUNI_FECHA_ULTIMO_AVALUO IS NULL";
        } else if (this.getFuniFechaUltimoAvaluo() != null) {
            conditions += " AND FUNI_FECHA_ULTIMO_AVALUO = TO_DATE(?,'dd/MM/yyyy')";
            values.add(this.getFuniFechaUltimoAvaluo());
        }

        if (this.getFuniMoneda() != null && this.getFuniMoneda().longValue() == -999) {
            conditions += " AND FUNI_MONEDA IS NULL";
        } else if (this.getFuniMoneda() != null) {
            conditions += " AND FUNI_MONEDA = ?";
            values.add(this.getFuniMoneda());
        }

        if (this.getFuniNotario() != null && this.getFuniNotario().longValue() == -999) {
            conditions += " AND FUNI_NOTARIO IS NULL";
        } else if (this.getFuniNotario() != null) {
            conditions += " AND FUNI_NOTARIO = ?";
            values.add(this.getFuniNotario());
        }

        if (this.getFuniLocalidadNota() != null && "null".equals(this.getFuniLocalidadNota())) {
            conditions += " AND FUNI_LOCALIDAD_NOTA IS NULL";
        } else if (this.getFuniLocalidadNota() != null) {
            conditions += " AND FUNI_LOCALIDAD_NOTA = ?";
            values.add(this.getFuniLocalidadNota());
        }

        if (this.getFuniNumEscritura() != null && "null".equals(this.getFuniNumEscritura())) {
            conditions += " AND FUNI_NUM_ESCRITURA IS NULL";
        } else if (this.getFuniNumEscritura() != null) {
            conditions += " AND FUNI_NUM_ESCRITURA = ?";
            values.add(this.getFuniNumEscritura());
        }

        if (this.getFuniFolioReal() != null && "null".equals(this.getFuniFolioReal())) {
            conditions += " AND FUNI_FOLIO_REAL IS NULL";
        } else if (this.getFuniFolioReal() != null) {
            conditions += " AND FUNI_FOLIO_REAL = ?";
            values.add(this.getFuniFolioReal());
        }

        if (this.getFuniFechaTrasladoDominio() != null && "null".equals(this.getFuniFechaTrasladoDominio())) {
            conditions += " AND FUNI_FECHA_TRASLADO_DOMINIO IS NULL";
        } else if (this.getFuniFechaTrasladoDominio() != null) {
            conditions += " AND FUNI_FECHA_TRASLADO_DOMINIO = TO_DATE(?,'dd/MM/yyyy')";
            values.add(this.getFuniFechaTrasladoDominio());
        }

        if (this.getFuniStatus() != null && "null".equals(this.getFuniStatus())) {
            conditions += " AND FUNI_STATUS IS NULL";
        } else if (this.getFuniStatus() != null) {
            conditions += " AND FUNI_STATUS = ?";
            values.add(this.getFuniStatus());
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
        String sql = "UPDATE F_UNIDADES SET ";

        String fields = "";
        String conditions = "";
        ArrayList pkValues = new ArrayList();
        ArrayList values = new ArrayList();

        conditions += " AND FUNI_ID_FIDEICOMISO = ?";
        pkValues.add(this.getFuniIdFideicomiso());
        conditions += " AND FUNI_ID_SUBCUENTA = ?";
        pkValues.add(this.getFuniIdSubcuenta());
        conditions += " AND FUNI_ID_BIEN = ?";
        pkValues.add(this.getFuniIdBien());
        conditions += " AND FUNI_ID_EDIFICIO = ?";
        pkValues.add(this.getFuniIdEdificio());
        conditions += " AND FUNI_ID_DEPTO = ?";
        pkValues.add(this.getFuniIdDepto());

        fields += " FUNI_TIPO = ?, ";
        values.add(this.getFuniTipo());
        fields += " FUNI_NIVELES = ?, ";
        values.add(this.getFuniNiveles());
        fields += " FUNI_CALLE_NUM = ?, ";
        values.add(this.getFuniCalleNum());
        fields += " FUNI_NOM_COLONIA = ?, ";
        values.add(this.getFuniNomColonia());
        fields += " FUNI_NOM_POBLACION = ?, ";
        values.add(this.getFuniNomPoblacion());
        fields += " FUNI_CODIGO_POSTAL = ?, ";
        values.add(this.getFuniCodigoPostal());
        fields += " FUNI_NUM_ESTADO = ?, ";
        values.add(this.getFuniClaveEstado());
        fields += " FUNI_NUM_PAIS = ?, ";
        values.add(this.getFuniClavePais());
        fields += " FUNI_COLINDANCIAS = ?, ";
        values.add(this.getFuniColindancias());
        fields += " FUNI_MEDIDAS = ?, ";
        values.add(this.getFuniMedidas());
        fields += " FUNI_PRECIO = ?, ";
        values.add(this.getFuniPrecio());
        fields += " FUNI_ULTIMO_AVALUO = ?, ";
        values.add(this.getFuniUltimoAvaluo());
        fields += " FUNI_FECHA_ULTIMO_AVALUO = TO_DATE(?, 'dd/MM/yyyy'), ";
        values.add(this.getFuniFechaUltimoAvaluo());
        fields += " FUNI_MONEDA = ?, ";
        values.add(this.getFuniMoneda());
        fields += " FUNI_NOTARIO = ?, ";
        values.add(this.getFuniNotario());
        fields += " FUNI_LOCALIDAD_NOTA = ?, ";
        values.add(this.getFuniLocalidadNota());
        fields += " FUNI_NUM_ESCRITURA = ?, ";
        values.add(this.getFuniNumEscritura());
        fields += " FUNI_FOLIO_REAL = ?, ";
        values.add(this.getFuniFolioReal());
        fields += " FUNI_FECHA_TRASLADO_DOMINIO = TO_DATE(?, 'dd/MM/yyyy'), ";
        values.add(this.getFuniFechaTrasladoDominio());
        fields += " FUNI_STATUS = ?, ";
        values.add(this.getFuniStatus());
        fields += " FUNI_NOMBRE_ADQUIRIENTE = ?, ";
        values.add(this.getFuniNombreAdquiriente());
        fields += " FUNI_NOMBRE_NOTARIO = ?, ";
        values.add(this.getFuniNombreNotario());

        for (int i = 0; i < pkValues.size(); i++) {
            values.add(pkValues.get(i));
        }

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
        String sql = "INSERT INTO F_UNIDADES ( ";

        String fields = "";
        String fieldValues = "";
        ArrayList values = new ArrayList();

        fields += ", FUNI_ID_FIDEICOMISO";
        fieldValues += ", ?";
        values.add(this.getFuniIdFideicomiso());

        fields += ", FUNI_ID_SUBCUENTA";
        fieldValues += ", ?";
        values.add(this.getFuniIdSubcuenta());

        fields += ", FUNI_ID_BIEN";
        fieldValues += ", ?";
        values.add(this.getFuniIdBien());

        fields += ", FUNI_ID_EDIFICIO";
        fieldValues += ", ?";
        values.add(this.getFuniIdEdificio());

        fields += ", FUNI_ID_DEPTO";
        fieldValues += ", ?";
        values.add(this.getFuniIdDepto());

        fields += ", FUNI_TIPO";
        fieldValues += ", ?";
        values.add(this.getFuniTipo());

        fields += ", FUNI_NIVELES";
        fieldValues += ", ?";
        values.add(this.getFuniNiveles());

        fields += ", FUNI_CALLE_NUM";
        fieldValues += ", ?";
        values.add(this.getFuniCalleNum());

        fields += ", FUNI_NOM_COLONIA";
        fieldValues += ", ?";
        values.add(this.getFuniNomColonia());

        fields += ", FUNI_NOM_POBLACION";
        fieldValues += ", ?";
        values.add(this.getFuniNomPoblacion());

        fields += ", FUNI_CODIGO_POSTAL";
        fieldValues += ", ?";
        values.add(this.getFuniCodigoPostal());

        fields += ", FUNI_NUM_ESTADO";
        fieldValues += ", ?";
        values.add(this.getFuniClaveEstado());

        fields += ", FUNI_NUM_PAIS";
        fieldValues += ", ?";
        values.add(this.getFuniClavePais());

        fields += ", FUNI_COLINDANCIAS";
        fieldValues += ", ?";
        values.add(this.getFuniColindancias());

        fields += ", FUNI_MEDIDAS";
        fieldValues += ", ?";
        values.add(this.getFuniMedidas());

        fields += ", FUNI_PRECIO";
        fieldValues += ", ?";
        values.add(this.getFuniPrecio());

        fields += ", FUNI_ULTIMO_AVALUO";
        fieldValues += ", ?";
        values.add(this.getFuniUltimoAvaluo());

        fields += ", FUNI_FECHA_ULTIMO_AVALUO";
        fieldValues += ", TO_DATE(?, 'dd/MM/yyyy') ";
        values.add(this.getFuniFechaUltimoAvaluo());

        fields += ", FUNI_MONEDA";
        fieldValues += ", ?";
        values.add(this.getFuniMoneda());

        fields += ", FUNI_NOTARIO";
        fieldValues += ", ?";
        values.add(this.getFuniNotario());

        fields += ", FUNI_LOCALIDAD_NOTA";
        fieldValues += ", ?";
        values.add(this.getFuniLocalidadNota());

        fields += ", FUNI_NUM_ESCRITURA";
        fieldValues += ", ?";
        values.add(this.getFuniNumEscritura());

        fields += ", FUNI_FOLIO_REAL";
        fieldValues += ", ?";
        values.add(this.getFuniFolioReal());

        fields += ", FUNI_STATUS";
        fieldValues += ", ?";
        values.add(this.getFuniStatus());

        fields += ", FUNI_ESTACIONAMIENTO1";
        fieldValues += ", ?";
        values.add(this.getFuniEstacionamiento1());

        fields += ", FUNI_SUPERFICIE1";
        fieldValues += ", ?";
        values.add(this.getFuniSuperficie1());

        fields += ", FUNI_ESTACIONAMIENTO2";
        fieldValues += ", ?";
        values.add(this.getFuniEstacionamiento2());

        fields += ", FUNI_SUPERFICIE2";
        fieldValues += ", ?";
        values.add(this.getFuniSuperficie2());

        fields += ", FUNI_ESTACIONAMIENTO3";
        fieldValues += ", ?";
        values.add(this.getFuniEstacionamiento3());

        fields += ", FUNI_SUPERFICIE3";
        fieldValues += ", ?";
        values.add(this.getFuniSuperficie3());

        fields += ", FUNI_ROOF_GARDEN";
        fieldValues += ", ?";
        values.add(this.getFuniRoofGarden());

        fields += ", FUNI_ROOF_SUPERFICIE";
        fieldValues += ", ?";
        values.add(this.getFuniRoofSuperficie());

        fields += ", FUNI_SOTANO";
        fieldValues += ", ?";
        values.add(this.getFuniSotano());

        fields += ", FUNI_SOTANO_SUPERFICIE";
        fieldValues += ", ?";
        values.add(this.getFuniSotanoSuperficie());

        fields += ", FUNI_INDIVISO";
        fieldValues += ", ?";
        values.add(this.getFuniIndiviso());

        fields += ", FUNI_NUMERO_CATASTRO";
        fieldValues += ", ?";
        values.add(this.getFuniNumeroCatastro());

        fields += ", FUNI_PRECIO_CATASTRO";
        fieldValues += ", ?";
        values.add(this.getFuniPrecioCatastro());

        fields += ", FUNI_ACTO1";
        fieldValues += ", ?";
        values.add(this.getFuniActo1());

        fields += ", FUNI_ACTO2";
        fieldValues += ", ?";
        values.add(this.getFuniActo2());

        fields += ", FUNI_ACTO3";
        fieldValues += ", ?";
        values.add(this.getFuniActo3());

        fields += ", FUNI_ACTO4";
        fieldValues += ", ?";
        values.add(this.getFuniActo4());

        fields += ", FUNI_FECHA_REVERSION";
        fieldValues += ", TO_DATE(?, 'dd/MM/yyyy') ";
        values.add(this.getFuniFechaReversion());

        fields += ", FUNI_CVE_GRAHIPO";
        fieldValues += ", ?";
        values.add(this.getFuniCveGrahipo());

        fields += ", FUNI_NUM_HIPOTECA";
        fieldValues += ", ?";
        values.add(this.getFuniNumHipoteca());

        fields += ", FUNI_A_FAVOR";
        fieldValues += ", ?";
        values.add(this.getFuniAFavor());

        fields += ", FUNI_NOMBRE_ADQUIRIENTE";
        fieldValues += ", ?";
        values.add(this.getFuniNombreAdquiriente());

        fields += ", FUNI_NOMBRE_NOTARIO";
        fieldValues += ", ?";
        values.add(this.getFuniNombreNotario());


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
        String sql = "DELETE FROM F_UNIDADES WHERE ";

        String conditions = "";
        ArrayList values = new ArrayList();

        conditions += " AND FUNI_ID_FIDEICOMISO = ?";
        values.add(this.getFuniIdFideicomiso());
        conditions += " AND FUNI_ID_SUBCUENTA = ?";
        values.add(this.getFuniIdSubcuenta());
        conditions += " AND FUNI_ID_BIEN = ?";
        values.add(this.getFuniIdBien());
        conditions += " AND FUNI_ID_EDIFICIO = ?";
        values.add(this.getFuniIdEdificio());
        conditions += " AND FUNI_ID_DEPTO = ?";
        values.add(this.getFuniIdDepto());

        conditions = conditions.substring(4).trim();
        result.setSql(sql + conditions);
        result.setParameters(values.toArray());
        return result;

    }

    public boolean validate() {
        return true;
    }

    public boolean doCompare(Object compareWith) {
        FUnidades instance = (FUnidades) compareWith;
        boolean equalObjects = true;
        if (equalObjects && !this.getFuniIdFideicomiso().equals(instance.getFuniIdFideicomiso()))
            equalObjects = false;
        if (equalObjects && !this.getFuniIdSubcuenta().equals(instance.getFuniIdSubcuenta()))
            equalObjects = false;
        if (equalObjects && !this.getFuniIdBien().equals(instance.getFuniIdBien()))
            equalObjects = false;
        if (equalObjects && !this.getFuniIdDepto().equals(instance.getFuniIdDepto()))
            equalObjects = false;
        if (equalObjects && !this.getFuniTipo().equals(instance.getFuniTipo()))
            equalObjects = false;
        if (equalObjects && !this.getFuniNiveles().equals(instance.getFuniNiveles()))
            equalObjects = false;
        if (equalObjects && !this.getFuniCalleNum().equals(instance.getFuniCalleNum()))
            equalObjects = false;
        if (equalObjects && !this.getFuniNomColonia().equals(instance.getFuniNomColonia()))
            equalObjects = false;
        if (equalObjects && !this.getFuniNomPoblacion().equals(instance.getFuniNomPoblacion()))
            equalObjects = false;
        if (equalObjects && !this.getFuniCodigoPostal().equals(instance.getFuniCodigoPostal()))
            equalObjects = false;
        if (equalObjects && !this.getFuniClaveEstado().equals(instance.getFuniClaveEstado()))
            equalObjects = false;
        if (equalObjects && !this.getFuniClavePais().equals(instance.getFuniClavePais()))
            equalObjects = false;
        if (equalObjects && !this.getFuniColindancias().equals(instance.getFuniColindancias()))
            equalObjects = false;
        if (equalObjects && !this.getFuniMedidas().equals(instance.getFuniMedidas()))
            equalObjects = false;
        if (equalObjects && !this.getFuniPrecio().equals(instance.getFuniPrecio()))
            equalObjects = false;
        if (equalObjects && !this.getFuniUltimoAvaluo().equals(instance.getFuniUltimoAvaluo()))
            equalObjects = false;
        if (equalObjects && !this.getFuniFechaUltimoAvaluo().equals(instance.getFuniFechaUltimoAvaluo()))
            equalObjects = false;
        if (equalObjects && !this.getFuniMoneda().equals(instance.getFuniMoneda()))
            equalObjects = false;
        if (equalObjects && !this.getFuniNotario().equals(instance.getFuniNotario()))
            equalObjects = false;
        if (equalObjects && !this.getFuniLocalidadNota().equals(instance.getFuniLocalidadNota()))
            equalObjects = false;
        if (equalObjects && !this.getFuniNumEscritura().equals(instance.getFuniNumEscritura()))
            equalObjects = false;
        if (equalObjects && !this.getFuniFolioReal().equals(instance.getFuniFolioReal()))
            equalObjects = false;
        if (equalObjects && !this.getFuniFechaTrasladoDominio().equals(instance.getFuniFechaTrasladoDominio()))
            equalObjects = false;
        if (equalObjects && !this.getFuniStatus().equals(instance.getFuniStatus()))
            equalObjects = false;
        return equalObjects;
    }

    public Object selectAsObject() {
        FUnidades result = new FUnidades();
        DataRow objectData = null;
        objectData = selectAsDataRow();

        if (!objectData.hasData()) {
            return null;
        }

        result.setFuniIdFideicomiso((BigDecimal) objectData.getData("FUNI_ID_FIDEICOMISO"));
        result.setFuniIdSubcuenta((BigDecimal) objectData.getData("FUNI_ID_SUBCUENTA"));
        result.setFuniIdBien((String) objectData.getData("FUNI_ID_BIEN"));
        result.setFuniIdEdificio((String) objectData.getData("FUNI_ID_EDIFICIO"));
        result.setFuniIdDepto((String) objectData.getData("FUNI_ID_DEPTO"));
        result.setFuniTipo((String) objectData.getData("FUNI_TIPO"));
        result.setFuniNiveles((String) objectData.getData("FUNI_NIVELES"));
        result.setFuniCalleNum((String) objectData.getData("FUNI_CALLE_NUM"));
        result.setFuniNomColonia((String) objectData.getData("FUNI_NOM_COLONIA"));
        result.setFuniNomPoblacion((String) objectData.getData("FUNI_NOM_POBLACION"));
        result.setFuniCodigoPostal((String) objectData.getData("FUNI_CODIGO_POSTAL"));
        result.setFuniClaveEstado((String) objectData.getData("FUNI_NUM_ESTADO"));
        result.setFuniClavePais((String) objectData.getData("FUNI_NUM_PAIS"));
        result.setFuniColindancias((String) objectData.getData("FUNI_COLINDANCIAS"));
        result.setFuniMedidas((String) objectData.getData("FUNI_MEDIDAS"));
        result.setFuniPrecio((BigDecimal) objectData.getData("FUNI_PRECIO"));
        result.setFuniUltimoAvaluo((BigDecimal) objectData.getData("FUNI_ULTIMO_AVALUO"));
        result.setFuniFechaUltimoAvaluo((String) objectData.getData("FUNI_FECHA_ULTIMO_AVALUO"));
        result.setFuniMoneda((BigDecimal) objectData.getData("FUNI_MONEDA"));
        result.setFuniNotario((BigDecimal) objectData.getData("FUNI_NOTARIO"));
        result.setFuniLocalidadNota((String) objectData.getData("FUNI_LOCALIDAD_NOTA"));
        result.setFuniNumEscritura((String) objectData.getData("FUNI_NUM_ESCRITURA"));
        result.setFuniFolioReal((String) objectData.getData("FUNI_FOLIO_REAL"));
        result.setFuniFechaTrasladoDominio((String) objectData.getData("FUNI_FECHA_TRASLADO_DOMINIO"));
        result.setFuniStatus((String) objectData.getData("FUNI_STATUS"));
        result.setFuniEstacionamiento1((String) objectData.getData("FUNI_ESTACIONAMIENTO1"));
        result.setFuniSuperficie1((String) objectData.getData("FUNI_SUPERFICIE1"));
        result.setFuniEstacionamiento2((String) objectData.getData("FUNI_ESTACIONAMIENTO2"));
        result.setFuniSuperficie2((String) objectData.getData("FUNI_SUPERFICIE2"));
        result.setFuniEstacionamiento3((String) objectData.getData("FUNI_ESTACIONAMIENTO3"));
        result.setFuniSuperficie3((String) objectData.getData("FUNI_SUPERFICIE3"));
        result.setFuniRoofGarden((String) objectData.getData("FUNI_ROOF_GARDEN"));
        result.setFuniRoofSuperficie((String) objectData.getData("FUNI_ROOF_SUPERFICIE"));
        result.setFuniSotano((String) objectData.getData("FUNI_SOTANO"));
        result.setFuniSotanoSuperficie((String) objectData.getData("FUNI_SOTANO_SUPERFICIE"));
        result.setFuniIndiviso((BigDecimal) objectData.getData("FUNI_INDIVISO"));
        result.setFuniNumeroCatastro((BigDecimal) objectData.getData("FUNI_NUMERO_CATASTRO"));
        result.setFuniPrecioCatastro((BigDecimal) objectData.getData("FUNI_PRECIO_CATASTRO"));
        result.setFuniActo1((String) objectData.getData("FUNI_ACTO1"));
        result.setFuniActo2((String) objectData.getData("FUNI_ACTO2"));
        result.setFuniActo3((String) objectData.getData("FUNI_ACTO3"));
        result.setFuniActo4((String) objectData.getData("FUNI_ACTO4"));
        result.setFuniFechaReversion((String) objectData.getData("FUNI_FECHA_REVERSION"));
        result.setFuniCveGrahipo((BigDecimal) objectData.getData("FUNI_CVE_GRAHIPO"));
        result.setFuniNumHipoteca((String) objectData.getData("FUNI_NUM_HIPOTECA"));
        result.setFuniAFavor((String) objectData.getData("FUNI_A_FAVOR"));
        result.setFuniNombreAdquiriente((String) objectData.getData("FUNI_NOMBRE_ADQUIRIENTE"));
        result.setFuniNombreNotario((String) objectData.getData("FUNI_NOMBRE_NOTARIO"));

        return result;

    }


    public void setFuniEstacionamiento1(String funiEstacionamiento1) {
        this.funiEstacionamiento1 = funiEstacionamiento1;
    }

    public String getFuniEstacionamiento1() {
        return funiEstacionamiento1;
    }

    public void setFuniSuperficie1(String funiSuperficie1) {
        this.funiSuperficie1 = funiSuperficie1;
    }

    public String getFuniSuperficie1() {
        return funiSuperficie1;
    }

    public void setFuniEstacionamiento2(String funiEstacionamiento2) {
        this.funiEstacionamiento2 = funiEstacionamiento2;
    }

    public String getFuniEstacionamiento2() {
        return funiEstacionamiento2;
    }

    public void setFuniSuperficie2(String funiSuperficie2) {
        this.funiSuperficie2 = funiSuperficie2;
    }

    public String getFuniSuperficie2() {
        return funiSuperficie2;
    }

    public void setFuniEstacionamiento3(String funiEstacionamiento3) {
        this.funiEstacionamiento3 = funiEstacionamiento3;
    }

    public String getFuniEstacionamiento3() {
        return funiEstacionamiento3;
    }

    public void setFuniSuperficie3(String funiSuperficie3) {
        this.funiSuperficie3 = funiSuperficie3;
    }

    public String getFuniSuperficie3() {
        return funiSuperficie3;
    }

    public void setFuniRoofGarden(String funiRoofGarden) {
        this.funiRoofGarden = funiRoofGarden;
    }

    public String getFuniRoofGarden() {
        return funiRoofGarden;
    }

    public void setFuniRoofSuperficie(String funiRoofSuperficie) {
        this.funiRoofSuperficie = funiRoofSuperficie;
    }

    public String getFuniRoofSuperficie() {
        return funiRoofSuperficie;
    }

    public void setFuniSotano(String funiSotano) {
        this.funiSotano = funiSotano;
    }

    public String getFuniSotano() {
        return funiSotano;
    }

    public void setFuniSotanoSuperficie(String funiSotanoSuperficie) {
        this.funiSotanoSuperficie = funiSotanoSuperficie;
    }

    public String getFuniSotanoSuperficie() {
        return funiSotanoSuperficie;
    }

    public void setFuniIndiviso(BigDecimal funiIndiviso) {
        this.funiIndiviso = funiIndiviso;
    }

    public BigDecimal getFuniIndiviso() {
        return funiIndiviso;
    }


    public void setFuniNumeroCatastro(BigDecimal funiNumeroCatastro) {
        this.funiNumeroCatastro = funiNumeroCatastro;
    }

    public BigDecimal getFuniNumeroCatastro() {
        return funiNumeroCatastro;
    }

    public void setFuniPrecioCatastro(BigDecimal funiPrecioCatastro) {
        this.funiPrecioCatastro = funiPrecioCatastro;
    }

    public BigDecimal getFuniPrecioCatastro() {
        return funiPrecioCatastro;
    }

    public void setFuniActo1(String funiActo1) {
        this.funiActo1 = funiActo1;
    }

    public String getFuniActo1() {
        return funiActo1;
    }

    public void setFuniActo2(String funiActo2) {
        this.funiActo2 = funiActo2;
    }

    public String getFuniActo2() {
        return funiActo2;
    }

    public void setFuniActo3(String funiActo3) {
        this.funiActo3 = funiActo3;
    }

    public String getFuniActo3() {
        return funiActo3;
    }

    public void setFuniActo4(String funiActo4) {
        this.funiActo4 = funiActo4;
    }

    public String getFuniActo4() {
        return funiActo4;
    }

    @FieldInfo(nullable = true, dataType = "DATE", javaClass = String.class)
    public void setFuniFechaReversion(String funiFechaReversion) {
        this.funiFechaReversion = funiFechaReversion;
    }

    public String getFuniFechaReversion() {
        return funiFechaReversion;
    }

    public void setFuniCveGrahipo(BigDecimal funiCveGrahipo) {
        this.funiCveGrahipo = funiCveGrahipo;
    }

    public BigDecimal getFuniCveGrahipo() {
        return funiCveGrahipo;
    }

    public void setFuniNumHipoteca(String funiNumHipoteca) {
        this.funiNumHipoteca = funiNumHipoteca;
    }

    public String getFuniNumHipoteca() {
        return funiNumHipoteca;
    }

    public void setFuniAFavor(String funiAFavor) {
        this.funiAFavor = funiAFavor;
    }

    public String getFuniAFavor() {
        return funiAFavor;
    }

}
