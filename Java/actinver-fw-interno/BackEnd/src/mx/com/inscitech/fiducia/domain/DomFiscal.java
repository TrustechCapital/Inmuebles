package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "DOM_FISCAL_PK", columns = {"DF_NUM_CONTRATO"}, sequences = { "MAX" })
public class DomFiscal extends DomainObject {

  BigDecimal dfNumContrato = null;
  String dfDomicilio = null;
  String dfRfc = null;
  String dfNombre = null;
  BigDecimal dfAnoAltaReg = null;
  BigDecimal dfMesAltaReg = null;
  BigDecimal dfDiaAltaReg = null;
  BigDecimal dfAnoUltMod = null;
  BigDecimal dfMesUltMod = null;
  BigDecimal dfDiaUltMod = null;
  String dfEmail = null;
    String dfNumExt = null;
    String dfNumInt = null;
    String dfColonia = null;
    String dfDelegacion = null;
    String dfEstado= null;
    String dfCp = null;
    String dfContacto= null;
    BigDecimal dfNumSeq=null;
    String dfPorcentaje = null;

  public DomFiscal() {
    super();
    this.pkColumns = 1;
  }
    
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setDfEmail(String dfEmail) {
        this.dfEmail = dfEmail;
    }

    public String getDfEmail() {
        return dfEmail;
    }
  @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
  public void setDfNumContrato(BigDecimal dfNumContrato) {
    this.dfNumContrato = dfNumContrato;
  }

