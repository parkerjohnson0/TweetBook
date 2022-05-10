import React from 'react';
function Avatar(props)
{
    let fileLocation = `/avatars/${props.fileName}`
    return (
        <div className="flex flex-col content-center items-center text-white box-border w-24 items-center justify-top flex-shrink-0">
            <div className="flex bg-blue-500 h-24 w-full text-center items-center justify-center">
                <img src={fileLocation}/>
            </div>
            <div className="flex justify-center items-center bg-zinc-700 w-full h-8 w-full text-center ">
                {props.username} 
            </div>
        </div>
   ) 
}

export default Avatar;

