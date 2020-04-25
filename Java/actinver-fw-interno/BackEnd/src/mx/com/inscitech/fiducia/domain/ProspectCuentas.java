package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "PROSPECT_CUENTAS_PK", columns = { "PRS_ID_CUENTAS" }, sequences = { "MAX" })
public class ProspectCuentas extends DomainObject {

    private BigDecimal prsIdCuentas = null;
    private BigDecimal prsNumprospect = null;
    private BigDecimal prcTipoCuentas = null;
    private BigDecimal prcNumCuentas = null;
    private BigDecimal prcBanco = null;
    private BigDecimal prcNumCuentasBolsa = null;

    public ProspectCuentas() {
        super();
        this.pkColumns = 1;
    }

    /*************************************************/

    public DMLObject getSelectByPK() {
        if (!retrieveSQL) return null;
        
        DMLObject result = new DMLObject();
        String sql = "SELECT * FROM PROSPECT_CUENTAS ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getPrsIdCuentas() != null && this.getPrsIdCuentas().longValue() == -999) {
            conditions += " AND PRS_NUM_PROSPECT IS NULL";
        } else if (this.getPrsNumprospect() != null) {
            conditions += " AND PRS_NUM_PROSPECT = ?";
            values.add(this.getPrsNumprospect());
        }

        if (!"".equals(conditions)) {
            conditions = conditions.substring(4).trim();
            sql += "WHERE " + conditions;
            result.setSql(sql);
            result.setParameters(values.toArray());
        }

