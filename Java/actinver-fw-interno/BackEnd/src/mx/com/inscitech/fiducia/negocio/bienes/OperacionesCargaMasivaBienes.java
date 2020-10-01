package mx.com.inscitech.fiducia.negocio.bienes;

import java.math.BigDecimal;

import java.util.List;

import mx.com.inscitech.fiducia.common.util.DateUtils;
import mx.com.inscitech.fiducia.domain.FUnidades;
import mx.com.inscitech.fiducia.models.LayoutCargaBienes;
import mx.com.inscitech.fiducia.negocio.bienes.Constants.EstatusIndividualizacionBienes;
import mx.com.inscitech.fiducia.negocio.bienes.Constants.TiposCargaMasiva;
import mx.com.inscitech.fiducia.repository.UnidadRepository;

public class OperacionesCargaMasivaBienes {

    private UnidadRepository unidadRepository;

    public OperacionesCargaMasivaBienes() {
        this.unidadRepository = new UnidadRepository();
    }


    public String ejecutaCarga(Integer pTipoOperacion, Integer pIdFideicomiso, List<LayoutCargaBienes> datosCarga) {

        try {
            BigDecimal idFideicomiso = new BigDecimal(pIdFideicomiso);

            for (LayoutCargaBienes layoutCarga : datosCarga) {

                BigDecimal idSubcuenta = BigDecimal.valueOf(0);
                String idBien = layoutCarga.getIdBien().toString();
                String idEdificio = layoutCarga.getEdificio();
                String idDepto = layoutCarga.getDepto();
                BigDecimal idNotario = BigDecimal.valueOf(layoutCarga.getNotario());

                String tipo = "0";

                if (pTipoOperacion == TiposCargaMasiva.INDIVIDUALIZACION.getValue()) {

                    FUnidades unidad =
                        unidadRepository.findByPk(idFideicomiso, idSubcuenta, idBien, idEdificio, idDepto);

                    String fechaReversion = layoutCarga.getFechaAvaluo();

                    if (unidad == null) {
                        unidad = new FUnidades(idFideicomiso, idSubcuenta, idBien, idEdificio, idDepto);
                        unidad.setFuniTipo(tipo);

                        unidad.setFuniNiveles(layoutCarga.getNiveles());
                        unidad.setFuniCalleNum(layoutCarga.getCalle());
                        unidad.setFuniNomColonia(layoutCarga.getColonia());
                        unidad.setFuniNomPoblacion(layoutCarga.getPoblacion());
                        unidad.setFuniCodigoPostal(layoutCarga.getCodigoPostal());
                        unidad.setFuniClaveEstado(layoutCarga.getEstado());
                        unidad.setFuniClavePais(layoutCarga.getPais());
                        unidad.setFuniColindancias(layoutCarga.getColindancia());
                        unidad.setFuniMedidas(layoutCarga.getMedidas().toString());
                        unidad.setFuniEstacionamiento1(layoutCarga.getEstacionamiento1());
                        unidad.setFuniSuperficie1(layoutCarga.getSuperficie1());
                        unidad.setFuniNumeroCatastro(new BigDecimal(layoutCarga.getNumeroCatastro()));
                        unidad.setFuniPrecioCatastro(BigDecimal.valueOf(layoutCarga.getValorCatastro()));
                        unidad.setFuniPrecio(BigDecimal.valueOf(layoutCarga.getValorOperacion()));
                        unidad.setFuniUltimoAvaluo(BigDecimal.valueOf(layoutCarga.getAvaluo()));
                        unidad.setFuniFechaUltimoAvaluo(layoutCarga.getFechaAvaluo());
                        unidad.setFuniNumEscritura(layoutCarga.getEscritura());
                        // TODO: es esta la fecha de escrituracion?
                        unidad.setFuniFechaTrasladoDominio(layoutCarga.getFechaEscritura());
                        unidad.setFuniFechaReversion(fechaReversion);
                        unidad.setFuniNotario(idNotario);
                        unidad.setFuniStatus(EstatusIndividualizacionBienes.getText(layoutCarga.getStatus()));

                        unidadRepository.insert(unidad);
                    }

                } else if (pTipoOperacion == TiposCargaMasiva.LIBERACION.getValue()) {


                    FUnidades unidad =
                        unidadRepository.findByPk(idFideicomiso, idSubcuenta, idBien, idEdificio, idDepto);

                    if (unidad != null) {
                        unidad.setFuniNotario(idNotario);
                        unidad.setFuniNumEscritura(layoutCarga.getEscritura());
                        unidad.setFuniStatus(EstatusIndividualizacionBienes.LIBERADO.getText());

                        unidadRepository.update(unidad);
                    }


                    //TODO: insertar en f_fiberaciones o F_PROCESO_LIBERACION ?
                }

            }

            return "";
        } catch (Exception e) {
            return "-1";
        }
    }


    public LayoutCargaBienes mapColumnsToObject(List<Object> columns) {
        return new LayoutCargaBienes(Double.valueOf(columns.get(0).toString()).intValue(),
                                     Double.valueOf(columns.get(1).toString()).intValue(), (String) columns.get(2),
                                     (String) columns.get(3), (String) columns.get(4), (String) columns.get(5),
                                     (String) columns.get(6), (String) columns.get(7), (String) columns.get(8),
                                     (String) columns.get(9), (String) columns.get(10), (String) columns.get(11),
                                     (String) columns.get(12), (String) columns.get(13), (String) columns.get(14),
                                     (String) columns.get(15), Double.valueOf(columns.get(16).toString()),
                                     Double.valueOf(columns.get(17).toString()), (String) columns.get(18),
                                     Double.valueOf(columns.get(19).toString()), (String) columns.get(20),
                                     (String) columns.get(21), (String) columns.get(22),
                                     Double.valueOf(columns.get(23).toString()).intValue(),
                                     Double.valueOf(columns.get(24).toString()).intValue());
    }
}

