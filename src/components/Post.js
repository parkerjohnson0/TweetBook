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
    let hasComments = post.Comments.length > 0;
    const CommentsClicked = () =>
    {
        if (isExpanded || isReplying)
        {
            setIsReplying(false);
            props.updateReplying(false, post.PostId);
            props.setIsNewPostVisible(true);
  
        }
        setIsExpanded(!isExpanded);
        
    }
    const replyClicked = () =>
    {
        props.updateReplying(!isReplying, post.PostId);
        props.setIsNewPostVisible(isReplying);
        setIsReplying(!isReplying);
    }
    const latchReplyBox = () =>
    {
        return (
            <div className="flex content-center justify-center" style={{position:"relative",left:`${props.offset*2}px`,width:`${width }px`}}>
            <ReplyBox offset={props.offset} isNewPostVisible={!isNewPostVisible} isReplying={isReplying} fixedBox={false} />

            </div>
        )
    }
    const replyCheck = () =>
    {
        if (isReplying && props.replyingPost != post.PostId)
        {
            setIsReplying(!isReplying);
        }
       return isReplying && props.replyingPost == post.PostId
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
                    <Avatar username={post.User.Username} fileName={post.User.Avatar}/>
                    <div className="box-border  pb-10 relative bg-slate-500 w-full">
                        <div className="pl-3 font-sans bg-zinc-700 w-full">
                            <PostDate date={post.TimeStamp}/>
                        </div>
                        <p className="p-5 font-sans">
                            {post.Content}
                        </p>
                        <div className="flex space-x-4 absolute bottom-0 right-0">
                            <ReplyButton replyClick={replyClicked} />
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
                && props.post.Comments.map((post, idx) =>
                {
                    return (
                        <Post replyingPost={props.replyingPost} setIsNewPostVisible={props.setIsNewPostVisible}
                            updateReplying={props.updateReplying}
                            z={props.z + 1} key={post.PostId} post={post} offset={props.offset + 25} />
                    
                            
                    )
                })
            }

 
        </div>

        
    )
}
export default Post;
