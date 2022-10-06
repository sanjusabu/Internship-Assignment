const TaskModel = require('../models/CreateTask')
const HttpError = require("../models/http-error");

const create = async(req,res,next)=>{
//  console.log(req.body)

 const { userid, taskname, taskdes, startDate,endDate,priority,status} = req.body;
 // console.log(req.body)
//  let existinguser;
 let existingtaskname;
 try {
//    existinguser = await TaskModel.findOne({userid});
   existingtaskname = await TaskModel.findOne({taskname});
 } catch (err) {
   const error = new HttpError(
     "Task up failed, please try again later.",
     500
   );
   return next(error);
 }

 if (existingtaskname) {
   const error = new HttpError(
     "Task exists already",
     422
   );
   return next(error);
 }

 const createdTask = new TaskModel({
   userid:userid,
   taskname: taskname,
   taskdes: taskdes,
   startDate: startDate,
   endDate: endDate,
   priority: priority,
   status : status
 });
 // console.log(createdUser)
 try {
   await createdTask.save();
   console.log(newuser,'no new user error')
 } catch (err) {
   console.log("saving error");
   const error = new HttpError(
     "Tasking up failed, please try again later.",
     500
   );
   return next(error);
 }

 res.status(201).json({ user: createdTask.toObject({ getters: true }) });
}
const getTasks = async(req,res,next)=>{
    const {userid} = req.body
    let tasks = await TaskModel.find({userid})
    // console.log(tasks)
    res.json({tasks})
}
const updateTasks= async(req,res,next)=>{
      const {userid,taskname,status}=req.body
      let newstatus= status.slice(0,status.length-1)
      // console.log(newstatus)
   
          await TaskModel.updateOne({userid:userid,taskname:taskname},{$set:{status:newstatus}})
       
      let tasks = await TaskModel.find({userid,taskname})
      if(tasks){
      res.json(true)
      }
      // console.log(tasks);
}

const deleteTasks = async(req,res,next)=>{
  const {userid,taskname}=req.body
  await TaskModel.deleteOne({userid:userid,taskname:taskname})
}

const sortTasks = async(req,res,next)=>{
  // console.log(req.body)
  const {userid,status} =  req.body
  try{
  const sorted = await TaskModel.find({userid:userid,status:status})
  res.json({sorted})
  }
  catch(err){
    console.log(err)
  }

}

exports.create= create
exports.getTasks= getTasks
exports.updateTasks= updateTasks
exports.deleteTasks=deleteTasks
exports.sortTasks=sortTasks