package mx.com.inscitech.fiducia.negocio.bienes;

import java.math.BigDecimal;

import java.util.List;

import mx.com.inscitech.fiducia.BusinessException;
import mx.com.inscitech.fiducia.domain.FGarantias;
import mx.com.inscitech.fiducia.domain.FBienesgar;
import mx.com.inscitech.fiducia.domain.FUnidades;
import mx.com.inscitech.fiducia.models.LayoutCargaBienes;
import mx.com.inscitech.fiducia.negocio.bienes.Constants.EstatusIndividualizacionBienes;
import mx.com.inscitech.fiducia.negocio.bienes.Constants.TiposCargaMasiva;
import mx.com.inscitech.fiducia.repository.DetalleBienesRepository;
import mx.com.inscitech.fiducia.repository.UnidadRepository;

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
        this.detalleBienesRepository = new DetalleBienesRepository();
    }


    public int ejecutaCarga(Integer pTipoOperacion, Integer pIdFideicomiso,
                             List<LayoutCargaBienes> datosCarga) throws BusinessException {
        int contador =0;
        BigDecimal idFideicomiso = new BigDecimal(pIdFideicomiso);
        for (LayoutCargaBienes layoutCarga : datosCarga) {

            BigDecimal idSubcuenta = BigDecimal.valueOf(layoutCarga.getSubCuenta());
            BigDecimal idBien = new BigDecimal(layoutCarga.getIdBien());
            String idEdificio = layoutCarga.getEdificio();
            String idDepto = layoutCarga.getDepto();
            BigDecimal idNotario = BigDecimal.valueOf(layoutCarga.getNotario());
            String tipoValorBien = layoutCarga.getTipoValorBien();
            BigDecimal valorBien = BigDecimal.valueOf(layoutCarga.getValorBien());

            String tipo = "0";

            if (pTipoOperacion == TiposCargaMasiva.INDIVIDUALIZACION.getValue()) {

                /*FBienesgar detalleBien = detalleBienesRepository.findByPk(idFideicomiso, idSubcuenta, idBien);

                if (detalleBien == null) {
                    return 1;
                   /* throw new BusinessException("400",
                                                String.format("El detalle de bien con id %s no existe en el fideicomiso: %s, subcuenta: %s",
                                                              idBien, idFideicomiso, idSubcuenta));
                }*/

                FUnidades unidad = unidadRepository.findByPk(idFideicomiso, idSubcuenta, idBien, idEdificio, idDepto);
                /*FGarantias garantia = new FGarantias(idFideicomiso,idSubcuenta,idBien);
                FBienesgar bienes = new FBienesgar();*/

                if (unidad == null) {
                   /* if (contador==0){
                        System.out.println("Entro a Garantias");
                        garantia.setFgarIdFideicomiso(idFideicomiso);
                        garantia.setFgarIdSubcuenta(idSubcuenta);
                        garantia.setFgarCveGarantia(BigDecimal.valueOf((2)));
                        garantia.setFgarCveStatus(EstatusIndividualizacionBienes.getText(layoutCarga.getStatus()));
                        garantia.doInsert();
                        System.out.println("Entro a Bienes");
                        bienes.setFgrsIdFideicomiso(idFideicomiso);
                        bienes.setFgrsIdSubcuenta(idSubcuenta);
                        bienes.setForsIdGarantia(BigDecimal.valueOf((tipoValorBien)));
                        bienes.setForsCveTipoGarantia(BigDecimal.valueOf((2)));
                        bienes.setForsCveTipoBien(BigDecimal.valueOf((tipoValorBien)));
                        bienes.setForsImpBien(BigDecimal.valueOf((0)));
                        bienes.setForsCveStatus(EstatusIndividualizacionBienes.getText(layoutCarga.getStatus()));                    
                        bienes.doInsert();
                        contador++;
                    }                   */     
                    unidad = new FUnidades(idFideicomiso, idSubcuenta, idBien, idEdificio, idDepto);
                    unidad.setFuniTipo(tipoValorBien);

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
                    //Double obj = new Double(layoutCarga.getNumeroCatastro());
                    unidad.setFuniNumeroCatastro(layoutCarga.getNumeroCatastro());

                    //if (tipoValorBien == TipoValorBien.COMERCIAL.getValue()) {
                        unidad.setFuniPrecio(valorBien);
                    //} else if (tipoValorBien == TipoValorBien.CATASTRAL.getValue()) {
                        unidad.setFuniPrecioCatastro(valorBien);
                    //} else if (tipoValorBien == TipoValorBien.AVALUO.getValue()) {
                        unidad.setFuniUltimoAvaluo(valorBien);
                    //}

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


                FUnidades unidad = unidadRepository.findByPk(idFideicomiso, idSubcuenta, idBien, idEdificio, idDepto);

                if (unidad != null) {
                    unidad.setFuniNotario(idNotario);
                    unidad.setFuniNumEscritura(layoutCarga.getEscritura());
                    unidad.setFuniStatus(EstatusIndividualizacionBienes.LIBERADO.getText());

                    unidadRepository.update(unidad);
                }

                //TODO: insertar en f_fiberaciones o F_PROCESO_LIBERACION ?
            }

        }
        return 0;        
    }


    public LayoutCargaBienes mapColumnsToObject(List<Object> columns) {

        // No. fideicomiso
        Integer numFideicomiso = getColumnWithDefaultValue(columns.get(0)).intValue();

        // Subcuenta
        Integer numSubcuenta = 0;

        // Id bien (id garantia)
        Integer idDetalleBien = getColumnWithDefaultValue(columns.get(1)).intValue();

        // Edificio
        String edificio = (String) columns.get(2);

        // Departamento
        String departamento = columns.get(3).toString();

        // Niveles
        String niveles = getColumnWithDefaultValue(columns.get(4)).toString();

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
        Double valorInmueble = getColumnWithDefaultValue(columns.get(16));

        // Tipo valor inmueble
        String tipoValorInmueble = columns.get(17).toString();// getColumnWithDefaultValue(columns.get(17));

        // Nombre adquiriente
        String nombreAdquiriente = (String) columns.get(18);

        // Nombre numeroEscritura
        String numeroEscritura = columns.get(19).toString();

        // Nombre fechaEscritura
        String fechaEscritura = (String) columns.get(20);

        // Nombre nombreNotario
        String nombreNotario = (String) columns.get(21);

        // Numero notario
        Integer numeroNotario = getColumnWithDefaultValue(columns.get(22)).intValue();

        // Estatus
        Integer estatus = getColumnWithDefaultValue(columns.get(23)).intValue();
        
        Integer SubCuenta = getColumnWithDefaultValue(columns.get(24)).intValue();

        return new LayoutCargaBienes(numFideicomiso, idDetalleBien, edificio, departamento, niveles, calle, colonia,
                                     poblacion, cp, estado, pais, colindancia, medidas, estacionamiento, superficie,
                                     numeroCatastral, valorInmueble, tipoValorInmueble, nombreAdquiriente,
                                     numeroEscritura, fechaEscritura, nombreNotario, numeroNotario, estatus,SubCuenta);
    }

    Double getColumnWithDefaultValue(Object column) {
        String columnValue = column == null ? "" : column.toString().trim();
        return columnValue.isEmpty() ? 0 : Double.valueOf(columnValue);
    }
}

