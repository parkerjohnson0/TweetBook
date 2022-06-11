import { React, useState } from 'react';
import Avatar from "./Avatar";
import PostButton from "./PostButton"
import CharacterCount from "./CharacterCount"
import config from "../config"
function ReplyBox(props)
{
    const [getCurrReply, setCurrReply] = useState("");
    const [countAnimate, setCountAnimate] = useState(false);
    const makePost = async () => {
        let post = {
            "ParentPostID" : props.parentPostID,
            "UserID" : props.userID,
            "Username" : props.userLoggedIn.Username,
            "Content" : getCurrReply,
            "Avatar" : props.userLoggedIn.Avatar,
            "Comments" : [],
            "User": props.userLoggedIn
        }
        const response = await fetch(config.API() + "/tweetbookapi/Posts",{
            method : "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        setCurrReply("")
        if (props.isReplying){
            props.changeReplyState();
        }
        if (props.isReplying){
            props.expandComments();
        }
        props.getPosts();
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
    function onKeyPressed(e){
        if (e.key == 'Enter'){
            if (!e.shiftKey){
                e.preventDefault();
                makePost();
            }
        }

    }
    const checkIfReplying = () =>
    {
        if (props.isNewPostVisible)
        {
            return (
                <div className="flex fixed bottom-16 z-[1000] h-48 bg-sky-400 rounded-lg"
                    style={{ width: "600px" }}>
                    <div className="p-8">
                        <Avatar updateLoggedInUserAvatar={props.updateLoggedInUserAvatar} setFileIsUploading={props.setFileIsUploading} userID={props.userID} isGuest={props.isGuest} isLoggedIn={props.isLoggedIn} blurAndShowLoading={props.blurAndShowLoading} username={props.userLoggedIn.Username} fileName={props.userLoggedIn.Avatar}/>
                    </div>
                    <div>
                       <div className="pt-8 relative">
                           <div>
                               <textarea className="p-1" style={{resize:"none"}} value={getCurrReply} onKeyPress={onKeyPressed}
                                 maxLength="140" onKeyDown={unregisterAnimation} onKeyUp={animationListener} onInput={updateReply} rows="4" cols="35">

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
                    w-full z-[1000] h-48 bg-sky-400 rounded-lg"
                    style={{}}>
                    <div className="pt-8">
                        <Avatar updateLoggedInUserAvatar={props.updateLoggedInUserAvatar} setFileIsUploading={props.setFileIsUploading} isGuest={props.isGuest} isLoggedIn={props.isLoggedIn} username={props.userLoggedIn.Username} fileName={props.userLoggedIn.Avatar}/>
                    </div>
                    <div>
                       <div className="p-8 relative">
                           <div>
                                <textarea className="p-1" style={{resize:"none"}} value={getCurrReply} onKeyPress={onKeyPressed}
                                maxLength="140" onKeyDown={unregisterAnimation} onKeyUp={animationListener} onInput={updateReply} rows="4" cols="35">
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
