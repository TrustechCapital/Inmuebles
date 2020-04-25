package mx.com.inscitech.fiducia.domain;

import java.math.BigDecimal;

import java.util.ArrayList;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.base.DMLObject;
import mx.com.inscitech.fiducia.domain.base.DomainObject;
import mx.com.inscitech.fiducia.domain.base.FieldInfo;
import mx.com.inscitech.fiducia.domain.base.PrimaryKey;

@PrimaryKey(constraintName = "F_DOC_X_VIGENCIA_PK", columns = {"FDOC_NUM_VIG_SEQ"}, sequences = { "MAX" })
public class FDocvig extends DomainObject {

    BigDecimal fdocNumVigSeq = null;
    BigDecimal fdocIdDocumentovig = null;
    BigDecimal fdocIdDocumentovigHijo = null;
    String fdocTipoPer = null;
    BigDecimal fdocIdAnteproy=null;
    BigDecimal fdocNumPer= null;
    String fdocFechaRenov=null;

    public FDocvig(){
        super();
        this.pkColumns = 1;
    }

    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFdocNumVigSeq(BigDecimal fdocNumVigSeq) {
        this.fdocNumVigSeq = fdocNumVigSeq;
    }

    public BigDecimal getFdocNumVigSeq() {
        return fdocNumVigSeq;
    }
    
    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setfdocIdDocumentovig(BigDecimal fdocIdDocumentovig) {
        this.fdocIdDocumentovig = fdocIdDocumentovig;
    }
    
    public BigDecimal getfdocIdDocumentovig() {
        return fdocIdDocumentovig;
    }
    
    @FieldInfo(nullable = true, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setfdocIdDocumentovigHijo(BigDecimal fdocIdDocumentovigHijo) {
        this.fdocIdDocumentovigHijo = fdocIdDocumentovigHijo;
    }
    
    public BigDecimal getfdocIdDocumentovigHijo() {
        return fdocIdDocumentovigHijo;
    }

    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class)
    public void setFdocTipoPer(String fdocTipoPer) {
        this.fdocTipoPer = fdocTipoPer;
    }

    public String getFdocTipoPer() {
        return fdocTipoPer;
    }
    
    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFdocIdAnteproy(BigDecimal fdocIdAnteproy) {
        this.fdocIdAnteproy = fdocIdAnteproy;
    }

    public BigDecimal getFdocIdAnteproy() {
        return fdocIdAnteproy;
    }
    
    @FieldInfo(nullable = false, dataType = "NUMBER", precision = 10, scale = 0, javaClass = BigDecimal.class)
    public void setFdocNumPer(BigDecimal fdocNumPer) {
        this.fdocNumPer = fdocNumPer;
    }

    public BigDecimal getFdocNumPer() {
        return fdocNumPer;
    }
    
    @FieldInfo(nullable = false, dataType = "VARCHAR2", javaClass = String.class)
    public void setFdocFechaRenov(String fdocFechaRenov) {
        this.fdocFechaRenov = fdocFechaRenov;
    }

    public String getFdocFechaRenov() {
        return fdocFechaRenov;
    }


