package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "ARC_OPERTRAN_PK", columns = {"ARCO_TRA_ANO_MOVTO", "ARCO_TRA_MES_MOVTO", "ARCO_TRA_DIA_MOVTO", "ARCO_TRA_NUM_SEC_REG"}, sequences = { "MANUAL" })
public class ArcOpertran extends DomainObject {

    BigDecimal arcoTraAnoMovto=null;
    BigDecimal arcoTraMesMovto=null;
    BigDecimal arcoTraDiaMovto=null;
    BigDecimal arcoTraNumSecReg=null;
    String arcoTraNomFile=null;
    BigDecimal arcoArpSecuencial=null;
    String arcoDescripcion=null;
    String arcoStatus=null;

  public ArcOpertran() {
    super();
    this.pkColumns = 3;
  }

  @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setarcoArpSecuencial(BigDecimal arcoArpSecuencial) {
    this.arcoArpSecuencial = arcoArpSecuencial;
  }

  public BigDecimal getarcoArpSecuencial() {
    return this.arcoArpSecuencial;
  }

  
    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
    public void setArcoTraAnoMovto(BigDecimal arcoTraAnoMovto) {
        this.arcoTraAnoMovto = arcoTraAnoMovto;
    }

    public BigDecimal getArcoTraAnoMovto() {
        return arcoTraAnoMovto;
    }
    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
    public void setArcoTraMesMovto(BigDecimal arcoTraMesMovto) {
        this.arcoTraMesMovto = arcoTraMesMovto;
    }

    public BigDecimal getArcoTraMesMovto() {
        return arcoTraMesMovto;
    }
    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
    public void setArcoTraDiaMovto(BigDecimal arcoTraDiaMovto) {
        this.arcoTraDiaMovto = arcoTraDiaMovto;
    }

    public BigDecimal getArcoTraDiaMovto() {
        return arcoTraDiaMovto;
    }
    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
    public void setArcoTraNumSecReg(BigDecimal arcoTraNumSecReg) {
        this.arcoTraNumSecReg = arcoTraNumSecReg;
    }

    public BigDecimal getArcoTraNumSecReg() {
        return arcoTraNumSecReg;
    }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setArcoTraNomFile(String arcoTraNomFile) {
        this.arcoTraNomFile = arcoTraNomFile;
    }

    public String getArcoTraNomFile() {
        return arcoTraNomFile;
    }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setArcoDescripcion(String arcoDescripcion) {
        this.arcoDescripcion = arcoDescripcion;
    }

    public String getArcoDescripcion() {
        return arcoDescripcion;
    }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setArcoStatus(String arcoStatus) {
        this.arcoStatus = arcoStatus;
    }

    public String getArcoStatus() {
        return arcoStatus;
    }

  public DMLObject getSelectByPK() {
    if(!retrieveSQL) return null;
    DMLObject result = new DMLObject();
    String sql = "SELECT * FROM ARC_OPERTRAN ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getArcoTraNumSecReg() != null && this.getArcoTraNumSecReg().longValue() == -999) {
      conditions += " AND ARCO_TRA_NUM_SEC_REG IS NULL";
    } else if(this.getArcoTraNumSecReg() != null) {
      conditions += " AND ARCO_TRA_NUM_SEC_REG = ?";
      values.add(this.getArcoTraNumSecReg());
    }
    
