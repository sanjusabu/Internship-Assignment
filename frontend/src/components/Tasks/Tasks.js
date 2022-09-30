import CreateTasks from "./CreateTasks"
import { useEffect,useState } from "react"
import { useRequest } from "../../hooks/request-hook"
import useInput from "../../hooks/useInput"
// import Charts from "./Charts"
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';
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
    const [cn1,setcn1] = useState(0)
    const [cn2,setcn2] = useState(0)
    const [cn3,setcn3] = useState(0)
    const [show,setshow] = useState(false)
    const { value: statusvalue,valueChangeHandler:statusChange,reset:resetStatus} = useInput(isNotEmpty);
    const { value: sortvalue,valueChangeHandler:sortChange,reset:resetSort} = useInput(isNotEmpty);
    
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
                          newsarr=responseData.tasks.map(data=>{return(data.status)})
                        //   console.log(newarr)
                          let count1=0,count2=0,count3=0;
                          for(let i =0;i<newarr.length;i++){
                              if(newarr[i]==='low'){count1++}
                              if(newarr[i]==='medium'){count2++}
                              if(newarr[i]==='high'){count3++}
                            }
                            let ct1=0,ct2=0,ct3=0;
                            for(let i =0;i<newarr.length;i++){
                                if(newsarr[i]==='Planned'){ct1++}
                                if(newsarr[i]==='Doing'){ct2++}
                                if(newsarr[i]==='Done'){ct3++}
                              }
                          setc1(count1)
                          setc2(count2)
                          setc3(count3)
                          setcn1(ct1)
                          setcn2(ct2)
                          setcn3(ct3)
                        console.log(ct1,ct2,ct3)
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
              '#3c005a',
              '#00592D',
              '#D22B2B'
            ]
        },
      ],
      labels: [
          'Low',
          'Medium',
          'High'
      ], 
    };
    const statusData = {
        datasets: [{
            data: [cn1, cn2, cn3], 
            backgroundColor:[
              '#47B39C',
              'orange',
              'green'
            ]
        },
    ],
      labels: [
          'Planned',
          'Doing',
          'Done'
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
    const sortHandler=async(e)=>{
        console.log(e.target.value)
        if (localStorage.hasOwnProperty("userid")) {
            const responseData = await sendRequest(
                'http://localhost:5002/tasks/sortTasks',
                'POST',
                JSON.stringify({
                    userid: localStorage.getItem("userid"),
                    status:e.target.value
                }),
                {
                    "Content-Type": "application/json",
                }
                );
                console.log(responseData.sorted)
                setTasks(responseData.sorted)
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
       <div className="first">
        <Pie data={data} />
       </div>

       <div className="second">
        <Pie data={statusData} />
       </div>
        <h2 style={{textAlign:"left"}}>Priority of Tasks</h2>
        <h2 style={{textAlign:"right"}}>Task Status</h2>
    
        <h1 style={{textAlign:"center",color:"red",textDecoration:"underline"}}>All Tasks</h1>
        <div className="dems">
        <select value={sortvalue} onChange={sortChange} className="selects">
                <option>Sort on Status</option>
                <option value={"Planned"}>Planned</option>
                <option value ={"Doing"}>Doing</option>
                <option value ={"Done"}>Done</option>
        </select>
        <button className="button-20" value={sortvalue} onClick={sortHandler}>Sort</button>
        </div>

        {show && <CreateTasks />}
        <div className="auto"> 
        <button className="button-20" onClick={showHandler}>Add Tasks</button>
        <button className="button-20" onClick={closeHandler}>Close</button>
        </div>
      
        { Tasks.length!=0 && Tasks?.map(data=>{
            i++
            return(<div className="options">
                 <h2 style={{color:"black",fontSize:"2rem"}}>Task Name: {data.taskname}</h2>
                 <h4 style={{color:"black",fontSize:"1.3rem"}}>Task Description: {data.taskdes}</h4>
                 <h4 style={{color:"black",fontSize:"1.5rem"}}>Start Date: {data.startDate} </h4>
                <h4 style={{color:"black",fontSize:"1.5rem"}}>End Date: {data.endDate}</h4>
                <h4 style={{color:"black",fontSize:"1.5rem"}}>Priority: {data.priority}</h4>
              
                 <select value={statusvalue} onChange={statusChange} className="select">
                 <option>Current Status: {data.status}</option>
                  <option value={"Planned"+i}>Planned</option>
                    <option value ={"Doing"+i}>Doing</option>
                    <option value ={"Done"+i}>Done</option>
                 </select>
                 <br></br>
                <div className="del">
                <button className="button-87" value={data.taskname} onClick={saveHandler}>Save Changes</button> 
                {/* //used for saving status of work} */}
                </div>
                <div className="del">
                <button className="button-87" value={data.taskname} onClick={deleteHandler}>Delete Changes</button>
                </div>
               </div>)
                
        })}
        </>
    )
}

export default Tasks