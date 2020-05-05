package mx.com.inscitech.fiducia.negocio;

import java.math.BigDecimal;

import java.text.DecimalFormat;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import java.util.stream.Stream;

import mx.com.inscitech.fiducia.common.util.DateUtils;
import mx.com.inscitech.fiducia.domain.Claves;
import mx.com.inscitech.fiducia.domain.FAdquirentes;
import mx.com.inscitech.fiducia.domain.FBienes;
import mx.com.inscitech.fiducia.domain.FBienesgar;
import mx.com.inscitech.fiducia.domain.FEmpresa;
import mx.com.inscitech.fiducia.domain.FGarantias;
import mx.com.inscitech.fiducia.domain.FLiquidacionesBienes;
import mx.com.inscitech.fiducia.domain.FPagosBienes;
import mx.com.inscitech.fiducia.domain.FProcesoLiberacion;
import mx.com.inscitech.fiducia.domain.FRetiro;
import mx.com.inscitech.fiducia.domain.FRetirosMasivos;
import mx.com.inscitech.fiducia.domain.FUnidades;
import mx.com.inscitech.fiducia.domain.Instrucc;
import mx.com.inscitech.fiducia.domain.Notarios;
import mx.com.inscitech.fiducia.models.CartaLiberacionBienes;
import mx.com.inscitech.fiducia.models.LayoutCargaBienes;
import mx.com.inscitech.fiducia.models.UnidadesCartaLiberacionBienesRow;
import mx.com.inscitech.fiducia.negocio.exceptions.BusinessException;
import mx.com.inscitech.fiducia.repository.AdquirienteRepository;
import mx.com.inscitech.fiducia.repository.AnteproyectoRepository;
import mx.com.inscitech.fiducia.repository.BienesGarantiasRepository;
import mx.com.inscitech.fiducia.repository.BienesRepository;
import mx.com.inscitech.fiducia.repository.ClavesRepository;
import mx.com.inscitech.fiducia.repository.DepositosRepository;
import mx.com.inscitech.fiducia.repository.DetliquiRepository;
import mx.com.inscitech.fiducia.repository.EmpresasRepository;
import mx.com.inscitech.fiducia.repository.FoliosRepository;
import mx.com.inscitech.fiducia.repository.GarantiasRepository;
import mx.com.inscitech.fiducia.repository.InstruccionesRepository;
import mx.com.inscitech.fiducia.repository.LiquidacionesBienesRepository;
import mx.com.inscitech.fiducia.repository.MonedasRepository;
import mx.com.inscitech.fiducia.repository.NotariosRepository;
import mx.com.inscitech.fiducia.repository.PagosBienesRepository;
import mx.com.inscitech.fiducia.repository.ProcesoLiberacionRepository;
import mx.com.inscitech.fiducia.repository.RetirosRepository;
import mx.com.inscitech.fiducia.repository.UnidadRepository;

import oracle.sql.NUMBER;

public class OperacionesBienes {

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

    private AdquirienteRepository adquirienteRepository;
    private UnidadRepository unidadRepository;
    private GarantiasRepository garantiasRepository;
    private BienesRepository bienesRepository;
    private FoliosRepository foliosRepository;
    private ClavesRepository clavesRepository;
    private BienesGarantiasRepository bienesGarantiasRepository;
    private EmpresasRepository empresasRepository;
    private ProcesoLiberacionRepository procesoLiberacionRepository;
    private NotariosRepository notariosRepository;
    private AnteproyectoRepository anteproyectoRepository;
    private PagosBienesRepository pagosBienesRepository;
    private MonedasRepository monedasRepository;
    private RetirosRepository retirosRepository;
    private InstruccionesRepository instruccionesRepository;
    private DepositosRepository depositosRepository;
    private DetliquiRepository detliquiRepository;
    private LiquidacionesBienesRepository liquidacionesBienesRepository;

    public OperacionesBienes(AdquirienteRepository adquirienteRepository, UnidadRepository unidadRepository,
                             GarantiasRepository garantiasRepository, BienesRepository bienesRepository,
                             FoliosRepository foliosRepository, ClavesRepository clavesRepository,
                             BienesGarantiasRepository bienesGarantiasRepository, EmpresasRepository empresasRepository,
                             ProcesoLiberacionRepository procesoLiberacionRepository,
                             NotariosRepository notariosRepository, AnteproyectoRepository anteproyRepository,
                             PagosBienesRepository pagosBienesRepository, MonedasRepository monedasRepository,
                             RetirosRepository retirosRepository, InstruccionesRepository instruccionesRepository,
                             DepositosRepository depositosRepository, DetliquiRepository detliquiRepository,
                             LiquidacionesBienesRepository liquidacionesBienesRepository) {
        this.adquirienteRepository = adquirienteRepository;
        this.unidadRepository = unidadRepository;
        this.garantiasRepository = garantiasRepository;
        this.bienesRepository = bienesRepository;
        this.foliosRepository = foliosRepository;
        this.clavesRepository = clavesRepository;
        this.bienesGarantiasRepository = bienesGarantiasRepository;
        this.empresasRepository = empresasRepository;
        this.procesoLiberacionRepository = procesoLiberacionRepository;
        this.notariosRepository = notariosRepository;
        this.anteproyectoRepository = anteproyRepository;
        this.pagosBienesRepository = pagosBienesRepository;
        this.monedasRepository = monedasRepository;
        this.retirosRepository = retirosRepository;
        this.instruccionesRepository = instruccionesRepository;
        this.depositosRepository = depositosRepository;
        this.detliquiRepository = detliquiRepository;
        this.liquidacionesBienesRepository = liquidacionesBienesRepository;
    }

    public void liberaBienes(BigDecimal idFideicomiso, BigDecimal idSubcuenta, String idBien, String depto,
                             BigDecimal idNotario, String localidad, String escritura, String registroPublico,
                             String folioReal, String fechaTrasladoDominio) {

        FAdquirentes adquiriente =
            adquirienteRepository.findByPk(idFideicomiso, idSubcuenta, idBien, depto, BigDecimal.valueOf(1));

        // TODO: Enviar error cuando el saldo no es cero
        if (adquiriente.getFadqSaldo().intValue() == 0) {

            adquiriente.setFadqNotario(idNotario);
            adquiriente.setFadqLocalidad(localidad);
            adquiriente.setFadqContrato(escritura);
            adquiriente.setFadqFolio(folioReal);
            adquiriente.setFadqRegPub(registroPublico);
            adquiriente.setFadqStatus(EstatusGarantias.LIBERADO.toString());

            adquirienteRepository.save(adquiriente);

            FUnidades unidad = unidadRepository.findByPk(idFideicomiso, idSubcuenta, idBien, depto);

            unidad.setFuniNotario(idNotario);
            unidad.setFuniLocalidadNota(localidad);
            unidad.setFuniNumEscritura(escritura);
            unidad.setFuniFolioReal(folioReal);
            unidad.setFuniFechaTrasladoDominio(fechaTrasladoDominio);
            unidad.setFuniStatus(EstatusGarantias.LIBERADO.toString());

            unidadRepository.update(unidad);

        }
    }

    public void transformaGarantias(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idTipoBien) {
        List<FGarantias> garantias = garantiasRepository.findByFideicomisoYSubcuenta(idFideicomiso, idSubcuenta);

        for (FGarantias garantia : garantias) {
            garantiasRepository.saveForHistory(garantia);

            // TODO: Esto va a tronar porque la llave primaria de la tabla es: "FGAR_ID_FIDEICOMISO", "FGAR_ID_SUBCUENTA", "FGAR_CVE_GARANTIA"
            garantia.setFgarCveGarantia(idTipoBien);
            garantiasRepository.save(garantia);
        }
    }

