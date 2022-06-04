import React from 'react';
function RegisterButton(props){
    return (
        <button onClick={() => props.tryRegister()} className="h-8 text-white text-center px-4 m-2 text-sm bg-blue-500 hover:bg-blue-700 text-center rounded-lg">
           Register
        </button>
    )
}
export default RegisterButton
