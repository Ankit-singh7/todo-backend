
const mongoose = require('mongoose');
 const  Schema = mongoose.Schema;
 
let ListSchema = new Schema({
  listId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },

  listName: {
    type: String,
    default: ''
  },

  listCreatorId: {
    type: String,
    default: ''
  },
  listCreatorName: {
    type: String,
    default: ''
  },
  
  listModifierId: {
    type: String,
    default: ''
  },
  listModifierName: {
    type: String,
    default: ''
  },

  listMode: {
    type: String,
    default: 'private'
  },

  listCreatedOn :{
    type:Date,
    default:""
  },
  listModifiedOn :{
    type:Date,
    default:""
  }

})


mongoose.model('List', ListSchema);