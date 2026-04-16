import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Users() {
    const [users,setUsers]=useState(null)
    const [error,setError]=useState("")
    const [loading,setLoading]=useState( true)
    useEffect(()=>{
        axios.get('https://api.freeapi.app/api/v1/public/randomusers').then((res)=>{
            console.log(res.data.data.data);
            setUsers(res.data.data.data)
            setLoading(false)
            
        }).catch(()=>{
            setError("Failed to fetch data from api")
            setLoading(false)
        })
    },[])
    if(loading) return <h2>Loading data from API.....</h2>
    if(error) return <h2>{error}</h2>
  return (
    <div>
      <h1>Users List</h1>
        {users.map((user,index)=>(
                <div key={index}>
                <Link to={`/users/${index}`}>
                    {user.name.first} {user.name.last}
                </Link>
                </div>
            ))}
    </div>
  )
}

export default Users
