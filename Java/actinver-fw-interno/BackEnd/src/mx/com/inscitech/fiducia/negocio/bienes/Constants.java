package mx.com.inscitech.fiducia.negocio.bienes;

import java.util.Arrays;
import java.util.stream.Stream;

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

    enum TiposOperacionesDetalleBien {
        ENTRADA(1),
        MODIFICACION(2),
        REVALUACION(3),
        SALIDA(5);

        private int identificadorOperacion;

        TiposOperacionesDetalleBien(int identificadorOperacion) {
            this.identificadorOperacion = identificadorOperacion;
        }

        int getValue() {
            return this.identificadorOperacion;
        }

    }

    // Descripcion: estas claves se utilizan unicamente para llevar un registro de la transaccion realizada en el
    // en relacion a todo el ciclo de vida de un bien, desde su alta hasta su liberacion.

    enum TiposTransaccionesBienes {
        ENTRADA(1, "Entrada de Bien"),
        REVALUACION_BAJA(2, "Revaluacion de Bien a la Baja"),
        REVALUACION_ALTA(3, "Revaluacion de Bien a la Alza"),
        SALIDA(4, "Salida de un Bien"),
        INDIVIDUALIZACION(5, "Individualizacion de Bienes"),
        LIBERACION(6, "Liberacion de Bienes Individualizados");

        private int identificador;
        private String descripcion;

        TiposTransaccionesBienes(int identificadorTransaccion, String descripcion) {
            this.identificador = identificadorTransaccion;
            this.descripcion = descripcion;
        }

        int getValue() {
            return this.identificador;
        }

        String getDescription() {
            return this.descripcion;
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

    public enum TiposCargaMasiva {
        INDIVIDUALIZACION(1),
        LIBERACION(2);

        private int tipoOperacion;

        TiposCargaMasiva(int tipoOperacion) {
            this.tipoOperacion = tipoOperacion;
        }

        public int getValue() {
            return this.tipoOperacion;
        }

    }

    enum EstatusIndividualizacionBienes {
        ACTIVO(1, "ACTIVO"),
        EN_PROCESO_LIBERACION(2, "EN PROCESO LIBERACION"),
        LIBERADO(3, "LIBERADO");

        private int identificador;
        private String texto;

        EstatusIndividualizacionBienes(int ideintificador, String texto) {
            this.identificador = ideintificador;
            this.texto = texto;

        }

        int getValue() {
            return this.identificador;
        }

        String getText() {
            return this.texto;
        }

        public static String getText(int identificador) {
            return Stream.of(values())
                         .filter((t) -> t.identificador == identificador)
                         .map((t) -> t.getText())
                         .findFirst()
                         .orElse(ACTIVO.getText());
        }

    }
}
