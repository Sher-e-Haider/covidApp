import React, { useEffect, useState } from 'react'
import { fetchDailyData } from '../../api'
import {Line,Bar } from 'react-chartjs-2'
import  registerables from 'chart.js/auto'
import styles from './Chart.module.css'

const Chart = ({data:{confirmed,recovered,deaths},country}) => {
  const [dailyData,setDailyData] = useState([])
  console.log(dailyData);
  useEffect(()=>{
    const fetchApi= async()=>{
      setDailyData(await fetchDailyData())
    }
    fetchApi()
  },[])

  const lineChart=(
    dailyData.length?
    (
       <Line
      data={{
        labels:dailyData.map(({date})=>date),
        datasets:[{
          data:dailyData.map(({confirmed})=>confirmed),
          label:'Infected',
          borderColor:'#3333ff',
          fill:true,
        },
        {
          data:dailyData.map(({deaths})=>deaths),
          label:'Deaths',
          borderColor:'red',
          backgroundColor:'rgba(255,0,0,0.3)',
          fill:true,
        }
        ]
      }}
    />
    ):null
  )

  const barChart = (
    confirmed?(
      <Bar
        data={{
           labels:["Infected","Recovered","Deaths"],
           datasets:[{
             label:'People',
             backgroundColor:['rgba(0, 0, 255, 0.5)',
                              'rgba(35, 255, 31, 0.797)',
                              'rgba(255, 0, 0, 0.5)'],
            data:[confirmed.value,recovered.value,deaths.value]
           }]
        }}
        options={{
          legend:{display:false},
          title:{display:true,text:`current state in ${country}`}
        }}
      />
    ):null
  )
  return (
   <div className={styles.container}>
   {country?barChart: lineChart}
   </div>
  )
}

export default Chart
