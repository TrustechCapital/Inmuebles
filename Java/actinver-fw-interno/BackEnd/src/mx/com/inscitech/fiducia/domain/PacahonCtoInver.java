package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "PACAHON_CTO_INVER_PK", columns = { "PAC_ID_CTO" }, sequences = { "MAX" })
public class PacahonCtoInver extends DomainObject {

    private BigDecimal pacIdCto = null;
    private BigDecimal pacNumCto = null;
    private BigDecimal pacCtoInver = null;
    public PacahonCtoInver() {
        super();
        this.pkColumns = 1;
    }

    /*************************************************/

    public DMLObject getSelectByPK() {
        if (!retrieveSQL) return null;
        
        DMLObject result = new DMLObject();
        String sql = "SELECT * FROM PACAHON_CTO_INVER ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getpacIdCto() != null && this.getpacIdCto().longValue() == -999) {
            conditions += " AND PAC_NUM_CTO IS NULL";
        } else if (this.getpacNumCto() != null) {
            conditions += " AND PAC_NUM_CTO = ?";
            values.add(this.getpacNumCto());
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
        String sql = "SELECT * FROM PACAHON_CTO_INVER ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getpacIdCto() != null && this.getpacIdCto().longValue() == -999) {
            conditions += " AND PAC_ID_CTO IS NULL";
        } else if (this.getpacIdCto() != null) {
            conditions += " AND PAC_ID_CTO = ?";
            values.add(this.getpacIdCto());
        }

        if (this.getpacNumCto() != null && this.getpacNumCto().longValue() == -999) {
            conditions += " AND PAC_NUM_CTO IS NULL";
        } else if (this.getpacNumCto() != null) {
            conditions += " AND PAC_NUM_CTO = ?";
            values.add(this.getpacNumCto());
        }

        if (this.getpacCtoInver() != null && this.getpacCtoInver().longValue() == -999) {
            conditions += " AND PAC_CTO_INVER IS NULL";
        } else if (this.getpacCtoInver() != null) {
            conditions += " AND PAC_CTO_INVER = ?";
            values.add(this.getpacCtoInver());
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
        String sql = "UPDATE PACAHON_CTO_INVER SET ";

        String fields = "";
        String conditions = "";
        ArrayList pkValues = new ArrayList();
        ArrayList values = new ArrayList();

        conditions += " AND PAC_ID_CTO = ?";
        pkValues.add(this.getpacIdCto());

        conditions += " AND PAC_NUM_CTO = ?";
        pkValues.add(this.getpacNumCto());
        fields += " AND PAC_CTO_INVER = ?, ";
        values.add(this.getpacCtoInver());
        
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
        String sql = "INSERT INTO PACAHON_CTO_INVER ( PAC_ID_CTO, ";

        String fields = "";
        String fieldValues = "";
        ArrayList values = new ArrayList();

        /*fields += ", PRS_ID_CUENTAS";
        fieldValues += ", ?";
        values.add(this.getpacIdCto());*/

        fields += ", PAC_NUM_CTO";
        fieldValues += ", ?";
        values.add(this.getpacNumCto());

        fields += ", PAC_CTO_INVER";
        fieldValues += ", ?";
        values.add(this.getpacCtoInver());

        fields = fields.substring(1).trim();
        fieldValues = fieldValues.substring(1).trim();

        sql += fields + " ) VALUES (PACAHON_CTO_INVER_ID_SEQ.NEXTVAL, " + fieldValues + ")";

        result.setSql(sql);
        result.setParameters(values.toArray());

        return result;
    }

    public boolean validate() {
        return true;
    }

    public boolean doCompare(Object compareWith) {
        PacahonCtoInver instance = (PacahonCtoInver) compareWith;

        boolean equalObjects = true;

        if (equalObjects && !this.getpacIdCto().equals(instance.getpacIdCto()))
            equalObjects = false;
        if (equalObjects && !this.getpacNumCto().equals(instance.getpacNumCto()))
            equalObjects = false;
        if (equalObjects && !this.getpacCtoInver().equals(instance.getpacCtoInver()))
            equalObjects = false;

        return equalObjects;
    }

    public Object selectAsObject() {
        PacahonCtoInver result = new PacahonCtoInver();
        DataRow objectData = null;
        objectData = selectAsDataRow();

        result.setpacIdCto((BigDecimal) objectData.getData("PAC_ID_CTO"));
        result.setpacNumCto((BigDecimal) objectData.getData("PAC_NUM_CTO"));
        result.setpacCtoInver((BigDecimal) objectData.getData("PAC_CTO_INVER"));

        return result;
    }

    public DMLObject getDelete() {
        if (!retrieveSQL) return null;

        DMLObject result = new DMLObject();
        String sql = "DELETE FROM PACAHON_CTO_INVER WHERE ";

        String conditions = "";
        ArrayList values = new ArrayList();

        conditions += " AND PAC_ID_CTO = ?";

        values.add(this.getpacIdCto());

        conditions = conditions.substring(4).trim();
        result.setSql(sql + conditions);
        result.setParameters(values.toArray());

        return result;
    }

    /*********************************************************/

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setpacIdCto(BigDecimal pacIdCto) {
        this.pacIdCto = pacIdCto;
    }

    public BigDecimal getpacIdCto() {
        return pacIdCto;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setpacNumCto(BigDecimal pacNumCto) {
        this.pacNumCto = pacNumCto;
    }

    public BigDecimal getpacNumCto() {
        return pacNumCto;
    }

    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setpacCtoInver(BigDecimal pacCtoInver) {
        this.pacCtoInver = pacCtoInver;
    }

    public BigDecimal getpacCtoInver() {
        return pacCtoInver;
    }

}
