import React from 'react';
import LoginButton from './LoginButton'
let username = "";
let password = "";
function Login(props) {
     function updateUsername(e){
          username = e.target.value;
     }
     function updatePassword(e){
          password = e.target.value;
     }
     function tryLogin(){
          props.tryLogin(username, password);
     }
   return (
        <div className="flex items-center justify-center fixed z-[1000] h-screen w-screen">
            <div className="relative flex flex-col items-center shadow-md
                    justify-center bg-stone-200 h-64 w-96 rounded-lg">
                    <div className="flex  justify-center  w-2/3 h-1/2 ">
                         <div className="flex justify-center items-center flex-col w-full space-y-4"  >
                              <p className="pr-4 py-2">
                              Username:
                              </p>
                              <p className="pr-3 py-2">
                              Password:
                              </p>
                         </div>
                         <div className="flex flex-col justify-center space-y-4 items-center w-full " >
                              <input  onChange={(e) => updateUsername(e)}
                              id="username"
                              className = "shadow appearance-none border  rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-blue-500"  type="text"/>
                              <input onChange={(e) => updatePassword(e)}
                              id="password"
                              className = "shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-blue-500" type="password" placeholder="******************" />
                         </div>
                    </div>
                    <LoginButton className="mb-3" tryLogin={tryLogin}/>
                <button className="absolute right-2 bottom-2 text-m underline text-blue-500 hover:text-blue-700 visited:text-purple-600" onClick={() => props.loginGuest()}>
                    Create Account
                </button>
                <button className="absolute left-2 bottom-2 text-m underline text-blue-500 hover:text-blue-700 visited:text-purple-600" onClick={() => props.loginGuest()}>
                    Guest Login
                </button>
               </div>
          </div>
   )
}
export default Login