    if(this.getArcoTraAnoMovto() != null && "null".equals(this.getArcoTraAnoMovto())) {
      conditions += " AND ARCO_TRA_ANO_MOVTO IS NULL";
    } else if(this.getArcoTraAnoMovto() != null) {
      conditions += " AND ARCO_TRA_ANO_MOVTO = ?";
      values.add(this.getArcoTraAnoMovto());
    }
      if(this.getArcoTraMesMovto() != null && "null".equals(this.getArcoTraMesMovto())) {
        conditions += " AND ARCO_TRA_MES_MOVTO IS NULL";
      } else if(this.getArcoTraMesMovto() != null) {
        conditions += " AND ARCO_TRA_MES_MOVTO = ?";
        values.add(this.getArcoTraMesMovto());
      }
      if(this.getArcoTraDiaMovto() != null && "null".equals(this.getArcoTraDiaMovto())) {
        conditions += " AND ARCO_TRA_DIA_MOVTO IS NULL";
      } else if(this.getArcoTraDiaMovto() != null) {
        conditions += " AND ARCO_TRA_DIA_MOVTO = ?";
        values.add(this.getArcoTraDiaMovto());
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
    String sql = "SELECT * FROM ARC_OPERTRAN ";

    String conditions = "";
    ArrayList values = new ArrayList();

        if (this.getArcoTraNumSecReg() != null && this.getArcoTraNumSecReg().longValue() == -999) {
            conditions += " AND ARCO_TRA_NUM_SEC_REG IS NULL";
        } else if (this.getArcoTraNumSecReg() != null) {
            conditions += " AND ARCO_TRA_NUM_SEC_REG = ?";
            values.add(this.getArcoTraNumSecReg());
        }

        if (this.getArcoTraAnoMovto() != null && "null".equals(this.getArcoTraAnoMovto())) {
            conditions += " AND ARCO_TRA_ANO_MOVTO IS NULL";
        } else if (this.getArcoTraAnoMovto() != null) {
            conditions += " AND ARCO_TRA_ANO_MOVTO = ?";
            values.add(this.getArcoTraAnoMovto());
        }
        if (this.getArcoTraMesMovto() != null && "null".equals(this.getArcoTraMesMovto())) {
            conditions += " AND ARCO_TRA_MES_MOVTO IS NULL";
        } else if (this.getArcoTraMesMovto() != null) {
            conditions += " AND ARCO_TRA_MES_MOVTO = ?";
            values.add(this.getArcoTraMesMovto());
        }
        if (this.getArcoTraDiaMovto() != null && "null".equals(this.getArcoTraDiaMovto())) {
            conditions += " AND ARCO_TRA_DIA_MOVTO IS NULL";
        } else if (this.getArcoTraDiaMovto() != null) {
            conditions += " AND ARCO_TRA_DIA_MOVTO = ?";
            values.add(this.getArcoTraDiaMovto());
        }

        if(this.getarcoArpSecuencial() != null && this.getarcoArpSecuencial().longValue() == -999) {
      conditions += " AND ARCO_ARP_SECUENCIAL IS NULL";
    } else if(this.getarcoArpSecuencial() != null) {
      conditions += " AND ARCO_ARP_SECUENCIAL = ?";
      values.add(this.getarcoArpSecuencial());
    }
    if(this.getArcoTraNomFile() != null && "null".equals(this.getArcoTraNomFile())) {
      conditions += " AND ARCO_TRA_NOM_FILE IS NULL";
    } else if(this.getArcoTraNomFile() != null) {
      conditions += " AND ARCO_TRA_NOM_FILE = ?";
      values.add(this.getArcoTraNomFile());
    }

    if(this.getArcoDescripcion() != null && "null".equals(this.getArcoDescripcion())) {
      conditions += " AND ARCO_DESCRIPCION IS NULL";
    } else if(this.getArcoDescripcion() != null) {
      conditions += " AND ARCO_DESCRIPCION = ?";
      values.add(this.getArcoDescripcion());
    }
    
      if(this.getArcoStatus() != null && "null".equals(this.getArcoStatus())) {
        conditions += " AND ARCO_STATUS IS NULL";
      } else if(this.getArcoStatus() != null) {
        conditions += " AND ARCO_STATUS = ?";
        values.add(this.getArcoStatus());
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
    String sql = "UPDATE ARC_OPERTRAN SET ";

    String fields = "";
    String conditions = "";
    ArrayList pkValues = new ArrayList();
    ArrayList values = new ArrayList();

    //PKS
    conditions += " AND ARCO_TRA_ANO_MOVTO = ?";
    pkValues.add(this.getArcoTraAnoMovto());
    conditions += " AND ARCO_TRA_MES_MOVTO = ?";
    pkValues.add(this.getArcoTraMesMovto());
    conditions += " AND ARCO_TRA_DIA_MOVTO = ?";
    pkValues.add(this.getArcoTraDiaMovto());
    conditions += " AND ARCO_TRA_NUM_SEC_REG = ?";
    pkValues.add(this.getArcoTraNumSecReg());
    /*conditions += " AND ARP_FECHA = TO_DATE(?, 'dd/MM/yyyy')";
    pkValues.add(this.getArpFecha());*/

    //CAMPOS
    fields += " ARCO_DESCRIPCION = ? ";
    values.add(this.getArcoDescripcion());
    fields += " AND ARCO_TRA_NOM_FILE = ?";
    values.add(this.getArcoTraNomFile());
    fields += " AND ARCO_STATUS = ?,";
    values.add(this.getArcoStatus());
    
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
    String sql = "INSERT INTO ARC_OPERTRAN ( ";

    String fields = "";
    String fieldValues = "";
    ArrayList values = new ArrayList();

    fields += ", ARCO_ARP_SECUENCIAL";
    fieldValues += ", ?";
    values.add(this.getarcoArpSecuencial());

    fields += ", ARCO_TRA_NOM_FILE";
    fieldValues += ", ?";
    values.add(this.getArcoTraNomFile());

    fields += ", ARCO_DESCRIPCION";
    fieldValues += ", ?";
    values.add(this.getArcoDescripcion());

    fields+= ", ARCO_STATUS";
    fieldValues += ", ?";
    values.add(this.getArcoStatus());
    
    fields+= ", ARCO_TRA_ANO_MOVTO";
    fieldValues += ", ?";
    values.add(this.getArcoTraAnoMovto());
    
    fields+= ", ARCO_TRA_MES_MOVTO";
    fieldValues += ", ?";
    values.add(this.getArcoTraMesMovto());
    
    fields+= ", ARCO_TRA_DIA_MOVTO";
    fieldValues += ", ?";
    values.add(this.getArcoTraDiaMovto());
    
    fields+= ", ARCO_TRA_NUM_SEC_REG";
    fieldValues += ", ?";
    values.add(this.getArcoTraNumSecReg());

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
    String sql = "DELETE FROM ARC_OPERTRAN WHERE ";

    String conditions = "";
    ArrayList values = new ArrayList();

    conditions += " AND ARCO_TRA_ANO_MOVTO = ?";
    values.add(this.getArcoTraAnoMovto());
    conditions += " AND ARCO_TRA_MES_MOVTO = ?";
    values.add(this.getArcoTraMesMovto());
    conditions += " AND ARCO_TRA_DIA_MOVTO = ?";
    values.add(this.getArcoTraDiaMovto());
    conditions += " AND ARCO_TRA_NUM_SEC_REG = ?";
    values.add(this.getArcoTraNumSecReg());
    
    conditions = conditions.substring(4).trim();
    result.setSql(sql + conditions);
    result.setParameters(values.toArray());
    return result;

  }

  public boolean validate() {
    return true;  }

  public boolean doCompare(Object compareWith) {
    ArcOpertran instance = (ArcOpertran)compareWith;
    boolean equalObjects = true;
    if(equalObjects && !this.getarcoArpSecuencial().equals(instance.getarcoArpSecuencial())) equalObjects = false;
    if(equalObjects && !this.getArcoTraNomFile().equals(instance.getArcoTraNomFile())) equalObjects = false;
    if(equalObjects && !this.getArcoDescripcion().equals(instance.getArcoDescripcion())) equalObjects = false;
    if(equalObjects && !this.getArcoStatus().equals(instance.getArcoStatus())) equalObjects = false;
    
    if(equalObjects && !this.getArcoTraAnoMovto().equals(instance.getArcoTraAnoMovto())) equalObjects = false;
    if(equalObjects && !this.getArcoTraMesMovto().equals(instance.getArcoTraMesMovto())) equalObjects = false;
    if(equalObjects && !this.getArcoTraDiaMovto().equals(instance.getArcoTraDiaMovto())) equalObjects = false;
    if(equalObjects && !this.getArcoTraNumSecReg().equals(instance.getArcoTraNumSecReg())) equalObjects = false;
    return equalObjects;
  }

  public Object selectAsObject() {
    ArcOpertran result = new ArcOpertran();
    DataRow objectData = null;
    objectData = selectAsDataRow();

    result.setarcoArpSecuencial((BigDecimal)objectData.getData("ARCO_ARP_SECUENCIAL"));
    result.setArcoTraNomFile((String)objectData.getData("ARCO_TRA_NOM_FILE"));
    result.setArcoDescripcion((String)objectData.getData("ARCO_DESCRIPCION"));
    result.setArcoDescripcion((String)objectData.getData("ARCO_STATUS"));
    
    result.setArcoDescripcion((String)objectData.getData("ARCO_TRA_ANO_MOVTO"));
    result.setArcoDescripcion((String)objectData.getData("ARCO_TRA_MES_MOVTO"));
    result.setArcoDescripcion((String)objectData.getData("ARCO_TRA_DIA_MOVTO"));
    result.setArcoDescripcion((String)objectData.getData("ARCO_TRA_NUM_SEC_REG"));
    
    return result;

  }

}