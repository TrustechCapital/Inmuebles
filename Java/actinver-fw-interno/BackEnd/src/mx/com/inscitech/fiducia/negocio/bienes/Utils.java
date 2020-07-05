package mx.com.inscitech.fiducia.negocio.bienes;

import java.math.BigDecimal;

import java.time.LocalDate;

import java.time.Month;

import java.util.Calendar;
import java.util.Date;
import java.util.stream.Stream;

import mx.com.inscitech.fiducia.common.util.DateUtils;
import mx.com.inscitech.fiducia.domain.Movimien;
import mx.com.inscitech.fiducia.repository.MovimientosRepository;

public class Utils {
    public Utils() {
    }

    static BigDecimal toBigDecimal(String numeroOperacion) {
        return new BigDecimal(numeroOperacion);
    }

    static BigDecimal creaNumeroOperacion(String format, Object... args) {

        Object[] mappedArgs = Stream.of(args)
                                    .map(a -> {
            if (a.getClass() == BigDecimal.class) {
                BigDecimal b = (BigDecimal) a;
                return b.intValue();
            } else {
                return a;
            }
        }).toArray(Object[]::new);

        return toBigDecimal(String.format(format, mappedArgs));
    }

    static void generaContabilidad(BigDecimal pIdFideicomiso, BigDecimal pIdSubcuenta, BigDecimal pMoneda,
                                   Date pFechaInicio, BigDecimal pImporte, BigDecimal pNumeroOperacion,
                                   BigDecimal pFolioOperacion, String pDescripcionOperacion, BigDecimal pIdTipoCambio) {

        LocalDate transactionDate = LocalDate.now();

        if (pFechaInicio != null) {
            transactionDate = DateUtils.toLocalDate(pFechaInicio);
        }
        BigDecimal day = BigDecimal.valueOf(transactionDate.getDayOfMonth());
        BigDecimal month = BigDecimal.valueOf(transactionDate.getMonthValue());
        BigDecimal year = BigDecimal.valueOf(transactionDate.getYear());

        MovimientosRepository movimientosRepository = new MovimientosRepository();
        Movimien movimiento = new Movimien();

        // Datos generales
        movimiento.setMovNumContrato(pIdFideicomiso);
        movimiento.setMovSubContrato(pIdSubcuenta);

        // Datos transaccion
        if (pFolioOperacion == null) {
            movimiento.setMovFolioOpera(BigDecimal.valueOf(movimientosRepository.getNextId()));
        } else {
            movimiento.setMovFolioOpera(pFolioOperacion);
        }

        movimiento.setMovNumTransac(pNumeroOperacion);
        movimiento.setMovDescMovto(pDescripcionOperacion);
        movimiento.setMovImpMovto(pImporte);

        // Datos usuario
        // TODO: extraer de la session
        movimiento.setMovNumUsuario(BigDecimal.valueOf(0));

        // Fecha
        movimiento.setMovAnoMovto(year);
        movimiento.setMovAnoAltaReg(year);
        movimiento.setMovAnoUltMod(year);

        movimiento.setMovMesMovto(month);
        movimiento.setMovMesAltaReg(month);
        movimiento.setMovMesUltMod(month);

        movimiento.setMovDiaMovto(day);
        movimiento.setMovDiaAltaReg(day);
        movimiento.setMovDiaUltMod(day);

        // Otros datos
        movimiento.setMovHrTransac(BigDecimal.valueOf(0));
        movimiento.setMovMinTransac(BigDecimal.valueOf(0));
        movimiento.setMovNumModulo(BigDecimal.valueOf(0));
        movimiento.setMovCveTipoMerca(BigDecimal.valueOf(0));
        movimiento.setMovNumInstrume(BigDecimal.valueOf(0));
        movimiento.setMovNumSecEmis(BigDecimal.valueOf(0));
        movimiento.setMovNumTitulos(BigDecimal.valueOf(0));
        movimiento.setMovCveImpreEdo(BigDecimal.valueOf(0));
        movimiento.setMovCveEntSal("");


        movimientosRepository.insert(movimiento);
    }

}
