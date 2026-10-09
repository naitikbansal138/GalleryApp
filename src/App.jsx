import React, { useEffect, useState } from 'react'
import axios from'axios'
import Card from './components/Card'

const App = () => {

  const [userdata, setuserdata] = useState([])

  const [index, setindex] = useState(1)

  const getdata = async()=>{
   const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
   setuserdata(response.data)
   
  }

  useEffect(function(){
    getdata()
  },[index])

let printuserdata = <h3 className='text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>

if(userdata.length > 0){
  printuserdata = userdata.map(function(elem,idx){
    return <div key = {idx}>
      <Card elem = {elem}/>
    </div>
  })
}

  return (
    <div className='bg-black overflow-auto h-screen  p-4 text-white'>
      
       <div className='h-[82%] flex flex-wrap gap-5 p-2'>
      {printuserdata}
    </div>
    <div className='flex justify-center items-center p-4 gap-6'>
      <button onClick={()=>{
         if(index > 1){
           setindex(index-1)
           setuserdata([])
         }
          
      }}
      style = {{opacity :index == 1?0.5:1}}
      className='bg-amber-500 text-black cursor-pointer active:scale-95 text-sm rounded px-4 py-2'>prev</button>
      <h4>page {index}</h4>
      <button onClick={()=>{
        setuserdata([])
          setindex(index+1)
      }}
      className='bg-amber-500 text-black cursor-pointer active:scale-95 text-sm rounded px-4 py-2'>next</button>
    </div>
    </div>
   
  )
}

export default App
