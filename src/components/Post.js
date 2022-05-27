import ReplyButton from "./ReplyButton";
import CommentsButton from "./CommentsButton";
import PostDate from "./PostDate";
import Avatar from "./Avatar";
import ReplyBox from "./ReplyBox";
import React, { useState } from "react"
import {motion, AnimatePresence} from "framer-motion"
function Post(props)
{
    const [isExpanded, setIsExpanded] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isNewPostVisible, setIsNewPostVisible] = useState(true);
    const [postReplyId, setPostReplyId] = useState(0);
    let post = props.post;
    let width = 800 - props.offset * 2;
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
    const autoExpand = () =>
    {
        if (isExpanded || isReplying)
        {
            setIsReplying(false);
            props.updateReplying(false, post.postID);
            props.setIsNewPostVisible(true);

        }
        setIsExpanded(!isExpanded);

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
            <div className="flex content-center justify-center" style={{position:"relative",left:`${props.offset*2}px`,width:`${width }px`}}>
            <ReplyBox setFileIsUploading={props.setFileIsUploading} userID={props.userLoggedIn.UserID} expandComments={autoExpand} changeReplyState={changeReplyState}
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
    return (
        <div className="flex flex-col content-center justify-center w-full">
            <div className="flex content-center justify-center"
                style={{
                    zIndex: props.z,
                    position: "relative"
                }}>
                <div className="flex content-center text-gray-50 h-fit min-w-4 bg-slate-700 border-8"
                    style={style}>
                    <Avatar setFileIsUploading={props.setFileIsUploading} userID={props.userLoggedIn.UserID} username={post.username} fileName={post.avatar}/>
                    <div className="box-border  pb-10 relative bg-slate-500 w-full">
                        <div className="pl-3 font-sans bg-zinc-700 w-full">
                            <PostDate date={post.timePosted}/>
                        </div>
                        <p className="p-5 font-sans">
                            {post.content}
                        </p>
                        <div className="flex space-x-4 absolute bottom-0 right-0">
                            <ReplyButton  changeReplyState={changeReplyState} />
                            {hasComments
                                && <CommentsButton
                                    isCommentsExpanded={isExpanded}
                                    commentsClicked={CommentsClicked} />}
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
                        <Post setFileIsUploading={props.setFileIsUploading} userID={props.userLoggedIn.UserID} expandComments={autoExpand} getPosts={props.getPosts} isLoggedIn={props.isLoggedIn} userLoggedIn={props.userLoggedIn} loggedInUserIsGuest={props.loggedInUserIsGuest}
                        replyingPost={props.replyingPost} setIsNewPostVisible={props.setIsNewPostVisible}
                            updateReplying={props.updateReplying}
                            z={props.z + 1} key={post.postID} post={post} offset={props.offset + 10} />


                    )
                })
            }


        </div>


    )
}
export default Post;