    public String cargaMasivaBienes(int pTipoOperacion, BigDecimal pIdFideicomiso, List<LayoutCargaBienes> datosCarga,

                                    String pFecha) {

        try {
            for (LayoutCargaBienes layoutCarga : datosCarga) {

                BigDecimal idSubcuenta = BigDecimal.valueOf(layoutCarga.getSubcuenta());
                String idBien = layoutCarga.getBien().toString();
                String idDepto = layoutCarga.getDepto();
                BigDecimal idNotario = BigDecimal.valueOf(layoutCarga.getNotario());

                // TODO: Usar enum
                // INDIVIDUALIZACION
                if (pTipoOperacion == 1 || pTipoOperacion == 4) {
                    String tipo = "0";

                    if (pTipoOperacion == 1) {

                        FUnidades unidad = unidadRepository.findByPk(pIdFideicomiso, idSubcuenta, idBien, idDepto);

                        String fechaReversion = layoutCarga.getFechaAvaluo();

                        if (unidad == null) {
                            unidad =
                                new FUnidades(pIdFideicomiso, BigDecimal.valueOf(layoutCarga.getSubcuenta()),
                                              layoutCarga.getBien().toString(), layoutCarga.getDepto());
                            unidad.setFuniTipo(tipo);
                            unidad.setFuniNiveles(toBigDecimal(layoutCarga.getNiveles()));
                            unidad.setFuniCalleNum(layoutCarga.getCalle());
                            unidad.setFuniNomColonia(layoutCarga.getColonia());
                            unidad.setFuniNomPoblacion(layoutCarga.getPoblacion());
                            unidad.setFuniCodigoPostal(layoutCarga.getCodigoPostal());
                            // TODO: el layout recibe string pero en la DB es numero
                            //unidad.setFuniNumEstado(layoutCarga.getEstado());
                            // TODO: el layout recibe string pero en la DB es numero
                            //unidad.setFuniNumPais(layoutCarga.getPais());
                            unidad.setFuniColindancias(layoutCarga.getColindancia());
                            unidad.setFuniMedidas(layoutCarga.getMedidas().toString());
                            unidad.setFuniEstacionamiento1(layoutCarga.getEstacionamiento1());
                            unidad.setFuniSuperficie1(layoutCarga.getSuperficie1());
                            unidad.setFuniEstacionamiento2(layoutCarga.getEstacionamiento2());
                            unidad.setFuniSuperficie2(layoutCarga.getSuperficie2());
                            unidad.setFuniEstacionamiento3(layoutCarga.getEstacionamiento3());
                            unidad.setFuniSuperficie3(layoutCarga.getSuperficie3());
                            unidad.setFuniRoofGarden(layoutCarga.getRoofGarden());
                            unidad.setFuniRoofSuperficie(layoutCarga.getRoofSuperficie());
                            unidad.setFuniSotano(layoutCarga.getSotano());
                            unidad.setFuniSotanoSuperficie(layoutCarga.getSotanoSuperficie());
                            unidad.setFuniIndiviso(BigDecimal.valueOf(layoutCarga.getIndiviso()));
                            unidad.setFuniPrecio(BigDecimal.valueOf(layoutCarga.getPrecio()));
                            unidad.setFuniPrecioCatastro(BigDecimal.valueOf(layoutCarga.getPrecioCatastro()));
                            unidad.setFuniUltimoAvaluo(BigDecimal.valueOf(layoutCarga.getAvaluo()));
                            unidad.setFuniFechaUltimoAvaluo(layoutCarga.getFechaAvaluo());
                            unidad.setFuniMoneda(BigDecimal.valueOf(layoutCarga.getMoneda()));
                            unidad.setFuniActo1(layoutCarga.getActo1());
                            unidad.setFuniActo2(layoutCarga.getActo2());
                            unidad.setFuniActo3(layoutCarga.getActo3());
                            unidad.setFuniActo4(layoutCarga.getActo4());
                            unidad.setFuniNotario(idNotario);
                            unidad.setFuniFechaReversion(DateUtils.fromString(layoutCarga.getFechaReversion()));
                            unidad.setFuniLocalidadNota(layoutCarga.getLocalidad());
                            unidad.setFuniNumEscritura(layoutCarga.getEscritura());
                            unidad.setFuniFolioReal(layoutCarga.getFolioReal().toString());
                            unidad.setFuniFechaTrasladoDominio(null);
                            unidad.setFuniStatus("ACTIVO");
                        }


                        // ALTA ADQUIRIENTE

                        String tipoVenta = "";
                        String tipoPlazo = "";
                        BigDecimal numPlazo = BigDecimal.valueOf(0);
                        BigDecimal enganche = BigDecimal.valueOf(0);
                        BigDecimal abono = BigDecimal.valueOf(0);
                        BigDecimal saldo = BigDecimal.valueOf(0);
                        BigDecimal pagos = BigDecimal.valueOf(0);
                        String cv = "";
                        String contrato = "0";
                        String folio = "0";
                        String libera = "0";
                        String fechaAlta = "";
                        String fechaModificacion = "";

                        FAdquirentes adquiriente =
                            new FAdquirentes(pIdFideicomiso, idSubcuenta, idBien, idDepto, BigDecimal.valueOf(1));
                        adquiriente.setFadqTipoVenta("1");
                        adquiriente.setFadqNombreComprador(layoutCarga.getAdquirente());
                        adquiriente.setFadqValor(BigDecimal.valueOf(layoutCarga.getValor()));
                        adquiriente.setFadqMoneda(BigDecimal.valueOf(layoutCarga.getMoneda()));
                        adquiriente.setFadqTipoVenta(tipoVenta);
                        adquiriente.setFadqTipoPlazo(tipoPlazo);
                        adquiriente.setFadqNumPlazo(numPlazo);
                        adquiriente.setFadqEnganche(enganche);
                        adquiriente.setFadqAbono(abono);
                        adquiriente.setFadqSaldo(saldo);
                        adquiriente.setFadqPagos(pagos);
                        adquiriente.setFadqNotario(idNotario);
                        adquiriente.setFadqLocalidad(layoutCarga.getLocalidad());
                        adquiriente.setFadqCv(cv);
                        adquiriente.setFadqContrato(contrato);
                        adquiriente.setFadqFolio(folio);
                        adquiriente.setFadqRegPub(libera);
                        adquiriente.setFadqFecAlta(fechaAlta);
                        adquiriente.setFadqFecMod(fechaModificacion);
                        adquiriente.setFadqStatus("ACTIVO");
                        adquiriente.setFadqNombreComprador(layoutCarga.getDesarrollo());
                        adquiriente.setFadqPrototipo(layoutCarga.getPrototipo());
                        adquiriente.setFadqNumeroOficial(layoutCarga.getNumeroOficial());
                        adquiriente.setFadqNotaria(layoutCarga.getNotaria());
                        adquiriente.setFadqDelegadoFiduciario(layoutCarga.getDelegadosFiduciarios());

                        //TODO: use enum
                    } else {

                        FAdquirentes adquiriente =
                            adquirienteRepository.findByPk(pIdFideicomiso, idSubcuenta, idBien, idDepto,
                                                           BigDecimal.valueOf(1));
                        adquiriente.setFadqNotario(idNotario);
                        adquiriente.setFadqLocalidad(layoutCarga.getLocalidad());
                        adquiriente.setFadqContrato(layoutCarga.getEscritura());
                        adquiriente.setFadqFolio(layoutCarga.getNumeroOficial());
                        adquiriente.setFadqStatus(EstadosAdquiriente.fromId(layoutCarga.getStatus()));

                        adquirienteRepository.save(adquiriente);

                        FUnidades unidad = unidadRepository.findByPk(pIdFideicomiso, idSubcuenta, idBien, idDepto);
                        unidad.setFuniNotario(idNotario);
                        unidad.setFuniLocalidadNota(layoutCarga.getLocalidad());
                        unidad.setFuniNumEscritura(layoutCarga.getEscritura());
                        unidad.setFuniFolioReal(layoutCarga.getFolioReal().toString());
                        unidad.setFuniStatus(EstadosAdquiriente.fromId(layoutCarga.getStatus()));

                        unidadRepository.update(unidad);
                    }
                }

            }

            return "";
        } catch (Exception e) {
            return "-1";
        }
    }

