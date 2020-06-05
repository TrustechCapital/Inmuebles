package mx.com.inscitech.fiducia.negocio.bienes;

import java.math.BigDecimal;

import java.util.Date;

import mx.com.inscitech.fiducia.common.ProceadureData;
import mx.com.inscitech.fiducia.common.util.DateUtils;
import mx.com.inscitech.fiducia.domain.FBienesgar;
import mx.com.inscitech.fiducia.domain.FGarantias;
import mx.com.inscitech.fiducia.negocio.exceptions.BusinessException;
import mx.com.inscitech.fiducia.repository.DetalleBienesRepository;
import mx.com.inscitech.fiducia.repository.FoliosRepository;
import mx.com.inscitech.fiducia.repository.GarantiasRepository;

public class OperacionesDetalleBienes {

    private FoliosRepository foliosRepository;
    private GarantiasRepository garantiasRepository;
    private DetalleBienesRepository detalleBienesRepository;

    public OperacionesDetalleBienes() {
        this.foliosRepository = new FoliosRepository();
        this.garantiasRepository = new GarantiasRepository();
        this.detalleBienesRepository = new DetalleBienesRepository();
    }

    @ProceadureData(id = "funEjecutaOperacionDetalleBienes",
                    fields = { "tipoOperacion", "detalleBien", "importeValuacion", "fechaValuacion"
        })
    public Integer ejecutaOperacionDetalleBienes(Integer pTipoOperacion, FBienesgar pDetalleBien, BigDecimal pValuacion,
                                                 String pFechaValuacion) throws BusinessException {

        BigDecimal pIdFideicomiso = pDetalleBien.getFgrsIdFideicomiso();
        BigDecimal pIdSubcuenta = pDetalleBien.getFgrsIdSubcuenta();
        BigDecimal pIdDetalleBien = pDetalleBien.getForsIdGarantia();
        BigDecimal pIdTipoBien = pDetalleBien.getForsCveTipoGarantia();
        BigDecimal pIdTipoDetalleBien = pDetalleBien.getForsCveTipoBien();

        BigDecimal importe = pDetalleBien.getForsImpBien();
        BigDecimal moneda = pDetalleBien.getForsMoneda();
        BigDecimal importeUltimaValuacion = pDetalleBien.getForsImpUltValua();

        try {

            if (pTipoOperacion == Constants.TiposOperacionesGarantias
                                           .MODIFICACION_DE_GARANTIA
                                           .getValue()) {

                FBienesgar detalleBien = detalleBienesRepository.findByPk(pIdFideicomiso, pIdSubcuenta, pIdDetalleBien);
                detalleBien.setForsIdentificacion(pDetalleBien.getForsIdentificacion());
                detalleBien.setForsTextoDescrip(pDetalleBien.getForsTextoDescrip());
                detalleBien.setForsTexComentario(pDetalleBien.getForsTexComentario());
                detalleBien.setForsCveRevalua(pDetalleBien.getForsCveRevalua());
                detalleBien.setForsCvePerValua(pDetalleBien.getForsCvePerValua());
                detalleBien.setForsNumEscritura(pDetalleBien.getForsNumEscritura());
                detalleBien.setForsNumNotario(pDetalleBien.getForsNumNotario());
                detalleBien.setForsRegimen(pDetalleBien.getForsRegimen());
                detalleBien.setForsImpBien(pDetalleBien.getForsImpBien());

                detalleBienesRepository.save(detalleBien);
                return null;

            }

            // TODO: Encontrar un mejor nombre
            int vTipoOperacion;
            BigDecimal idTipoCambio = BigDecimal.valueOf(1);
            Date fechaValuacion = DateUtils.fromString(pFechaValuacion);
            BigDecimal folioOperacion = foliosRepository.generaFolio();
            BigDecimal nImporte = importeUltimaValuacion;
            BigDecimal valuacion = pValuacion;
            BigDecimal diferencia = BigDecimal.valueOf(0);
            Constants.SubtiposTransaccionesGarantias tipoTransaccion;
            FBienesgar detalleBien = new FBienesgar();

            FGarantias bien = garantiasRepository.findByPk(pIdFideicomiso, pIdSubcuenta, pIdTipoBien);

            if (pTipoOperacion == Constants.TiposOperacionesGarantias
                                           .ENTRADA_EN_GARANTIA
                                           .getValue()) {
                vTipoOperacion = 1;
                tipoTransaccion = Constants.SubtiposTransaccionesGarantias.ENTRADA;
            } else {
                detalleBien = detalleBienesRepository.findByPk(pIdFideicomiso, pIdSubcuenta, pIdDetalleBien);

                // Se actualizan parametros que podrian venir nulos (para SALIDA solo se recibe la PK en vez del modelo completo)
                importe = detalleBien.getForsImpBien();
                moneda = detalleBien.getForsMoneda();
                importeUltimaValuacion = detalleBien.getForsImpUltValua();

                if (pTipoOperacion == Constants.TiposOperacionesGarantias
                                               .REVALUACION_DE_GARANTIA
                                               .getValue()) {

                    // TODO: Verificar si este dato se usa, de lo contrario, mover la consulta a detalleBien mas abajo y quitar esta linea
                    valuacion = detalleBien.getForsImpUltValua();
                    diferencia = pValuacion.subtract(importeUltimaValuacion);

                    if (diferencia.intValue() > 0) {
                        vTipoOperacion = 2;
                        nImporte = diferencia;
                        tipoTransaccion = Constants.SubtiposTransaccionesGarantias.REVALUACION_ALTA;
                    } else {
                        vTipoOperacion = 3;
                        nImporte = diferencia.negate();
                        tipoTransaccion = Constants.SubtiposTransaccionesGarantias.REVALUACION_BAJA;
                    }

                } else if (pTipoOperacion == Constants.TiposOperacionesGarantias
                                                      .PAGO_PARCIAL_DE_GARANTIA
                                                      .getValue()) {
                    vTipoOperacion = 2;
                    //TODO: Aplicar un tipo de transaccion valido
                    tipoTransaccion = Constants.SubtiposTransaccionesGarantias.DESCONOCIDO;
                } else {
                    vTipoOperacion = 4;
                    tipoTransaccion = Constants.SubtiposTransaccionesGarantias.SALIDA;
                    nImporte = importeUltimaValuacion;
                }
            }

            BigDecimal esGarantia = bien.getFgarEsGarantia() == null ? BigDecimal.valueOf(0) : bien.getFgarEsGarantia();
            int tipoOperacionGarantias = Constants.TiposOperaciones
                                                  .BIENES_GARANTIAS
                                                  .getValue();
            BigDecimal numeroOperacion =
                Utils.creaNumeroOperacion("%d%02d%01d%02d%02d%01d000", tipoOperacionGarantias,
                                          tipoTransaccion.getValue(), pIdTipoBien, pIdTipoDetalleBien, moneda,
                                          esGarantia);

            if (pTipoOperacion != Constants.TiposOperacionesGarantias
                                           .REVALUACION_DE_GARANTIA
                                           .getValue()) {
                if (pTipoOperacion == Constants.TiposOperacionesGarantias
                                               .SALIDA_DE_BIEN_EN_GARANTIA
                                               .getValue()) {
                    nImporte = importeUltimaValuacion;
                } else {
                    nImporte = importe;
                }
            }

            boolean contabilidadGenerada =
                Utils.generaContabilidad(pIdFideicomiso, pIdSubcuenta, moneda, fechaValuacion, nImporte,
                                         numeroOperacion, folioOperacion, idTipoCambio, null, null);

            if (!contabilidadGenerada) {
                throw new BusinessException("Ocurrio un error al generar la contabilidad");
            }

            if (pTipoOperacion == Constants.TiposOperacionesGarantias
                                           .ENTRADA_EN_GARANTIA
                                           .getValue()) {

                detalleBien = new FBienesgar(pIdFideicomiso, pIdSubcuenta, null);

                detalleBien.setForsCveTipoGarantia(pIdTipoBien);
                detalleBien.setForsCveTipoBien(pIdTipoDetalleBien);
                detalleBien.setForsIdentificacion(pDetalleBien.getForsIdentificacion());
                detalleBien.setForsTextoDescrip(pDetalleBien.getForsTextoDescrip());
                detalleBien.setForsTexComentario(pDetalleBien.getForsTexComentario());
                detalleBien.setForsImpBien(pDetalleBien.getForsImpBien());
                detalleBien.setForsMoneda(moneda);
                detalleBien.setForsCveRevalua(pDetalleBien.getForsCveRevalua());
                detalleBien.setForsCvePerValua(pDetalleBien.getForsCvePerValua());
                detalleBien.setForsImpUltValua(importe);
                detalleBien.setForsFecUltValua(pDetalleBien.getForsFecUltValua());
                detalleBien.setForsFecVencimiento(pDetalleBien.getForsFecVencimiento());
                detalleBien.setForsNumEscritura(pDetalleBien.getForsNumEscritura());
                detalleBien.setForsNumNotario(pDetalleBien.getForsNumNotario());
                detalleBien.setForsCveStatus(Constants.EstatusBienesGarantias
                                                      .ACTIVO
                                                      .toString());
                detalleBien.setForsRegimen(pDetalleBien.getForsRegimen());

                Integer newIdDetalleBien = detalleBienesRepository.insert(detalleBien);

                BigDecimal nuevoImporteGarantizado = bien.getFgarImpGarantizad();

                if (nuevoImporteGarantizado == null) {
                    nuevoImporteGarantizado = importe;
                } else {
                    nuevoImporteGarantizado = nuevoImporteGarantizado.add(importe);
                }

                bien.setFgarImpGarantizad(nuevoImporteGarantizado);

                garantiasRepository.save(bien);
                return newIdDetalleBien;
            }

            if (pTipoOperacion == Constants.TiposOperacionesGarantias
                                           .REVALUACION_DE_GARANTIA
                                           .getValue()) {

                detalleBien.setForsImpUltValua(pValuacion);
                detalleBien.setForsFecUltValua(pFechaValuacion);

                detalleBienesRepository.save(detalleBien);

                BigDecimal nuevoImporteGarantizado = bien.getFgarImpGarantizad().add(diferencia);
                bien.setFgarImpGarantizad(nuevoImporteGarantizado);

                garantiasRepository.save(bien);
                return null;
            }

            if (pTipoOperacion == Constants.TiposOperacionesGarantias
                                           .SALIDA_DE_BIEN_EN_GARANTIA
                                           .getValue()) {

                detalleBien = new FBienesgar(pIdFideicomiso, pIdSubcuenta, pIdDetalleBien);

                detalleBienesRepository.delete(detalleBien);

                BigDecimal nuevoImporteGarantizado = bien.getFgarImpGarantizad().subtract(importeUltimaValuacion);
                bien.setFgarImpGarantizad(nuevoImporteGarantizado);

                garantiasRepository.save(bien);
                return null;
            }

            if (pTipoOperacion == Constants.TiposOperacionesGarantias
                                           .PAGO_PARCIAL_DE_GARANTIA
                                           .getValue()) {
                BigDecimal nuevoImporteGarantizado = bien.getFgarImpGarantizad().subtract(importe);
                bien.setFgarImpGarantizad(nuevoImporteGarantizado);

                garantiasRepository.save(bien);
                return null;
            }

            return null;

        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException("Ocurrio un error al procesar el detalle de bien");
        }

    }
}

