const datetime = require('date-and-time');


export default class TimeConverter {
    humanizeTime(time) {
        return datetime.format(new Date(Number(time)), "DD.MM.YYYY HH:mm", true)
    }
    convertToTimestamp(strTime){
        console.log(strTime)
        console.log(datetime.parse(strTime, "DD.MM.YYYY HH:mm", true))
        return datetime.parse(strTime, "DD.MM.YYYY HH:mm").getTime()
    }
}