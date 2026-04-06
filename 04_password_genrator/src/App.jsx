import { useState,useEffect ,useCallback} from 'react'



function App() {
  const[password,setPassword]=useState("")
  const[lenght,setLenght]=useState(10)

  const[isNumberUsed,setIsnumberUsed]=useState(true)
  const[isSpecialCharUsed,setIsSpecialCharUsed]=useState(true)
  const[isUpperCaseUsed,setIsUpperCaseUsed]=useState(true)

  const genretatePassword=useCallback(()=>{
    let str="abcdefghijklmnopqrstuvwxyz"
    let pass=""

    if(isNumberUsed)str+="0123456789"
    if(isSpecialCharUsed)str+="!@#$%^&*"
    if(isUpperCaseUsed)str+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for(let i=0;i<lenght;i++){
      let random=Math.floor(Math.random()*str.length)
      pass+=str[random]
    }
    setPassword(pass)
    
  })
  
  useEffect(()=>{
    genretatePassword()
  },[lenght,isNumberUsed,isSpecialCharUsed,isUpperCaseUsed])

  const copyPassowrd=()=>{
    window.navigator.clipboard.writeText(password)
    alert("password copied!!")
  }

  return (
    <>
      <h1>Password Generator</h1>
      <input
      value={password}
      readOnly
      >
      </input>
      <input type="number"
      value={lenght}
      onChange={(e)=>setLenght(Number(e.target.value))}
      />
      <button onClick={copyPassowrd}>Copy</button>
      <p>Numbers</p>
      <input type="checkbox" checked={isNumberUsed} onChange={()=>setIsnumberUsed(!isNumberUsed)} />
      <p>Uppercase</p>
      <input type="checkbox" checked={isUpperCaseUsed} onChange={()=>setIsUpperCaseUsed(!isUpperCaseUsed)} />
      <p>Charaters</p>
      <input type="checkbox" checked={isSpecialCharUsed} onChange={()=>setIsSpecialCharUsed(!isSpecialCharUsed)} />
      <button onClick={genretatePassword}>Generate</button>
    </>
  )
}

export default App
