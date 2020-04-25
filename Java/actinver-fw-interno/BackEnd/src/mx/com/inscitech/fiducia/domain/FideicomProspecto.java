package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "FIDEICOM_PROSPECTO_PK", columns = {"FID_NUM_PROSPECTO", "FID_SECUENCIAL_PERSONA"}, sequences = { "MANUAL" })
public class FideicomProspecto extends DomainObject {

  BigDecimal fidNumProspecto = null;
  String fidCvePersona = null;
  BigDecimal fidSecuencialPersona = null;
  String fidNomPersona = null;
  String fidRfcPersona = null;
  String fidCurpPersona = null;
  String fidDomicilioPersona = null;
  String fidTelPersona = null;
  String fidCveStPersona = null;
    String fidApPaterno = null;
    String fidApMaterno = null;

  public FideicomProspecto() {
    super();
    this.pkColumns = 2;
  }

  @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setFidNumProspecto(BigDecimal fidNumProspecto) {
    this.fidNumProspecto = fidNumProspecto;
  }

  public BigDecimal getFidNumProspecto() {
    return this.fidNumProspecto;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setFidCvePersona(String fidCvePersona) {
    this.fidCvePersona = fidCvePersona;
  }

  public String getFidCvePersona() {
    return this.fidCvePersona;
  }

  @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setFidSecuencialPersona(BigDecimal fidSecuencialPersona) {
    this.fidSecuencialPersona = fidSecuencialPersona;
  }

  public BigDecimal getFidSecuencialPersona() {
    return this.fidSecuencialPersona;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setFidNomPersona(String fidNomPersona) {
    this.fidNomPersona = fidNomPersona;
  }

  public String getFidNomPersona() {
    return this.fidNomPersona;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setFidRfcPersona(String fidRfcPersona) {
    this.fidRfcPersona = fidRfcPersona;
  }

  public String getFidRfcPersona() {
    return this.fidRfcPersona;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setFidCurpPersona(String fidCurpPersona) {
    this.fidCurpPersona = fidCurpPersona;
  }

  public String getFidCurpPersona() {
    return this.fidCurpPersona;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setFidDomicilioPersona(String fidDomicilioPersona) {
    this.fidDomicilioPersona = fidDomicilioPersona;
  }

  public String getFidDomicilioPersona() {
    return this.fidDomicilioPersona;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setFidTelPersona(String fidTelPersona) {
    this.fidTelPersona = fidTelPersona;
  }

  public String getFidTelPersona() {
    return this.fidTelPersona;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setFidCveStPersona(String fidCveStPersona) {
    this.fidCveStPersona = fidCveStPersona;
  }

  public String getFidCveStPersona() {
    return this.fidCveStPersona;
  }
  
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setFidApPaterno(String fidApPaterno) {
      this.fidApPaterno= fidApPaterno;
    }

    public String getFidApPaterno() {
      return this.fidApPaterno;
    }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setFidApMaterno(String fidApMaterno) {
      this.fidApMaterno= fidApMaterno;
    }

    public String getFidApMaterno() {
      return this.fidApMaterno;
    }

  public DMLObject getSelectByPK() {
    if(!retrieveSQL) return null;
    DMLObject result = new DMLObject();
    String sql = "SELECT * FROM FIDEICOM_PROSPECTO ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getFidNumProspecto() != null && this.getFidNumProspecto().longValue() == -999) {
      conditions += " AND FID_NUM_PROSPECTO IS NULL";
    } else if(this.getFidNumProspecto() != null) {
      conditions += " AND FID_NUM_PROSPECTO = ?";
      values.add(this.getFidNumProspecto());
    }

    if(this.getFidSecuencialPersona() != null && this.getFidSecuencialPersona().longValue() == -999) {
      conditions += " AND FID_SECUENCIAL_PERSONA IS NULL";
    } else if(this.getFidSecuencialPersona() != null) {
      conditions += " AND FID_SECUENCIAL_PERSONA = ?";
      values.add(this.getFidSecuencialPersona());
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
    String sql = "SELECT * FROM FIDEICOM_PROSPECTO ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getFidNumProspecto() != null && this.getFidNumProspecto().longValue() == -999) {
      conditions += " AND FID_NUM_PROSPECTO IS NULL";
    } else if(this.getFidNumProspecto() != null) {
      conditions += " AND FID_NUM_PROSPECTO = ?";
      values.add(this.getFidNumProspecto());
    }

    if(this.getFidCvePersona() != null && "null".equals(this.getFidCvePersona())) {
      conditions += " AND FID_CVE_PERSONA IS NULL";
    } else if(this.getFidCvePersona() != null) {
      conditions += " AND FID_CVE_PERSONA = ?";
      values.add(this.getFidCvePersona());
    }

    if(this.getFidSecuencialPersona() != null && this.getFidSecuencialPersona().longValue() == -999) {
      conditions += " AND FID_SECUENCIAL_PERSONA IS NULL";
    } else if(this.getFidSecuencialPersona() != null) {
      conditions += " AND FID_SECUENCIAL_PERSONA = ?";
      values.add(this.getFidSecuencialPersona());
    }

    if(this.getFidNomPersona() != null && "null".equals(this.getFidNomPersona())) {
      conditions += " AND FID_NOM_PERSONA IS NULL";
    } else if(this.getFidNomPersona() != null) {
      conditions += " AND FID_NOM_PERSONA = ?";
      values.add(this.getFidNomPersona());
    }

    if(this.getFidRfcPersona() != null && "null".equals(this.getFidRfcPersona())) {
      conditions += " AND FID_RFC_PERSONA IS NULL";
    } else if(this.getFidRfcPersona() != null) {
      conditions += " AND FID_RFC_PERSONA = ?";
      values.add(this.getFidRfcPersona());
    }

    if(this.getFidCurpPersona() != null && "null".equals(this.getFidCurpPersona())) {
      conditions += " AND FID_CURP_PERSONA IS NULL";
    } else if(this.getFidCurpPersona() != null) {
      conditions += " AND FID_CURP_PERSONA = ?";
      values.add(this.getFidCurpPersona());
    }

    if(this.getFidDomicilioPersona() != null && "null".equals(this.getFidDomicilioPersona())) {
      conditions += " AND FID_DOMICILIO_PERSONA IS NULL";
    } else if(this.getFidDomicilioPersona() != null) {
      conditions += " AND FID_DOMICILIO_PERSONA = ?";
      values.add(this.getFidDomicilioPersona());
    }

    if(this.getFidTelPersona() != null && "null".equals(this.getFidTelPersona())) {
      conditions += " AND FID_TEL_PERSONA IS NULL";
    } else if(this.getFidTelPersona() != null) {
      conditions += " AND FID_TEL_PERSONA = ?";
      values.add(this.getFidTelPersona());
    }

    if(this.getFidCveStPersona() != null && "null".equals(this.getFidCveStPersona())) {
      conditions += " AND FID_CVE_ST_PERSONA IS NULL";
    } else if(this.getFidCveStPersona() != null) {
      conditions += " AND FID_CVE_ST_PERSONA = ?";
      values.add(this.getFidCveStPersona());
    }
    
      if(this.getFidApPaterno() != null && "null".equals(this.getFidApPaterno())) {
        conditions += " AND FID_AP_PATERNO IS NULL";
      } else if(this.getFidApPaterno() != null) {
        conditions += " AND FID_AP_PATERNO = ?";
        values.add(this.getFidApPaterno());
      }
      if(this.getFidApMaterno() != null && "null".equals(this.getFidApMaterno())) {
        conditions += " AND FID_AP_MATERNO IS NULL";
      } else if(this.getFidApMaterno() != null) {
        conditions += " AND FID_AP_MATERNO = ?";
        values.add(this.getFidApMaterno());
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
    String sql = "UPDATE FIDEICOM_PROSPECTO SET ";

    String fields = "";
    String conditions = "";
    ArrayList pkValues = new ArrayList();
    ArrayList values = new ArrayList();

    conditions += " AND FID_NUM_PROSPECTO = ?";
    pkValues.add(this.getFidNumProspecto());
    conditions += " AND FID_SECUENCIAL_PERSONA = ?";
    pkValues.add(this.getFidSecuencialPersona());

    fields += " FID_CVE_PERSONA = ?, ";
    values.add(this.getFidCvePersona());
    fields += " FID_NOM_PERSONA = ?, ";
    values.add(this.getFidNomPersona());
    fields += " FID_RFC_PERSONA = ?, ";
    values.add(this.getFidRfcPersona());
    fields += " FID_CURP_PERSONA = ?, ";
    values.add(this.getFidCurpPersona());
    fields += " FID_DOMICILIO_PERSONA = ?, ";
    values.add(this.getFidDomicilioPersona());
    fields += " FID_TEL_PERSONA = ?, ";
    values.add(this.getFidTelPersona());
    fields += " FID_CVE_ST_PERSONA = ?, ";
    values.add(this.getFidCveStPersona());
      fields += " FID_AP_PATERNO = ?, ";
      values.add(this.getFidApPaterno());
      fields += " FID_AP_MATERNO = ?, ";
      values.add(this.getFidApMaterno());

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
    String sql = "INSERT INTO FIDEICOM_PROSPECTO ( ";

    String fields = "";
    String fieldValues = "";
    ArrayList values = new ArrayList();

    fields += ", FID_NUM_PROSPECTO";
    fieldValues += ", ?";
    values.add(this.getFidNumProspecto());

    fields += ", FID_CVE_PERSONA";
    fieldValues += ", ?";
    values.add(this.getFidCvePersona());

    fields += ", FID_SECUENCIAL_PERSONA";
    fieldValues += ", ?";
    values.add(this.getFidSecuencialPersona());

    fields += ", FID_NOM_PERSONA";
    fieldValues += ", ?";
    values.add(this.getFidNomPersona());

    fields += ", FID_RFC_PERSONA";
    fieldValues += ", ?";
    values.add(this.getFidRfcPersona());

    fields += ", FID_CURP_PERSONA";
    fieldValues += ", ?";
    values.add(this.getFidCurpPersona());

    fields += ", FID_DOMICILIO_PERSONA";
    fieldValues += ", ?";
    values.add(this.getFidDomicilioPersona());

    fields += ", FID_TEL_PERSONA";
    fieldValues += ", ?";
    values.add(this.getFidTelPersona());

    fields += ", FID_CVE_ST_PERSONA";
    fieldValues += ", ?";
    values.add(this.getFidCveStPersona());
    
      fields += ", FID_AP_PATERNO";
      fieldValues += ", ?";
      values.add(this.getFidApPaterno());
      fields += ", FID_AP_MATERNO";
      fieldValues += ", ?";
      values.add(this.getFidApMaterno());


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
    String sql = "DELETE FROM FIDEICOM_PROSPECTO WHERE ";

    String conditions = "";
    ArrayList values = new ArrayList();

    conditions += " AND FID_NUM_PROSPECTO = ?";
    values.add(this.getFidNumProspecto());
    conditions += " AND FID_SECUENCIAL_PERSONA = ?";
    values.add(this.getFidSecuencialPersona());

    conditions = conditions.substring(4).trim();
    result.setSql(sql + conditions);
    result.setParameters(values.toArray());
    return result;

  }

  public boolean validate() {
    return true;  }

  public boolean doCompare(Object compareWith) {
    FideicomProspecto instance = (FideicomProspecto)compareWith;
    boolean equalObjects = true;
    if(equalObjects && !this.getFidNumProspecto().equals(instance.getFidNumProspecto())) equalObjects = false;
    if(equalObjects && !this.getFidCvePersona().equals(instance.getFidCvePersona())) equalObjects = false;
    if(equalObjects && !this.getFidSecuencialPersona().equals(instance.getFidSecuencialPersona())) equalObjects = false;
    return equalObjects;
  }

  public Object selectAsObject() {
    FideicomProspecto result = new FideicomProspecto();
    DataRow objectData = null;
    objectData = selectAsDataRow();

    result.setFidNumProspecto((BigDecimal)objectData.getData("FID_NUM_PROSPECTO"));
    result.setFidCvePersona((String)objectData.getData("FID_CVE_PERSONA"));
    result.setFidSecuencialPersona((BigDecimal)objectData.getData("FID_SECUENCIAL_PERSONA"));
    result.setFidNomPersona((String)objectData.getData("FID_NOM_PERSONA"));
    result.setFidRfcPersona((String)objectData.getData("FID_RFC_PERSONA"));
    result.setFidCurpPersona((String)objectData.getData("FID_CURP_PERSONA"));
    result.setFidDomicilioPersona((String)objectData.getData("FID_DOMICILIO_PERSONA"));
    result.setFidTelPersona((String)objectData.getData("FID_TEL_PERSONA"));
    result.setFidCveStPersona((String)objectData.getData("FID_CVE_ST_PERSONA"));
      result.setFidApPaterno((String)objectData.getData("FID_AP_PATERNO"));
      result.setFidApMaterno((String)objectData.getData("FID_AP_MATERNO"));

    return result;

  }

}