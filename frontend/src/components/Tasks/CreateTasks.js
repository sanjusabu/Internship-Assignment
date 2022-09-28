import { useRequest } from "../../hooks/request-hook";
import useInput from "../../hooks/useInput";
const isNotEmpty = (value) => value.trim() !== "";

const CreateTasks = () => {
  const { sendRequest } = useRequest();
//   const [checkstartDate,startDates] = useState('') 
//   const [checkendDate,endDates] = useState('') 
  const { value: taskname,valueChangeHandler:taskChange,reset:resetTask } = useInput(isNotEmpty);
  const { value: taskdescription,valueChangeHandler:desChange,reset:resetDesc } = useInput(isNotEmpty);
  const { value: startDate,valueChangeHandler:startChange,reset:resetStart } = useInput(isNotEmpty);
  const { value: endDate,valueChangeHandler:endChange,reset:resetEnd } = useInput(isNotEmpty);
  const { value: priorityvalue,valueChangeHandler:priorityChange,reset:resetPriority,BlurHandler:blur } = useInput(isNotEmpty);
  const { value: statusvalue,valueChangeHandler:statusChange,reset:resetStatus} = useInput(isNotEmpty);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (localStorage.hasOwnProperty("userid")) {
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
      console.log(response)
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
      <form onSubmit={submitHandler}>
        <label for="name">Task Name</label>
        <input id="name" type="text" value={taskname} onChange={taskChange}/>
        <label for="description">Task Description</label>
        <input id="description" type="text" value={taskdescription} onChange={desChange}/>
        <label for="start">Start Date</label>
        <input id="start" type="date" value={startDate} onChange={startChange}/>
        <label for="end">End Date</label>
        
        <input id="end" type="date" value={endDate} onChange={endChange}/>
        <label for="Priority">Choose the Priority</label>
        <select name="Priority" id="Priority" value={priorityvalue} onChange={priorityChange} >
          <option> Select--an--option</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label for="status">Task Status</label>
        <select name="status" id="status" value={statusvalue} onChange={statusChange} >
         
                    <option>Select Status</option>
                    <option value="Planned">Planned</option>
                    <option value ="Doing">Doing</option>
                    <option value ="Done">Done</option>
        </select>

        <button type="submit">Submit Task</button>
      </form>
    </>
  );
};

export default CreateTasks;
