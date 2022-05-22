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
            <div className="flex flex-col items-center shadow-md
                    justify-center bg-stone-200 h-64 w-96 rounded-lg">
                    <div className="flex  justify-center  w-2/3 h-1/3 mb-5">
                         <div className="flex justify-center items-center flex-col w-full space-y-4"  >
                              <p className="pr-3 py-2">
                              Username:
                              </p>
                              <p className="pr-2 py-2">
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
                    <LoginButton className="mt-3" tryLogin={tryLogin}/>
                <button onClick={() => props.loginGuest()}>
                    Continue as guest
                </button>
               </div>
          </div>
   )
}
export default Login
