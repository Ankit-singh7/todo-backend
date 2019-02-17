
const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
let HistorySchema = new Schema({
  
  historyId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  
  listId: {
    type: String,
    default: '',
  },

  itemId: {
    type: String,
    default: '',
  },

  subItemId: {
    type: String,
    default: '',
  },

  key: {
    type: String,
    default: '',
  },
  
  itemValues:[],
  
  createdOn: {
    type: Date,
    default: Date.now()
  },

})


mongoose.model('History', HistorySchema);