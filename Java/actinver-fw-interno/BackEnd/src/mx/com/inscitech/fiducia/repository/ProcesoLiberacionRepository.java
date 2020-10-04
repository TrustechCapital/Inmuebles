package mx.com.inscitech.fiducia.repository;

import java.math.BigDecimal;

import java.util.Arrays;
import java.util.List;

import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.domain.FProcesoLiberacion;
import mx.com.inscitech.fiducia.models.UnidadesCartaLiberacionBienesRow;

public class ProcesoLiberacionRepository {
    public ProcesoLiberacionRepository() {
        super();
    }

    public FProcesoLiberacion findByPK(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idBien,
                                       String idEdificio, String idDepto) {
        FProcesoLiberacion procesoLiberacion =
            new FProcesoLiberacion(idFideicomiso, idSubcuenta, idBien, idEdificio, idDepto);
        return (FProcesoLiberacion) procesoLiberacion.selectAsObject();
    }

    public UnidadesCartaLiberacionBienesRow getUnidadeParaCartaDeLiberacion(BigDecimal idFideicomiso,
                                                                            BigDecimal idSubcuenta, BigDecimal idBien,
                                                                            String edificio, String depto) {

        String selectClause = String.join("SELECT \n", //
                                          "  COALESCE(FUNI_CALLE_NUM, 'XXXXX') as calle, \n", //
                                          "  COALESCE(FUNI_NOM_COLONIA, 'XXXXX') as colonia, \n", //
                                          "  COALESCE(FUNI_NOM_POBLACION, 'XXXXX') as poblacion, \n", //
                                          "  COALESCE(EDO_NOM_ESTADO, 'XXXXX') as nomEstado, \n", //
                                          "  COALESCE(FUNI_INDIVISO, 0) as indiviso, \n", //
                                          "  COALESCE(FUNI_NUM_ESCRITURA, 'S/N') as numEscritura, \n", //
                                          "  COALESCE(FORS_REGIMEN, 0) as regimen, \n", //
                                          "  COALESCE(FUNI_ESTACIONAMIENTO1, 'XXXXX') as estacionamiento1, \n", //
                                          "  COALESCE(FUNI_ESTACIONAMIENTO2, 'XXXXX') as estacionamiento2, \n", //
                                          "  COALESCE(FUNI_ESTACIONAMIENTO3, 'XXXXX') as estacionamiento3, \n", //
                                          "  COALESCE(FUNI_ROOF_GARDEN, 'XXXXX') as roofGarden, \n", //
                                          "  COALESCE(FUNI_SOTANO, 'XXXXX') as sotano \n", //
                                          "FROM F_UNIDADES \n", //
                                          "LEFT JOIN F_BIENESGAR \n", //
                                          "  ON FGRS_ID_FIDEICOMISO = FUNI_ID_FIDEICOMISO \n", //
                                          "  AND FGRS_ID_SUBCUENTA = FUNI_ID_SUBCUENTA \n", //
                                          "  AND FORS_ID_GARANTIA = FUNI_ID_BIEN \n", // TODO: Tipos de datos incompatibles
                                          "LEFT JOIN ESTADOS \n", //
                                          "  ON EDO_NUM_PAIS = FUNI_NUM_PAIS \n", //
                                          "  AND EDO_NUM_ESTADO = FUNI_NUM_PAIS \n");

        String whereClause =
            String.join("  AND FUNI_STATUS IN ('COMPROMETIDO','GENERAR CARTA','CARTA GENERADA','LIBERAR','LIBERADO') \n", //
                        "  AND FUNI_ID_FIDEICOMISO = ? \n", //
                        "  AND FUNI_ID_SUBCUENTA = ? \n", //
                        "  AND FUNI_ID_BIEN = ? \n", //
                        "  AND FUNI_ID_EDIFICIO = ? \n", //
                        "  AND FUNI_ID_DEPTO = ?;");

        String qryUnidades = selectClause + whereClause;
        List<Object> parameters = Arrays.asList(idFideicomiso, idSubcuenta, idBien, edificio, depto);

        return DBUtils.getQueryAsModel(qryUnidades, parameters, e -> dataRowToModel(e));
    }

    public void update(FProcesoLiberacion procesoLiberacion) {
        procesoLiberacion.doUpdate();
    }

    public void insert(FProcesoLiberacion procesoLiberacion) {
        procesoLiberacion.doInsert();
    }

    public void delete(FProcesoLiberacion procesoLiberacion) {
        procesoLiberacion.doDelete();
    }

    private static UnidadesCartaLiberacionBienesRow dataRowToModel(DataRow dataRow) {
        return new UnidadesCartaLiberacionBienesRow(dataRow.getString("calle"), dataRow.getString("colonia"),
                                                    dataRow.getString("poblacion"), dataRow.getString("nomEstado"),
                                                    Integer.valueOf(dataRow.getString("indiviso")),
                                                    dataRow.getString("numEscritura"),
                                                    Integer.valueOf(dataRow.getString("regimen")),
                                                    dataRow.getString("estacionamiento1"),
                                                    dataRow.getString("estacionamiento2"),
                                                    dataRow.getString("estacionamiento3"),
                                                    dataRow.getString("roofGarden"), dataRow.getString("sotano"));
    }

}
