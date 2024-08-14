class TZone {

    constructor( utc ) {
        this.utc = utc;
    }

    static parse( str ) {
        const result = new RegExp(/(?<f>[+-])(?<h>\d{2}):(?<m>\d{2})/).exec( str );
        if ( !result || result.groups.f === "Z" ) return new TZone(0);

        const dir = (result.groups.f === "-") ? -1 : 1; 
        return new TZone( dir * (parseInt( result.groups.h ) * 60 + parseInt( result.groups.m )));
    }

    get figure() {
        if ( !this.utc ) return "Z";
        return ( this.utc > 0 ? "+" : "-");
    }

    get hour() {
        return Math.floor( Math.abs( this.utc ) / 60 );
    }

    get minute() {
        return this.utc % 60;
    }

    toISO() {
        if ( this.utc === 0 ) return "Z";
        return `${this.figure}${this.hour.toString().padStart(2, "0")}:${this.minute.toString().padStart(2, "0")}`;
    }
}

module.exports = TZone;