    private LayoutCargaBienes mapColumnsToObject(List<Object> columns) {
        return new LayoutCargaBienes((Integer) columns.get(0), (Integer) columns.get(1), (Integer) columns.get(2),
                                     (String) columns.get(3), (String) columns.get(4), (String) columns.get(5),
                                     (String) columns.get(6), (String) columns.get(7), (String) columns.get(8),
                                     (String) columns.get(9), (String) columns.get(10), (String) columns.get(11),
                                     (String) columns.get(12), (Integer) columns.get(13), (String) columns.get(14),
                                     (String) columns.get(15), (String) columns.get(16), (String) columns.get(17),
                                     (String) columns.get(18), (String) columns.get(19), (Integer) columns.get(20),
                                     (String) columns.get(21), (String) columns.get(22), (String) columns.get(23),
                                     (String) columns.get(24), (String) columns.get(25), (Double) columns.get(26),
                                     (Double) columns.get(27), (Double) columns.get(28), (String) columns.get(29),
                                     (Double) columns.get(30), (String) columns.get(31), (Integer) columns.get(32),
                                     (String) columns.get(33), (String) columns.get(34), (String) columns.get(35),
                                     (String) columns.get(36), (String) columns.get(37), (String) columns.get(38),
                                     (String) columns.get(39), (String) columns.get(40), (Integer) columns.get(41),
                                     (String) columns.get(42), (Integer) columns.get(43), (String) columns.get(44),
                                     (String) columns.get(45), (String) columns.get(46), (String) columns.get(47),
                                     (String) columns.get(48), (Integer) columns.get(49));
    }

    public int generaBienes(int pTipoOperacion, BigDecimal pIdFideicomiso, BigDecimal pIdSubcuenta,
                            BigDecimal pIdTipoBien, String pClaveBien, String pIdBien, BigDecimal pImporte,
                            BigDecimal pImporteUltimaValuacion, String pPerValuacion, String pDescripcionBien,
                            String pFechaUltimaValuacion, String pFechaInicio, String pFechaFin, BigDecimal pImpMoneda,
                            BigDecimal pMoneda, BigDecimal pIdTipoCambio, String pComentario, String pEstatusBien,
                            BigDecimal pValuacion, String pFechaValuacion) {

        try {
            FBienes bien = new FBienes();

            // TODO: Encontrar un mejor nombre
            int vTipoOperacion;

            // TODO: Cambiar por enum
            if (pTipoOperacion == 2) {
                bien = bienesRepository.findByPk(pIdFideicomiso, pIdSubcuenta, pIdTipoBien, pClaveBien, pIdBien);

                bien.setFbifPerValuacion(pPerValuacion);
                bien.setFbifDescBien(pDescripcionBien);
                bien.setFbifTexComentario(pComentario);

                bienesRepository.save(bien);
                return 0;
            }

            Date fechaInicio = DateUtils.fromString(pFechaInicio);
            BigDecimal folioOperacion = foliosRepository.generaFolio();
            BigDecimal valuacion = pValuacion;
            BigDecimal diferencia = BigDecimal.valueOf(0);

            if (pTipoOperacion == 1) {
                vTipoOperacion = 1;
            } else if (pTipoOperacion == 3) {

                bien = bienesRepository.findByPk(pIdFideicomiso, pIdSubcuenta, pIdTipoBien, pClaveBien, pIdBien);
                valuacion = bien.getFbifImpUltValua();
                diferencia = pImporteUltimaValuacion.subtract(valuacion);
                vTipoOperacion = diferencia.intValue() > 0 ? 2 : 3;

            } else {
                vTipoOperacion = 4;
            }

            BigDecimal clasBien =
                clavesRepository.findClaveByNumeroYDescripcion(pIdTipoBien, pClaveBien).getCveNumSecClave();
            BigDecimal numeroOperacion =
                creaNumeroOperacion("%d%02d%02d%02d%02d0", TiposOperaciones.BIENES.getValue(), pIdTipoBien, clasBien,
                                    vTipoOperacion, pMoneda);

            boolean contabilidadGenerada =
                generaContabilidad(pIdFideicomiso, pIdSubcuenta, pMoneda, fechaInicio, pImporte, numeroOperacion,
                                   folioOperacion, pIdTipoCambio, null, null);

            if (!contabilidadGenerada) {
                throw new BusinessException("Ocurrio un error al generar la contabilidad");
            }

            if (pTipoOperacion == 1) {

                bien = new FBienes(pIdFideicomiso, pIdSubcuenta, pIdTipoBien, pClaveBien, pIdBien);

                bien.setFbifImpBien(pImporte);
                bien.setFbifImpUltValua(pImporte);
                bien.setFbifPerValuacion(pPerValuacion);
                bien.setFbifDescBien(pDescripcionBien);
                bien.setFbifFecUltValua(pFechaUltimaValuacion);
                bien.setFbifFecInicio(pFechaInicio);
                bien.setFbifFecFin(pFechaFin);
                bien.setFbifMoneda(pMoneda);
                bien.setFbifImpMoneda(pImpMoneda);
                bien.setFbifTipoCambio(pIdTipoCambio);
                bien.setFbifTexComentario(pComentario);
                bien.setFbifStBien(pEstatusBien);

                bienesRepository.insert(bien);

            } else if (pTipoOperacion == 3) {

                bien.setFbifImpUltValua(diferencia.add(valuacion));
                bien.setFbifFecUltValua(pFechaValuacion);

                bienesRepository.save(bien);

            } else if (pTipoOperacion == 5) {
                bien = new FBienes(pIdFideicomiso, pIdSubcuenta, pIdTipoBien, pClaveBien, pIdBien);
                bienesRepository.delete(bien);
            }

            return 0;
        } catch (Exception e) {
            return 1;
        }

    }

