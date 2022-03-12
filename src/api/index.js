import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData= async(country)=>{
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}`
    }
    try {
    const {data:{confirmed,recovered,deaths,lastUpdates}} = await axios.get(changeableUrl)
    return {confirmed,recovered,deaths,lastUpdates}
   
} catch (error) {
    console.log(error);
}
}

export const fetchDailyData= async()=>{
    try {
        const {data} = await axios.get(`${url}/daily`)
        const modifiedData = data.map(x=>({
            confirmed:x.confirmed.total,
            deaths:x.deaths.total,
            date:x.reportDate,
        }))
        return modifiedData
    } catch (error) {
        console.log(error);
    }
}

export const countries = async()=>{
    try {
        const {data:{countries}} = await axios.get(`${url}/countries`)
        return countries.map((x)=>x.name)
    } catch (error) {
        console.log(error);
    }
}