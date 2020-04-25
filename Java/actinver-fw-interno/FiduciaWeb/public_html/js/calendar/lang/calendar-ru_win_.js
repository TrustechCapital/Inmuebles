// ** I18N

// Calendar RU language
// Translation: Sly Golovanov, http://golovanov.net, <sly@golovanov.net>
// Encoding: any
// Distributed under the same terms as the calendar itself.

// For translators: please use UTF-8 if possible.  We strongly believe that
// Unicode is the answer to a real internationalized world.  Also please
// include your contact information in the header, as can be seen above.

// full day names
Calendar._DN = new Array
("воскресенье",
 "понедельник",
 "вторник",
 "среда",
 "четверг",
 "пятница",
 "с\u00F3\u00E1\u00E1ота",
 "воскресенье");

// Please note that the following array of short day names (and the same goes
// for short month names, _SMN) isn't absolutely necessary.  We give it here
// for exemplification on how one can customize the short day names, but if
// they are simply the first N letters of the full name you can simply say:
//
//   Calendar._SDN_len = N; // short day name length
//   Calendar._SMN_len = N; // short month name length
//
// If N = 3 then this is not needed either since we assume a value of 3 if not
// present, to be compatible with translation files that were written before
// this feature.

// short day names
Calendar._SDN = new Array
("вск",
 "пон",
 "втр",
 "срд",
 "чет",
 "пят",
 "с\u00F3\u00E1",
 "вск");

// full month names
Calendar._MN = new Array
("январь",
 "февраль",
 "март",
 "апрель",
 "май",
 "июнь",
 "июль",
 "авг\u00F3ст",
 "сентя\u00E1рь",
 "октя\u00E1рь",
 "ноя\u00E1рь",
 "дека\u00E1рь");

// short month names
Calendar._SMN = new Array
("янв",
 "фев",
 "мар",
 "апр",
 "май",
 "июн",
 "июл",
 "авг",
 "сен",
 "окт",
 "ноя",
 "дек");

// tooltips
Calendar._TT = {};
Calendar._TT["INFO"] = "О календаре...";

Calendar._TT["ABOUT"] =
"DHTML Date/Time Selector\n" +
"(c) dynarch.com 2002-2005 / Author: Mihai Bazon\n" + // don't translate this this ;-)
"For latest version visit: http://www.dynarch.com/projects/calendar/\n" +
"Distributed under GNU LGPL.  See http://gnu.org/licenses/lgpl.html for details." +
"\n\n" +
"Как вы\u00E1рать дат\u00F3:\n" +
"- При помощи кнопок \xab, \xbb можно вы\u00E1рать год\n" +
"- При помощи кнопок " + String.fromCharCode(0x2039) + ", " + String.fromCharCode(0x203a) + " можно вы\u00E1рать месяц\n" +
"- Подержите эти кнопки нажатыми, что\u00E1ы появилось меню \u00E1ыстрого вы\u00E1ора.";
Calendar._TT["ABOUT_TIME"] = "\n\n" +
"Как вы\u00E1рать время:\n" +
"- При клике на часах или мин\u00F3тах они \u00F3величиваются\n" +
"- при клике с нажатой клавишей Shift они \u00F3меньшаются\n" +
"- если нажать и двигать мышкой влево/вправо, они \u00E1\u00F3д\u00F3т меняться \u00E1ыстрее.";

Calendar._TT["PREV_YEAR"] = "На год назад (\u00F3держивать для меню)";
Calendar._TT["PREV_MONTH"] = "На месяц назад (\u00F3держивать для меню)";
Calendar._TT["GO_TODAY"] = "Сегодня";
Calendar._TT["NEXT_MONTH"] = "На месяц вперед (\u00F3держивать для меню)";
Calendar._TT["NEXT_YEAR"] = "На год вперед (\u00F3держивать для меню)";
Calendar._TT["SEL_DATE"] = "Вы\u00E1ерите дат\u00F3";
Calendar._TT["DRAG_TO_MOVE"] = "Перетаскивайте мышкой";
Calendar._TT["PART_TODAY"] = " (сегодня)";

// the following is to inform that "%s" is to be the first day of week
// %s will be replaced with the day name.
Calendar._TT["DAY_FIRST"] = "Первый день недели \u00E1\u00F3дет %s";

// This may be locale-dependent.  It specifies the week-end days, as an array
// of comma-separated numbers.  The numbers are from 0 to 6: 0 means Sunday, 1
// means Monday, etc.
Calendar._TT["WEEKEND"] = "0,6";

Calendar._TT["CLOSE"] = "Закрыть";
Calendar._TT["TODAY"] = "Сегодня";
Calendar._TT["TIME_PART"] = "(Shift-)клик или нажать и двигать";

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = "%Y-%m-%d";
Calendar._TT["TT_DATE_FORMAT"] = "%e %b, %a";

Calendar._TT["WK"] = "нед";
Calendar._TT["TIME"] = "Время:";
