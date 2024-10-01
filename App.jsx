import React, { useCallback ,useState,useEffect,useRef} from "react";

function App()
{
  const [length,setLength] = useState(4);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");

//use ref hook
 const passwordRef = useRef(null);
 
 const copyPasswordToClipboard= useCallback(()=>{
  passwordRef.current?.select();
   window.navigator.clipboard.writeText(password)   
 ,[password]})
  const passwordGenerator = useCallback(()=>{
         let pass="";
         let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"   
         if(numberAllowed) str += "0123456789"    
         if(charAllowed) str+="!@#$%^&*()_+{}[]?~"

         for(let i=1; i<=length;i++)
         {
             let char = Math.floor(Math.random()*str.length+1)
             pass += str.charAt(char);
         }
         setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]);
 useEffect(()=>{
  passwordGenerator()
 },[length,numberAllowed,charAllowed,passwordGenerator])
  return(
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4  my-8 text-orange-500 bg-gray-700">

      <h1 className="text-center text-white text-xl my-2">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
        type="text" 
        value={password} 
        className="outline-none w-full py-1 px-3"
        placeholder="password"
        readOnly
        ref={passwordRef}/>
        <button
         onClick={copyPasswordToClipboard}
         className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
       <div className="flex items-center gap-x-1">
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className="cursor-pointer"
        onChange={(e)=>{setLength(e.target.value)}}
         />
         <label>length:{length}</label>
         </div>
         <div className="flex items-center gap-x-1">

         <input
         type="checkbox"
         defaultChecked={numberAllowed}    
         id="numberInput"     
         onChange={()=>{
          setNumberAllowed((prev)=> !prev);
         }}
         />

         <label htmlFor="numberInput">Numbers</label>
         </div>

         <div className="flex items-center gap-x-1">

         <input
         type="checkbox"    
         id="numberInput"
         defaultChecked={charAllowed}    
         onChange={()=>{
          setCharAllowed((prev)=> !prev);
         }}
         />

         <label htmlFor="characterInput">Character</label>
         </div>
         </div>
     </div>
    </>
  )
}
export default App;