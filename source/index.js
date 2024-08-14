const TDateTime = require("./TDateTime");

module.exports = function ( { src, options } ) {
    if ( !src[options] ) 
        throw new Error("Option not found in src");

    return TDateTime.parse( src[options] ).toISO();
}