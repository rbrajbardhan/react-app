import React from 'react'

function Card(props) {
  console.log(props);
    
  return (
    <div className='h-75 w-55 bg-gray-600 b-4 flex-column justify-content-center items-center p-10'>
      <img className='h-37.5 w-37.5 rounded-circle' src={props.img} alt="user pic" />
      <h5 className='font-sans text-amber-100 text-center'>{props.name}</h5>
      <p className='font-sans text-amber-100 text-center'>{props.decription}</p>
    </div>
  )
}

export default Card
