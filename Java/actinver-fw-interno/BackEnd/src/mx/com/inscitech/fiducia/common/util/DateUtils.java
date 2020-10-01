package mx.com.inscitech.fiducia.common.util;

import java.math.BigDecimal;

import java.util.Date;

import java.text.SimpleDateFormat;

import java.time.LocalDate;
import java.time.ZoneId;

public class DateUtils {

    enum DateFormats {


        DEFAULT("dd/MM/yyyy");

        private final String format;

        DateFormats(String format) {
            this.format = format;
        }

        public String getValue() {
            return format;
        }
    }

    public DateUtils() {
        super();
    }

    public static Date today() {
        return new Date();
    }

    public static Date fromString(String fecha) throws Exception {
        if (fecha == null || fecha.trim().isEmpty())
            return null;
        return fromString(fecha, DateFormats.DEFAULT.getValue());
    }

    public static String toString(Date fecha) {
        return toString(fecha, DateFormats.DEFAULT.getValue());
    }

    public static LocalDate toLocalDate(Date dateToConvert) {
        return dateToConvert.toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
    }

    public static Date fromParts(BigDecimal dia, BigDecimal mes, BigDecimal anio) {
        //default time zone
        ZoneId defaultZoneId = ZoneId.systemDefault();

        LocalDate localDate = LocalDate.of(anio.intValue(), mes.intValue(), dia.intValue());
        return Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());
    }


    public static Date fromString(String fecha, String formato) throws Exception {
        return new SimpleDateFormat(formato).parse(fecha);
    }

    public static String toString(Date fecha, String formato) {
        return new SimpleDateFormat(formato).format(fecha);
    }
}
