const parseMonth = require("./ParseMonth");
const swapDayYear = date => Object.assign( date, { day: date.year, year: date.day } );


class TDate {

    constructor( day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;        
    }


    /**
     * 
     * @param { string } str 
     * @returns TDate
     */
    static parse( str ) {
        const sep = "[\\s\\-/.]+?";
        const reg = `(?<day>\\d{1,4})${sep}(?<month>\\S+?)${sep}(?<year>\\d{1,4})`;
        const regExp = new RegExp(reg);        
        
        const resultExp = regExp.exec( str );
        if ( !resultExp ) throw new Error( "Invalid date format" );

        const date = resultExp.groups;                

        if ( date.day.length === 4 ) swapDayYear( date );
        
        Object.assign( date, { 
            day: parseInt( date.day ),
            month: parseInt( date.month ) ?? parseMonth( date.month ),
            year: parseInt( date.year )
        });

        return new TDate( date.day, date.month, date.year );
    }

    toISO() {
        return [
            this.year.toString().padStart(4, "0"),
            this.month.toString().padStart(2, "0"),
            this.day.toString().padStart(2, "0")            
        ].join("-");
    }
}


module.exports = TDate;