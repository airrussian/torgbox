class TTime {

    constructor( hour = 0, minute = 0, second = 0, msec = 0 ) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.msec = msec;
    }

    static parse( str ) {

        const result = new RegExp(/[^+-](?<hour>\d{1,2}):(?<min>\d{1,2})(:(?<sec>\d{1,2}))?(\.(?<msec>\d{1,3}))?/).exec( str );

        if ( !result ) return new TTime();

        return new TTime(
            parseInt( result.groups.hour ),
            parseInt( result.groups.min ),
            result.groups.sec ? parseInt( result.groups.sec ) : 0,
            result.groups.msec ? parseInt( result.groups.msec ) : 0
        );    
    }

    toISO() {
        return `T${[
            this.hour.toString().padStart(2, 0),
            this.minute.toString().padStart(2, 0),
            this.second.toString().padStart(2, 0)
        ].join(":")}.${this.msec.toString().padStart(3, 0)}`;
    }
}

module.exports = TTime;