    public int generaGarantias(int pTipoOperacion, BigDecimal pIdFideicomiso, BigDecimal pIdSubcuenta,
                               BigDecimal pIdGarantia, BigDecimal pClaveGarantia, BigDecimal pIdTipoBien,
                               String pIdentificacion, String pTextoDescripcion, String pTextoComentario,
                               BigDecimal pImporte, BigDecimal pMoneda, BigDecimal pClaveRevalua, String pClavePerValua,
                               BigDecimal pImporteUltimaValuacion, String pFechaUltimaValuacion,
                               String pFechaVencimiento, String pNumeroEscitura, String pNumeroNotario,
                               BigDecimal pValuacion, String pFechaValuacion, BigDecimal pClaveRegimen) {

        try {


            if (pTipoOperacion == TiposOperacionesGarantias.MODIFICACION_DE_GARANTIA.getValue()) {

                FBienesgar bienGarantia = new FBienesgar(pIdFideicomiso, pIdSubcuenta, pIdGarantia);
                bienGarantia.setForsIdentificacion(pIdentificacion);
                bienGarantia.setForsTextoDescrip(pTextoDescripcion);
                bienGarantia.setForsTexComentario(pTextoComentario);
                bienGarantia.setForsCveRevalua(pClaveRevalua);
                bienGarantia.setForsCvePerValua(pClavePerValua);
                bienGarantia.setForsNumEscritura(pNumeroEscitura);
                bienGarantia.setForsNumNotario(pNumeroNotario);
                bienGarantia.setForsRegimen(pClaveRegimen);
                bienGarantia.setForsImpBien(pImporte);

                bienesGarantiasRepository.save(bienGarantia);
                return 0;

            }

            // TODO: Encontrar un mejor nombre
            int vTipoOperacion;
            BigDecimal idTipoCambio = BigDecimal.valueOf(1);
            Date fechaValuacion = DateUtils.fromString(pFechaValuacion);
            BigDecimal folioOperacion = foliosRepository.generaFolio();
            BigDecimal nImporte = pImporteUltimaValuacion;
            BigDecimal valuacion = pValuacion;
            BigDecimal diferencia = BigDecimal.valueOf(0);
            SubtiposTransaccionesGarantias tipoTransaccion;
            FBienesgar bienGarantia = new FBienesgar();

            FGarantias garantia = garantiasRepository.findByPk(pIdFideicomiso, pIdSubcuenta, pClaveGarantia);

            if (pTipoOperacion == TiposOperacionesGarantias.ENTRADA_EN_GARANTIA.getValue()) {
                vTipoOperacion = 1;
                tipoTransaccion = SubtiposTransaccionesGarantias.ENTRADA;
            } else {
                bienGarantia = bienesGarantiasRepository.findByPk(pIdFideicomiso, pIdSubcuenta, pIdGarantia);

                if (pTipoOperacion == TiposOperacionesGarantias.REVALUACION_DE_GARANTIA.getValue()) {

                    // TODO: Verificar si este dato se usa, de lo contrario, mover la consulta a bienGarantia mas abajo y quitar esta linea
                    valuacion = bienGarantia.getForsImpUltValua();
                    diferencia = pValuacion.subtract(pImporteUltimaValuacion);

                    if (diferencia.intValue() > 0) {
                        vTipoOperacion = 2;
                        nImporte = diferencia;
                        tipoTransaccion = SubtiposTransaccionesGarantias.REVALUACION_ALTA;
                    } else {
                        vTipoOperacion = 3;
                        nImporte = diferencia.negate();
                        tipoTransaccion = SubtiposTransaccionesGarantias.REVALUACION_BAJA;
                    }

                } else if (pTipoOperacion == TiposOperacionesGarantias.PAGO_PARCIAL_DE_GARANTIA.getValue()) {
                    vTipoOperacion = 2;
                    //TODO: Aplicar un tipo de transaccion valido
                    tipoTransaccion = SubtiposTransaccionesGarantias.DESCONOCIDO;
                } else {
                    vTipoOperacion = 4;
                    tipoTransaccion = SubtiposTransaccionesGarantias.SALIDA;
                    nImporte = pImporteUltimaValuacion;
                }
            }

            BigDecimal esGarantia =
                garantia.getFgarEsGarantia() == null ? BigDecimal.valueOf(0) : garantia.getFgarEsGarantia();

            BigDecimal numeroOperacion =
                creaNumeroOperacion("%d%02d%01d%02d%02d%01d000", TiposOperaciones.BIENES_GARANTIAS.getValue(),
                                    tipoTransaccion, pClaveGarantia, pIdTipoBien, pMoneda, esGarantia);

            if (pTipoOperacion != TiposOperacionesGarantias.REVALUACION_DE_GARANTIA.getValue()) {
                if (pTipoOperacion == TiposOperacionesGarantias.SALIDA_DE_BIEN_EN_GARANTIA.getValue()) {
                    nImporte = pImporteUltimaValuacion;
                } else {
                    nImporte = pImporte;
                }
            }

            boolean contabilidadGenerada =
                generaContabilidad(pIdFideicomiso, pIdSubcuenta, pMoneda, fechaValuacion, nImporte, numeroOperacion,
                                   folioOperacion, idTipoCambio, null, null);

            if (!contabilidadGenerada) {
                throw new BusinessException("Ocurrio un error al generar la contabilidad");
            }

            if (pTipoOperacion == TiposOperacionesGarantias.ENTRADA_EN_GARANTIA.getValue()) {

                bienGarantia = new FBienesgar(pIdFideicomiso, pIdSubcuenta, pIdGarantia);

                bienGarantia.setForsCveTipoGarantia(pClaveGarantia);
                bienGarantia.setForsCveTipoBien(pIdTipoBien);
                bienGarantia.setForsIdentificacion(pIdentificacion);
                bienGarantia.setForsTextoDescrip(pTextoDescripcion);
                bienGarantia.setForsTexComentario(pTextoComentario);
                bienGarantia.setForsImpBien(pImporte);
                bienGarantia.setForsMoneda(pMoneda);
                bienGarantia.setForsCveRevalua(pClaveRevalua);
                bienGarantia.setForsCvePerValua(pClavePerValua);
                bienGarantia.setForsImpUltValua(pImporte);
                bienGarantia.setForsFecUltValua(pFechaUltimaValuacion);
                bienGarantia.setForsFecVencimiento(pFechaVencimiento);
                bienGarantia.setForsNumEscritura(pNumeroEscitura);
                bienGarantia.setForsNumNotario(pNumeroNotario);
                bienGarantia.setForsCveStatus(EstatusBienesGarantias.ACTIVO.toString());
                bienGarantia.setForsRegimen(pClaveRegimen);

                bienesGarantiasRepository.insert(bienGarantia);

                BigDecimal nuevoImporteGarantizado = garantia.getFgarImpGarantizad().add(pImporte);
                garantia.setFgarImpGarantizad(nuevoImporteGarantizado);

                garantiasRepository.save(garantia);
                return 0;
            }

            if (pTipoOperacion == TiposOperacionesGarantias.REVALUACION_DE_GARANTIA.getValue()) {

                bienGarantia.setForsImpUltValua(pValuacion);
                bienGarantia.setForsFecUltValua(pFechaValuacion);

                bienesGarantiasRepository.save(bienGarantia);

                BigDecimal nuevoImporteGarantizado = garantia.getFgarImpGarantizad().add(diferencia);
                garantia.setFgarImpGarantizad(nuevoImporteGarantizado);

                garantiasRepository.save(garantia);
                return 0;
            }

            if (pTipoOperacion == TiposOperacionesGarantias.SALIDA_DE_BIEN_EN_GARANTIA.getValue()) {

                bienGarantia = new FBienesgar(pIdFideicomiso, pIdSubcuenta, pIdGarantia);

                bienesGarantiasRepository.delete(bienGarantia);

                BigDecimal nuevoImporteGarantizado = garantia.getFgarImpGarantizad().subtract(pImporteUltimaValuacion);
                garantia.setFgarImpGarantizad(nuevoImporteGarantizado);

                garantiasRepository.save(garantia);
                return 0;
            }

            if (pTipoOperacion == TiposOperacionesGarantias.PAGO_PARCIAL_DE_GARANTIA.getValue()) {
                BigDecimal nuevoImporteGarantizado = garantia.getFgarImpGarantizad().subtract(pImporte);
                garantia.setFgarImpGarantizad(nuevoImporteGarantizado);

                garantiasRepository.save(garantia);
                return 0;
            }

            return 0;

        } catch (Exception e) {
            return 1;
        }

    }

