package mx.com.inscitech.fiducia.negocio.bienes;

import java.math.BigDecimal;

import java.text.DecimalFormat;

import java.util.Date;
import java.util.List;

import mx.com.inscitech.fiducia.common.ProceadureData;
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
import mx.com.inscitech.fiducia.models.UnidadesCartaLiberacionBienesRow;
import mx.com.inscitech.fiducia.negocio.exceptions.BusinessException;
import mx.com.inscitech.fiducia.repository.AdquirienteRepository;
import mx.com.inscitech.fiducia.repository.AnteproyectoRepository;
import mx.com.inscitech.fiducia.repository.BienesRepository;
import mx.com.inscitech.fiducia.repository.ClavesRepository;
import mx.com.inscitech.fiducia.repository.DepositosRepository;
import mx.com.inscitech.fiducia.repository.DetalleBienesRepository;
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

public class OperacionesBienes {

    private AdquirienteRepository adquirienteRepository;
    private UnidadRepository unidadRepository;
    private GarantiasRepository garantiasRepository;
    private BienesRepository bienesRepository;
    private FoliosRepository foliosRepository;
    private ClavesRepository clavesRepository;
    private DetalleBienesRepository bienesGarantiasRepository;
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

    public OperacionesBienes() {

    }

    public OperacionesBienes(AdquirienteRepository adquirienteRepository, UnidadRepository unidadRepository,
                             GarantiasRepository garantiasRepository, BienesRepository bienesRepository,
                             FoliosRepository foliosRepository, ClavesRepository clavesRepository,
                             DetalleBienesRepository bienesGarantiasRepository, EmpresasRepository empresasRepository,
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
            adquiriente.setFadqStatus(Constants.EstatusGarantias
                                               .LIBERADO
                                               .toString());

            adquirienteRepository.save(adquiriente);

            FUnidades unidad = unidadRepository.findByPk(idFideicomiso, idSubcuenta, idBien, depto);

            unidad.setFuniNotario(idNotario);
            unidad.setFuniLocalidadNota(localidad);
            unidad.setFuniNumEscritura(escritura);
            unidad.setFuniFolioReal(folioReal);
            unidad.setFuniFechaTrasladoDominio(fechaTrasladoDominio);
            unidad.setFuniStatus(Constants.EstatusGarantias
                                          .LIBERADO
                                          .toString());

            unidadRepository.update(unidad);

        }
    }

    @ProceadureData(id = "ejeFunModificacionGarantia", fields = { "numFiso", "numScta", "numIdGarantia" })
    public void transformaGarantias(BigDecimal idFideicomiso, BigDecimal idSubcuenta, BigDecimal idTipoBien) {
        // TODO: Debe de arrojar una excepcion pues de momento el controller no soporta objetos de retorno y es necesario saber si se ejecuto bien o no el contenido
        List<FGarantias> garantias = garantiasRepository.findByFideicomisoYSubcuenta(idFideicomiso, idSubcuenta);

        for (FGarantias garantia : garantias) {
            garantiasRepository.saveForHistory(garantia);

            // TODO: Esto va a tronar porque la llave primaria de la tabla es: "FGAR_ID_FIDEICOMISO", "FGAR_ID_SUBCUENTA", "FGAR_CVE_GARANTIA"
            garantia.setFgarCveGarantia(idTipoBien);
            garantiasRepository.save(garantia);
        }
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
                Utils.creaNumeroOperacion("%d%02d%02d%02d%02d0", Constants.TiposOperaciones
                                                                                                   .BIENES
                                                                                                   .getValue(),
                                          pIdTipoBien, clasBien, vTipoOperacion, pMoneda);

            boolean contabilidadGenerada =
                Utils.generaContabilidad(pIdFideicomiso, pIdSubcuenta, pMoneda, fechaInicio, pImporte, numeroOperacion,
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

            if (pOperacionFuncion == Constants.OperacionesPagoBienes
                                              .ALTA
                                              .toString()) {
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

            } else if (pOperacionFuncion == Constants.OperacionesPagoBienes
                                                     .BAJA
                                                     .toString()) {
                FPagosBienes pagoBien =
                    new FPagosBienes(pIdFideicomiso, pIdSubcuenta, pIdGarantia, pImporte, pIdBienGarantia);
                pagosBienesRepository.delete(pagoBien);

                // CANCELA PAGO
                stringNumeroOperacion = "7000010000";
            }

            BigDecimal folioOperacion = foliosRepository.generaFolio();

            BigDecimal numeroOperacion = Utils.toBigDecimal(stringNumeroOperacion);

            boolean contabilidadGenerada =
                Utils.generaContabilidad(pIdFideicomiso, pIdSubcuenta, pNumMoneda, fecha, importeContabilidad,
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

    public void generaPagoGarantias(BigDecimal pFolioOperacion) throws BusinessException {
        BigDecimal tipoCambio = BigDecimal.valueOf(1);
        OperacionesDetalleBienes operacionesDetalleBienes = new OperacionesDetalleBienes();

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

            /*
            if (afectaGarantia.intValue() != 2) {
                operacionesDetalleBienes.ejecutaOperacionDetalleBienes(6, idFideicomiso, idSubcuenta, idBienGarantia,
                                                                       idGarantia, bienGarantia.getForsCveTipoBien(),
                                                                       "", "", "", importe, numMonedaMovimiento,
                                                                       BigDecimal.valueOf(0), "", BigDecimal.valueOf(0),
                                                                       "", "", "", "", BigDecimal.valueOf(0),
                                                                       DateUtils.toString(fecha),
                                                                       BigDecimal.valueOf(0));
            }*/

            FRetiro retiro = retirosRepository.findByPK(retiroMasivo.getFrmaFolio());

            // REGISTRO PAGO GARANTIAS

            BigDecimal folioOperacion = foliosRepository.generaFolio();
            BigDecimal numeroOperacion =
                Utils.creaNumeroOperacion("%d%01d%02d%02d%02d60", 3, retiroMasivo.getFrmaTipoPersona(),
                                          retiro.getFretTipoLiquidacion(), retiro.getFretConcepto(),
                                          numMonedaMovimiento);

            Utils.generaContabilidad(idFideicomiso, idSubcuenta, numMonedaMovimiento, fecha, importe, numeroOperacion,
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

            if (pClaveEstatus == Constants.EstatusGarantias
                                          .LIBERADO
                                          .toString()) {

                // TODO: Verificar que el tipo de dato sea correcto
                BigDecimal idBien = Utils.toBigDecimal(pIdBien);

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
                    Utils.creaNumeroOperacion("%d%02d%02d02%02d0", 6, idTipoGarantia, idTipoBien, idMonedaBien);

                boolean contabilidadGenerada =
                    Utils.generaContabilidad(pIdFideicomiso, pIdSubcuenta, idMonedaBien, fechaActual, importe,
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

            } else if (pClaveEstatus == Constants.EstatusGarantias
                                                 .COMPROMETIDO
                                                 .toString()) {
                procesoLiberacion =
                    new FProcesoLiberacion(pIdFideicomiso, pIdSubcuenta, pIdBien, pIdEdificio, pIdDepto);
                procesoLiberacionRepository.delete(procesoLiberacion);
            }

            return 0;
        } catch (Exception e) {
            return 1;
        }
    }
}

