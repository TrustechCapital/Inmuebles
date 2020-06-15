package mx.com.inscitech.fiducia.negocio.bienes;

import java.util.Arrays;

public class Constants {

    enum EstatusGarantias {
        LIBERADO,
        COMPROMETIDO
    }

    enum EstatusBienesGarantias {
        ACTIVO
    }

    enum TiposOperaciones {
        GARANTIAS(6),
        BIENES(8),
        BIENES_GARANTIAS(3);

        private int identificadorOperacion;

        TiposOperaciones(int identificadorOperacion) {
            this.identificadorOperacion = identificadorOperacion;
        }

        int getValue() {
            return this.identificadorOperacion;
        }

    }

    enum TiposOperacionesGarantias {
        ENTRADA_EN_GARANTIA(1),
        MODIFICACION_DE_GARANTIA(2),
        REVALUACION_DE_GARANTIA(3),
        SALIDA_DE_BIEN_EN_GARANTIA(5),
        PAGO_PARCIAL_DE_GARANTIA(6);

        private int identificadorOperacion;

        TiposOperacionesGarantias(int identificadorOperacion) {
            this.identificadorOperacion = identificadorOperacion;
        }

        int getValue() {
            return this.identificadorOperacion;
        }

    }

    enum SubtiposTransaccionesGarantias {
        ENTRADA(51),
        REVALUACION_ALTA(53),
        REVALUACION_BAJA(54),
        SALIDA(52),
        DESCONOCIDO(0);

        private int identificadorTransaccion;

        SubtiposTransaccionesGarantias(int identificadorTransaccion) {
            this.identificadorTransaccion = identificadorTransaccion;
        }

        int getValue() {
            return this.identificadorTransaccion;
        }

    }

    enum OperacionesPagoBienes {
        ALTA,
        BAJA
    }

    enum EstadosAdquiriente {
        ACTIVO(1, "ACTIVO"),
        EN_PROCESO_DE_LIBERACION(2, "EN PROCESO DE LIBERACION"),
        LIBERADO(3, "LIBERADO"),
        DESCONOCIDO(-1, "DESCONOCIDO");

        private int idEstatus;
        private String estatus;

        EstadosAdquiriente(int idEstatus, String estatus) {
            this.idEstatus = idEstatus;
            this.estatus = estatus;
        }

        int getValue() {
            return this.idEstatus;
        }

        String getStringValue() {
            return this.estatus;
        }

        static String fromId(int idStatus) {
            return Arrays.stream(EstadosAdquiriente.values())
                         .filter(e -> e.getValue() == idStatus)
                         .findFirst()
                         .orElse(EstadosAdquiriente.DESCONOCIDO)
                         .getStringValue();
        }
    }

    public Constants() {
        super();
    }

    enum TiposCargaMasiva {
        INDIVIDUALIZACION(1),
        LIBERACION(2);

        private int tipoOperacion;

        TiposCargaMasiva(int tipoOperacion) {
            this.tipoOperacion = tipoOperacion;
        }

        int getValue() {
            return this.tipoOperacion;
        }

    }
}
