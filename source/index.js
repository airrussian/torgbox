const DateTime = require("./DateTime");

module.exports = function ( { src, options } ) {
    if ( !src[options] ) 
        throw new Error("Option not found in src");

    return DateTime.parse( src[options] ).toISO();
}  