import { React, useState } from 'react';
import Avatar from "./Avatar";
function ReplyBox(props)
{
    const checkIfReplying = () =>
    {
        if (props.isNewPostVisible)
        {
            return (
                <div className="fixed bottom-16 z-100 h-48 bg-yellow-500 rounded-lg"
                    style={{ width: "600px" }}>
                    <div className="p-8">
                        <Avatar />
                    </div>
                    <div className="">
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
                <div className="bottom-16 z-100 h-48 bg-yellow-500 rounded-lg"
                    >
                    <div className="p-8">
                        <Avatar />
                    </div>
                    <div className="">
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