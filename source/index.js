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
 * Топорно удаляет из строки кавычки
 * @param { string } str 
 * @return { string }
 */
const removeQuotes = str => 
    str
        .replaceAll("\"", "")
        .replaceAll("'", "")
        .replaceAll("«", "")
        .replaceAll("»", "");

/**
 * Регулярное выражение удовлетворяющие тестам 
 * @type { RegExp }
 */
const reg = new RegExp(/(?<dayOrYead>\d{1,4})[\s\-\/\.](?<month>\S+?)[\s\-\/\.](?<yearOrDay>\d{1,4})(.+?(?<hour>\d{2}):(?<min>\d{2}))?/);



const toISO = function(dateString) {

    let timestamp = Date.parse( dateString );  
    
    const r = reg.exec( removeQuotes(dateString ));

    console.log(dateString, r );


    // if ( isNaN( timestamp ) )
    //     throw new Error( "Invalid timestamp: " + dateString );
    
    // console.log( "DATE: ", new Date( timestamp ).toISOString() );    
}

module.exports = function ( { src, options } ) {
    if ( !src[options] ) 
        throw new Error("Option not found in src");

    return toISO( src[options] );
} 

module.exports.toISO = toISO