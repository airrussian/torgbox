const Date = require('./Date');
const Time = require('./Time');
const Zone = require('./Zone');

class DateTime {

    constructor(date, time, zone) {
        this.date = date;
        this.time = time;
        this.zone = zone;
    }

    /**
     * Топорно удаляет из строки кавычки указанные в quotes
     * @param { string } str 
     * @param { string[] } quotes
     * @return { string }
     */
    static removeQuotes(str, quotes = ['"', "'", "`", "«", "»"]) {
        return quotes.reduce((str, quote) => str.replaceAll(quote, ""), str);
    }
    
    /**
     * Разбирается входящиую строку str 
     * и возвращается объект типа DateTime
     * @param { string } str 
     * @return { DateTime }
     */
    static parse( str ) {
        str = DateTime.removeQuotes( str );

        const date = Date.parse( str );
        const time = Time.parse( str );
        const zone = Zone.parse( str );

        return new DateTime(date, time, zone);
    }

    /**
     * Возвращает представление текущего объекта
     * в соответствии с тестами 
     * @returns { string }
     */
    toISO() {
        return `${this.date.toISO()}${this.time.toISO()}${this.zone.toISO()}`;
    }    
}

module.exports = DateTime;