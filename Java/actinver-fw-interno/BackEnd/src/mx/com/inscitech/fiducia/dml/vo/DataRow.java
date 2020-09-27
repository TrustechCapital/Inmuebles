package mx.com.inscitech.fiducia.dml.vo;

import java.io.Serializable;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class DataRow implements Serializable {

    @SuppressWarnings("compatibility:1235470106920307740")
    private static final long serialVersionUID = 2490982374418435141L;
    static final boolean IS_POSTGRES_DB = true;


    private Map dataRow;
    private ArrayList fields;

    public DataRow() {
        dataRow = Collections.synchronizedMap(new HashMap<String, Object>());
        fields = new ArrayList();
    }

    public void addData(String key, Object value) {
        dataRow.put(key, value);
        fields.add(key);
    }

    public void removeData(String key, Object value) {
        dataRow.remove(value);
        fields.remove(key);
    }

    public String getNormalizedKey(String key) {
        return IS_POSTGRES_DB ? key.toLowerCase() : key;
    }

    public Object getData(String key) {
        String normalizedKey = getNormalizedKey(key);
        return dataRow.get(normalizedKey);
    }

    public String getString(String key) {
        String normalizedKey = getNormalizedKey(key);
        return dataRow.get(normalizedKey) == null ? null : "" + dataRow.get(normalizedKey);
    }

    public int getFieldCount() {
        return fields.size();
    }

    public boolean hasData() {
        return fields.size() > 0;
    }

    public ArrayList getFieldNames() {
        return fields;
    }

    public void close() {
        if (dataRow != null)
            dataRow.clear();
        if (fields != null)
            fields.clear();

        dataRow = null;
        fields = null;
    }
}
