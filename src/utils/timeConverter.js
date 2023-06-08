const datetime = require('date-and-time');


export default class TimeConverter {
    humanizeTime(time) {
        return datetime.format(new Date(Number(time)), "DD.MM.YYYY HH:mm", true)
    }
    convertToTimestamp(strTime){
        try{
            return datetime.parse(strTime, "DD.MM.YYYY HH:mm").getTime()
        }catch (e) {
            return null
        }
    }
}