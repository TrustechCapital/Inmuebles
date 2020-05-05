package mx.com.inscitech.fiducia.repository;

import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import java.util.stream.Stream;

import mx.com.inscitech.fiducia.dml.GenericDML;
import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.dml.vo.DataSet;

class DBUtils {
    public DBUtils() {
        super();
    }

    static <T> T getQueryAsModel(String query, Function<DataRow, T> mapperFunction) {
        return getQueryAsModel(query, Collections.emptyList(), mapperFunction);
    }

    static <T> T getQueryAsModel(String query, List<Object> parameters, Function<DataRow, T> mapperFunction) {

        GenericDML genericDML = new GenericDML();
        DataRow dataRow = genericDML.getDataRow(query, parameters.toArray());

        if (!dataRow.hasData()) {
            return null;
        }

        return Stream.of(dataRow)
                     .findFirst()
                     .map(mapperFunction)
                     .get();
    }

    static <T> List<T> getQueryAsList(String query, List<Object> parameters, Function<DataRow, T> mapperFunction) {

        GenericDML genericDML = new GenericDML();
        DataSet dataSet = genericDML.getDataSet(query, parameters.toArray());
        List<DataRow> dataList = dataSet.getArDatos();

        return dataList.stream()
                       .map(mapperFunction)
                       .collect(Collectors.toList());
    }

    static void executeUpdate(String query, List<Object> parameters) {
        GenericDML genericDML = new GenericDML();
        genericDML.executeUpdate(query, parameters.toArray());
    }
}
