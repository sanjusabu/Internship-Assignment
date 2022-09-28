const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userid:{type: String, required: true},
    taskname: { type: String, required: true,unique:true },
    taskdes: { type: String, required: true},
    startDate: { type: String, required: true},
    endDate: {type:String, required:true},
    priority: {type:String, required:true},
    status: {type:String, required:true},
  });

  module.exports = mongoose.model('TaskModel', taskSchema);
