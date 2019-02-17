const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const authSchema = new Schema({
  userId: {
    type: String
  },
  authToken: {
    type: String
  },
  tokenSecret: {
    type: String
  },
  tokenGenerationTime: {
    type: Date,
    default: Date.now()
  }
})

 mongoose.model('Auth', authSchema)