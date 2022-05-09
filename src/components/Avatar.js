import React from 'react';
function Avatar(props)
{
    return (
        <div className="flex flex-col text-white box-border bg-red-500 w-24 items-center justify-top flex-shrink-0">
            <div className="flex bg-blue-500 h-24 w-full text-center items-center justify-center">
                Avatar
            </div>
            <div className="bg-black w-full h-8 w-full text-center ">
                Username
            </div>
        </div>
   ) 
}

export default Avatar;

