import { useRequest } from "../../hooks/request-hook";
import useInput from "../../hooks/useInput";
import { useEffect,useState } from "react";

const isNotEmpty = (value) => value.trim() !== "";

const CreateTasks = () => {
  const { sendRequest } = useRequest();
//   const [checkstartDate,startDates] = useState('') 
  const [formValid,setformValid] = useState(false) 
  const { value: taskname,valueChangeHandler:taskChange,reset:resetTask } = useInput(isNotEmpty);
  const { value: taskdescription,valueChangeHandler:desChange,reset:resetDesc } = useInput(isNotEmpty);
  const { value: startDate,valueChangeHandler:startChange,reset:resetStart } = useInput(isNotEmpty);
  const { value: endDate,valueChangeHandler:endChange,reset:resetEnd } = useInput(isNotEmpty);
  const { value: priorityvalue,valueChangeHandler:priorityChange,reset:resetPriority,BlurHandler:blur } = useInput(isNotEmpty);
  const { value: statusvalue,valueChangeHandler:statusChange,reset:resetStatus} = useInput(isNotEmpty);
  useEffect(()=>{
    if(startDate && endDate )
{    const x = new Date(startDate)
    const y = new Date(endDate)
      if(x>y){
        setformValid(false)
      }
      else{
        setformValid(true)
      }
     
  }
},[startDate,endDate])


  const submitHandler = async (e) => {
    // e.preventDefault();
    if (localStorage.hasOwnProperty("userid")) {
     
      // console.log(typeof(startDate),endDate)
      const response = await sendRequest(
        "http://localhost:5002/tasks/create",
        "POST",
        JSON.stringify({
          userid: localStorage.getItem("userid"),
          taskname: taskname,
          taskdes: taskdescription,
          startDate: startDate,
          endDate: endDate,
          priority:priorityvalue,
          status:statusvalue
        }),
        { "Content-Type": "application/json" }
      );
      // console.log(response)
      resetTask()
      resetDesc()
      resetEnd()
      resetStart()
      resetPriority()
      resetStatus()
    }
  };
  return (
    <>
      <form onSubmit={submitHandler} className="form">
      <div className="input-container ic3">
        <label for="name" style={{color:"black"}}>Task Name</label>
        <input id="name" className="input" type="text" value={taskname} onChange={taskChange}/>
      </div>
        <div className="input-container ic3">
        <label for="description"  style={{color:"black"}}>Task Description</label>
        <input id="description" type="text" className="input" value={taskdescription} onChange={desChange}/>
        </div>
        <div className="input-container ic3">
          <label for="start" style={{color:"black"}}>Start Date</label>
        <input id="start" type="date" className="input" value={startDate} onChange={startChange}/>
        </div>
        <div className="input-container ic3">
        <label for="end" style={{color:"black"}}>End Date</label>
        <input id="end" type="date" className="input" value={endDate} onChange={endChange}/>
        </div>
        <div className="input-container ic3">
        <label for="Priority" style={{color:"black"}}>Choose the Priority</label>
        <select name="Priority" className="input" id="Priority" value={priorityvalue} onChange={priorityChange} >
          <option> Select--an--option</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        </div>
        <div className="input-container ic3">
        <label for="status" style={{color:"black"}}>Task Status</label>
        <select name="status" className="input" id="status" value={statusvalue} onChange={statusChange} >
         
                    <option>Select Status</option>
                    <option value="Planned">Planned</option>
                    <option value ="Doing">Doing</option>
                    <option value ="Done">Done</option>
        </select>
        </div>
        
        <button className="button-87" disabled={!formValid} type="submit">Submit Task</button>
        
      </form>
    </>
  );
};

export default CreateTasks;