        return result;

    }

    public DMLObject getSelect() {
        if (!retrieveSQL) return null;
        
        DMLObject result = new DMLObject();
        String sql = "SELECT * FROM PROSPECT_CUENTAS ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getPrsIdCuentas() != null && this.getPrsIdCuentas().longValue() == -999) {
            conditions += " AND PRS_ID_CUENTAS IS NULL";
        } else if (this.getPrsIdCuentas() != null) {
            conditions += " AND PRS_ID_CUENTAS = ?";
            values.add(this.getPrsIdCuentas());
        }

        if (this.getPrsNumprospect() != null && this.getPrsNumprospect().longValue() == -999) {
            conditions += " AND PRS_NUM_PROSPECT IS NULL";
        } else if (this.getPrsNumprospect() != null) {
            conditions += " AND PRS_NUM_PROSPECT = ?";
            values.add(this.getPrsNumprospect());
        }

        if (this.getPrcTipoCuentas() != null && this.getPrcTipoCuentas().longValue() == -999) {
            conditions += " AND PRC_TIPO_CUENTAS IS NULL";
        } else if (this.getPrcTipoCuentas() != null) {
            conditions += " AND PRC_TIPO_CUENTAS = ?";
            values.add(this.getPrcTipoCuentas());
        }

        if (this.getPrcNumCuentas() != null && this.getPrcNumCuentas().longValue() == -999) {
            conditions += " AND PRC_NUM_CUENTAS IS NULL";
        } else if (this.getPrcNumCuentas() != null) {
            conditions += " AND PRC_NUM_CUENTAS = ?";
            values.add(this.getPrcNumCuentas());
        }

        if (this.getPrcBanco() != null && this.getPrcBanco().longValue() == -999) {
            conditions += " AND PRC_BANCO IS NULL";
        } else if (this.getPrcBanco() != null) {
            conditions += " AND PRC_BANCO = ?";
            values.add(this.getPrcBanco());
        }
        
        if (this.getPrcNumCuentasBolsa() != null && this.getPrcNumCuentasBolsa().longValue() == -999) {
            conditions += " AND PRC_NUM_CUENTAS_BOLSA IS NULL";
        } else if (this.getPrcNumCuentasBolsa() != null) {
            conditions += " AND PRC_NUM_CUENTAS_BOLSA = ?";
            values.add(this.getPrcNumCuentasBolsa());
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
        if (!retrieveSQL) return null;
        
        DMLObject result = new DMLObject();
        String sql = "UPDATE PROSPECT_CUENTAS SET ";

        String fields = "";
        String conditions = "";
        ArrayList pkValues = new ArrayList();
        ArrayList values = new ArrayList();

        conditions += " AND PRS_ID_CUENTAS = ?";
        pkValues.add(this.getPrsIdCuentas());

        conditions += " AND PRS_NUM_PROSPECT = ?";
        pkValues.add(this.getPrsNumprospect());
        fields += " AND PRC_TIPO_CUENTAS = ?, ";
        values.add(this.getPrcTipoCuentas());
        fields += " AND PRC_NUM_CUENTAS = ?, ";
        values.add(this.getPrcTipoCuentas());
        fields += " AND PRC_BANCO = ?, ";
        values.add(this.getPrcBanco());
        fields += " AND PRC_NUM_CUENTAS_BOLSA = ?, ";
        values.add(this.getPrcNumCuentasBolsa());
        
        for (int i = 0; i < pkValues.size(); i++) {
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
        if (!retrieveSQL) return null;
        
        DMLObject result = new DMLObject();
        String sql = "INSERT INTO PROSPECT_CUENTAS ( PRS_ID_CUENTAS, ";

        String fields = "";
        String fieldValues = "";
        ArrayList values = new ArrayList();

        /*fields += ", PRS_ID_CUENTAS";
        fieldValues += ", ?";
        values.add(this.getPrsIdCuentas());*/

        fields += ", PRS_NUM_PROSPECT";
        fieldValues += ", ?";
        values.add(this.getPrsNumprospect());

        fields += ", PRC_TIPO_CUENTAS";
        fieldValues += ", ?";
        values.add(this.getPrcTipoCuentas());

        fields += ", PRC_NUM_CUENTAS";
        fieldValues += ", ?";
        values.add(this.getPrcNumCuentas());

        fields += ", PRC_BANCO";
        fieldValues += ", ?";
        values.add(this.getPrcBanco());
        
        fields += ", PRC_NUM_CUENTAS_BOLSA";
        fieldValues += ", ?";
        values.add(this.getPrcNumCuentasBolsa());

        fields = fields.substring(1).trim();
        fieldValues = fieldValues.substring(1).trim();

        sql += fields + " ) VALUES (PROSPECT_CUENTAS_ID_SEQ.NEXTVAL, " + fieldValues + ")";

        result.setSql(sql);
        result.setParameters(values.toArray());

        return result;
    }

    public boolean validate() {
        return true;
    }

    public boolean doCompare(Object compareWith) {
        ProspectCuentas instance = (ProspectCuentas) compareWith;

        boolean equalObjects = true;

        if (equalObjects && !this.getPrsIdCuentas().equals(instance.getPrsIdCuentas()))
            equalObjects = false;
        if (equalObjects && !this.getPrsNumprospect().equals(instance.getPrsNumprospect()))
            equalObjects = false;
        if (equalObjects && !this.getPrcTipoCuentas().equals(instance.getPrcTipoCuentas()))
            equalObjects = false;
        if (equalObjects && !this.getPrcNumCuentas().equals(instance.getPrcNumCuentas()))
            equalObjects = false;
        if (equalObjects && !this.getPrcBanco().equals(instance.getPrcBanco()))
            equalObjects = false;
        if (equalObjects && !this.getPrcNumCuentasBolsa().equals(instance.getPrcNumCuentasBolsa()))
            equalObjects = false;

        return equalObjects;
    }

    public Object selectAsObject() {
        ProspectCuentas result = new ProspectCuentas();
        DataRow objectData = null;
        objectData = selectAsDataRow();

        result.setPrsIdCuentas((BigDecimal) objectData.getData("PRS_ID_CUENTAS"));
        result.setPrsNumprospect((BigDecimal) objectData.getData("PRS_NUM_PROSPECT"));
        result.setPrcTipoCuentas((BigDecimal) objectData.getData("PRC_TIPO_CUENTAS"));
        result.setPrcNumCuentas((BigDecimal) objectData.getData("PRC_NUM_CUENTAS"));
        result.setPrcBanco((BigDecimal) objectData.getData("PRC_BANCO"));
        result.setPrcNumCuentasBolsa((BigDecimal) objectData.getData("PRC_NUM_CUENTAS_BOLSA"));

        return result;
    }

    public DMLObject getDelete() {
        if (!retrieveSQL) return null;

        DMLObject result = new DMLObject();
        String sql = "DELETE FROM PROSPECT_CUENTAS WHERE ";

        String conditions = "";
        ArrayList values = new ArrayList();

        conditions += " AND PRS_ID_CUENTAS = ?";

        values.add(this.getPrsIdCuentas());

        conditions = conditions.substring(4).trim();
        result.setSql(sql + conditions);
        result.setParameters(values.toArray());

        return result;
    }

    /*********************************************************/

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setPrsIdCuentas(BigDecimal prsIdCuentas) {
        this.prsIdCuentas = prsIdCuentas;
    }

    public BigDecimal getPrsIdCuentas() {
        return prsIdCuentas;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setPrsNumprospect(BigDecimal prsNumprospect) {
        this.prsNumprospect = prsNumprospect;
    }

    public BigDecimal getPrsNumprospect() {
        return prsNumprospect;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setPrcTipoCuentas(BigDecimal prcTipoCuentas) {
        this.prcTipoCuentas = prcTipoCuentas;
    }

    public BigDecimal getPrcTipoCuentas() {
        return prcTipoCuentas;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setPrcNumCuentas(BigDecimal prcNumCuentas) {
        this.prcNumCuentas = prcNumCuentas;
    }

    public BigDecimal getPrcNumCuentas() {
        return prcNumCuentas;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setPrcBanco(BigDecimal prcBanco) {
        this.prcBanco = prcBanco;
    }

    public BigDecimal getPrcBanco() {
        return prcBanco;
    }
    
    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setPrcNumCuentasBolsa(BigDecimal prcNumCuentasBolsa) {
        this.prcNumCuentasBolsa = prcNumCuentasBolsa;
    }

    public BigDecimal getPrcNumCuentasBolsa() {
        return prcNumCuentasBolsa;
    }
}
