/**
 * "Топорно" чистит строку от кавычек
 * @param {string} str 
 * @param {string[]} quotes 
 * @returns { string }
 */
var cleanedQuotes = (
    str, 
    quotes = ['"', "'", "`", "«", "»"]
) => 
    quotes.reduce((str, quote) => str.replaceAll(quote, ""), str);

/**
 * Во входящей строке str заменяет все русскоязычные месяцы годы,
 * перечисленные в коллекции months на их индексы + 1 ( порядковые номер в году )
 * 
 * @param { string } str 
 * @param { string[] } months 
 * @returns { string }
 */
var monthToNumber = (
    str, 
    months = ["янв", "фев", "мар", "апр", "ма[я|й|е]", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
) => 
    months.reduce( (str, month, index) => 
        str.replace(
            new RegExp(`${month}\\S*`, "i"), 
            (index + 1).toString().padStart(2, "0")
        ), str
    );

/**
 * Заменяет в строке дату вида "1/01/2017" на формат даты 2017-01-01
 * @param {string} str 
 * @returns { string }
 */
var dateToISO = str => str
    .replace(/(\d{1,2})[./\s-](\d{2})[./\s-](\d{4})/, (_, d,m,y) => `${y}-${m}-${d.padStart(2, "0")}`)
    .replace(/(\d{4})\.(\d{2})\.(\d{2})/, (_, y,m,d) => `${y}-${m}-${d}`);

/**
 * Преобразует время в формат ISO 8601 (T00:00:00.000)  
 * 
 * @param { string } str 
 * @returns { string }
 */
var timeToISO = str => str.replace( 
    /[^+-\d]([0-2]?\d):([0-5]\d):?([0-5]\d)?\.?(\d{3})?/, 
    (_, h, m, s, ss ) => 
        `T${[h, m, s].map( v => v ? v.padStart(2, "0") : "00").join(":")}` + 
        `.${ss ? ss.padStart(3,"0") : "000"}`
    );

/**
 * Находит таймзону и преобразует к виду +00:00
 * @param { string } str 
 * @returns { string }
 */

var zoneToISO = str => str.replace( 
    /([+-][0-5]\d):([0-5]\d)/, 
    (_, zh, zm ) => {
        var h = parseInt(zh);
        return `${h < 0 ? "-" : "+"}${h.toString().padStart(2, "0")}:${zm.padStart(2, "0")}` 
    }); 

var joinAll = str => {
    const r = str.match(/(\d{4}-\d{2}-\d{2})(?:[^T+-]*T(\d{2}:\d{2}:\d{2}(?:\.\d{3})?))?(?:[^+-]*([+-]\d{2}:\d{2}|\w+))?/);
    return `${r[1]}T${r[2] ?? "00:00:00.000"}${r[3] ?? "Z"}`;
}

var parse = str => 
    [ cleanedQuotes, monthToNumber, dateToISO, timeToISO, zoneToISO, joinAll ].reduce( (str, fn) => fn( str ), str );

module.exports = function ( { src, options } ) {
    if ( !src[options] ) 
        throw new Error("Option not found in src");

    return parse( src[options] ); 
}  