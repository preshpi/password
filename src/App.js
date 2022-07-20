import React, { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './component/message';
import { BiCopy } from 'react-icons/bi';
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './component/checkbox';
import { toast, ToastContainer } from 'react-toastify';



function App() {
  const [password, setPassword] =useState('');
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePassword = (e) => {

    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
       notify('You must select at least one option ', true)
    }
    let characterList  = ''

    if(includeLowercase)  {
      characterList = characterList + lowerCaseLetters
    }

    if(includeUppercase)  {
      characterList = characterList + upperCaseLetters
    }

    if(includeNumbers)  {
      characterList = characterList + numbers
    }

    if(includeSymbols)  {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))

  }

  const createPassword = (characterList) => {
     let password = ''
     const characterListLength = characterList.length

     for(let i=0; i < passwordLength; i++){
      const characterIndex =Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
     }
     return password
  }

  const copyToclipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
        toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
  
  }


  const handleCopyPassword = (e) => {
    if(password === ''){
      notify('Nothing to copy, Sigh!', true)
    }else{
       copyToclipboard()
   notify(COPY_SUCCESS)
    }
  
  }


  return (
    <div className="App">
     <div className="container">
      <div className="generator">
        <h2 className="generator_header">
          Password Generator
        </h2>
        <div className="generator_password">
          <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copy-btn">
           <BiCopy/>
           </button>
        </div> 

      
      
            <div className="form-group">
              <label for="password-strength">Password-length</label>
              <input 
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
                type="number" 
                id="password-strength" 
                name="password-strength"
                max="20"
                min="10">

              </input>
           </div>

           <div className="form-group">
              <label for="uppercase-letters">Include Uppercase letters</label>
              <input 
               checked={includeUppercase}
               onChange={(e) => setIncludeUppercase (e.target.checked)}
                type="checkbox" 
                id="uppercase-letters"> 
              </input>
           </div>

           <div className="form-group">
            <label for="lowercase-letters">Include lowercase letters</label>
              <input 
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
               type="checkbox" 
                id="lowercase-letters" 
                name="lowercase-letters">             
              </input>
           </div>

           <div className="form-group">
            <label for="include-numbers">Include Numbers</label>
              <input 
              checkbox={includeNumbers}
              onChange={(e) =>setIncludeNumbers(e.target.checked)}
                type="checkbox" 
                id="include-numbers" 
                name="include-numbers">             
              </input>
           </div>

           <div className="form-group">
              <label for="include-symbols">Include Symbols</label>
                <input 
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                    type="checkbox" 
                    id="include-symbols" 
                    name="include-symbols">             
                  </input>
           </div>

           <button onClick={handleGeneratePassword} className="generator_btn">Generator Password</button>
           <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />


</div>

     </div>
    </div>
  );
}

export default App;
