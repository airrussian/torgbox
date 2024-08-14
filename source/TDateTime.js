const TDate = require('./TDate');
const TTime = require('./TTime');
const TZone = require('./TZone');

class TDateTime {

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
        str = TDateTime.removeQuotes( str );

        const date = TDate.parse( str );
        const time = TTime.parse( str );
        const zone = TZone.parse( str );

        return new TDateTime(date, time, zone);
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

module.exports = TDateTime;