package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "F_PERS_NG_PK", columns = {"PNG_NOMBRE,PNG_NUM_SEC"}, sequences = { "MAX" })
public class FPersNG extends DomainObject {

  BigDecimal pngNumSec = null;
  String pngNombre = null;

  public FPersNG() {
    super();
    this.pkColumns = 1;
  }

  @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class )
    public void setPngNumSec(BigDecimal pngNumSec) {
        this.pngNumSec = pngNumSec;
    }

    public BigDecimal getPngNumSec() {
        return pngNumSec;
    }
    
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class )
    public void setPngNombre(String pngNombre) {
        this.pngNombre = pngNombre;
    }

    public String getPngNombre() {
        return pngNombre;
    }

  public DMLObject getSelectByPK() {
    if(!retrieveSQL) return null;
    DMLObject result = new DMLObject();
    String sql = "SELECT * FROM F_PERS_NG ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getPngNumSec() != null && this.getPngNumSec().longValue() == -999) {
      conditions += " AND PNG_NUM_SEC IS NULL";
    } else if(this.getPngNumSec() != null) {
      conditions += " AND PNG_NUM_SEC = ?";
      values.add(this.getPngNumSec());
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
    String sql = "SELECT * FROM F_PERS_NG ";

    String conditions = "";
    ArrayList values = new ArrayList();

    if(this.getPngNumSec() != null && this.getPngNumSec().longValue() == -999) {
      conditions += " AND PNG_NUM_SEC IS NULL";
    } else if(this.getPngNumSec() != null) {
      conditions += " AND PNG_NUM_SEC = ?";
      values.add(this.getPngNumSec());
    }

    if(this.getPngNombre() != null && "null".equals(this.getPngNombre())) {
      conditions += " AND PNG_NOMBRE IS NULL";
    } else if(this.getPngNombre() != null) {
      conditions += " AND PNG_NOMBRE = ?";
      values.add(this.getPngNombre());
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
    String sql = "UPDATE F_PERS_NG SET ";

    String fields = "";
    String conditions = "";
    ArrayList pkValues = new ArrayList();
    ArrayList values = new ArrayList();

    conditions += " AND PNG_NUM_SEC = ?";
    pkValues.add(this.getPngNumSec());
    
    fields += " PNG_NOMBRE = ?, ";
    values.add(this.getPngNombre());

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
    String sql = "INSERT INTO F_PERS_NG (PNG_NUM_SEC, ";

    String fields = "";
    String fieldValues = "";
    ArrayList values = new ArrayList();

    /* fields += ", PNG_NUM_SEC";
    fieldValues += ", ?";
    values.add(this.getPngNumSec()); */

    fields += ", PNG_NOMBRE";
    fieldValues += ", ?";
    values.add(this.getPngNombre());


    fields = fields.substring(1).trim();
    fieldValues = fieldValues.substring(1).trim();

    sql += fields + " ) VALUES (PERSONANG_ID_SEQ.NEXTVAL," + fieldValues + ")";

    result.setSql(sql);
    result.setParameters(values.toArray());

    return result;
  }

  public DMLObject getDelete() {
    if(!retrieveSQL) return null;
    DMLObject result = new DMLObject();
    String sql = "DELETE FROM F_PERS_NG WHERE ";

    String conditions = "";
    ArrayList values = new ArrayList();

    conditions += " AND PNG_NUM_SEC = ?";
    values.add(this.getPngNumSec());
    conditions = conditions.substring(4).trim();
    result.setSql(sql + conditions);
    result.setParameters(values.toArray());
    return result;

  }

  public boolean validate() {
    return true;  }

  public boolean doCompare(Object compareWith) {
    FPersNG instance = (FPersNG)compareWith;
    boolean equalObjects = true;
    if(equalObjects && !this.getPngNumSec().equals(instance.getPngNumSec())) equalObjects = false;
    if(equalObjects && !this.getPngNombre().equals(instance.getPngNombre())) equalObjects = false;

    return equalObjects;
  }

  public Object selectAsObject() {
    FPersNG result = new FPersNG();
    DataRow objectData = null;
    objectData = selectAsDataRow();

    result.setPngNumSec((BigDecimal)objectData.getData("PNG_NUM_SEC"));
    result.setPngNombre((String)objectData.getData("PNG_NOMBRE"));

    return result;

  }

}
