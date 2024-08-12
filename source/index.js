/**
 * Русские сокращения название месяцев
 * @type string[]
 */
const ruShortMonths = [
    "янв", "фев", "мар", 
    "апр", "ма[я|й|и]", "июн",
    "июл", "авг", "сен",
    "окт", "ноя", "дек"
];

/**
 * Преобразует русское название месяца в номер месяца в году.
 * Если преобразовать не удалось возвращает ноль
 * @param { string } ruNameMonth 
 * @return { number }
 */
const monthStrToNumber = ruNameMonth => {
    const month = ruShortMonths.find( m => new RegExp(m).test( ruNameMonth.toLowerCase() ) );
    return month ? ruShortMonths.indexOf(month) + 1 : 0;
}

/**
 * Топорно удаляет из строки кавычки указанные в quotes
 * @param { string } str 
 * @param { string[] } quotes
 * @return { string }
 */
const removeQuotes = (str, quotes = ['"', "'", "`", "«", "»"]) =>     
    quotes.reduce((str, quote) => str.replaceAll(quote, ""), str);

const replaceSepToSpace = (str, seps = ["-", "/"]) => 
    seps.reduce((str, sep) => str.replaceAll( sep, "-" ), str);


/**
 * Регулярное выражение удовлетворяющие тестам
 * Важно:
 *  1. day может быть годом, а year может быть числом 
 * @type { RegExp }
 */

const reg = new RegExp(/(?<day>\d{1,4})[\s\-\/\.](?<month>\S+?)[\s\-\/\.](?<year>\d{1,4})(.+?(?<hour>\d{2}):(?<min>\d{2})(:(?<sec>\d{2})(\.(?<msec>\d{3}))?)?)?/);

const toISO = function(dateString) {

    console.log("SRC:", dateString);
    let res = removeQuotes(dateString);

    const reg = new RegExp(/(?<day>\d{1,4})[\s\-\/\.](?<month>\S+?)[\s\-\/\.](?<year>\d{1,4})/);
    const date = reg.exec( res ).groups;

    if ( date.day.length === 4 ) Object.assign( date, { day: date.year, year: date.day } );

    console.log( date );
    if ( !parseInt( date.month )) Object.assign( date, { month: monthStrToNumber( date.month )});
    
    Object.assign( date, { 
        day: parseInt( date.day ),
        month: parseInt( date.month ),
        year: parseInt( date.year )
    });
    
    console.log(`${ date.year }-${ date.month.toString().padStart( 2, "0" )}-${date.day.toString().padStart( 2, "0" )}`);
    
    console.log( date );
    console.log("RES:", res);

    let t = Date.parse( res );
    console.log( t );

    console.log( new Date( t ).toISOString())

   
    console.log("\n");


}

module.exports = function ( { src, options } ) {
    if ( !src[options] ) 
        throw new Error("Option not found in src");

    return toISO( src[options] );
}

module.exports.toISO = toISO