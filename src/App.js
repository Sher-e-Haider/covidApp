
import './App.css';
import Cards from './components/Cards/Cards'
import Chart from './components/Chart/Chart'
import CountryPicker from './components/CountryPicker/CountryPicker'
import styles from './App.module.css'
import {fetchData } from './api/index'
import { useEffect, useState } from 'react';
import coronaImage from './imgg/image.png'

import React, { Component } from 'react';

export default class App extends Component {
  
   state={
     data:{},
     country:''
   }

  // const [data,setData] =useState([])
  // const [loading,setLoading] =useState(false)

  // useEffect(() => {
  //   const dataTeken =async()=>{
  //     setLoading(false)
  //     const fetchedData = await fetchData()
      
  //     setLoading(true)
  //     if(loading){
  //        setData(fetchedData) 
  //        console.log(data);
  //       }
     

     
     
  //   }
  //   dataTeken()
  // }, [])

  handleCountryChange = async(country)=>{
    console.log(country);
    const fetchedData = await fetchData(country)
    console.log(fetchedData);
    this.setState({data:fetchedData,country:country})

  }

  async componentDidMount(){
    const fetchedData = await fetchData()
    // console.log( fetchedData );
    this.setState({data:fetchedData})
  }
  render() {
    const {data,country} = this.state
   
  return (
   <div className={styles.container}>
   <img src={coronaImage} className={styles.image} alt="COVID19" />
     <Cards data={data} />
     <CountryPicker handleCountryChange={this.handleCountryChange} />
     <Chart data={data} country={country} />
     
    
   </div>
  );
}
}
