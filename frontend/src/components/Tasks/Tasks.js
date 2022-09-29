import CreateTasks from "./CreateTasks"
import { useEffect,useState } from "react"
import { useRequest } from "../../hooks/request-hook"
import useInput from "../../hooks/useInput"
// import Charts from "./Charts"
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Navbar from '../NavBar/Navbar'
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);

const isNotEmpty = (value) => value.trim() !== "";

const Tasks =()=>{
   

    const {sendRequest} = useRequest()
    const [Tasks,setTasks] = useState([])
    const [array,setarray] = useState([])
    const [loading,setLoading] = useState(false)
    const [c1,setc1] = useState(0)
    const [c2,setc2] = useState(0)
    const [c3,setc3] = useState(0)
    const [show,setshow] = useState(false)
    const { value: statusvalue,valueChangeHandler:statusChange,reset:resetStatus} = useInput(isNotEmpty);
    
    useEffect(()=>{
        const fetchTasks =async()=>{
            // setloading(true)
            try {
                if (localStorage.hasOwnProperty("userid")) {
                    // setLoading(true)
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
                        // console.log(responseData.tasks)
                        // setLoading(false)
                        setTasks(responseData.tasks)
                        function jsonArrayTo2D(arrayOfObjects){
                            let header = [],
                                AoA = [];
                            arrayOfObjects.forEach(obj => {
                              Object.keys(obj).forEach(key => header.includes(key) || header.push(key))
                              let thisRow = new Array(header.length);
                              header.forEach((col, i) => thisRow[i] = obj[col] || '')
                              AoA.push(thisRow);
                            })
                            AoA.unshift(header);
                            return AoA;
                          }
                          let arr=[]
                          let newarr=[]
                          let newsarr=[]
                          arr= jsonArrayTo2D(responseData.tasks)
                          newarr=responseData.tasks.map(data=>{return(data.priority)})
                        //   console.log(newarr)
                          let count1=0,count2=0,count3=0;
                          for(let i =0;i<newarr.length;i++){
                              if(newarr[i]==='low'){count1++}
                              if(newarr[i]==='medium'){count2++}
                              if(newarr[i]==='high'){count3++}
                            }
                            newsarr.push(['Priority','Count'])
                            newsarr.push(['Low',count1])
                            newsarr.push(['Medium',count2])
                            newsarr.push(['High',count3])
                            setarray(newsarr)
                          setc1(count1)
                          setc2(count2)
                          setc3(count3)
                        // console.log(newsarr)
                    } }catch (err) {
                        console.log(err)
          }
        }
        fetchTasks()
    }
    ,[sendRequest,setTasks])
    
    const showHandler=()=>{
        setshow(true)
    }
    const closeHandler=()=>{
        setshow(false)
    }
    const data = {
        datasets: [{
            data: [c1, c2, c3],
            backgroundColor:[
              'red',
              'blue',
              'yellow'
            ]
        },
      ],
      labels: [
          'Low',
          'Medium',
          'High'
      ], 
    };
    const saveHandler=async(e)=>{
        // console.log(e.target.value,statusvalue)
        window.location.reload()
        if (localStorage.hasOwnProperty("userid")) {
            // setLoading(true)
            const responseData = await sendRequest(
                'http://localhost:5002/tasks/updateTasks',
                'POST',
                JSON.stringify({
                    userid: localStorage.getItem("userid"),
                    taskname:e.target.value,
                    status: statusvalue
                }),
                {
                    "Content-Type": "application/json",
                }
                );
              
            }
    }
    const deleteHandler=async(e)=>{
    window.location.reload()
        if (localStorage.hasOwnProperty("userid")) {
            const responseData = await sendRequest(
                'http://localhost:5002/tasks/deleteTasks',
                'POST',
                JSON.stringify({
                    userid: localStorage.getItem("userid"),
                    taskname:e.target.value
                }),
                {
                    "Content-Type": "application/json",
                }
                );
             
            }
            
    }
    let i=0
    return (
        <>
        <Navbar />
       <div className="any" style={{width:'25%', height:'25%'}}>
        <Pie data={data} />
       </div>
        {/* {console.log(Tasks)} */}
        <h1 style={{textAlign:"center",color:"red",textDecoration:"underline"}}>All Tasks</h1>
       
        {show && <CreateTasks />}
        <div className="auto"> 
        <button className="button-20" onClick={showHandler}>Add Tasks</button>
        <button className="button-20" onClick={closeHandler}>Close</button>
        </div>
        {/* {loading && <p>Loading.. Please Wait</p>} */}
        { Tasks.length!=0 && Tasks?.map(data=>{
            i++
            return(<div className="options">
                 <h2 className="col">Task Name: {data.taskname}</h2>
                 <h4 className="col">Task Description: {data.taskdes}</h4>
                 <h4 className="col">Start Date: {data.startDate} </h4>
                <h4 className="col">End Date: {data.endDate}</h4>
                <h4 className="col">Priority: {data.priority}</h4>
                {/* <h4>Current Status: {data.status}</h4> */}
                 <select value={statusvalue} onChange={statusChange} className="select">
                 <option>Current Status: {data.status}</option>
                  <option value={"Planned"+i}>Planned</option>
                    <option value ={"Doing"+i}>Doing</option>
                    <option value ={"Done"+i}>Done</option>
                 </select>
                 <br></br>
                
                <button className="button-87" value={data.taskname} onClick={saveHandler}>Save Changes</button> 
                {/* //used for saving status of work} */}
                <button className="button-87" value={data.taskname} onClick={deleteHandler}>Delete Changes</button>
            
               </div>)
                
        })}
        </>
    )
}

export default Tasks