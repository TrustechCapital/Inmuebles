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

            if (pTipoOperacion == Constants.TiposOperacionesDetalleBien
                                           .MODIFICACION
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
            BigDecimal nImporte = importeUltimaValuacion;
            BigDecimal valuacion = pValuacion;
            BigDecimal diferencia = BigDecimal.valueOf(0);
            Constants.TiposTransaccionesBienes tipoTransaccion;
            FBienesgar detalleBien = new FBienesgar();

            FGarantias bien = garantiasRepository.findByPk(pIdFideicomiso, pIdSubcuenta, pIdTipoBien);

            if (pTipoOperacion == Constants.TiposOperacionesDetalleBien
                                           .ENTRADA
                                           .getValue()) {
                tipoTransaccion = Constants.TiposTransaccionesBienes.ENTRADA;
                nImporte = importe;
            } else {
                detalleBien = detalleBienesRepository.findByPk(pIdFideicomiso, pIdSubcuenta, pIdDetalleBien);

                // Se actualizan parametros que podrian venir nulos (para SALIDA solo se recibe la PK en vez del modelo completo)
                importe = detalleBien.getForsImpBien();
                moneda = detalleBien.getForsMoneda();
                importeUltimaValuacion = detalleBien.getForsImpUltValua();

                if (pTipoOperacion == Constants.TiposOperacionesDetalleBien
                                               .REVALUACION
                                               .getValue()) {

                    diferencia = pValuacion.subtract(importeUltimaValuacion);

                    if (diferencia.intValue() > 0) {
                        nImporte = diferencia;
                        tipoTransaccion = Constants.TiposTransaccionesBienes.REVALUACION_ALTA;
                    } else {
                        nImporte = diferencia.negate();
                        tipoTransaccion = Constants.TiposTransaccionesBienes.REVALUACION_BAJA;
                    }
                } else {
                    tipoTransaccion = Constants.TiposTransaccionesBienes.SALIDA;
                    nImporte = importeUltimaValuacion;
                }
            }

            Utils.generaContabilidad(pIdFideicomiso, pIdSubcuenta, moneda, fechaValuacion, nImporte,
                                     BigDecimal.valueOf(tipoTransaccion.getValue()), null,
                                     tipoTransaccion.getDescription(), idTipoCambio);


            if (pTipoOperacion == Constants.TiposOperacionesDetalleBien
                                           .ENTRADA
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

            if (pTipoOperacion == Constants.TiposOperacionesDetalleBien
                                           .REVALUACION
                                           .getValue()) {

                detalleBien.setForsImpUltValua(pValuacion);
                detalleBien.setForsFecUltValua(pFechaValuacion);

                detalleBienesRepository.save(detalleBien);

                BigDecimal nuevoImporteGarantizado = bien.getFgarImpGarantizad().add(diferencia);
                bien.setFgarImpGarantizad(nuevoImporteGarantizado);

                garantiasRepository.save(bien);
                return null;
            }

            if (pTipoOperacion == Constants.TiposOperacionesDetalleBien
                                           .SALIDA
                                           .getValue()) {

                detalleBien = new FBienesgar(pIdFideicomiso, pIdSubcuenta, pIdDetalleBien);

                detalleBienesRepository.delete(detalleBien);

                BigDecimal nuevoImporteGarantizado = bien.getFgarImpGarantizad().subtract(importeUltimaValuacion);
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

