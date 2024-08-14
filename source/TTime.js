class TTime {

    constructor( hour = 0, minute = 0, second = 0, msec = 0 ) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.msec = msec;
    }

    static parse( str ) {
        return new TTime();
    }

    toISO() {
        return `T${this.hour}:${this.minute}:${this.second}.${this.msec}`;
    }
}

module.exports = TTime;