    public CartaLiberacionBienes generaCartaLiberacion(BigDecimal pIdFideicomiso, BigDecimal pIdSubcuenta,
                                                       String pIdBien, String pIdDepto, String pIdEdificio,
                                                       String pFirma) {

        // HEADER

        FEmpresa empresa = empresasRepository.findByPk(BigDecimal.valueOf(1));
        String sitioWeb = "www.amicorp.com";


        // UNIDADES

        UnidadesCartaLiberacionBienesRow unidadCartaLiberacion =
            procesoLiberacionRepository.getUnidadeParaCartaDeLiberacion(pIdFideicomiso, pIdSubcuenta, pIdBien,
                                                                        pIdEdificio, pIdDepto);

        BigDecimal idBien = BigDecimal.valueOf(Double.valueOf(pIdBien));
        FBienesgar bienGarantia = bienesGarantiasRepository.findByPk(pIdFideicomiso, pIdSubcuenta, idBien);
        Claves claveTipoInmueble =
            clavesRepository.findByPK(bienGarantia.getForsCveTipoGarantia(), bienGarantia.getForsCveTipoBien());

        String tipoInmueble =
            claveTipoInmueble.getCveDescClave() == null ? "SIN TIPO" : claveTipoInmueble.getCveDescClave();
        FProcesoLiberacion procesoLiberacion =
            procesoLiberacionRepository.findByPK(pIdFideicomiso, pIdSubcuenta, pIdBien, pIdEdificio, pIdDepto);


        // FIDEICOMITENTE / FIDEICOMISARIO / COMITE

        String beneficiario = procesoLiberacion.getFplFideicomBenefici();
        String nombrePersona = procesoLiberacion.getFplNomPersona();
        String nombrePersona1 = procesoLiberacion.getFplNomPersona1();
        String lugar = procesoLiberacion.getFplNumLugar();
        String lugar1 = procesoLiberacion.getFplNumLugar1();
        String descripcionBeneficiario =
            representacionPersona(beneficiario, nombrePersona, lugar, nombrePersona1, lugar1);

        String beneficiarioSaneamiento = procesoLiberacion.getFplFidBenSaneamiento();
        String nombreSaneamiento = procesoLiberacion.getFplNomSaneamiento();
        String nombreSaneamiento1 = procesoLiberacion.getFplNumLugarSaneamiento1();
        String lugarSaneamiento = procesoLiberacion.getFplNumLugarSaneamiento();
        String lugarSaneamiento1 = procesoLiberacion.getFplNumLugarSaneamiento1();
        String descripcionSaneamiento =
            representacionPersona(beneficiarioSaneamiento, nombreSaneamiento, lugarSaneamiento, nombreSaneamiento1,
                                  lugarSaneamiento1);

        String beneficiarioResponsabilidad = procesoLiberacion.getFplFidBenResponsabilidad();
        String nombreResponsabilidad = procesoLiberacion.getFplNomResponsabilidad();
        String nombreResponsabilidad1 = procesoLiberacion.getFplNumLugarResponsabilidad1();
        String lugarResponsabilidad = procesoLiberacion.getFplNumLugarResponsabilidad();
        String lugarResponsabilidad1 = procesoLiberacion.getFplNumLugarResponsabilidad1();
        String descripcionResponsabilidad =
            representacionPersona(beneficiarioResponsabilidad, nombreResponsabilidad, lugarResponsabilidad,
                                  nombreResponsabilidad1, lugarResponsabilidad1);

        String beneficiarioOtorgamiento = procesoLiberacion.getFplFidBenOtorgamiento();
        String nombreOtorgamiento = procesoLiberacion.getFplNomOtorgamiento();
        String nombreOtorgamiento1 = procesoLiberacion.getFplNumLugarOtorgamiento1();
        String lugarOtorgamiento = procesoLiberacion.getFplNumLugarOtorgamiento();
        String lugarOtorgamiento1 = procesoLiberacion.getFplNumLugarOtorgamiento1();
        String descripcionOtorgamiento =
            representacionPersona(beneficiarioOtorgamiento, nombreOtorgamiento, lugarOtorgamiento, nombreOtorgamiento1,
                                  lugarOtorgamiento1);

        // INMUEBLE

        String nombreEstado = unidadCartaLiberacion.getNomEstado();
        String descripcionInmueble = String.format("UNIDAD CONDOMINAL %s DEL EDIFICIO %s ", pIdDepto, pIdEdificio);
        String delegacionOMunicipio = nombreEstado == "DISTRITO FEDERAL" ? "DELEGACION" : "MUNICIPIO";

        String numCajones = "sin cajón";
        String estacionamiento = "";
        String estacionamiento1 = unidadCartaLiberacion.getEstacionamiento1();
        String estacionamiento2 = unidadCartaLiberacion.getEstacionamiento2();
        String estacionamiento3 = unidadCartaLiberacion.getEstacionamiento3();

        if (estacionamiento1 != "XXXXX") {
            numCajones = "un cajón";
            estacionamiento = estacionamiento1;
        }

        if (estacionamiento2 != "XXXXX") {
            numCajones = "dos cajones";
            estacionamiento += estacionamiento2;
        }

        if (estacionamiento3 != "XXXXX") {
            numCajones = "tres cajones";
            estacionamiento += estacionamiento3;
        }

        // Bajo regimen en condominio

        String descripcionRegimen1 = "";
        String descripcionRegimen2 = "";
        String descripcionRegimen3 = "";
        String roofGarden = unidadCartaLiberacion.getRoofGarden();
        String sotano = unidadCartaLiberacion.getSotano();
        DecimalFormat decimalFormat = new DecimalFormat("###############0.00");
        String indivisoFormateado = decimalFormat.format(unidadCartaLiberacion.getIndiviso());
        String numeroEscritura = unidadCartaLiberacion.getNumEscritura();

        if (unidadCartaLiberacion.getRegimen() == 1) {
            descripcionRegimen1 =
                String.format(" con el derecho de uso exclusivo de %s de estacionamiento número %s", numCajones,
                              estacionamiento);

            if (roofGarden != "XXXXX") {
                descripcionRegimen1 += String.format(" , un roof garden número %s", roofGarden);
            }

            if (sotano != "XXXXX") {
                descripcionRegimen1 += String.format(" y un sótano número %s", sotano);
            }

            descripcionRegimen1 += " sujeto al Régimen de Propiedad en Condominio";

            descripcionRegimen2 =
                String.format(String.join(" , así como los derechos de copropiedad que le corresponden ",
                                          "al mismo %s sobre los elementos comunes o de propiedad indivisa del condominio al que pertenece, ", //
                                          "equivalentes a %s POR CIENTO de indiviso"), tipoInmueble,
                              indivisoFormateado);
            descripcionRegimen3 =
                String.format(String.join(" y demás derechos que le corresponde a dicho '%s de conformidad con ",
                                          "la escritura de Régimen de propiedad en condominio otorgado mediante ",
                                          "escritura número %s"), tipoInmueble, numeroEscritura);
        }

        // DATOS NOTARIO HEADER

        String nombreNotario = "SIN NOTARIO";
        String puestoNotario = null;

        Notarios notario = notariosRepository.findByPK(procesoLiberacion.getFplNotario()); // FIDEICOMITENTE

        if (notario != null) {
            nombreNotario = String.format("LIC. %s", notario.getNotNomNotario());
            puestoNotario =
                String.format("TITULAR DE LA NOTARIA %s DEL %s", notario.getNotNumOficNota(),
                              notario.getNotNomEstado());
        }

        String nombreAdquiriente =
            procesoLiberacion.getFplTercero() == null ? procesoLiberacion.getFplAdquirente() :
            procesoLiberacion.getFplTercero();

        return new CartaLiberacionBienes(pIdFideicomiso, pIdSubcuenta, pIdBien, pIdEdificio, pIdDepto,
                                         empresa.getEmpNomEmpresa(), empresa.getEmpNomArea(), empresa.getEmpDireccion(),
                                         sitioWeb, DateUtils.today(), nombreNotario, puestoNotario,
                                         descripcionBeneficiario, descripcionSaneamiento, descripcionResponsabilidad,
                                         descripcionOtorgamiento, procesoLiberacion.getFplTransmisionReversion(),
                                         procesoLiberacion.getFplParcialTotal(), descripcionInmueble,
                                         unidadCartaLiberacion.getRegimen(), descripcionRegimen1, descripcionRegimen2,
                                         descripcionRegimen3, nombreAdquiriente, unidadCartaLiberacion.getCalle(),
                                         unidadCartaLiberacion.getColonia(), delegacionOMunicipio,
                                         unidadCartaLiberacion.getPoblacion(), unidadCartaLiberacion.getNomEstado(),
                                         tipoInmueble, unidadCartaLiberacion.getIndiviso(),
                                         unidadCartaLiberacion.getNumEscritura(), procesoLiberacion.getFplNomEnvio(),
                                         procesoLiberacion.getFplEmailEnvio(), procesoLiberacion.getFplObservacion(),
                                         procesoLiberacion.getFplDelegado(), pFirma);
    }

    private String representacionPersona(String beneficiario, String nombrePersona, String lugar, String nombrePersona1,
                                         String lugar1) {

        String representacion = "";
        if (beneficiario == "FIDEICOMITENTE" || beneficiario == "FIDEICOMISARIO") {
            representacion += String.format("%s, %s en %s ", nombrePersona, beneficiario, lugar);
        } else if (beneficiario == "COMITE TECNICO") {
            representacion += String.format("%s representado por %s ", beneficiario, nombrePersona);
        } else {
            representacion +=
                String.format("%s, FIDEICOMITENTE en %s y de %s, FIDEICOMISARIO en ", nombrePersona, lugar,
                              nombrePersona1, lugar1);
        }

        return representacion;

    }

