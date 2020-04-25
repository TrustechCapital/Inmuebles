package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;
import java.util.ArrayList;

import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;
import mx.com.inscitech.fiducia.domain.base.Reference;
import mx.com.inscitech.fiducia.domain.base.DMLObject;

import mx.com.inscitech.fiducia.dml.vo.DataRow;

@PrimaryKey(constraintName = "AGENDA_PK", columns = {"AGE_NUM_FOLIO"}, sequences = { "MAX" })
public class FCregarl extends DomainObject {

  BigDecimal fcreIdFideicomiso = null;
  String fcreRegistro = null;
  String fcreIdCredito = null;
  BigDecimal fcreImpCredito = null;
  String fcreStCredito = null;

  public FCregarl() {
    super();
    this.pkColumns =2;
  }

  @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setFcreIdFideicomiso(BigDecimal fcreIdFideicomiso) {
    this.fcreIdFideicomiso = fcreIdFideicomiso;
  }

  public BigDecimal getFcreIdFideicomiso() {
    return this.fcreIdFideicomiso;
  }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
    public void setFcreImpCredito(BigDecimal fcreImpCredito) {
      this.fcreImpCredito = fcreImpCredito;
    }

    public BigDecimal getFcreImpCredito() {
      return this.fcreImpCredito;
    }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setFcreRegistro(String fcreRegistro) {
    this.fcreRegistro = fcreRegistro;
  }

  public String getFcreRegistro() {
    return this.fcreRegistro;
  }
  
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setFcreIdCredito(String fcreIdCredito) {
      this.fcreIdCredito = fcreIdCredito;
    }

    public String getFcreIdCredito() {
      return this.fcreIdCredito;
    }  
    
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setFcreStCredito(String fcreStCredito) {
      this.fcreStCredito = fcreStCredito;
    }

    public String getFcreStCredito() {
      return this.fcreStCredito;
    }      

  public DMLObject getSelectByPK() {
    if(!retrieveSQL) return null;
    DMLObject result = new DMLObject();
    String sql = "SELECT * FROM F_CREGARL ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getFcreIdFideicomiso() != null && this.getFcreIdFideicomiso().longValue() == -999) {
      conditions += " AND FCRE_ID_FIDEICOMISO IS NULL";
    } else if(this.getFcreIdFideicomiso() != null) {
      conditions += " AND FCRE_ID_FIDEICOMISO = ?";
      values.add(this.getFcreIdFideicomiso());
    }
    
      if(this.getFcreIdCredito() != null && "null".equals(this.getFcreIdCredito())) {
        conditions += " AND FCRE_ID_CREDITO IS NULL";
      } else if(this.getFcreIdCredito() != null) {
        conditions += " AND FCRE_ID_CREDITO = ?";
        values.add(this.getFcreIdCredito());
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
    String sql = "SELECT * FROM F_CREGARL ";

    String conditions = "";
    ArrayList values = new ArrayList();

      if(this.getFcreIdFideicomiso() != null && this.getFcreIdFideicomiso().longValue() == -999) {
        conditions += " AND FCRE_ID_FIDEICOMISO IS NULL";
      } else if(this.getFcreIdFideicomiso() != null) {
        conditions += " AND FCRE_ID_FIDEICOMISO = ?";
        values.add(this.getFcreIdFideicomiso());
      }
      
        if(this.getFcreIdCredito() != null && "null".equals(this.getFcreIdCredito())) {
          conditions += " AND FCRE_ID_CREDITO IS NULL";
        } else if(this.getFcreIdCredito() != null) {
          conditions += " AND FCRE_ID_CREDITO = ?";
          values.add(this.getFcreIdCredito());
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
      String sql = "UPDATE ACOMITE SET ";

      String fields = "";
      String conditions = "";
      ArrayList pkValues = new ArrayList();
      ArrayList values = new ArrayList();

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
      String sql = "INSERT INTO ACOMITE ( ";
      
        String fields = "";
        String fieldValues = "";
        ArrayList values = new ArrayList();
      
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
      String sql = "DELETE FROM ACOMITE WHERE ";

      String conditions = "";
      ArrayList values = new ArrayList();


      conditions = conditions.substring(4).trim();
      result.setSql(sql + conditions);
      result.setParameters(values.toArray());
      return result;

    }

  public boolean validate() {
    return true;  }

  public boolean doCompare(Object compareWith) {
    FCregarl instance = (FCregarl)compareWith;
    boolean equalObjects = true;
    if(equalObjects && !this.getFcreIdFideicomiso().equals(instance.getFcreIdFideicomiso())) equalObjects = false;
    if(equalObjects && !this.getFcreImpCredito().equals(instance.getFcreImpCredito())) equalObjects = false;
    if(equalObjects && !this.getFcreRegistro().equals(instance.getFcreRegistro())) equalObjects = false;
    if(equalObjects && !this.getFcreIdCredito().equals(instance.getFcreIdCredito())) equalObjects = false;
    if(equalObjects && !this.getFcreStCredito().equals(instance.getFcreStCredito())) equalObjects = false;
    return equalObjects;
  }

  public Object selectAsObject() {
    FCregarl result = new FCregarl();
    DataRow objectData = null;
    objectData = selectAsDataRow();

    result.setFcreIdFideicomiso((BigDecimal)objectData.getData("FCRE_ID_FIDEICOMISO"));
    result.setFcreImpCredito((BigDecimal)objectData.getData("FCRE_IMP_CREDITO"));
    result.setFcreRegistro((String)objectData.getData("FCRE_REGISTRO"));
    result.setFcreIdCredito((String)objectData.getData("FCRE_ID_CREDITO"));
    result.setFcreStCredito((String)objectData.getData("FCRE_ST_CREDITO"));

    return result;

  }

}