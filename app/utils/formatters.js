
import moment from 'moment';
import numeral from 'numeral';

export function formatDate(date, format = 'MMM D, YYYY') {
    return moment.utc(date).local().format(format);
}

export function formatDateTime(date, format = 'h:mm:ss') {
    return moment.utc(date).local().fromNow().format(format);
}

export function formatNumber(number, format = '0,0') {
    return numeral(number).format(format);
}

export function formatDateToNumber(date) {
    let time = moment.utc(date).local().valueOf();
    return time;
}


export function formatGreeting(){
    var myDate = new Date();

    if ( myDate.getHours() < 12 )
   {
        return('Good Morning');
    }
    else
   if ( myDate.getHours() >= 12 && myDate.getHours() <= 17 )
   {
       return('Good Afternoon');
   }
   else
   if ( myDate.getHours() > 17 && myDate.getHours() <= 24 )
   {
       return('Good Evening');
   }
   else
   {
       return('Hi');
   }
}
