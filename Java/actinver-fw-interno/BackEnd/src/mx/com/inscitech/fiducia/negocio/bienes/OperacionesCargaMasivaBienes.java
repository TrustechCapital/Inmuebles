package mx.com.inscitech.fiducia.negocio.bienes;

import java.math.BigDecimal;

import java.util.List;

import java.util.Map;

import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.util.DateUtils;
import mx.com.inscitech.fiducia.domain.FBienesgar;
import mx.com.inscitech.fiducia.domain.FGarantias;
import mx.com.inscitech.fiducia.domain.FUnidades;
import mx.com.inscitech.fiducia.models.LayoutCargaBienes;
import mx.com.inscitech.fiducia.negocio.bienes.Constants.EstatusIndividualizacionBienes;
import mx.com.inscitech.fiducia.negocio.bienes.Constants.TiposCargaMasiva;
import mx.com.inscitech.fiducia.repository.BienesRepository;
import mx.com.inscitech.fiducia.repository.DetalleBienesRepository;
import mx.com.inscitech.fiducia.repository.UnidadRepository;

import mx.gob.nafin.fiduciario.BusinessException;

public class OperacionesCargaMasivaBienes {

    enum TipoValorBien {
        AVALUO(1),
        COMERCIAL(2),
        CATASTRAL(3);

        private int tipoValor;

        TipoValorBien(int tipoOperacion) {
            this.tipoValor = tipoOperacion;
        }

        int getValue() {
            return this.tipoValor;
        }

    }

    private UnidadRepository unidadRepository;
    private DetalleBienesRepository detalleBienesRepository;

    public OperacionesCargaMasivaBienes() {
        this.unidadRepository = new UnidadRepository();
    }


    public String ejecutaCarga(Integer pTipoOperacion, Integer pIdFideicomiso, List<LayoutCargaBienes> datosCarga) {

        try {
            BigDecimal idFideicomiso = new BigDecimal(pIdFideicomiso);

            for (LayoutCargaBienes layoutCarga : datosCarga) {

                BigDecimal idSubcuenta = BigDecimal.valueOf(0);
                BigDecimal idBien = new BigDecimal(layoutCarga.getIdBien());
                String idEdificio = layoutCarga.getEdificio();
                String idDepto = layoutCarga.getDepto();
                BigDecimal idNotario = BigDecimal.valueOf(layoutCarga.getNotario());
                Integer tipoValorBien = layoutCarga.getTipoValorBien();
                BigDecimal valorBien = BigDecimal.valueOf(layoutCarga.getValorBien());

                String tipo = "0";

                if (pTipoOperacion == TiposCargaMasiva.INDIVIDUALIZACION.getValue()) {

                    FBienesgar detalleBien = detalleBienesRepository.findByPk(idFideicomiso, idSubcuenta, idBien);

                    if (detalleBien == null) {
                        throw new BusinessException("400",
                                                    String.format("El detalle de bien con id %s no existe en el fideicomiso %s, subcuenta",
                                                                  idBien, idFideicomiso, idSubcuenta));
                    }

                    FUnidades unidad =
                        unidadRepository.findByPk(idFideicomiso, idSubcuenta, idBien, idEdificio, idDepto);

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

                        if (tipoValorBien == TipoValorBien.COMERCIAL.getValue()) {
                            unidad.setFuniPrecio(valorBien);
                        } else if (tipoValorBien == TipoValorBien.CATASTRAL.getValue()) {
                            unidad.setFuniPrecioCatastro(valorBien);
                        } else if (tipoValorBien == TipoValorBien.AVALUO.getValue()) {
                            unidad.setFuniUltimoAvaluo(valorBien);
                        }

                        unidad.setFuniNombreAdquiriente(layoutCarga.getNombreAdquiriente());

                        // NOTA: no se esta recibiendo esta fecha desde la carga masiva
                        //unidad.setFuniFechaUltimoAvaluo(layoutCarga.getFechaAvaluo());
                        //unidad.setFuniFechaReversion(layoutCarga.getFechaAvaluo());

                        unidad.setFuniNumEscritura(layoutCarga.getEscritura());

                        unidad.setFuniFechaTrasladoDominio(layoutCarga.getFechaEscritura());

                        unidad.setFuniNotario(idNotario);
                        unidad.setFuniNombreNotario(layoutCarga.getNombreNotario());

                        unidad.setFuniStatus(EstatusIndividualizacionBienes.getText(layoutCarga.getStatus()));
                        unidad.setFuniMoneda(BigDecimal.valueOf(1));

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

        // No. fideicomiso
        Integer numFideicomiso = Double.valueOf(columns.get(0).toString()).intValue();

        // Subcuenta
        Integer numSubcuenta = 0;

        // Id bien (id garantia)
        Integer idDetalleBien = Double.valueOf(columns.get(1).toString()).intValue();

        // Edificio
        String edificio = (String) columns.get(2);

        // Departamento
        String departamento = columns.get(3).toString();

        // Niveles
        String niveles = columns.get(4)
                                .toString()
                                .trim();

        if (niveles == "") {
            niveles = "0";
        } else {
            niveles = "" + Double.valueOf(niveles).intValue();
        }

        // Calle
        String calle = (String) columns.get(5);

        // Colonia
        String colonia = (String) columns.get(6);

        // Poblacion
        String poblacion = (String) columns.get(7);

        // Cp
        String cp = (String) columns.get(8);

        // Estado
        String estado = (String) columns.get(9);

        // Pais
        String pais = (String) columns.get(10);

        // Colindancia
        String colindancia = (String) columns.get(11);

        // Medidas
        String medidas = (String) columns.get(12);

        // Estacionamiento
        String estacionamiento = (String) columns.get(13);

        // Superficie
        String superficie = columns.get(14).toString();

        // Numero Catastral
        String numeroCatastral = columns.get(15).toString();

        // Valor inmueble
        Double valorInmueble = Double.valueOf(columns.get(16).toString());

        // Tipo valor inmueble
        Integer tipoValorInmueble = Double.valueOf(columns.get(17).toString()).intValue();

        // Nombre adquiriente
        String nombreAdquiriente = (String) columns.get(18);

        // Nombre numeroEscritura
        String numeroEscritura = columns.get(19).toString();

        // Nombre fechaEscritura
        String fechaEscritura = (String) columns.get(20);

        // Nombre nombreNotario
        String nombreNotario = (String) columns.get(21);

        // Numero notario
        Integer numeroNotario = Double.valueOf(columns.get(22).toString()).intValue();

        // Estatus
        Integer estatus = Double.valueOf(columns.get(23).toString()).intValue();

        return new LayoutCargaBienes(numFideicomiso, idDetalleBien, edificio, departamento, niveles, calle, colonia,
                                     poblacion, cp, estado, pais, colindancia, medidas, estacionamiento, superficie,
                                     numeroCatastral, valorInmueble, tipoValorInmueble, nombreAdquiriente,
                                     numeroEscritura, fechaEscritura, nombreNotario, numeroNotario, estatus);
    }
}

