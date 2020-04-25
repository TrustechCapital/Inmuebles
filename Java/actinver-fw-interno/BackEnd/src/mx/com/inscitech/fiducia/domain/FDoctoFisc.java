package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "F_DOCTO_FISC_PK", columns = { "FDF_ID_DOCUMENTO","FDF_ID_CONTRATO" }, sequences = { "MAX" })
public class FDoctoFisc extends DomainObject {

    BigDecimal fdfIdDocumento = null;
    BigDecimal fdfIdContrato = null;

    public FDoctoFisc() {
        super();
        this.pkColumns = 1;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFdfIdDocumento(BigDecimal fdfIdDocumento) {
        this.fdfIdDocumento = fdfIdDocumento;
    }

    public BigDecimal getFdfIdDocumento() {
        return fdfIdDocumento;
    }
    
    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFdfIdContrato(BigDecimal fdfIdContrato) {
        this.fdfIdContrato = fdfIdContrato;
    }

    public BigDecimal getFdfIdContrato() {
        return fdfIdContrato;
    }


    public DMLObject getSelectByPK() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "SELECT * FROM F_DOCTO_FISC ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getFdfIdDocumento() != null && this.getFdfIdDocumento().longValue() == -999) {
            conditions += " AND FDF_ID_DOCUMENTO IS NULL";
        } else if (this.getFdfIdDocumento() != null) {
            conditions += " AND FDF_ID_DOCUMENTO = ?";
            values.add(this.getFdfIdDocumento());
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
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "SELECT * FROM F_DOCTO_FISC ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getFdfIdDocumento() != null && this.getFdfIdDocumento().longValue() == -999) {
            conditions += " AND FDF_ID_DOCUMENTO IS NULL";
        } else if (this.getFdfIdDocumento() != null) {
            conditions += " AND FDF_ID_DOCUMENTO = ?";
            values.add(this.getFdfIdDocumento());
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
        String sql = "UPDATE F_DOCTO_FISC SET ";

        String fields = "";
        String conditions = "";
        ArrayList pkValues = new ArrayList();
        ArrayList values = new ArrayList();

        conditions += " AND FDF_ID_DOCUMENTO = ?";
        pkValues.add(this.getFdfIdDocumento());
        conditions += " AND FDF_ID_CONTRATO = ?";
        pkValues.add(this.getFdfIdContrato());
        
        for (int i = 0; i < pkValues.size(); i++) {
            values.add(pkValues.get(i));
        }
        ;

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
        String sql = "INSERT INTO F_DOCTO_FISC ( ";

        String fields = "";
        String fieldValues = "";
        ArrayList values = new ArrayList();

        fields += ", FDF_ID_DOCUMENTO";
        fieldValues += ", ?";
        values.add(this.getFdfIdDocumento());
        
        fields += ", FDF_ID_CONTRATO";
        fieldValues += ", ?";
        values.add(this.getFdfIdContrato());


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
        String sql = "DELETE FROM F_DOCTO_FISC WHERE ";

        String conditions = "";
        ArrayList values = new ArrayList();

        conditions += " AND FDF_ID_DOCUMENTO = ?";
        values.add(this.getFdfIdDocumento());
        conditions = conditions.substring(4).trim();
        result.setSql(sql + conditions);
        result.setParameters(values.toArray());
        return result;

    }

    public boolean validate() {
        return true;
    }

    public boolean doCompare(Object compareWith) {
        FDoctoFisc instance = (FDoctoFisc) compareWith;
        boolean equalObjects = true;
        if (equalObjects && !this.getFdfIdDocumento().equals(instance.getFdfIdDocumento()))
            equalObjects = false;
        if (equalObjects && !this.getFdfIdContrato().equals(instance.getFdfIdContrato()))
            equalObjects = false;
       
        return equalObjects;
    }

    public Object selectAsObject() {
        FDoctoFisc result = new FDoctoFisc();
        DataRow objectData = null;
        objectData = selectAsDataRow();

        result.setFdfIdDocumento((BigDecimal) objectData.getData("FDF_ID_DOCUMENTO"));
        result.setFdfIdContrato((BigDecimal) objectData.getData("FDF_ID_CONTRATO"));
        
        return result;

    }
}
