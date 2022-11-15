
const datetime = require('date-and-time');


export default class TimeConverter{
    humanizeTime(time){
        return datetime.format(new Date(time),"DD.MM.YYYY HH:mm",true)
    }
}