    public DMLObject getSelectByPK() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "SELECT * FROM F_DOC_X_VIGENCIA ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getFdocNumVigSeq() != null && this.getFdocNumVigSeq().longValue() == -999) {
            conditions += " AND FDOC_NUM_VIG_SEQ IS NULL";
        } else if (this.getFdocNumVigSeq() != null) {
            conditions += " AND FDOC_NUM_VIG_SEQ = ?";
            values.add(this.getFdocNumVigSeq());
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
        String sql = "SELECT * FROM F_DOC_X_VIGENCIA ";

        String conditions = "";
        ArrayList values = new ArrayList();

        if (this.getFdocNumVigSeq() != null && this.getFdocNumVigSeq().longValue() == -999) {
            conditions += " AND FDOC_NUM_VIG_SEQ IS NULL";
        } else if (this.getFdocNumVigSeq() != null) {
            conditions += " AND FDOC_NUM_VIG_SEQ = ?";
            values.add(this.getFdocNumVigSeq());
        }
        if (this.getfdocIdDocumentovig() != null && this.getfdocIdDocumentovig().longValue() == -999) {
            conditions += " AND FDOC_ID_DOCUMENTOVIG IS NULL";
        } else if (this.getfdocIdDocumentovig() != null) {
            conditions += " AND FDOC_ID_DOCUMENTOVIG = ?";
            values.add(this.getfdocIdDocumentovig());
        }
        if (this.getfdocIdDocumentovigHijo() != null && this.getfdocIdDocumentovigHijo().longValue() == -999) {
            conditions += " AND FDOC_ID_DOCUMENTOVIG_HIJO IS NULL";
        } else if (this.getfdocIdDocumentovigHijo() != null) {
            conditions += " AND FDOC_ID_DOCUMENTOVIG_HIJO = ?";
            values.add(this.getfdocIdDocumentovigHijo());
        }
        if (this.getFdocTipoPer() != null && "null".equals(this.getFdocTipoPer())) {
            conditions += " AND FDOC_TIPO_PER IS NULL";
        } else if (this.getFdocTipoPer() != null) {
            conditions += " AND FDOC_TIPO_PER = ?";
            values.add(this.getFdocTipoPer());
        }
        if (this.getFdocIdAnteproy() != null && this.getFdocIdAnteproy().longValue() == -999) {
            conditions += " AND FDOC_ID_ANTEPROY IS NULL";
        } else if (this.getFdocIdAnteproy() != null) {
            conditions += " AND FDOC_ID_ANTEPROY = ?";
            values.add(this.getFdocIdAnteproy());
        }
        if (this.getFdocNumPer() != null && this.getFdocNumPer().longValue() == -999) {
            conditions += " AND FDOC_NUM_PER IS NULL";
        } else if (this.getFdocNumPer() != null) {
            conditions += " AND FDOC_NUM_PER = ?";
            values.add(this.getFdocNumPer());
        }
        if (this.getFdocFechaRenov() != null && "null".equals(this.getFdocFechaRenov())) {
            conditions += " AND FDOC_FECHA_RENOV IS NULL";
        } else if (this.getFdocFechaRenov() != null) {
            conditions += " AND FDOC_FECHA_RENOV = ?";
            values.add(this.getFdocFechaRenov());
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
        String sql = "UPDATE F_DOC_X_VIGENCIA SET ";

        String fields = "";
        String conditions = "";
        ArrayList pkValues = new ArrayList();
        ArrayList values = new ArrayList();

        conditions += " AND FDOC_NUM_VIG_SEQ = ?";
        pkValues.add(this.getFdocNumVigSeq());
        fields += " FDOC_ID_DOCUMENTOVIG = ?, ";
        values.add(this.getfdocIdDocumentovig());
        fields += " FDOC_ID_DOCUMENTOVIG_HIJO = ?, ";
        values.add(this.getfdocIdDocumentovigHijo());
        fields += " FDOC_TIPO_PER = ?, ";
        values.add(this.getFdocTipoPer());
        fields += " FDOC_ID_ANTEPROY = ?, ";
        values.add(this.getFdocIdAnteproy());
        fields += " FDOC_NUM_PER = ?, ";
        values.add(this.getFdocNumPer());
        fields += " FDOC_FECHA_RENOV = ?, ";
        values.add(this.getFdocFechaRenov());
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
        String sql = "INSERT INTO F_DOC_X_VIGENCIA (FDOC_NUM_VIG_SEQ, ";

        String fields = "";
        String fieldValues = "";
        ArrayList values = new ArrayList();

        /*fields += ", FDOC_NUM_VIG_SEQ";
        fieldValues += ", ?";
        values.add(this.getFdocNumVigSeq());*/

        fields += ", FDOC_ID_DOCUMENTOVIG";
        fieldValues += ", ?";
        values.add(this.getfdocIdDocumentovig());
        
        fields += ", FDOC_ID_DOCUMENTOVIG_HIJO";
        fieldValues += ", ?";
        values.add(this.getfdocIdDocumentovigHijo());
        
        fields += ", FDOC_TIPO_PER";
        fieldValues += ", ?";
        values.add(this.getFdocTipoPer());
        
        fields += ", FDOC_ID_ANTEPROY";
        fieldValues += ", ?";
        values.add(this.getFdocIdAnteproy());
        
        fields += ", FDOC_NUM_PER";
        fieldValues += ", ?";
        values.add(this.getFdocNumPer());
        
        fields += ", FDOC_FECHA_RENOV";
        fieldValues += ", ?";
        values.add(this.getFdocFechaRenov());

        fields = fields.substring(1).trim();
        fieldValues = fieldValues.substring(1).trim();

        sql += fields + " ) VALUES (FDOCVIGSEQ.NEXTVAL," + fieldValues + ")";

        result.setSql(sql);
        result.setParameters(values.toArray());

        return result;
    }

    public DMLObject getDelete() {
        if (!retrieveSQL)
            return null;
        DMLObject result = new DMLObject();
        String sql = "DELETE FROM F_DOC_X_VIGENCIA WHERE ";

        String conditions = "";
        ArrayList values = new ArrayList();

        conditions += " AND FDOC_NUM_VIG_SEQ = ?";
        values.add(this.getFdocNumVigSeq());
        conditions = conditions.substring(4).trim();
        result.setSql(sql + conditions);
        result.setParameters(values.toArray());
        return result;

    }

    public boolean validate() {
        return true;
    }

    public boolean doCompare(Object compareWith) {
        FDocvig instance = (FDocvig) compareWith;
        boolean equalObjects = true;
        if (equalObjects && !this.getFdocNumVigSeq().equals(instance.getFdocNumVigSeq()))
            equalObjects = false;
        if (equalObjects && !this.getfdocIdDocumentovig().equals(instance.getfdocIdDocumentovig()))
            equalObjects = false;
        if (equalObjects && !this.getfdocIdDocumentovigHijo().equals(instance.getfdocIdDocumentovigHijo()))
            equalObjects = false;
        if (equalObjects && !this.getFdocTipoPer().equals(instance.getFdocTipoPer()))
            equalObjects = false;
        if (equalObjects && !this.getFdocIdAnteproy().equals(instance.getFdocIdAnteproy()))
            equalObjects = false;
        if (equalObjects && !this.getFdocNumPer().equals(instance.getFdocNumPer()))
            equalObjects = false;
        if (equalObjects && !this.getFdocFechaRenov().equals(instance.getFdocFechaRenov()))
            equalObjects = false;
        return equalObjects;
    }

    public Object selectAsObject() {
        FDocvig result = new FDocvig();
        DataRow objectData = null;
        objectData = selectAsDataRow();

        result.setFdocNumVigSeq((BigDecimal)objectData.getData("FDOC_NUM_VIG_SEQ"));
        result.setfdocIdDocumentovig((BigDecimal)objectData.getData("FDOC_ID_DOCUMENTOVIG"));
        result.setfdocIdDocumentovigHijo((BigDecimal)objectData.getData("FDOC_ID_DOCUMENTOVIG_HIJO"));
        result.setFdocTipoPer((String)objectData.getData("FDOC_TIPO_PER"));
        result.setFdocIdAnteproy((BigDecimal)objectData.getData("FDOC_ID_ANTEPROY"));
        result.setFdocNumPer((BigDecimal)objectData.getData("FDOC_NUM_PER"));
        result.setFdocFechaRenov((String)objectData.getData("FDOC_FECHA_RENOV"));
        

        return result;

    }
}
