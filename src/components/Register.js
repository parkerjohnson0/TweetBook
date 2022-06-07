import React, {useState} from 'react';
import RegisterButton from './RegisterButton';
let username = "";
let password = "";
let confPassword = "";
function Register(props){

     function updateUsername(e){
          username = e.target.value;
     }
     function updatePassword(e){
          password = e.target.value;
         console.log(password);
     }
    function updateConfirmPassword(e){
        confPassword = e.target.value;
        console.log(confPassword);
    }
     function tryRegister(){
         if (password === confPassword){
          props.tryRegister(username, password);
         }
         else{
            setShowPasswordsMismatch(true);
         }
     }
    const [showPasswordsMismatch, setShowPasswordsMismatch] = useState(false);
   return (
        <div className="flex items-center justify-center fixed z-[1000] h-screen w-screen">
            <div className="relative flex flex-col items-center shadow-md
                    justify-center bg-stone-200 h-64 w-[500px] rounded-lg">
                    <div className="flex justify-center  w-full h-2/3 ">
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
                             <input maxLength="12" onChange={(e) => updateUsername(e)}
                              id="username"
                              className = "shadow appearance-none border  rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-blue-500"  type="text"/>
                              <input onChange={(e) => updatePassword(e)}
                              id="password"
                              className = "shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-blue-500" type="password" placeholder="******************" />
                              <input onChange={(e) => updateConfirmPassword(e)}
                              id="password"
                              className = "shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-blue-500" type="password" placeholder="******************" />
                             {showPasswordsMismatch && <img className="absolute right-3 bottom-20 w-8"
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
