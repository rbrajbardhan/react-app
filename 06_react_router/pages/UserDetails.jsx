import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'


function UserDetails() {
    const {id}=useParams()
    const[user,setuser]=useState(null)
    const [loading,setLoading]=useState( true)
   useEffect(()=>{
    axios.get('https://api.freeapi.app/api/v1/public/randomusers').then((res)=>{
        setuser(res.data.data.data[id])
        setLoading(false)
    })
   },[id])

   if(loading) return <h2>Loading data from API.....</h2>

  return (
    <div>
      <img src={user.picture.large}></img>
      <h1>{user.name.first}{user.name.last}</h1>
      <p>Email:{user.email}</p>
      <p>{user.location.city}</p>
      <p>{user.location.country}</p>
      <p>{user.registered.phone}</p>
    </div>
  )
}

export default UserDetails
