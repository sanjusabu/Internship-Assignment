import CreateTasks from "./CreateTasks"
import { useEffect,useState } from "react"
import { useRequest } from "../../hooks/request-hook"
import useInput from "../../hooks/useInput"
// import Charts from "./Charts"
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);

const isNotEmpty = (value) => value.trim() !== "";

const Tasks =()=>{
    const data = {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor:[
              'red',
              'blue',
              'yellow'
            ]
        },
      ],
      labels: [
          'Red',
          'Yellow',
          'Blue'
      ], 
    };

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
                if(responseData){
                // setLoading(false)
                }
            }
    }
    let i=0
    return (
        <>
        
        {/* <Charts ct1={c1} ct2={c2} ct3={c3}/> */}
        
       <div className="any" style={{width:'40%', height:'40%'}}>
        <Pie data={data} />
       </div>
        {/* {console.log(Tasks)} */}
        <h1>Tasks</h1>
       
        {show && <CreateTasks />}
        <div> 
            <button onClick={showHandler}>Add Tasks</button>
        <button onClick={closeHandler}>Close</button>
        </div>
        {/* {loading && <p>Loading.. Please Wait</p>} */}
        { Tasks.length!=0 && Tasks?.map(data=>{
            i++
            return(<div >
                 <h2>{data.taskname}</h2>
                 <p >{data.taskdes}</p>
                 <h4 >{data.startDate} </h4>
                <h4>{data.endDate}</h4>
                <h4>{data.priority}</h4>
                {/* <h4>Current Status: {data.status}</h4> */}
                 <select value={statusvalue} onChange={statusChange}>
                 <option>Current Status: {data.status}</option>
                  <option value={"Planned"+i}>Planned</option>
                    <option value ={"Doing"+i}>Doing</option>
                    <option value ={"Done"+i}>Done</option>
                 </select>
                <button value={data.taskname} onClick={saveHandler}>Save Changes</button>
               </div>)
                
            
        })}
        </>
    )
}

export default Tasks