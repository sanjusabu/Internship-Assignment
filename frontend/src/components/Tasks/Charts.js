import React from "react";
import { CChart } from '@coreui/react-chartjs'
const Charts=(props)=>{
    
    return (
        <>
    <CChart
  type="doughnut"
  data={{
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        data: [props.ct1,props.ct2,props.ct3],
      },
    ],
  }} />
        </>)
}

export default Charts