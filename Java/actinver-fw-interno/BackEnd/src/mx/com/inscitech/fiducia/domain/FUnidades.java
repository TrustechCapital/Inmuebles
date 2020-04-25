package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;
import java.util.ArrayList;

import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;
import mx.com.inscitech.fiducia.domain.base.Reference;
import mx.com.inscitech.fiducia.domain.base.DMLObject;

import mx.com.inscitech.fiducia.dml.vo.DataRow;

@PrimaryKey(constraintName = "F_UNIDADES_PK", columns = {"FUNI_ID_FIDEICOMISO", "FUNI_ID_SUBCUENTA", "FUNI_ID_BIEN", "FUNI_ID_DEPTO"}, sequences = { "MANUAL" })
public class FUnidades extends DomainObject {

  BigDecimal funiIdFideicomiso = null;
  BigDecimal funiIdSubcuenta = null;
  String funiIdBien = null;
  String funiIdDepto = null;
  String funiTipo = null;
  BigDecimal funiNiveles = null;
  String funiCalleNum = null;
  String funiNomColonia = null;
  String funiNomPoblacion = null;
  String funiCodigoPostal = null;
  BigDecimal funiNumEstado = null;
  BigDecimal funiNumPais = null;
  String funiColindancias = null;
  String funiMedidas = null;
  BigDecimal funiPrecio = null;
  BigDecimal funiUltimoAvaluo = null;
  String funiFechaUltimoAvaluo = null;
  BigDecimal funiMoneda = null;
  BigDecimal funiNotario = null;
  String funiLocalidadNota = null;
  String funiNumEscritura = null;
  String funiFolioReal = null;
  String funiFechaTrasladoDominio = null;
  String funiStatus = null;

  public FUnidades() {
    super();
    this.pkColumns = 4;
  }

  @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setFuniIdFideicomiso(BigDecimal funiIdFideicomiso) {
    this.funiIdFideicomiso = funiIdFideicomiso;
  }

  public BigDecimal getFuniIdFideicomiso() {
    return this.funiIdFideicomiso;
  }

  @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setFuniIdSubcuenta(BigDecimal funiIdSubcuenta) {
    this.funiIdSubcuenta = funiIdSubcuenta;
  }