  public BigDecimal getDfNumContrato() {
    return this.dfNumContrato;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setDfDomicilio(String dfDomicilio) {
    this.dfDomicilio = dfDomicilio;
  }

  public String getDfDomicilio() {
    return this.dfDomicilio;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setDfRfc(String dfRfc) {
    this.dfRfc = dfRfc;
  }

  public String getDfRfc() {
    return this.dfRfc;
  }

  @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
  public void setDfNombre(String dfNombre) {
    this.dfNombre = dfNombre;
  }

  public String getDfNombre() {
    return this.dfNombre;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 4, scale = 0, javaClass = BigDecimal.class )
  public void setDfAnoAltaReg(BigDecimal dfAnoAltaReg) {
    this.dfAnoAltaReg = dfAnoAltaReg;
  }

  public BigDecimal getDfAnoAltaReg() {
    return this.dfAnoAltaReg;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 2, scale = 0, javaClass = BigDecimal.class )
  public void setDfMesAltaReg(BigDecimal dfMesAltaReg) {
    this.dfMesAltaReg = dfMesAltaReg;
  }

  public BigDecimal getDfMesAltaReg() {
    return this.dfMesAltaReg;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 2, scale = 0, javaClass = BigDecimal.class )
  public void setDfDiaAltaReg(BigDecimal dfDiaAltaReg) {
    this.dfDiaAltaReg = dfDiaAltaReg;
  }

  public BigDecimal getDfDiaAltaReg() {
    return this.dfDiaAltaReg;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 4, scale = 0, javaClass = BigDecimal.class )
  public void setDfAnoUltMod(BigDecimal dfAnoUltMod) {
    this.dfAnoUltMod = dfAnoUltMod;
  }

  public BigDecimal getDfAnoUltMod() {
    return this.dfAnoUltMod;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 2, scale = 0, javaClass = BigDecimal.class )
  public void setDfMesUltMod(BigDecimal dfMesUltMod) {
    this.dfMesUltMod = dfMesUltMod;
  }

  public BigDecimal getDfMesUltMod() {
    return this.dfMesUltMod;
  }

  @FieldInfo(nullable = true, dataType = "NUMBER", precision = 2, scale = 0, javaClass = BigDecimal.class )
  public void setDfDiaUltMod(BigDecimal dfDiaUltMod) {
    this.dfDiaUltMod = dfDiaUltMod;
  }

  public BigDecimal getDfDiaUltMod() {
    return this.dfDiaUltMod;
  }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setDfNumExt(String dfNumExt) {
        this.dfNumExt = dfNumExt;
    }

    public String getDfNumExt() {
        return dfNumExt;
    }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setDfNumInt(String dfNumInt) {
        this.dfNumInt = dfNumInt;
    }

    public String getDfNumInt() {
        return dfNumInt;
    }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setDfColonia(String dfColonia) {
        this.dfColonia = dfColonia;
    }

    public String getDfColonia() {
        return dfColonia;
    }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setDfDelegacion(String dfDelegacion) {
        this.dfDelegacion = dfDelegacion;
    }

    public String getDfDelegacion() {
        return dfDelegacion;
    }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setDfEstado(String dfEstado) {
        this.dfEstado = dfEstado;
    }

    public String getDfEstado() {
        return dfEstado;
    }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setDfCp(String dfCp) {
        this.dfCp = dfCp;
    }

    public String getDfCp() {
        return dfCp;
    }
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setDfContacto(String dfContacto) {
        this.dfContacto = dfContacto;
    }

    public String getDfContacto() {
        return dfContacto;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 2, scale = 0, javaClass = BigDecimal.class )
    public void setDfNumSeq(BigDecimal dfNumSeq) {
        this.dfNumSeq = dfNumSeq;
    }

    public BigDecimal getDfNumSeq() {
        return dfNumSeq;
    }
    
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setDfPorcentaje(String dfPorcentaje) {
        this.dfPorcentaje = dfPorcentaje;
    }

    public String getDfPorcentaje() {
        return dfPorcentaje;
    }

    public DMLObject getSelectByPK() {
    if(!retrieveSQL) return null;
    DMLObject result = new DMLObject();
    String sql = "SELECT * FROM DOM_FISCAL ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getDfNumContrato() != null && this.getDfNumContrato().longValue() == -999) {
      conditions += " AND DF_NUM_CONTRATO IS NULL";
    } else if(this.getDfNumContrato() != null) {
      conditions += " AND DF_NUM_CONTRATO = ?";
      values.add(this.getDfNumContrato());
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
    String sql = "SELECT * FROM DOM_FISCAL ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getDfNumContrato() != null && this.getDfNumContrato().longValue() == -999) {
      conditions += " AND DF_NUM_CONTRATO IS NULL";
    } else if(this.getDfNumContrato() != null) {
      conditions += " AND DF_NUM_CONTRATO = ?";
      values.add(this.getDfNumContrato());
    }

    if(this.getDfDomicilio() != null && "null".equals(this.getDfDomicilio())) {
      conditions += " AND DF_DOMICILIO IS NULL";
    } else if(this.getDfDomicilio() != null) {
      conditions += " AND DF_DOMICILIO = ?";
      values.add(this.getDfDomicilio());
    }

    if(this.getDfRfc() != null && "null".equals(this.getDfRfc())) {
      conditions += " AND DF_RFC IS NULL";
    } else if(this.getDfRfc() != null) {
      conditions += " AND DF_RFC = ?";
      values.add(this.getDfRfc());
    }
    
      if(this.getDfEmail() != null && "null".equals(this.getDfEmail())) {
        conditions += " AND DF_EMAIL IS NULL";
      } else if(this.getDfEmail() != null) {
        conditions += " AND DF_EMAIL = ?";
        values.add(this.getDfEmail());
      }

    if(this.getDfNombre() != null && "null".equals(this.getDfNombre())) {
      conditions += " AND DF_NOMBRE IS NULL";
    } else if(this.getDfNombre() != null) {
      conditions += " AND DF_NOMBRE = ?";
      values.add(this.getDfNombre());
    }

    if(this.getDfAnoAltaReg() != null && this.getDfAnoAltaReg().longValue() == -999) {
      conditions += " AND DF_ANO_ALTA_REG IS NULL";
    } else if(this.getDfAnoAltaReg() != null) {
      conditions += " AND DF_ANO_ALTA_REG = ?";
      values.add(this.getDfAnoAltaReg());
    }

    if(this.getDfMesAltaReg() != null && this.getDfMesAltaReg().longValue() == -999) {
      conditions += " AND DF_MES_ALTA_REG IS NULL";
    } else if(this.getDfMesAltaReg() != null) {
      conditions += " AND DF_MES_ALTA_REG = ?";
      values.add(this.getDfMesAltaReg());
    }

    if(this.getDfDiaAltaReg() != null && this.getDfDiaAltaReg().longValue() == -999) {
      conditions += " AND DF_DIA_ALTA_REG IS NULL";
    } else if(this.getDfDiaAltaReg() != null) {
      conditions += " AND DF_DIA_ALTA_REG = ?";
      values.add(this.getDfDiaAltaReg());
    }

    if(this.getDfAnoUltMod() != null && this.getDfAnoUltMod().longValue() == -999) {
      conditions += " AND DF_ANO_ULT_MOD IS NULL";
    } else if(this.getDfAnoUltMod() != null) {
      conditions += " AND DF_ANO_ULT_MOD = ?";
      values.add(this.getDfAnoUltMod());
    }

    if(this.getDfMesUltMod() != null && this.getDfMesUltMod().longValue() == -999) {
      conditions += " AND DF_MES_ULT_MOD IS NULL";
    } else if(this.getDfMesUltMod() != null) {
      conditions += " AND DF_MES_ULT_MOD = ?";
      values.add(this.getDfMesUltMod());
    }

    if(this.getDfDiaUltMod() != null && this.getDfDiaUltMod().longValue() == -999) {
      conditions += " AND DF_DIA_ULT_MOD IS NULL";
    } else if(this.getDfDiaUltMod() != null) {
      conditions += " AND DF_DIA_ULT_MOD = ?";
      values.add(this.getDfDiaUltMod());
    }
      if(this.getDfNumExt() != null && "null".equals(this.getDfNumExt())) {
        conditions += " AND DF_NUM_EXT IS NULL";
      } else if(this.getDfNumExt() != null) {
        conditions += " AND DF_NUM_EXT = ?";
        values.add(this.getDfNumExt());
      }
      if(this.getDfNumInt() != null && "null".equals(this.getDfNumInt())) {
        conditions += " AND DF_NUM_INT IS NULL";
      } else if(this.getDfNumInt() != null) {
        conditions += " AND DF_NUM_INT= ?";
        values.add(this.getDfNumInt());
      }
      if(this.getDfColonia() != null && "null".equals(this.getDfColonia())) {
        conditions += " AND DF_COLONIA IS NULL";
      } else if(this.getDfColonia() != null) {
        conditions += " AND DF_COLONIA = ?";
        values.add(this.getDfColonia());
      }
      if(this.getDfDelegacion() != null && "null".equals(this.getDfDelegacion())) {
        conditions += " AND DF_DELEGACION IS NULL";
      } else if(this.getDfDelegacion() != null) {
        conditions += " AND DF_DELEGACION = ?";
        values.add(this.getDfDelegacion());
      }
      if(this.getDfEstado() != null && "null".equals(this.getDfEstado())) {
        conditions += " AND DF_ESTADO IS NULL";
      } else if(this.getDfEstado() != null) {
        conditions += " AND DF_ESTADO= ?";
        values.add(this.getDfEstado());
      }
      if(this.getDfCp() != null && "null".equals(this.getDfCp())) {
        conditions += " AND DF_CP IS NULL";
      } else if(this.getDfCp() != null) {
        conditions += " AND DF_CP= ?";
        values.add(this.getDfCp());
      }
      if(this.getDfContacto() != null && "null".equals(this.getDfContacto())) {
        conditions += " AND DF_CONTACTO IS NULL";
      } else if(this.getDfContacto() != null) {
        conditions += " AND DF_CONTACTO= ?";
        values.add(this.getDfContacto());
      }
      if(this.getDfNumSeq() != null && this.getDfNumSeq().longValue() == -999) {
        conditions += " AND DF_NUM_SEQ IS NULL";
      } else if(this.getDfNumSeq() != null) {
        conditions += " AND DF_NUM_SEQ = ?";
        values.add(this.getDfNumSeq());
      }
        if(this.getDfPorcentaje() != null && "null".equals(this.getDfPorcentaje())) {
          conditions += " AND DF_PORCENTAJE IS NULL";
        } else if(this.getDfPorcentaje() != null) {
          conditions += " AND DF_PORCENTAJE = ?";
          values.add(this.getDfPorcentaje());
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
    String sql = "UPDATE DOM_FISCAL SET ";

    String fields = "";
    String conditions = "";
    ArrayList pkValues = new ArrayList();
    ArrayList values = new ArrayList();

    conditions += " AND DF_NUM_CONTRATO = ?";
    pkValues.add(this.getDfNumContrato());
    fields += " DF_DOMICILIO = ?, ";
    values.add(this.getDfDomicilio());
    fields += " DF_RFC = ?, ";
    values.add(this.getDfRfc());
      fields += " DF_EMAIL= ?, ";
      values.add(this.getDfEmail());
    fields += " DF_NOMBRE = ?, ";
    values.add(this.getDfNombre());
    fields += " DF_ANO_ALTA_REG = ?, ";
    values.add(this.getDfAnoAltaReg());
    fields += " DF_MES_ALTA_REG = ?, ";
    values.add(this.getDfMesAltaReg());
    fields += " DF_DIA_ALTA_REG = ?, ";
    values.add(this.getDfDiaAltaReg());
    fields += " DF_ANO_ULT_MOD = ?, ";
    values.add(this.getDfAnoUltMod());
    fields += " DF_MES_ULT_MOD = ?, ";
    values.add(this.getDfMesUltMod());
    fields += " DF_DIA_ULT_MOD = ?, ";
    values.add(this.getDfDiaUltMod());
    
      fields += " DF_NUM_EXT = ?, ";
      values.add(this.getDfNumExt());
      fields += " DF_NUM_INT = ?, ";
      values.add(this.getDfNumInt());
      fields += " DF_COLONIA = ?, ";
      values.add(this.getDfColonia());
      fields += " DF_DELEGACION = ?, ";
      values.add(this.getDfDelegacion());
      fields += " DF_ESTADO = ?, ";
      values.add(this.getDfEstado());
      fields += " DF_CP= ?, ";
      values.add(this.getDfCp());
      fields += " DF_CONTACTO = ?, ";
      values.add(this.getDfContacto());
      fields += " DF_PORCENTAJE = ?, ";
      values.add(this.getDfPorcentaje());
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
    String sql = "INSERT INTO DOM_FISCAL (DF_NUM_SEQ, ";

    String fields = "";
    String fieldValues = "";
    ArrayList values = new ArrayList();

    fields += ", DF_NUM_CONTRATO";
    fieldValues += ", ?";
    values.add(this.getDfNumContrato());

    fields += ", DF_DOMICILIO";
    fieldValues += ", ?";
    values.add(this.getDfDomicilio());

    fields += ", DF_RFC";
    fieldValues += ", ?";
    values.add(this.getDfRfc());

    fields += ", DF_NOMBRE";
    fieldValues += ", ?";
    values.add(this.getDfNombre());
    
      fields += ", DF_EMAIL";
      fieldValues += ", ?";
      values.add(this.getDfEmail());

    fields += ", DF_ANO_ALTA_REG";
    fieldValues += ", ?";
    values.add(this.getDfAnoAltaReg());

    fields += ", DF_MES_ALTA_REG";
    fieldValues += ", ?";
    values.add(this.getDfMesAltaReg());

    fields += ", DF_DIA_ALTA_REG";
    fieldValues += ", ?";
    values.add(this.getDfDiaAltaReg());

    fields += ", DF_ANO_ULT_MOD";
    fieldValues += ", ?";
    values.add(this.getDfAnoUltMod());

    fields += ", DF_MES_ULT_MOD";
    fieldValues += ", ?";
    values.add(this.getDfMesUltMod());

    fields += ", DF_DIA_ULT_MOD";
    fieldValues += ", ?";
    values.add(this.getDfDiaUltMod());
    
      fields += ",DF_NUM_EXT";
      fieldValues += ", ?";
      values.add(this.getDfNumExt());
      fields += " ,DF_NUM_INT";
      fieldValues += ", ?";
      values.add(this.getDfNumInt());
      fields += " ,DF_COLONIA";
      fieldValues += ", ?";
      values.add(this.getDfColonia());
      fields += " ,DF_DELEGACION";
      fieldValues += ", ?";
      values.add(this.getDfDelegacion());
      fields += " ,DF_ESTADO ";
      fieldValues += ", ?";
      values.add(this.getDfEstado());
      fields += " ,DF_CP";
      fieldValues += ", ?";
      values.add(this.getDfCp());
      fields += " ,DF_CONTACTO";
      fieldValues += ", ?";
      values.add(this.getDfContacto());
      fields += " ,DF_PORCENTAJE";
      fieldValues += ", ?";
      values.add(this.getDfPorcentaje());

    fields = fields.substring(1).trim();
    fieldValues = fieldValues.substring(1).trim();

    sql += fields + " ) VALUES (DF_NUMDOM_SEQ.NEXTVAL," + fieldValues + ")";

    result.setSql(sql);
    result.setParameters(values.toArray());

    return result;
  }

  public DMLObject getDelete() {
    if(!retrieveSQL) return null;
    DMLObject result = new DMLObject();
    String sql = "DELETE FROM DOM_FISCAL WHERE ";

    String conditions = "";
    ArrayList values = new ArrayList();

    conditions += " AND DF_NUM_CONTRATO = ?";
    values.add(this.getDfNumContrato());
    conditions = conditions.substring(4).trim();
    result.setSql(sql + conditions);
    result.setParameters(values.toArray());
    return result;

  }

  public boolean validate() {
    return true;  }

  public boolean doCompare(Object compareWith) {
    DomFiscal instance = (DomFiscal)compareWith;
    boolean equalObjects = true;
    if(equalObjects && !this.getDfNumContrato().equals(instance.getDfNumContrato())) equalObjects = false;
    if(equalObjects && !this.getDfDomicilio().equals(instance.getDfDomicilio())) equalObjects = false;
    if(equalObjects && !this.getDfRfc().equals(instance.getDfRfc())) equalObjects = false;
    if(equalObjects && !this.getDfNombre().equals(instance.getDfNombre())) equalObjects = false;
    if(equalObjects && !this.getDfAnoAltaReg().equals(instance.getDfAnoAltaReg())) equalObjects = false;
    if(equalObjects && !this.getDfMesAltaReg().equals(instance.getDfMesAltaReg())) equalObjects = false;
    if(equalObjects && !this.getDfDiaAltaReg().equals(instance.getDfDiaAltaReg())) equalObjects = false;
    if(equalObjects && !this.getDfAnoUltMod().equals(instance.getDfAnoUltMod())) equalObjects = false;
    if(equalObjects && !this.getDfMesUltMod().equals(instance.getDfMesUltMod())) equalObjects = false;
    if(equalObjects && !this.getDfDiaUltMod().equals(instance.getDfDiaUltMod())) equalObjects = false;
      if(equalObjects && !this.getDfEmail().equals(instance.getDfEmail())) equalObjects = false;
      
      if(equalObjects && !this.getDfNumExt().equals(instance.getDfNumExt())) equalObjects = false;
      if(equalObjects && !this.getDfNumInt().equals(instance.getDfNumInt())) equalObjects = false;
      if(equalObjects && !this.getDfColonia().equals(instance.getDfColonia())) equalObjects = false;
      if(equalObjects && !this.getDfDelegacion().equals(instance.getDfDelegacion())) equalObjects = false;
      if(equalObjects && !this.getDfEstado().equals(instance.getDfEstado())) equalObjects = false;
      if(equalObjects && !this.getDfCp().equals(instance.getDfCp())) equalObjects = false;
      if(equalObjects && !this.getDfContacto().equals(instance.getDfContacto())) equalObjects = false;
      if(equalObjects && !this.getDfPorcentaje().equals(instance.getDfPorcentaje())) equalObjects = false;
      if(equalObjects && !this.getDfNumSeq().equals(instance.getDfNumSeq())) equalObjects = false;
    return equalObjects;
  }

  public Object selectAsObject() {
    DomFiscal result = new DomFiscal();
    DataRow objectData = null;
    objectData = selectAsDataRow();

    result.setDfNumContrato((BigDecimal)objectData.getData("DF_NUM_CONTRATO"));
    result.setDfDomicilio((String)objectData.getData("DF_DOMICILIO"));
    result.setDfRfc((String)objectData.getData("DF_RFC"));
    result.setDfNombre((String)objectData.getData("DF_NOMBRE"));
    result.setDfAnoAltaReg((BigDecimal)objectData.getData("DF_ANO_ALTA_REG"));
    result.setDfMesAltaReg((BigDecimal)objectData.getData("DF_MES_ALTA_REG"));
    result.setDfDiaAltaReg((BigDecimal)objectData.getData("DF_DIA_ALTA_REG"));
    result.setDfAnoUltMod((BigDecimal)objectData.getData("DF_ANO_ULT_MOD"));
    result.setDfMesUltMod((BigDecimal)objectData.getData("DF_MES_ULT_MOD"));
    result.setDfDiaUltMod((BigDecimal)objectData.getData("DF_DIA_ULT_MOD"));
      result.setDfEmail((String)objectData.getData("DF_EMAIL"));
      
      result.setDfNumExt((String)objectData.getData("DF_NUM_EXT"));
      result.setDfNumInt((String)objectData.getData("DF_NUM_INT"));
      result.setDfColonia((String)objectData.getData("DF_COLONIA"));
      result.setDfDelegacion((String)objectData.getData("DF_DELEGACION"));
      result.setDfEstado((String)objectData.getData("DF_ESTADO"));
      result.setDfCp((String)objectData.getData("DF_CP"));
      result.setDfContacto((String)objectData.getData("DF_CONTACTO"));
      result.setDfPorcentaje((String)objectData.getData("DF_PORCENTAJE"));
      result.setDfNumSeq((BigDecimal)objectData.getData("DF_NUM_SEQ"));

    return result;

  }

}