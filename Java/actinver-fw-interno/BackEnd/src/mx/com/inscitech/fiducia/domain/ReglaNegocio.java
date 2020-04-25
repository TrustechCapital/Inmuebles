package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "F_REGLAOP_PK", columns = { "FRO_NUM_FIDEICOM", "FRO_SEC_NUM_FIDEICOM" },
            sequences = { "MANUAL" })
public class ReglaNegocio extends DomainObject {

    BigDecimal froNumFideicom = null;
    BigDecimal froSecNumFideicom = null;
    String froTipoRegla = null;
    String froDescripcion = null;
    String froStatus = null;

    public ReglaNegocio() {
        super();
        this.pkColumns = 2;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFroNumFideicom(BigDecimal froNumFideicom) {
        this.froNumFideicom = froNumFideicom;
    }

    public BigDecimal getFroNumFideicom() {
        return froNumFideicom;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFroSecNumFideicom(BigDecimal froSecNumFideicom) {
        this.froSecNumFideicom = froSecNumFideicom;
    }

    public BigDecimal getFroSecNumFideicom() {
        return froSecNumFideicom;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFroTipoRegla(String froTipoRegla) {
        this.froTipoRegla = froTipoRegla;
    }

    public String getFroTipoRegla() {
        return froTipoRegla;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFroDescripcion(String froDescripcion) {
        this.froDescripcion = froDescripcion;
    }

    public String getFroDescripcion() {
        return froDescripcion;
    }

    @FieldInfo(nullable = true, dataType = "VARCHAR2", javaClass = String.class)
    public void setFroStatus(String froStatus) {
        this.froStatus = froStatus;
    }

    public String getFroStatus() {
        return froStatus;
    }

    public DMLObject getSelectByPK() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "SELECT * FROM F_REGLAOP ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getFroNumFideicom() != null && this.getFroNumFideicom().longValue() == -999) {
            conditions += " AND FRO_NUM_FIDEICOM IS NULL";
        } else if (this.getFroNumFideicom() != null) {
            conditions += " AND FRO_NUM_FIDEICOM = ?";
            values.add(this.getFroNumFideicom());
        }

        if (this.getFroSecNumFideicom() != null && this.getFroSecNumFideicom().longValue() == -999) {
            conditions += " AND FRO_SEC_NUM_FIDEICOM IS NULL";
        } else if (this.getFroSecNumFideicom() != null) {
            conditions += " AND FRO_SEC_NUM_FIDEICOM = ?";
            values.add(this.getFroSecNumFideicom());
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
        String sql = "SELECT * FROM F_REGLAOP ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getFroNumFideicom() != null && this.getFroNumFideicom().longValue() == -999) {
            conditions += " AND FRO_NUM_FIDEICOM IS NULL";
        } else if (this.getFroNumFideicom() != null) {
            conditions += " AND FRO_NUM_FIDEICOM = ?";
            values.add(this.getFroNumFideicom());
        }

        if (this.getFroSecNumFideicom() != null && this.getFroSecNumFideicom().longValue() == -999) {
            conditions += " AND FRO_SEC_NUM_FIDEICOM IS NULL";
        } else if (this.getFroSecNumFideicom() != null) {
            conditions += " AND FRO_SEC_NUM_FIDEICOM = ?";
            values.add(this.getFroSecNumFideicom());
        }

        if (this.getFroTipoRegla() != null && "null".equals(this.getFroTipoRegla())) {
            conditions += " AND FRO_TIPO_REGLA IS NULL";
        } else if (this.getFroTipoRegla() != null) {
            conditions += " AND FRO_TIPO_REGLA = ?";
            values.add(this.getFroTipoRegla());
        }

        if (this.getFroDescripcion() != null && "null".equals(this.getFroDescripcion())) {
            conditions += " AND FRO_DESCRIPCION IS NULL";
        } else if (this.getFroDescripcion() != null) {
            conditions += " AND FRO_DESCRIPCION = ?";
            values.add(this.getFroDescripcion());
        }
        if (this.getFroStatus() != null && "null".equals(this.getFroStatus())) {
            conditions += " AND FRO_STATUS IS NULL";
        } else if (this.getFroStatus() != null) {
            conditions += " AND FRO_STATUS = ?";
            values.add(this.getFroStatus());
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
        String sql = "UPDATE F_REGLAOP SET ";

        String fields = "";
        String conditions = "";
        ArrayList pkValues = new ArrayList();
        ArrayList values = new ArrayList();

        conditions += " AND FRO_NUM_FIDEICOM = ?";
        pkValues.add(this.getFroNumFideicom());
        conditions += " AND FRO_SEC_NUM_FIDEICOM = ?";
        pkValues.add(this.getFroSecNumFideicom());

        fields += " FRO_TIPO_REGLA = ?, ";
        values.add(this.getFroTipoRegla());
        fields += " FRO_DESCRIPCION = ?, ";
        values.add(this.getFroDescripcion());
        fields += " FRO_STATUS = ?, ";
        values.add(this.getFroStatus());

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
        String sql = "INSERT INTO F_REGLAOP (FRO_SEC_NUM_FIDEICOM, ";

        String fields = "";
        String fieldValues = "";
        ArrayList values = new ArrayList();

        fields += ", FRO_NUM_FIDEICOM";
        fieldValues += ", ?";
        values.add(this.getFroNumFideicom());

        /*fields += ", FRO_SEC_NUM_FIDEICOM";
        fieldValues += ", ?";
        values.add(this.getFroSecNumFideicom());*/

        fields += ", FRO_TIPO_REGLA";
        fieldValues += ", ?";
        values.add(this.getFroTipoRegla());

        fields += ", FRO_DESCRIPCION";
        fieldValues += ", ?";
        values.add(this.getFroDescripcion());

        fields += ", FRO_STATUS";
        fieldValues += ", ?";
        values.add(this.getFroStatus());

        fields = fields.substring(1).trim();
        fieldValues = fieldValues.substring(1).trim();

        sql += fields + " ) VALUES (REGLAOP_NUMREGLA_SEQ.NEXTVAL, " + fieldValues + ")";

        result.setSql(sql);
        result.setParameters(values.toArray());

        return result;
    }

    public DMLObject getDelete() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "DELETE FROM F_REGLAOP WHERE ";

        String conditions = "";
        ArrayList values = new ArrayList();

        conditions += " AND FRO_NUM_FIDEICOM = ?";
        values.add(this.getFroNumFideicom());
        conditions += " AND FRO_SEC_NUM_FIDEICOM = ?";
        values.add(this.getFroSecNumFideicom());
        conditions = conditions.substring(4).trim();
        result.setSql(sql + conditions);
        result.setParameters(values.toArray());
        return result;

    }

    public boolean validate() {
        return true;
    }

    public boolean doCompare(Object compareWith) {
        ReglaNegocio instance = (ReglaNegocio) compareWith;
        boolean equalObjects = true;
        if (equalObjects && !this.getFroNumFideicom().equals(instance.getFroNumFideicom()))
            equalObjects = false;
        if (equalObjects && !this.getFroSecNumFideicom().equals(instance.getFroSecNumFideicom()))
            equalObjects = false;
        if (equalObjects && !this.getFroTipoRegla().equals(instance.getFroTipoRegla()))
            equalObjects = false;
        if (equalObjects && !this.getFroDescripcion().equals(instance.getFroDescripcion()))
            equalObjects = false;
        if (equalObjects && !this.getFroStatus().equals(instance.getFroStatus()))
            equalObjects = false;
        return equalObjects;
    }

    public Object selectAsObject() {
        ReglaNegocio result = new ReglaNegocio();
        DataRow objectData = null;
        objectData = selectAsDataRow();

        result.setFroNumFideicom((BigDecimal) objectData.getData("FRO_NUM_FIDEICOM"));
        result.setFroSecNumFideicom((BigDecimal) objectData.getData("FRO_SEC_NUM_FIDEICOM"));
        result.setFroTipoRegla((String) objectData.getData("FRO_TIPO_REGLA"));
        result.setFroDescripcion((String) objectData.getData("FRO_DESCRIPCION"));
        result.setFroStatus((String) objectData.getData("FRO_STATUS"));


        return result;

    }

}