    public int generaPagoBienes(BigDecimal pIdFideicomiso, BigDecimal pIdSubcuenta, BigDecimal pIdGarantia,
                                BigDecimal pIdBienGarantia, BigDecimal pIdCobro, BigDecimal pImporte,
                                BigDecimal pNumMoneda, String pFecha, String pComentario, String pOperacionFuncion) {

        try {

            BigDecimal importeMonedaExtranjera = BigDecimal.valueOf(0);
            BigDecimal tipoCambio = BigDecimal.valueOf(1);
            BigDecimal importeContabilidad = pImporte;
            Date fecha = DateUtils.fromString(pFecha);
            String stringNumeroOperacion = "000000000000000";

            BigDecimal numMonedaFideicomiso = anteproyectoRepository.findMonedaPorFideicomiso(pIdFideicomiso);

            if (numMonedaFideicomiso == null) {
                numMonedaFideicomiso = BigDecimal.valueOf(1);
            }

            if (pOperacionFuncion == OperacionesPagoBienes.ALTA.toString()) {
                FPagosBienes pagoBien =
                    pagosBienesRepository.findByPK(pIdFideicomiso, pIdSubcuenta, pIdGarantia, pIdCobro,
                                                   pIdBienGarantia);

                if (pagoBien == null) {
                    throw new BusinessException("El cobro del bien ya existe");
                }

                if (!pNumMoneda.equals(numMonedaFideicomiso)) {

                    // Fideicomiso en moneda nacional, movimiento en extranjera
                    if (!pNumMoneda.equals(1)) {
                        tipoCambio = monedasRepository.getTipoCambioParaMoneda(pNumMoneda, fecha);
                        importeMonedaExtranjera = pImporte.multiply(tipoCambio);

                        // Fideicomiso en moneda extranjera, movimiento en nacional
                    } else {
                        tipoCambio = monedasRepository.getTipoCambioParaMoneda(numMonedaFideicomiso, fecha);
                        importeMonedaExtranjera = pImporte.divide(tipoCambio);
                    }

                    importeContabilidad = importeMonedaExtranjera;
                } else {
                    importeMonedaExtranjera = pImporte;
                    importeContabilidad = pImporte;
                }

                // PAGO
                stringNumeroOperacion = "7000009000";

                pagoBien =
                    new FPagosBienes(pIdFideicomiso, pIdSubcuenta, pIdGarantia, pIdCobro, pIdBienGarantia, pImporte,
                                     pNumMoneda, tipoCambio, importeMonedaExtranjera, fecha, pComentario);

                pagosBienesRepository.insert(pagoBien);

            } else if (pOperacionFuncion == OperacionesPagoBienes.BAJA.toString()) {
                FPagosBienes pagoBien =
                    new FPagosBienes(pIdFideicomiso, pIdSubcuenta, pIdGarantia, pImporte, pIdBienGarantia);
                pagosBienesRepository.delete(pagoBien);

                // CANCELA PAGO
                stringNumeroOperacion = "7000010000";
            }

            BigDecimal folioOperacion = foliosRepository.generaFolio();

            BigDecimal numeroOperacion = toBigDecimal(stringNumeroOperacion);

            boolean contabilidadGenerada =
                generaContabilidad(pIdFideicomiso, pIdSubcuenta, pNumMoneda, fecha, importeContabilidad,
                                   numeroOperacion, folioOperacion, tipoCambio, null, null);

            if (!contabilidadGenerada) {
                throw new BusinessException("Ocurrio un error al generar la contabilidad");
            }

            return 0;

        } catch (Exception e) {
            return 1;
        }
    }

    public void generaPagoMasivoDeBienes(BigDecimal pFolioOperacion) {
        BigDecimal tipoCambio = BigDecimal.valueOf(1);

        List<FRetirosMasivos> retiros = retirosRepository.getRetirosMasivosPorFolio(pFolioOperacion);
        Instrucc instruccion = instruccionesRepository.findInstruccionPorFolioDeOperacion(pFolioOperacion);

        if (retiros.isEmpty() || instruccion == null) {
            return;
        }

        BigDecimal idFideicomiso = instruccion.getInsNumContrato();
        BigDecimal idSubcuenta = instruccion.getInsSubContrato();
        BigDecimal numMonedaFideicomiso = anteproyectoRepository.findMonedaPorFideicomiso(idFideicomiso);
        BigDecimal numMonedaDeposito = depositosRepository.getMonedaDepositoPorFolioDeOperacion(idFideicomiso);

        if (numMonedaDeposito == null) {
            return;
        }

        // TIPO CAMBIO
        Date fecha =
            DateUtils.fromParts(instruccion.getInsDiaAltaReg(), instruccion.getInsMesAltaReg(),
                                instruccion.getInsAnoAltaReg());

        int contador = 1;
        Integer numeroDePagos = 0;
        for (FRetirosMasivos retiro : retiros) {

            // IMPORTES
            BigDecimal importeMonedaExtranjera;
            BigDecimal importe = retiro.getFrmaImporte();
            BigDecimal idGarantia = retiro.getFrmaNumGarantia();
            BigDecimal idBienGarantia = retiro.getFrmaNumBienGar();


            if (!numMonedaDeposito.equals(numMonedaFideicomiso)) {
                if (numMonedaDeposito.intValue() != 1) {
                    tipoCambio = monedasRepository.getTipoCambioParaMoneda(numMonedaDeposito, fecha);
                    importeMonedaExtranjera = importe.multiply(tipoCambio);
                } else {
                    tipoCambio = monedasRepository.getTipoCambioParaMoneda(numMonedaFideicomiso, fecha);
                    importeMonedaExtranjera = importe.divide(tipoCambio);
                }

            } else {
                importeMonedaExtranjera = importe;
                tipoCambio = BigDecimal.valueOf(1);
            }

            if (contador == 1) {
                numeroDePagos =
                    pagosBienesRepository.getNumeroDePagos(idFideicomiso, idSubcuenta, idGarantia, idBienGarantia);
            }

            BigDecimal idCobro = BigDecimal.valueOf(numeroDePagos).add(retiro.getFrmaSecuencial());

            FPagosBienes pagoBien =
                pagosBienesRepository.findByPK(idFideicomiso, idSubcuenta, idGarantia, idCobro, idBienGarantia);

            if (pagoBien == null) {
                pagoBien = new FPagosBienes(idFideicomiso, idSubcuenta, idGarantia, idCobro, idBienGarantia);
                pagoBien.setFpbImporte(importe);
                pagoBien.setFpbCveMoneda(numMonedaDeposito);
                pagoBien.setFpbTipoCambio(tipoCambio);
                pagoBien.setFpbImporteExt(importeMonedaExtranjera);
                pagoBien.setFpbFecha(fecha);

                pagosBienesRepository.insert(pagoBien);
            }

            contador += 1;

        }

    }

