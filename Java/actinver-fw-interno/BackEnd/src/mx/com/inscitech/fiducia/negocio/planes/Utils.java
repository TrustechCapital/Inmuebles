package mx.com.inscitech.fiducia.negocio.planes;

import java.math.BigDecimal;

import java.util.Date;
import java.util.stream.Stream;

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

    static boolean generaContabilidad(BigDecimal pIdFideicomiso, BigDecimal pIdSubcuenta, BigDecimal pMoneda,
                                      Date pFechaInicio, BigDecimal pImporte, BigDecimal pNumeroOperacion,
                                      BigDecimal pFolioOperacion, BigDecimal pIdTipoCambio, BigDecimal pIdTipoPersona,
                                      BigDecimal pIdPersona) {

        // TODO: implementar metodo y recibir patametro del tipo de elemento que se esta registrando
        return true;
    }

}
