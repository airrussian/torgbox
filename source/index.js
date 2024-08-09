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
 * @param {string} ruNameMonth 
 * @return { number }
 */
const monthStrToNumber = ruNameMonth => {

}


/**
 * Топорно удаляет из строки все виды кавычек 
 * @param { string } str 
 * @param { [] } quotes
 * @return { string }
 */
const removeQuotes = (str, quotes = ['"', "'", "`", "«", "»", "<", ">"]) =>     
    quotes.reduce((str, quote) => str.replaceAll(quote, ""), str);

/**
 * Регулярное выражение удовлетворяющие тестам
 * Важно:
 *  1. day может быть годом, а year может быть числом 
 * @type { RegExp }
 */
const reg = new RegExp(/(?<day>\d{1,4})[\s\-\/\.](?<month>\S+?)[\s\-\/\.](?<year>\d{1,4})(.+?(?<hour>\d{2}):(?<min>\d{2})(:(?<sec>\d{2})(\.(?<msec>\d{3}))?)?)?/);



const toISO = function(dateString) {

    let timestamp = Date.parse( dateString ); 
    if ( isNaN( timestamp ) ) {
        
    }
    
    const r = reg.exec( removeQuotes(dateString ));

    console.log( r.groups );

}

module.exports = function ( { src, options } ) {
    if ( !src[options] ) 
        throw new Error("Option not found in src");

    return toISO( src[options] );
} 

module.exports.toISO = toISO