    public void generaPagoGarantias(BigDecimal pFolioOperacion) {
        BigDecimal tipoCambio = BigDecimal.valueOf(1);

        List<FRetirosMasivos> retiros = retirosRepository.getRetirosMasivosPorFolio(pFolioOperacion);
        Instrucc instruccion = instruccionesRepository.findInstruccionPorFolioDeOperacion(pFolioOperacion);

        if (retiros.isEmpty() || instruccion == null) {
            return;
        }

        BigDecimal idFideicomiso = instruccion.getInsNumContrato();
        BigDecimal idSubcuenta = instruccion.getInsSubContrato();
        BigDecimal numMonedaFideicomiso = anteproyectoRepository.findMonedaPorFideicomiso(idFideicomiso);
        BigDecimal numMonedaMovimiento = detliquiRepository.getMonedaDepositoPorFolioDeOperacion(idFideicomiso);


        // TIPO CAMBIO
        Date fecha =
            DateUtils.fromParts(instruccion.getInsDiaAltaReg(), instruccion.getInsMesAltaReg(),
                                instruccion.getInsAnoAltaReg());

        int contador = 1;
        Integer numeroDePagos = 0;
        for (FRetirosMasivos retiroMasivo : retiros) {

            // IMPORTES
            BigDecimal importeMonedaExtranjera;
            BigDecimal importe = retiroMasivo.getFrmaImporte();
            BigDecimal idGarantia = retiroMasivo.getFrmaNumGarantia();
            BigDecimal idBienGarantia = retiroMasivo.getFrmaNumBienGar();
            BigDecimal afectaGarantia = retiroMasivo.getFrmaAfectaGarantia();
            BigDecimal tipoPersona = retiroMasivo.getFrmaTipoPersona();
            BigDecimal numeroPersona = retiroMasivo.getFrmaNumPersona();


            if (!numMonedaMovimiento.equals(numMonedaFideicomiso)) {
                if (numMonedaMovimiento.intValue() != 1) {
                    tipoCambio = monedasRepository.getTipoCambioParaMoneda(numMonedaMovimiento, fecha);
                    importeMonedaExtranjera = importe.multiply(tipoCambio);
                } else {
                    tipoCambio = monedasRepository.getTipoCambioParaMoneda(numMonedaFideicomiso, fecha);
                    importeMonedaExtranjera = importe.divide(tipoCambio);
                }

            } else {
                importeMonedaExtranjera = importe;
                tipoCambio = BigDecimal.valueOf(1);
            }


            FBienesgar bienGarantia = bienesGarantiasRepository.findByPk(idFideicomiso, idSubcuenta, idBienGarantia);


            if (afectaGarantia.intValue() != 2) {
                generaGarantias(6, idFideicomiso, idSubcuenta, idBienGarantia, idGarantia,
                                bienGarantia.getForsCveTipoBien(), "", "", "", importe, numMonedaMovimiento,
                                BigDecimal.valueOf(0), "", BigDecimal.valueOf(0), "", "", "", "", BigDecimal.valueOf(0),
                                DateUtils.toString(fecha), BigDecimal.valueOf(0));
            }

            FRetiro retiro = retirosRepository.findByPK(retiroMasivo.getFrmaFolio());

            // REGISTRO PAGO GARANTIAS

            BigDecimal folioOperacion = foliosRepository.generaFolio();
            BigDecimal numeroOperacion =
                creaNumeroOperacion("%d%01d%02d%02d%02d60", 3, retiroMasivo.getFrmaTipoPersona(),
                                    retiro.getFretTipoLiquidacion(), retiro.getFretConcepto(), numMonedaMovimiento);

            generaContabilidad(idFideicomiso, idSubcuenta, numMonedaMovimiento, fecha, importe, numeroOperacion,
                               folioOperacion, tipoCambio, tipoPersona, numeroPersona);


            if (contador == 1) {
                numeroDePagos =
                    liquidacionesBienesRepository.getNumeroDePagos(idFideicomiso, idSubcuenta, idGarantia,
                                                                   idBienGarantia);
            }

            BigDecimal idCobro = BigDecimal.valueOf(numeroDePagos).add(retiroMasivo.getFrmaSecuencial());

            FLiquidacionesBienes liquidacionBien =
                liquidacionesBienesRepository.findByPK(idFideicomiso, idSubcuenta, idGarantia, idBienGarantia, idCobro);

            if (liquidacionBien == null) {
                liquidacionBien =
                    new FLiquidacionesBienes(idFideicomiso, idSubcuenta, idGarantia, idBienGarantia, idCobro);
                liquidacionBien.setFlbImporte(importe);
                liquidacionBien.setFlbCveMoneda(numMonedaMovimiento);
                liquidacionBien.setFlbTipoCambio(tipoCambio);
                liquidacionBien.setFlbImporteExt(importeMonedaExtranjera);
                liquidacionBien.setFlbFecha(fecha);
                liquidacionBien.setFlbComentario("");
                liquidacionBien.setFlbAfecta(afectaGarantia);

                liquidacionesBienesRepository.insert(liquidacionBien);
            }

            contador += 1;

        }

    }

    public int procesoLiberacion(BigDecimal pIdFideicomiso, BigDecimal pIdSubcuenta, String pIdBien, String pIdEdificio,
                                 String pIdDepto, BigDecimal pIdNotario, String pAdquiriente, String pTercero,
                                 String pBeneficiarioFideicomiso, String pNombrePersona, String pNombreLugar,
                                 String pNombrePersona1, String pNombreLugar1, String pBeneficiarioSaneamiento,
                                 String pNombreSaneamiento, String pLugarSaneamiento, String pNombreSaneamiento1,
                                 String pLugarSaneamiento1, String pBeneficiarioResponsabilidad,
                                 String pNombreResponsabilidad, String pLugarResponsabilidad,
                                 String pNombreResponsabilidad1, String pLugarResponsabilidad1,
                                 String pBeneficiarioOtorgamiento, String pNombreOtorgamiento,
                                 String pLugarOtorgamiento, String pNombreOtorgamiento1, String pLugarOtorgamiento1,
                                 String pTransmisionReversion, String pParcialTotal, BigDecimal pSujetoRegimen,
                                 String pTipoInmueble, String nombreEnvio, String emailEnvio, String pObservacion,
                                 String pEscritura, String pFechaEscritura, String pDelegado, String pFechaFirma, String pClaveEstatus)

