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
public class FBgarliq extends DomainObject {

  BigDecimal glbeIdFideicomiso = null;
  String glbeIdBeneficiario = null;
  String glbeNombreBen = null;
  String glbeIdCredito = null;
  BigDecimal glbeImpCredito = null;
  String glbeCveStatus = null;
    String glbeFechaSus = null;
    String glbeFechaVen = null;
    String glbeFechaPro = null;

  public FBgarliq() {
    super();
    this.pkColumns =2;
  }

  @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setglbeIdFideicomiso(BigDecimal glbeIdFideicomiso) {
    this.glbeIdFideicomiso = glbeIdFideicomiso;
  }

  public BigDecimal getglbeIdFideicomiso() {
    return this.glbeIdFideicomiso;
  }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
    public void setglbeImpCredito(BigDecimal glbeImpCredito) {
      this.glbeImpCredito = glbeImpCredito;
    }

    public BigDecimal getglbeImpCredito() {
      return this.glbeImpCredito;
    }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setglbeIdBeneficiario(String glbeIdBeneficiario) {
    this.glbeIdBeneficiario = glbeIdBeneficiario;
  }

  public String getglbeIdBeneficiario() {
    return this.glbeIdBeneficiario;
  }
  
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setglbeIdCredito(String glbeIdCredito) {
      this.glbeIdCredito = glbeIdCredito;
    }

    public String getglbeIdCredito() {
      return this.glbeIdCredito;
    }  
    
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setglbeCveStatus(String glbeCveStatus) {
      this.glbeCveStatus = glbeCveStatus;
    }

    public String getglbeCveStatus() {
      return this.glbeCveStatus;
    }   
    
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setGlbeNombreBen(String glbeNombreBen) {
      this.glbeNombreBen = glbeNombreBen;
    }

    public String getGlbeNombreBen() {
      return this.glbeNombreBen;
    }    
    
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setGlbeFechaSus(String glbeFechaSus) {
      this.glbeFechaSus = glbeFechaSus;
    }

    public String getGlbeFechaSus() {
      return this.glbeFechaSus;
    }       
    
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setGlbeFechaVen(String glbeFechaVen) {
      this.glbeFechaVen = glbeFechaVen;
    }

    public String getGlbeFechaVen() {
      return this.glbeFechaVen;
    }       
    
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setGlbeFechaPro(String glbeFechaPro) {
      this.glbeFechaPro = glbeFechaPro;
    }

    public String getGlbeFechaPro() {
      return this.glbeFechaPro;
    }      

  public DMLObject getSelectByPK() {
    if(!retrieveSQL) return null;
    DMLObject result = new DMLObject();
    String sql = "SELECT * FROM F_BGARLIQ ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getglbeIdFideicomiso() != null && this.getglbeIdFideicomiso().longValue() == -999) {
      conditions += " AND GLBE_ID_FIDEICOMISO IS NULL";
    } else if(this.getglbeIdFideicomiso() != null) {
      conditions += " AND GLBE_ID_FIDEICOMISO = ?";
      values.add(this.getglbeIdFideicomiso());
    }
    
      if(this.getglbeIdCredito() != null && "null".equals(this.getglbeIdCredito())) {
        conditions += " AND GLBE_ID_CREDITO IS NULL";
      } else if(this.getglbeIdCredito() != null) {
        conditions += " AND GLBE_ID_CREDITO = ?";
        values.add(this.getglbeIdCredito());
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
    String sql = "SELECT * FROM F_BGARLIQ ";

    String conditions = "";
    ArrayList values = new ArrayList();

      if(this.getglbeIdFideicomiso() != null && this.getglbeIdFideicomiso().longValue() == -999) {
        conditions += " AND GLBE_ID_FIDEICOMISO IS NULL";
      } else if(this.getglbeIdFideicomiso() != null) {
        conditions += " AND GLBE_ID_FIDEICOMISO = ?";
        values.add(this.getglbeIdFideicomiso());
      }
      
        if(this.getglbeIdCredito() != null && "null".equals(this.getglbeIdCredito())) {
          conditions += " AND GLBE_ID_CREDITO IS NULL";
        } else if(this.getglbeIdCredito() != null) {
          conditions += " AND GLBE_ID_CREDITO = ?";
          values.add(this.getglbeIdCredito());
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
    FBgarliq instance = (FBgarliq)compareWith;
    boolean equalObjects = true;
    if(equalObjects && !this.getglbeIdFideicomiso().equals(instance.getglbeIdFideicomiso())) equalObjects = false;
    if(equalObjects && !this.getglbeImpCredito().equals(instance.getglbeImpCredito())) equalObjects = false;
    if(equalObjects && !this.getglbeIdBeneficiario().equals(instance.getglbeIdBeneficiario())) equalObjects = false;
    if(equalObjects && !this.getglbeIdCredito().equals(instance.getglbeIdCredito())) equalObjects = false;
    if(equalObjects && !this.getglbeCveStatus().equals(instance.getglbeCveStatus())) equalObjects = false;
      if(equalObjects && !this.getGlbeNombreBen().equals(instance.getGlbeNombreBen())) equalObjects = false;
      if(equalObjects && !this.getGlbeFechaSus().equals(instance.getGlbeFechaSus())) equalObjects = false;
      if(equalObjects && !this.getGlbeFechaVen().equals(instance.getGlbeFechaVen())) equalObjects = false;
      if(equalObjects && !this.getGlbeFechaPro().equals(instance.getGlbeFechaPro())) equalObjects = false;
    return equalObjects;
  }

  public Object selectAsObject() {
    FBgarliq result = new FBgarliq();
    DataRow objectData = null;
    objectData = selectAsDataRow();

    result.setglbeIdFideicomiso((BigDecimal)objectData.getData("FCRE_ID_FIDEICOMISO"));
    result.setglbeImpCredito((BigDecimal)objectData.getData("FCRE_IMP_CREDITO"));
    result.setglbeIdBeneficiario((String)objectData.getData("FCRE_REGISTRO"));
    result.setglbeIdCredito((String)objectData.getData("FCRE_ID_CREDITO"));
    result.setglbeCveStatus((String)objectData.getData("FCRE_ST_CREDITO"));
      result.setGlbeNombreBen((String)objectData.getData("GLBE_NOMBRE_BEN"));
      result.setGlbeFechaSus((String)objectData.getData("GLBE_FECHA_SUS"));
      result.setGlbeFechaVen((String)objectData.getData("GLBE_FECHA_VEN"));
      result.setGlbeFechaPro((String)objectData.getData("GLBE_FECHA_PRO"));

    return result;

  }

}