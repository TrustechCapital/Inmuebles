package mx.com.inscitech.fiducia.negocio;

import java.math.BigDecimal;

import mx.com.inscitech.fiducia.domain.Anteproy;
import mx.com.inscitech.fiducia.domain.Prospect;
import mx.com.inscitech.fiducia.repository.AnteproyectoRepository;
import mx.com.inscitech.fiducia.repository.FideicomisosRepository;
import mx.com.inscitech.fiducia.repository.ProspectosRepository;

public class OperacionesFideicomiso {

    private FideicomisosRepository fideicomisosRepository;
    private AnteproyectoRepository anteproyectoRepository;
    private ProspectosRepository prospectosRepository;

    public OperacionesFideicomiso(FideicomisosRepository fideicomisosRepository,
                                  AnteproyectoRepository anteproyRepository,
                                  ProspectosRepository prospectosRepository) {
        this.fideicomisosRepository = fideicomisosRepository;
        this.anteproyectoRepository = anteproyRepository;
        this.prospectosRepository = prospectosRepository;
    }

    public Integer getSecuencialFideicomiso(BigDecimal numProyecto) {
        try {
            return fideicomisosRepository.getSecuencialFideicomiso(numProyecto);
        } catch (Exception e) {
            return -1;
        }
    }

    public int asignaFideicomisoAProyecto(BigDecimal numProyecto, BigDecimal numFideicomiso) {
        try {
            fideicomisosRepository.getSecuencialFideicomiso(numFideicomiso);

            Anteproy anteproyecto = anteproyectoRepository.findByPK(numProyecto);
            anteproyecto.setAntNumContrato(numFideicomiso);

            anteproyectoRepository.save(anteproyecto);

            Prospect prospecto = prospectosRepository.findByPK(numProyecto);
            prospecto.setPrsNumContrato(numFideicomiso);

            prospectosRepository.save(prospecto);

            return 0;
        } catch (Exception e) {
            return -1;
        }
    }
}