        {

        try {

            Date fechaEscritura = pFechaEscritura == null ? null : DateUtils.fromString(pFechaEscritura);
            Date fechaFirma = pFechaFirma == null ? null : DateUtils.fromString(pFechaFirma);

            FProcesoLiberacion procesoLiberacion =
                procesoLiberacionRepository.findByPK(pIdFideicomiso, pIdSubcuenta, pIdBien, pIdEdificio, pIdDepto);

            if (procesoLiberacion != null) {

                procesoLiberacion.setFplNotario(pIdNotario);
                procesoLiberacion.setFplAdquirente(pAdquiriente);
                procesoLiberacion.setFplTercero(pTercero);
                procesoLiberacion.setFplFideicomBenefici(pBeneficiarioFideicomiso);
                procesoLiberacion.setFplNomPersona(pNombrePersona);
                procesoLiberacion.setFplNumLugar(pNombreLugar);
                procesoLiberacion.setFplNomPersona1(pNombrePersona1);
                procesoLiberacion.setFplNumLugar1(pNombreLugar1);
                procesoLiberacion.setFplFidBenSaneamiento(pBeneficiarioSaneamiento);
                procesoLiberacion.setFplNomSaneamiento(pNombreSaneamiento);
                procesoLiberacion.setFplNumLugarSaneamiento(pLugarSaneamiento);
                procesoLiberacion.setFplNomSaneamiento1(pNombreSaneamiento1);
                procesoLiberacion.setFplNumLugarSaneamiento1(pLugarSaneamiento1);
                procesoLiberacion.setFplFidBenResponsabilidad(pBeneficiarioResponsabilidad);
                procesoLiberacion.setFplNomResponsabilidad(pNombreResponsabilidad);
                procesoLiberacion.setFplNumLugarResponsabilidad(pLugarResponsabilidad);
                procesoLiberacion.setFplNomResponsabilidad1(pNombreResponsabilidad1);
                procesoLiberacion.setFplNumLugarResponsabilidad1(pLugarResponsabilidad1);
                procesoLiberacion.setFplFidBenOtorgamiento(pBeneficiarioOtorgamiento);
                procesoLiberacion.setFplNomOtorgamiento(pNombreOtorgamiento);
                procesoLiberacion.setFplNumLugarOtorgamiento(pLugarOtorgamiento);
                procesoLiberacion.setFplNomOtorgamiento1(pNombreOtorgamiento1);
                procesoLiberacion.setFplNumLugarOtorgamiento1(pLugarOtorgamiento1);
                procesoLiberacion.setFplTransmisionReversion(pTransmisionReversion);
                procesoLiberacion.setFplTransmisionReversion(pTransmisionReversion);
                procesoLiberacion.setFplParcialTotal(pParcialTotal);
                procesoLiberacion.setFplSujetoRegimen(pSujetoRegimen);
                procesoLiberacion.setFplTipoInmueble(pTipoInmueble);
                procesoLiberacion.setFplNomEnvio(nombreEnvio);
                procesoLiberacion.setFplEmailEnvio(emailEnvio);
                procesoLiberacion.setFplObservacion(pObservacion);
                procesoLiberacion.setFplEscritura(pEscritura);
                procesoLiberacion.setFplFecEscritura(fechaEscritura);
                procesoLiberacion.setFplDelegado(pDelegado);
                procesoLiberacion.setFplFecFirma(fechaFirma);
                procesoLiberacion.setFplCveStatus(pClaveEstatus);

                procesoLiberacionRepository.update(procesoLiberacion);

            } else {

                procesoLiberacion =
                    new FProcesoLiberacion(pIdFideicomiso, pIdSubcuenta, pIdBien, pIdEdificio, pIdDepto);

                procesoLiberacion.setFplNotario(pIdNotario);
                procesoLiberacion.setFplAdquirente(pAdquiriente);
                procesoLiberacion.setFplTercero(pTercero);
                procesoLiberacion.setFplFideicomBenefici(pBeneficiarioFideicomiso);
                procesoLiberacion.setFplNomPersona(pNombrePersona);
                procesoLiberacion.setFplNumLugar(pNombreLugar);
                procesoLiberacion.setFplNomPersona1(pNombrePersona1);
                procesoLiberacion.setFplNumLugar1(pNombreLugar1);
                procesoLiberacion.setFplFidBenSaneamiento(pBeneficiarioSaneamiento);
                procesoLiberacion.setFplNomSaneamiento(pNombreSaneamiento);
                procesoLiberacion.setFplNumLugarSaneamiento(pLugarSaneamiento);
                procesoLiberacion.setFplNomSaneamiento1(pNombreSaneamiento1);
                procesoLiberacion.setFplNumLugarSaneamiento1(pLugarSaneamiento1);
                procesoLiberacion.setFplFidBenResponsabilidad(pBeneficiarioResponsabilidad);
                procesoLiberacion.setFplNomResponsabilidad(pNombreResponsabilidad);
                procesoLiberacion.setFplNumLugarResponsabilidad(pLugarResponsabilidad);
                procesoLiberacion.setFplNomResponsabilidad1(pNombreResponsabilidad1);
                procesoLiberacion.setFplNumLugarResponsabilidad1(pLugarResponsabilidad1);
                procesoLiberacion.setFplFidBenOtorgamiento(pBeneficiarioOtorgamiento);
                procesoLiberacion.setFplNomOtorgamiento(pNombreOtorgamiento);
                procesoLiberacion.setFplNumLugarOtorgamiento(pLugarOtorgamiento);
                procesoLiberacion.setFplNomOtorgamiento1(pNombreOtorgamiento1);
                procesoLiberacion.setFplNumLugarOtorgamiento1(pLugarOtorgamiento1);
                procesoLiberacion.setFplTransmisionReversion(pTransmisionReversion);
                procesoLiberacion.setFplTransmisionReversion(pTransmisionReversion);
                procesoLiberacion.setFplParcialTotal(pParcialTotal);
                procesoLiberacion.setFplSujetoRegimen(pSujetoRegimen);
                procesoLiberacion.setFplTipoInmueble(pTipoInmueble);
                procesoLiberacion.setFplNomEnvio(nombreEnvio);
                procesoLiberacion.setFplEmailEnvio(emailEnvio);
                procesoLiberacion.setFplObservacion(pObservacion);
                procesoLiberacion.setFplEscritura(pEscritura);
                procesoLiberacion.setFplFecEscritura(fechaEscritura);
                procesoLiberacion.setFplDelegado(pDelegado);
                procesoLiberacion.setFplFecFirma(fechaFirma);
                procesoLiberacion.setFplCveStatus(pClaveEstatus);

                procesoLiberacionRepository.insert(procesoLiberacion);
            }

            FUnidades unidad = unidadRepository.findByPk(pIdFideicomiso, pIdSubcuenta, pIdBien, pIdDepto);
            unidad.setFuniStatus(pClaveEstatus);

            unidadRepository.update(unidad);

            // SE INCORPORA LA CONTABILIDAD CUANDO ESTA LIBERADO EL BIEN

            if (pClaveEstatus == EstatusGarantias.LIBERADO.toString()) {

                // TODO: Verificar que el tipo de dato sea correcto
                BigDecimal idBien = toBigDecimal(pIdBien);

                // SE RECUPERA LA MONEDA Y TIPO DE BIEN
                FBienesgar bienGarantia = bienesGarantiasRepository.findByPk(pIdFideicomiso, pIdSubcuenta, idBien);
                BigDecimal idMonedaBien = bienGarantia.getForsMoneda();
                BigDecimal idTipoBien = bienGarantia.getForsCveTipoBien();
                BigDecimal idTipoGarantia = bienGarantia.getForsCveTipoGarantia();


                // SE RECUPERA EL PRECIO CONTABLE DE LA UNIDAD (IMPORTE)
                BigDecimal importe = unidad.getFuniPrecio();
                BigDecimal folioOperacion = foliosRepository.generaFolio();

                // SALIDA
                Date fechaActual = DateUtils.today();
                BigDecimal numeroOperacion =
                    creaNumeroOperacion("%d%02d%02d02%02d0", 6, idTipoGarantia, idTipoBien, idMonedaBien);

                boolean contabilidadGenerada =
                    generaContabilidad(pIdFideicomiso, pIdSubcuenta, idMonedaBien, fechaActual, importe,
                                       numeroOperacion, folioOperacion, BigDecimal.valueOf(1), null, null);

                if (!contabilidadGenerada) {
                    throw new BusinessException("Ocurrio un error al generar la contabilidad");
                }

                // SE REALIZA LA DISMINUCION DEL BIEN

                bienGarantia.setForsImpBien(bienGarantia.getForsImpBien().subtract(importe));
                bienGarantia.setForsImpUltValua(bienGarantia.getForsImpUltValua().subtract(importe));

                bienesGarantiasRepository.save(bienGarantia);

                // SE REALIZA LA DISMINUCION DEL BIEN GARANTIZADO EN LA GARANTIA

                FGarantias garantia = garantiasRepository.findByPk(pIdFideicomiso, pIdSubcuenta, idTipoGarantia);
                garantia.setFgarImpGarantizad(garantia.getFgarImpGarantizad().subtract(importe));

                garantiasRepository.save(garantia);

            } else if (pClaveEstatus == EstatusGarantias.COMPROMETIDO.toString()) {
                procesoLiberacion =
                    new FProcesoLiberacion(pIdFideicomiso, pIdSubcuenta, pIdBien, pIdEdificio, pIdDepto);
                procesoLiberacionRepository.delete(procesoLiberacion);
            }

            return 0;
        } catch (Exception e) {
            return 1;
        }
    }


    public boolean generaContabilidad(BigDecimal pIdFideicomiso, BigDecimal pIdSubcuenta, BigDecimal pMoneda,
                                      Date pFechaInicio, BigDecimal pImporte, BigDecimal pNumeroOperacion,
                                      BigDecimal pFolioOperacion, BigDecimal pIdTipoCambio, BigDecimal pIdTipoPersona,
                                      BigDecimal pIdPersona) {

        // TODO: implementar metodo y recibir patametro del tipo de elemento que se esta registrando
        return true;
    }

    private BigDecimal toBigDecimal(String numeroOperacion) {
        return BigDecimal.valueOf(Integer.valueOf(numeroOperacion));
    }

    private BigDecimal creaNumeroOperacion(String format, Object... args) {
        return toBigDecimal(String.format(format, args));
    }
}

