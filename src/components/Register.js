import React, {useState} from 'react';
import RegisterButton from './RegisterButton';
let username = "";
let password = "";
let confPassword = "";
function Register(props){

     function updateUsername(e){
        if (isError()){
            setErrorText("");
            props.setRegisterError("");
        }
          username = e.target.value;
     }
     function updatePassword(e){
        if (isError()){
            setErrorText("");
            props.setRegisterError("");
        }
          password = e.target.value;
     }
    function updateConfirmPassword(e){
        confPassword = e.target.value;
        if (isError()){
            setErrorText("");
            props.setRegisterError("");
        }
        if (showPasswordsMismatch){
            setShowPasswordsMismatch(false);
            setErrorText("");
        }
    }
     function tryRegister(){
         if (password === confPassword){
          props.tryRegister(username, password);
         }
         else{
            setShowPasswordsMismatch(true);
            setErrorText("Passwords must match")
         }
     }
    function isError(){
        return errorText || showPasswordsMismatch || props.registerError.length > 0;
    }
    function onKeyPress(e){
        if (e.key == 'Enter'){
           props.tryRegister(username,password);
        }
    }
    const [errorText, setErrorText] = useState("");
    const [showPasswordsMismatch, setShowPasswordsMismatch] = useState(false);
   return (
        <div className="flex items-center justify-center fixed z-[1000] h-screen w-screen">
            <div className="relative flex flex-col items-center shadow-md
                    justify-center bg-stone-200  w-[500px] rounded-lg p-5">
                {(props.registerError || errorText) &&
                    <p className="text-red-600 ">{errorText || props.registerError}</p>}
                    <div className="flex justify-center w-full h-2/3 mt-5">
                         <div className="flex justify-center items-end flex-col w-1/2 space-y-4"  >
                              <p className="pr-2 py-2">
                              Username:
                              </p>
                              <p className="pr-2 py-2">
                              Password:
                              </p>
                              <p className="pr-2 py-2">
                              Confirm Password:
                              </p>
                         </div>
                         <div className="flex flex-col justify-center space-y-4 items-start w-full " >
                             <input onKeyPress={onKeyPress}
                                 maxLength="12" onChange={(e) => updateUsername(e)}
                              id="username"
                              className = "shadow appearance-none border  rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-blue-500"  type="text"/>
                              <input onKeyPress={onKeyPress}
                                  onChange={(e) => updatePassword(e)}
                              id="password"
                              className = "shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-blue-500" type="password" placeholder="******************" />
                              <input onKeyPress={onKeyPress}
                                  onChange={(e) => updateConfirmPassword(e)}
                              id="password"
                              className = "shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-blue-500" type="password" placeholder="******************" />
                             {showPasswordsMismatch && <img className="absolute right-6 bottom-[80px] w-5"
                             src="/res/passwordMismatch.png" alt="mismatch"/>}
                         </div>
                    </div>
                    <RegisterButton tryRegister={tryRegister} className="mt-3"/>
                <button className="absolute right-2 bottom-2 text-m underline text-blue-500 hover:text-blue-700
                    visited:text-purple-600" onClick={() => props.showLogin()}>
                    Back to Login
                </button>
               </div>
          </div>
   )
}
export default Register
