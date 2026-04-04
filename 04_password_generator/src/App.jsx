import { useState } from 'react'


function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(10)

  const [isNumberUsed, setIsNumberUsed] = useState(true)
  const [isSpecialCharUsed, setIsSpecialCharUsed] = useState(true)
  const [isUppercaseUsed, setIsUppercaseUsed] = useState(true)
  
  const generatePassword = () => {
    let str="abcdefghijklmnopqrstuvwxyz"
    let password=""

    if(isNumberUsed) str += "0123456789"
    if(isSpecialCharUsed) str += "!@#$%^&*()_+"
    if(isUppercaseUsed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for(let i=0; i<length; i++){
      let random=Math.floor(Math.random() * str.length)
      password += str[random]
    }
    setPassword(password)
  }
  console.log(password)

  return (
    <>
    
    </>
  )
}

export default App
