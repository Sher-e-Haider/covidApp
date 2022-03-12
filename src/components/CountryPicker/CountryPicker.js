import { FormControl, NativeSelect } from '@material-ui/core'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {countries} from '../../api/index'

const CountryPicker = ({handleCountryChange}) => {
  const [state,setState] = useState([])
  console.log(state,'stta');

  useEffect(()=>{
    const fetchApi= async()=>{
       setState(await countries())
    }
    fetchApi()
  },[setState])
  return (
    <div>
      <FormControl>
        <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)} >
          <option value="" >Global</option>
          {state.map((x,ind)=> <option key={ind} value={x}>{x}</option> )}
        </NativeSelect>
      </FormControl>
    </div>
  )
}

export default CountryPicker
