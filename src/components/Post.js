import ReplyButton from "./ReplyButton";
import CommentsButton from "./CommentsButton";
import PostDate from "./PostDate";
import Avatar from "./Avatar";
import ReplyBox from "./ReplyBox";
import ShowMoreButton from "./ShowMoreButton";
import ReturnButton from "./ReturnButton";
import React, { useState } from "react"
import config from "../config"
import {motion, AnimatePresence} from "framer-motion"
function Post(props)
{
    const [isExpanded, setIsExpanded] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isNewPostVisible, setIsNewPostVisible] = useState(true);
    const [postReplyId, setPostReplyId] = useState(0);
    const [deleteButtonVis, setDeleteButtonVis] = useState(false);
    let post = props.post;
    let width = 800 - props.offset;
    let style = {
        position: "relative",
        left: props.offset,
        top: props.top + "px",
        width: width
    }
    const updateReplying = (value, key) =>
    {
      setIsReplying(value)
      setPostReplyId(key)
    }
    let hasComments = (post.comments && post.comments.length > 0);
    const CommentsClicked = () =>
    {
        if (isExpanded || isReplying)
        {
            setIsReplying(false);
            props.updateReplying(false, post.postID);
            props.setIsNewPostVisible(true);

        }
        setIsExpanded(!isExpanded);

    }
    function changeDeleteVis(){
        if (post.userID === props.userLoggedIn.UserID){
            setDeleteButtonVis(!deleteButtonVis);
        }
    }
    const autoExpand = () =>
    {
        if (isExpanded || isReplying)
        {
            setIsReplying(false);
            props.updateReplying(false, post.postID);
            props.setIsNewPostVisible(true);

        }
        setIsExpanded(true);

    }
    const changeReplyState = () =>
    {
        props.updateReplying(!isReplying, post.postID);
        props.setIsNewPostVisible(isReplying);
        setIsReplying(!isReplying);
    }
    const latchReplyBox = () =>
    {
        return (
            <div className="flex content-center justify-center" style={{position:"relative",left:`${props.offset}px`,width:`${width }px`}}>
            <ReplyBox updateLoggedInUserAvatar={props.updateLoggedInUserAvatar} setFileIsUploading={props.setFileIsUploading} userID={props.userLoggedIn.UserID} expandComments={autoExpand} changeReplyState={changeReplyState}
            getPosts={props.getPosts} isGuest={props.loggedInUserIsGuest} parentPostID={post.postID} isLoggedIn={props.isLoggedIn} userLoggedIn={props.userLoggedIn} offset={props.offset}
            isNewPostVisible={!isNewPostVisible} isReplying={isReplying} fixedBox={false} />

            </div>
        )
    }
    const replyCheck = () =>
    {
        if (isReplying && props.replyingPost != post.postID)
        {
            setIsReplying(!isReplying);
        }
       return isReplying && props.replyingPost == post.postID
    }
    async function deletePost(postID){

        const response = await fetch(config.API() + `/tweetbookapi/Posts/${postID}`,{
            method : "POST",
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            if (!response.ok){
                throw new Error(response.status);
            }
        }).then(data =>{
            if (data < 1){//dont think this should be possible but IDK
                throw new Error("Post was selected for deletion but was not deleted for some reason")
            }
            else {
                props.getPosts();
            }
        })
    }
    function commentsEval(){

        if (props.nestLevel > 3 && hasComments){
            return (
                 <ShowMoreButton setPostsString={props.setPostsString} postID={post.postID} getPosts={props.getPosts}>lol</ShowMoreButton>
            )
        }
       else if (hasComments){
            return (
            <CommentsButton
            isCommentsExpanded={isExpanded}
            commentsClicked={CommentsClicked} />)
        }
    }
    return (
        <div className="flex flex-col content-center justify-center w-full  "
            style={{
                position:props.position,
                left: style.left,
                width: style.width,
            }}
            >
            <div className={"flex content-center justify-center " +
                    (props.isChild ? "border-l-2 border-slate-300" : "" )}
                style={{
                    zIndex: props.z,
                    position: "relative",
                    width: style.width,
                    left: style.left
                }}>
                <div className="flex content-center text-gray-50 h-fit min-w-4 bg-slate-500 border-8"
                    style={{
                        position:style.position,
                        top:style.top,
                        width:style.width
                    }}>
                    <Avatar updateLoggedInUserAvatar={props.updateLoggedInUserAvatar} setFileIsUploading={props.setFileIsUploading} userID={props.userLoggedIn.UserID} username={post.username} fileName={post.avatar}/>
                    <div className="absolute h-8 w-8"
                        onMouseEnter= {()=> changeDeleteVis()}
                    onMouseLeave= {()=> changeDeleteVis()}>
                    {deleteButtonVis &&
                    <button onClick={()=> deletePost(post.postID)}>
                            <img  src="/res/delete_post.png" alt="delete post"
                               />
                        </button>
                    }
                    </div>
                    <div className="box-border pb-10 relative bg-slate-500 w-full">
                        {props.returnButton.enabled &&
                         props.returnButton.currentID == post.postID &&
                        <ReturnButton returnButton={props.returnButton} setPostsString={props.setPostsString}/>}
                        <div className="pl-3 font-sans bg-zinc-700 w-full">
                            <PostDate date={post.timePosted}/>
                        </div>
                        <p className="p-5 break-all font-sans">
                            {post.content}
                        </p>
                        <div className="flex space-x-4 absolute bottom-0 right-0">
                            <ReplyButton  changeReplyState={changeReplyState} />
                            {commentsEval()}
                        </div>
                    </div>
                </div>
            </div>
            {replyCheck()
                && latchReplyBox()

            }

            {isExpanded
                && props.post.comments.map((post, idx) =>
                {
                    return (
           //             getPosts={getPosts} replyingPost={postReplyId} isLoggedIn={isLoggedIn} userLoggedIn={userLoggedIn} loggedInUserIsGuest={isGuest} setIsNewPostVisible={setIsNewPostVisible}
         // updateReplying={updateReplying} z={100} top={0} key={post.postID} post={post} offset={0}
                        <Post returnButton={props.returnButton} setPostsString={props.setPostsString} nestLevel={props.nestLevel+1} isChild={true} deletePost={props.deletePost} updateLoggedInUserAvatar={props.updateLoggedInUserAvatar} setFileIsUploading={props.setFileIsUploading} userID={props.userLoggedIn.UserID} expandComments={autoExpand} getPosts={props.getPosts} isLoggedIn={props.isLoggedIn} userLoggedIn={props.userLoggedIn} loggedInUserIsGuest={props.loggedInUserIsGuest}
                        replyingPost={props.replyingPost} setIsNewPostVisible={props.setIsNewPostVisible}
                            updateReplying={props.updateReplying}
                            z={props.z + 1} key={post.postID} post={post} offset={props.offset + 15} />


                    )
                })
            }


        </div>


    )
}
export default Post;
