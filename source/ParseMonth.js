const ruShortMonths = [
    "янв", "фев", "мар", 
    "апр", "ма[я|й|и]", "июн",
    "июл", "авг", "сен",
    "окт", "ноя", "дек"
];

/**
 * Преобразует русское название месяца в номер месяца в году.
 * Если преобразовать не удалось возвращает ноль
 * @param { string } ruNameMonth 
 * @return { number }
 */
module.exports = ( ruNameMonth ) => {
    const month = ruShortMonths.find( m => new RegExp(m).test( ruNameMonth.toLowerCase() ) );
    return month ? ruShortMonths.indexOf(month) + 1 : 0;
}