import { React, useState } from 'react';
import Avatar from "./Avatar";
import PostButton from "./PostButton"
function ReplyBox(props)
{
    const checkIfReplying = () =>
    {
        if (props.isNewPostVisible)
        {
            return (
                <div className="flex fixed bottom-16 z-100 h-48 bg-sky-400 rounded-lg"
                    style={{ width: "600px" }}>
                    <div className="p-8">
                        <Avatar username={props.userLoggedIn.Username} fileName={props.userLoggedIn.Avatar}/>
                    </div>
                    <div>
                       <div className="pt-8">
                            <textarea rows="4" cols="35">
                            </textarea>
                           <div className="absolute bottom--1 right-8" >
                               <PostButton/>
                           </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (props.fixedBox && !props.isNewPostVisible)
        {
            return 
        }
        else if (!props.fixedBox && props.isReplying)
        {
            return (
                <div className="flex align-items justify-center relative 
                    w-full z-100 h-48 bg-sky-400 rounded-lg"
                    style={{}}>
                    <div className="pt-8">
                        <Avatar />
                    </div>
                    <div>
                       <div className="p-8 relative">
                            <textarea rows="4" cols="35">
                            </textarea>
                           <div className="absolute bottom--1 right-6">
                               <PostButton/>
                           </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    return (
        checkIfReplying()
    )
}

export default ReplyBox