  public BigDecimal getFuniIdSubcuenta() {
    return this.funiIdSubcuenta;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniIdBien(String funiIdBien) {
    this.funiIdBien = funiIdBien;
  }

  public String getFuniIdBien() {
    return this.funiIdBien;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniIdDepto(String funiIdDepto) {
    this.funiIdDepto = funiIdDepto;
  }

  public String getFuniIdDepto() {
    return this.funiIdDepto;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniTipo(String funiTipo) {
    this.funiTipo = funiTipo;
  }

  public String getFuniTipo() {
    return this.funiTipo;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setFuniNiveles(BigDecimal funiNiveles) {
    this.funiNiveles = funiNiveles;
  }

  public BigDecimal getFuniNiveles() {
    return this.funiNiveles;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniCalleNum(String funiCalleNum) {
    this.funiCalleNum = funiCalleNum;
  }

  public String getFuniCalleNum() {
    return this.funiCalleNum;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniNomColonia(String funiNomColonia) {
    this.funiNomColonia = funiNomColonia;
  }

  public String getFuniNomColonia() {
    return this.funiNomColonia;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniNomPoblacion(String funiNomPoblacion) {
    this.funiNomPoblacion = funiNomPoblacion;
  }

  public String getFuniNomPoblacion() {
    return this.funiNomPoblacion;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniCodigoPostal(String funiCodigoPostal) {
    this.funiCodigoPostal = funiCodigoPostal;
  }

  public String getFuniCodigoPostal() {
    return this.funiCodigoPostal;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setFuniNumEstado(BigDecimal funiNumEstado) {
    this.funiNumEstado = funiNumEstado;
  }

  public BigDecimal getFuniNumEstado() {
    return this.funiNumEstado;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setFuniNumPais(BigDecimal funiNumPais) {
    this.funiNumPais = funiNumPais;
  }

  public BigDecimal getFuniNumPais() {
    return this.funiNumPais;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniColindancias(String funiColindancias) {
    this.funiColindancias = funiColindancias;
  }

  public String getFuniColindancias() {
    return this.funiColindancias;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniMedidas(String funiMedidas) {
    this.funiMedidas = funiMedidas;
  }

  public String getFuniMedidas() {
    return this.funiMedidas;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 16, scale = 2, javaClass = BigDecimal.class )
  public void setFuniPrecio(BigDecimal funiPrecio) {
    this.funiPrecio = funiPrecio;
  }

  public BigDecimal getFuniPrecio() {
    return this.funiPrecio;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 16, scale = 2, javaClass = BigDecimal.class )
  public void setFuniUltimoAvaluo(BigDecimal funiUltimoAvaluo) {
    this.funiUltimoAvaluo = funiUltimoAvaluo;
  }

  public BigDecimal getFuniUltimoAvaluo() {
    return this.funiUltimoAvaluo;
  }

  @FieldInfo(nullable = true, dataType = "DATE", javaClass = String.class )
  public void setFuniFechaUltimoAvaluo(String funiFechaUltimoAvaluo) {
    this.funiFechaUltimoAvaluo = funiFechaUltimoAvaluo;
  }

  public String getFuniFechaUltimoAvaluo() {
    return this.funiFechaUltimoAvaluo;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setFuniMoneda(BigDecimal funiMoneda) {
    this.funiMoneda = funiMoneda;
  }

  public BigDecimal getFuniMoneda() {
    return this.funiMoneda;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setFuniNotario(BigDecimal funiNotario) {
    this.funiNotario = funiNotario;
  }

  public BigDecimal getFuniNotario() {
    return this.funiNotario;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniLocalidadNota(String funiLocalidadNota) {
    this.funiLocalidadNota = funiLocalidadNota;
  }

  public String getFuniLocalidadNota() {
    return this.funiLocalidadNota;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniNumEscritura(String funiNumEscritura) {
    this.funiNumEscritura = funiNumEscritura;
  }

  public String getFuniNumEscritura() {
    return this.funiNumEscritura;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniFolioReal(String funiFolioReal) {
    this.funiFolioReal = funiFolioReal;
  }

  public String getFuniFolioReal() {
    return this.funiFolioReal;
  }

  @FieldInfo(nullable = true, dataType = "DATE", javaClass = String.class )
  public void setFuniFechaTrasladoDominio(String funiFechaTrasladoDominio) {
    this.funiFechaTrasladoDominio = funiFechaTrasladoDominio;
  }

  public String getFuniFechaTrasladoDominio() {
    return this.funiFechaTrasladoDominio;
  }

  @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class )
  public void setFuniStatus(String funiStatus) {
    this.funiStatus = funiStatus;
  }

  public String getFuniStatus() {
    return this.funiStatus;
  }

  public DMLObject getSelectByPK() {
    if(!retrieveSQL) return null;
    DMLObject result = new DMLObject();
    String sql = "SELECT * FROM F_UNIDADES ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getFuniIdFideicomiso() != null && this.getFuniIdFideicomiso().longValue() == -999) {
      conditions += " AND FUNI_ID_FIDEICOMISO IS NULL";
    } else if(this.getFuniIdFideicomiso() != null) {
      conditions += " AND FUNI_ID_FIDEICOMISO = ?";
      values.add(this.getFuniIdFideicomiso());
    }

    if(this.getFuniIdSubcuenta() != null && this.getFuniIdSubcuenta().longValue() == -999) {
      conditions += " AND FUNI_ID_SUBCUENTA IS NULL";
    } else if(this.getFuniIdSubcuenta() != null) {
      conditions += " AND FUNI_ID_SUBCUENTA = ?";
      values.add(this.getFuniIdSubcuenta());
    }

    if(this.getFuniIdBien() != null && "null".equals(this.getFuniIdBien())) {
      conditions += " AND FUNI_ID_BIEN IS NULL";
    } else if(this.getFuniIdBien() != null) {
      conditions += " AND FUNI_ID_BIEN = ?";
      values.add(this.getFuniIdBien());
    }

    if(this.getFuniIdDepto() != null && "null".equals(this.getFuniIdDepto())) {
      conditions += " AND FUNI_ID_DEPTO IS NULL";
    } else if(this.getFuniIdDepto() != null) {
      conditions += " AND FUNI_ID_DEPTO = ?";
      values.add(this.getFuniIdDepto());
    }

    if(!"".equals(conditions)) {

      conditions = conditions.substring(4).trim();
      sql += "WHERE " + conditions;
      result.setSql(sql);
      result.setParameters(values.toArray());
    }

    return result;

  }

  public DMLObject getSelect() {
    if(!retrieveSQL) return null;
    DMLObject result = new DMLObject();
    String sql = "SELECT * FROM F_UNIDADES ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getFuniIdFideicomiso() != null && this.getFuniIdFideicomiso().longValue() == -999) {
      conditions += " AND FUNI_ID_FIDEICOMISO IS NULL";
    } else if(this.getFuniIdFideicomiso() != null) {
      conditions += " AND FUNI_ID_FIDEICOMISO = ?";
      values.add(this.getFuniIdFideicomiso());
    }

    if(this.getFuniIdSubcuenta() != null && this.getFuniIdSubcuenta().longValue() == -999) {
      conditions += " AND FUNI_ID_SUBCUENTA IS NULL";
    } else if(this.getFuniIdSubcuenta() != null) {
      conditions += " AND FUNI_ID_SUBCUENTA = ?";
      values.add(this.getFuniIdSubcuenta());
    }

    if(this.getFuniIdBien() != null && "null".equals(this.getFuniIdBien())) {
      conditions += " AND FUNI_ID_BIEN IS NULL";
    } else if(this.getFuniIdBien() != null) {
      conditions += " AND FUNI_ID_BIEN = ?";
      values.add(this.getFuniIdBien());
    }

    if(this.getFuniIdDepto() != null && "null".equals(this.getFuniIdDepto())) {
      conditions += " AND FUNI_ID_DEPTO IS NULL";
    } else if(this.getFuniIdDepto() != null) {
      conditions += " AND FUNI_ID_DEPTO = ?";
      values.add(this.getFuniIdDepto());
    }

    if(this.getFuniTipo() != null && "null".equals(this.getFuniTipo())) {
      conditions += " AND FUNI_TIPO IS NULL";
    } else if(this.getFuniTipo() != null) {
      conditions += " AND FUNI_TIPO = ?";
      values.add(this.getFuniTipo());
    }

    if(this.getFuniNiveles() != null && this.getFuniNiveles().longValue() == -999) {
      conditions += " AND FUNI_NIVELES IS NULL";
    } else if(this.getFuniNiveles() != null) {
      conditions += " AND FUNI_NIVELES = ?";
      values.add(this.getFuniNiveles());
    }

    if(this.getFuniCalleNum() != null && "null".equals(this.getFuniCalleNum())) {
      conditions += " AND FUNI_CALLE_NUM IS NULL";
    } else if(this.getFuniCalleNum() != null) {
      conditions += " AND FUNI_CALLE_NUM = ?";
      values.add(this.getFuniCalleNum());
    }

    if(this.getFuniNomColonia() != null && "null".equals(this.getFuniNomColonia())) {
      conditions += " AND FUNI_NOM_COLONIA IS NULL";
    } else if(this.getFuniNomColonia() != null) {
      conditions += " AND FUNI_NOM_COLONIA = ?";
      values.add(this.getFuniNomColonia());
    }

    if(this.getFuniNomPoblacion() != null && "null".equals(this.getFuniNomPoblacion())) {
      conditions += " AND FUNI_NOM_POBLACION IS NULL";
    } else if(this.getFuniNomPoblacion() != null) {
      conditions += " AND FUNI_NOM_POBLACION = ?";
      values.add(this.getFuniNomPoblacion());
    }

    if(this.getFuniCodigoPostal() != null && "null".equals(this.getFuniCodigoPostal())) {
      conditions += " AND FUNI_CODIGO_POSTAL IS NULL";
    } else if(this.getFuniCodigoPostal() != null) {
      conditions += " AND FUNI_CODIGO_POSTAL = ?";
      values.add(this.getFuniCodigoPostal());
    }

    if(this.getFuniNumEstado() != null && this.getFuniNumEstado().longValue() == -999) {
      conditions += " AND FUNI_NUM_ESTADO IS NULL";
    } else if(this.getFuniNumEstado() != null) {
      conditions += " AND FUNI_NUM_ESTADO = ?";
      values.add(this.getFuniNumEstado());
    }

    if(this.getFuniNumPais() != null && this.getFuniNumPais().longValue() == -999) {
      conditions += " AND FUNI_NUM_PAIS IS NULL";
    } else if(this.getFuniNumPais() != null) {
      conditions += " AND FUNI_NUM_PAIS = ?";
      values.add(this.getFuniNumPais());
    }

    if(this.getFuniColindancias() != null && "null".equals(this.getFuniColindancias())) {
      conditions += " AND FUNI_COLINDANCIAS IS NULL";
    } else if(this.getFuniColindancias() != null) {
      conditions += " AND FUNI_COLINDANCIAS = ?";
      values.add(this.getFuniColindancias());
    }

    if(this.getFuniMedidas() != null && "null".equals(this.getFuniMedidas())) {
      conditions += " AND FUNI_MEDIDAS IS NULL";
    } else if(this.getFuniMedidas() != null) {
      conditions += " AND FUNI_MEDIDAS = ?";
      values.add(this.getFuniMedidas());
    }

    if(this.getFuniPrecio() != null && this.getFuniPrecio().longValue() == -999) {
      conditions += " AND FUNI_PRECIO IS NULL";
    } else if(this.getFuniPrecio() != null) {
      conditions += " AND FUNI_PRECIO = ?";
      values.add(this.getFuniPrecio());
    }

    if(this.getFuniUltimoAvaluo() != null && this.getFuniUltimoAvaluo().longValue() == -999) {
      conditions += " AND FUNI_ULTIMO_AVALUO IS NULL";
    } else if(this.getFuniUltimoAvaluo() != null) {
      conditions += " AND FUNI_ULTIMO_AVALUO = ?";
      values.add(this.getFuniUltimoAvaluo());
    }

    if(this.getFuniFechaUltimoAvaluo() != null && "null".equals(this.getFuniFechaUltimoAvaluo())) {
      conditions += " AND FUNI_FECHA_ULTIMO_AVALUO IS NULL";
    } else if(this.getFuniFechaUltimoAvaluo() != null) {
      conditions += " AND FUNI_FECHA_ULTIMO_AVALUO = TO_DATE(?,'dd/MM/yyyy')";
      values.add(this.getFuniFechaUltimoAvaluo());
    }

    if(this.getFuniMoneda() != null && this.getFuniMoneda().longValue() == -999) {
      conditions += " AND FUNI_MONEDA IS NULL";
    } else if(this.getFuniMoneda() != null) {
      conditions += " AND FUNI_MONEDA = ?";
      values.add(this.getFuniMoneda());
    }

    if(this.getFuniNotario() != null && this.getFuniNotario().longValue() == -999) {
      conditions += " AND FUNI_NOTARIO IS NULL";
    } else if(this.getFuniNotario() != null) {
      conditions += " AND FUNI_NOTARIO = ?";
      values.add(this.getFuniNotario());
    }

    if(this.getFuniLocalidadNota() != null && "null".equals(this.getFuniLocalidadNota())) {
      conditions += " AND FUNI_LOCALIDAD_NOTA IS NULL";
    } else if(this.getFuniLocalidadNota() != null) {
      conditions += " AND FUNI_LOCALIDAD_NOTA = ?";
      values.add(this.getFuniLocalidadNota());
    }

    if(this.getFuniNumEscritura() != null && "null".equals(this.getFuniNumEscritura())) {
      conditions += " AND FUNI_NUM_ESCRITURA IS NULL";
    } else if(this.getFuniNumEscritura() != null) {
      conditions += " AND FUNI_NUM_ESCRITURA = ?";
      values.add(this.getFuniNumEscritura());
    }

    if(this.getFuniFolioReal() != null && "null".equals(this.getFuniFolioReal())) {
      conditions += " AND FUNI_FOLIO_REAL IS NULL";
    } else if(this.getFuniFolioReal() != null) {
      conditions += " AND FUNI_FOLIO_REAL = ?";
      values.add(this.getFuniFolioReal());
    }

    if(this.getFuniFechaTrasladoDominio() != null && "null".equals(this.getFuniFechaTrasladoDominio())) {
      conditions += " AND FUNI_FECHA_TRASLADO_DOMINIO IS NULL";
    } else if(this.getFuniFechaTrasladoDominio() != null) {
      conditions += " AND FUNI_FECHA_TRASLADO_DOMINIO = TO_DATE(?,'dd/MM/yyyy')";
      values.add(this.getFuniFechaTrasladoDominio());
    }

    if(this.getFuniStatus() != null && "null".equals(this.getFuniStatus())) {
      conditions += " AND FUNI_STATUS IS NULL";
    } else if(this.getFuniStatus() != null) {
      conditions += " AND FUNI_STATUS = ?";
      values.add(this.getFuniStatus());
    }

    if(!"".equals(conditions)) {

      conditions = conditions.substring(4).trim();
      sql += "WHERE " + conditions;
      result.setSql(sql);
      result.setParameters(values.toArray());
    }

    return result;

  }

  public DMLObject getUpdate() {
    if(!retrieveSQL) return null;
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
    values.add(this.getFuniNumEstado());
    fields += " FUNI_NUM_PAIS = ?, ";
    values.add(this.getFuniNumPais());
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
    for(int i = 0; i < pkValues.size(); i++) {
      values.add(pkValues.get(i));
    };

    fields = fields.substring(0, fields.length() - 2).trim();
    conditions = conditions.substring(4).trim();
    sql += fields + " WHERE " + conditions;
    result.setSql(sql);
    result.setParameters(values.toArray());

    return result;
  }

  public DMLObject getInsert() {
    if(!retrieveSQL) return null;
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
    values.add(this.getFuniNumEstado());

    fields += ", FUNI_NUM_PAIS";
    fieldValues += ", ?";
    values.add(this.getFuniNumPais());

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

    fields += ", FUNI_FECHA_TRASLADO_DOMINIO";
    fieldValues += ", TO_DATE(?, 'dd/MM/yyyy') ";
    values.add(this.getFuniFechaTrasladoDominio());

    fields += ", FUNI_STATUS";
    fieldValues += ", ?";
    values.add(this.getFuniStatus());

    fields = fields.substring(1).trim();
    fieldValues = fieldValues.substring(1).trim();

    sql += fields + " ) VALUES (" + fieldValues + ")";

    result.setSql(sql);
    result.setParameters(values.toArray());

    return result;
  }

  public DMLObject getDelete() {
    if(!retrieveSQL) return null;
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
    conditions += " AND FUNI_ID_DEPTO = ?";
    values.add(this.getFuniIdDepto());
    conditions = conditions.substring(4).trim();
    result.setSql(sql + conditions);
    result.setParameters(values.toArray());
    return result;

  }

  public boolean validate() {
    return true;  }

  public boolean doCompare(Object compareWith) {
    FUnidades instance = (FUnidades)compareWith;
    boolean equalObjects = true;
    if(equalObjects && !this.getFuniIdFideicomiso().equals(instance.getFuniIdFideicomiso())) equalObjects = false;
    if(equalObjects && !this.getFuniIdSubcuenta().equals(instance.getFuniIdSubcuenta())) equalObjects = false;
    if(equalObjects && !this.getFuniIdBien().equals(instance.getFuniIdBien())) equalObjects = false;
    if(equalObjects && !this.getFuniIdDepto().equals(instance.getFuniIdDepto())) equalObjects = false;
    if(equalObjects && !this.getFuniTipo().equals(instance.getFuniTipo())) equalObjects = false;
    if(equalObjects && !this.getFuniNiveles().equals(instance.getFuniNiveles())) equalObjects = false;
    if(equalObjects && !this.getFuniCalleNum().equals(instance.getFuniCalleNum())) equalObjects = false;
    if(equalObjects && !this.getFuniNomColonia().equals(instance.getFuniNomColonia())) equalObjects = false;
    if(equalObjects && !this.getFuniNomPoblacion().equals(instance.getFuniNomPoblacion())) equalObjects = false;
    if(equalObjects && !this.getFuniCodigoPostal().equals(instance.getFuniCodigoPostal())) equalObjects = false;
    if(equalObjects && !this.getFuniNumEstado().equals(instance.getFuniNumEstado())) equalObjects = false;
    if(equalObjects && !this.getFuniNumPais().equals(instance.getFuniNumPais())) equalObjects = false;
    if(equalObjects && !this.getFuniColindancias().equals(instance.getFuniColindancias())) equalObjects = false;
    if(equalObjects && !this.getFuniMedidas().equals(instance.getFuniMedidas())) equalObjects = false;
    if(equalObjects && !this.getFuniPrecio().equals(instance.getFuniPrecio())) equalObjects = false;
    if(equalObjects && !this.getFuniUltimoAvaluo().equals(instance.getFuniUltimoAvaluo())) equalObjects = false;
    if(equalObjects && !this.getFuniFechaUltimoAvaluo().equals(instance.getFuniFechaUltimoAvaluo())) equalObjects = false;
    if(equalObjects && !this.getFuniMoneda().equals(instance.getFuniMoneda())) equalObjects = false;
    if(equalObjects && !this.getFuniNotario().equals(instance.getFuniNotario())) equalObjects = false;
    if(equalObjects && !this.getFuniLocalidadNota().equals(instance.getFuniLocalidadNota())) equalObjects = false;
    if(equalObjects && !this.getFuniNumEscritura().equals(instance.getFuniNumEscritura())) equalObjects = false;
    if(equalObjects && !this.getFuniFolioReal().equals(instance.getFuniFolioReal())) equalObjects = false;
    if(equalObjects && !this.getFuniFechaTrasladoDominio().equals(instance.getFuniFechaTrasladoDominio())) equalObjects = false;
    if(equalObjects && !this.getFuniStatus().equals(instance.getFuniStatus())) equalObjects = false;
    return equalObjects;
  }

  public Object selectAsObject() {
    FUnidades result = new FUnidades();
    DataRow objectData = null;
    objectData = selectAsDataRow();

    result.setFuniIdFideicomiso((BigDecimal)objectData.getData("FUNI_ID_FIDEICOMISO"));
    result.setFuniIdSubcuenta((BigDecimal)objectData.getData("FUNI_ID_SUBCUENTA"));
    result.setFuniIdBien((String)objectData.getData("FUNI_ID_BIEN"));
    result.setFuniIdDepto((String)objectData.getData("FUNI_ID_DEPTO"));
    result.setFuniTipo((String)objectData.getData("FUNI_TIPO"));
    result.setFuniNiveles((BigDecimal)objectData.getData("FUNI_NIVELES"));
    result.setFuniCalleNum((String)objectData.getData("FUNI_CALLE_NUM"));
    result.setFuniNomColonia((String)objectData.getData("FUNI_NOM_COLONIA"));
    result.setFuniNomPoblacion((String)objectData.getData("FUNI_NOM_POBLACION"));
    result.setFuniCodigoPostal((String)objectData.getData("FUNI_CODIGO_POSTAL"));
    result.setFuniNumEstado((BigDecimal)objectData.getData("FUNI_NUM_ESTADO"));
    result.setFuniNumPais((BigDecimal)objectData.getData("FUNI_NUM_PAIS"));
    result.setFuniColindancias((String)objectData.getData("FUNI_COLINDANCIAS"));
    result.setFuniMedidas((String)objectData.getData("FUNI_MEDIDAS"));
    result.setFuniPrecio((BigDecimal)objectData.getData("FUNI_PRECIO"));
    result.setFuniUltimoAvaluo((BigDecimal)objectData.getData("FUNI_ULTIMO_AVALUO"));
    result.setFuniFechaUltimoAvaluo((String)objectData.getData("FUNI_FECHA_ULTIMO_AVALUO"));
    result.setFuniMoneda((BigDecimal)objectData.getData("FUNI_MONEDA"));
    result.setFuniNotario((BigDecimal)objectData.getData("FUNI_NOTARIO"));
    result.setFuniLocalidadNota((String)objectData.getData("FUNI_LOCALIDAD_NOTA"));
    result.setFuniNumEscritura((String)objectData.getData("FUNI_NUM_ESCRITURA"));
    result.setFuniFolioReal((String)objectData.getData("FUNI_FOLIO_REAL"));
    result.setFuniFechaTrasladoDominio((String)objectData.getData("FUNI_FECHA_TRASLADO_DOMINIO"));
    result.setFuniStatus((String)objectData.getData("FUNI_STATUS"));

    return result;

  }

}