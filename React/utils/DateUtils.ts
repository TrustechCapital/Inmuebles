import { format, parse, parseISO, formatISO } from 'date-fns';

enum ValidDateFormats {
    Default = 'dd/MM/yyyy',
    ISO = 'ISO',
}

class DateUtils {
    static fromDate(
        date: Date,
        dateFormat: ValidDateFormats = ValidDateFormats.Default
    ): string {
        return format(date, dateFormat);
    }

    static toDate(
        date: string,
        dateFormat: ValidDateFormats = ValidDateFormats.Default
    ): Date {
        if (dateFormat === ValidDateFormats.ISO) {
            return parseISO(date);
        }
        return parse(date, dateFormat, new Date());
    }

    static changeFormat(
        date: string,
        from: ValidDateFormats,
        to: ValidDateFormats
    ): string {
        if (from === ValidDateFormats.ISO) {
            return DateUtils.fromDate(parseISO(date), to);
        }

        if (to === ValidDateFormats.ISO) {
            return formatISO(DateUtils.toDate(date, from));
        }

        return DateUtils.fromDate(parse(date, from, new Date()), to);
    }

    static toDates(array: (string | null)[]): (Date | null)[] {
        return array.map((date) => {
            return !date ? null : DateUtils.toDate(date);
        });
    }

    static fromDates(array: (Date | null)[]): (string | null)[] {
        return array.map((date) => {
            return !date ? null : DateUtils.fromDate(date);
        });
    }
}

export default DateUtils;
export { ValidDateFormats };
