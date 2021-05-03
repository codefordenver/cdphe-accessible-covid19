import _ from 'lodash';

export function formatComma(num){
    num = num.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(num))
        num = num.replace(pattern, "$1,$2");
    return num;
}

export function formatDecimal(num, decimalPlaces) {
    num = num.toString();
    let [integerPart, fractionalPart] = num.split('.');
    if ( fractionalPart.length > decimalPlaces ) {
        fractionalPart = fractionalPart.substring(0, decimalPlaces);
    }
    return formatComma(integerPart) + "." + fractionalPart;
}

export function formatDate(date, format){
    const monthArray = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
    const monthTwoDigitFormat = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12",
    }
    const dateArray = date.split('/');

    let formattedMonth;
    if(dateArray[0].split('')[0] === '0'){
        formattedMonth = dateArray[0].split('')[1];
    } else {
        formattedMonth = dateArray[0]
    }

    const month = monthArray[formattedMonth-1];
    const day = dateArray[1];
    const year = dateArray[2];
    if (format === 'yyyy-mm-dd') {
        return `${year}-${monthTwoDigitFormat[month]}-${day}`
    }
    return `${month} ${day}, ${year}`
}

export function parseDateMonthDayYear(date) {
    // parse date string in the form MM/DD/YYYY
    const sep = '/';
    let [month, day, year] = date.split(sep);
    return new Date(`${year}-${month}-${day}`);
}

export function sortObjectsByDate(objects, ascending, parseDate) {
    // sorts objects by date from most recent to least recent
    // parseDate must take an object argument and return a Javascript Date
    let objectsCopy = objects.slice();
    if (parseDate === undefined) {
        parseDate = obj => parseDateMonthDayYear(obj.date);
    }
    if (ascending === undefined) {
        ascending = true;
    }
    let comparator;
    if ( ascending ) {
        comparator = (a, b) => parseDate(a) - parseDate(b)
    } else {
        comparator = (a, b) => parseDate(b) - parseDate(a)
    }
    objectsCopy.sort(comparator);
    return objectsCopy;
}

export function keysToLowercase(arr) {
  return arr.map( obj => {
    if (obj instanceof Object && Array.isArray(obj) === false) {
    return _.transform(obj, (result, val, key) => {
      result[key === 'Date' ? key.toLowerCase() : key] = val;
     })
   } else {
     return obj;
   }
  }) 
 }