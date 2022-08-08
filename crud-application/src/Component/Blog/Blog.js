import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Blog({item}) {

// console.log(item)
const navigate = useNavigate();

const handleclick = (e)=>{
  localStorage.setItem('selctedid', JSON.stringify(e))
navigate(`/${item.id}`)

}

  return (
    <div  >
      <div>
        <img src={item.image} alt='blogimg'/>
      </div>

      <div>
        <h2>{item.title}</h2>
      </div>

      <div>
        <button onClick={()=>handleclick(item.id)}>Details</button>
      </div>


      <hr/>
    </div>
  )
}
