import React, { useState } from 'react';

function LoginButton(props) {
    return (
        <button onClick={() => props.tryLogin()} className="h-8 text-white text-center px-4 m-2 text-sm bg-blue-500 hover:bg-blue-700 text-center rounded-lg">
            Login
        </button>
    )
}
export default LoginButton;