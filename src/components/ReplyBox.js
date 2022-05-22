import { React, useState } from 'react';
import Avatar from "./Avatar";
import PostButton from "./PostButton"
import CharacterCount from "./CharacterCount"
function ReplyBox(props)
{
    const [getCurrReply, setCurrReply] = useState("");
    const [countAnimate, setCountAnimate] = useState(false);
    const makePost = async () => {
        console.log(props.parentPostID)
        let post = {
            "ParentPostID" : props.parentPostID,
            "Username" : props.userLoggedIn.Username,
            "Content" : getCurrReply,
            "Avatar" : props.userLoggedIn.Avatar
        }
        const response = await fetch("https://localhost:7073/posts",{
            method : "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        setCurrReply("")

    }
    const updateReply = (e) =>{
        setCurrReply(e.target.value);
    }
    const animationListener = () =>{
        if (getCurrReply.length >= 140){
            setCountAnimate(true);
        }
    }
    const unregisterAnimation = ()=>{
        if (getCurrReply.length >= 140){
            setCountAnimate(false);
        }

    }
    const checkIfReplying = () =>
    {
        if (props.isNewPostVisible)
        {
            return (
                <div className="flex fixed bottom-16 z-100 h-48 bg-sky-400 rounded-lg"
                    style={{ width: "600px" }}>
                    <div className="p-8">
                        <Avatar isGuest={props.isGuest} isLoggedIn={props.isLoggedIn} blurAndShowLoading={props.blurAndShowLoading} username={props.userLoggedIn.Username} fileName={props.userLoggedIn.Avatar}/>
                    </div>
                    <div>
                       <div className="pt-8 relative">
                           <div>
                                <textarea maxLength="140" onKeyDown={unregisterAnimation} onKeyUp={animationListener} onInput={updateReply} rows="4" cols="35">
                                </textarea>
                               <CharacterCount countAnimate={countAnimate} charCount={getCurrReply.length}/>
                           </div>
                           <div className="absolute bottom--1 right-1" >
                               <PostButton postClick={makePost}/>
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
                        <Avatar isGuest={props.isGuest} isLoggedIn={props.isLoggedIn} username={props.userLoggedIn.Username} fileName={props.userLoggedIn.Avatar}/>
                    </div>
                    <div>
                       <div className="p-8 relative">
                           <div>
                                <textarea maxLength="140" onKeyDown={unregisterAnimation} onKeyUp={animationListener} onInput={updateReply} rows="4" cols="35">
                                </textarea>
                               <CharacterCount countAnimate={countAnimate} charCount={getCurrReply.length}/>
                           </div>
                           <div className="absolute bottom--1 right-8" >
                               <PostButton postClick={makePost}/>
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
