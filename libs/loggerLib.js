
//we use pino for writing all the logs coz its damn fast
const logger = require('pino')()//npm install pino --save

const moment = require('moment')

let captureError = (errorMessage, errorOrigin, errorLevel) => {
  let currentTime = moment()

  let errorResponse = {
    timestamp: currentTime,
    errorMessage: errorMessage,
    errorOrigin: errorOrigin,
    errorLevel: errorLevel
  }

  logger.error(errorResponse)//logger is a method defined in pino so dont search like fool to find where i declared it
  return errorResponse
} // end captureError

let captureInfo = (message, origin, importance) => {
  let currentTime = moment()

  let infoMessage = {
    timestamp: currentTime,
    message: message,
    origin: origin,
    level: importance
  }

  logger.info(infoMessage)
  return infoMessage
} // end infoCapture

module.exports = {
  error: captureError,
  info: captureInfo
}
