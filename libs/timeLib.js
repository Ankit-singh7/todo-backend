const moment = require('moment')//npm install moment --save
const momenttz = require('moment-timezone')//npm install moment-timezone --save
const timeZone = 'Asia/Calcutta'

let now = () => {
    //this method returns the current time in utc(universal time coordinator) format
  return moment.utc().format()
}

let getLocalTime = () => {
    //this method is to get the local time of the area
  return moment().tz(timeZone).format()
}

let convertToLocalTime = (time) => {
  return momenttz.tz(time, timeZone).format('LLLL')
}
module.exports = {
  now: now,
  getLocalTime: getLocalTime,
  convertToLocalTime: convertToLocalTime
}