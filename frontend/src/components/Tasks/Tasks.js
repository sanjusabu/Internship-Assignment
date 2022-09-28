import CreateTasks from "./CreateTasks"
import { useEffect,useState } from "react"
import { useRequest } from "../../hooks/request-hook"
import useInput from "../../hooks/useInput"
const isNotEmpty = (value) => value.trim() !== "";

const Tasks =()=>{
    const {sendRequest} = useRequest()
    const [Tasks,setTasks] = useState([])
    const { value: statusvalue,valueChangeHandler:statusChange,reset:resetStatus} = useInput(isNotEmpty);
    
    useEffect(()=>{
        const fetchTasks =async()=>{
            // setloading(true)
            try {
                if (localStorage.hasOwnProperty("userid")) {
                    // setloading(true)
                    const responseData = await sendRequest(
                        'http://localhost:5002/tasks/getTasks',
                        'POST',
                        JSON.stringify({
                            userid: localStorage.getItem("userid")
                        }),
                        {
                            "Content-Type": "application/json",
                        }
                        );
                        console.log(responseData.tasks)
                        
                        setTasks(responseData.tasks)
                        
                    } }catch (err) {
                        console.log(err)
          }
        }
        fetchTasks()
    }
    ,[sendRequest,setTasks])
    
    return (
        <>
        <CreateTasks />
        {console.log(Tasks)}
        <h1>Tasks</h1>
        {Tasks.length!=0 && Tasks?.map(data=>{
            const saveHandler =()=>{
                
            }
            return(<div >
                 <h2>{data.taskname}</h2>
                 <p >{data.taskdes}</p>
                 <h4 >{data.startDate} </h4>
                <h4>{data.endDate}</h4>
                <h4>{data.priority}</h4>
                <h4>Current Status: {data.status}</h4>
                 <select value={statusvalue} onChange={statusChange}>
                 <option>{data.status}</option>
                  <option value="Planned">Planned</option>
                    <option value ="Doing">Doing</option>
                    <option value ="Done">Done</option>
                 </select>
                <button onClick={saveHandler}>Save Changes</button>
               </div>)
        })}
        </>
    )
}

export default Tasks