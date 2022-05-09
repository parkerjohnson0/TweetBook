import './App.css';
import React, {useEffect, useState} from 'react';
import Post from './components/Post.js'
import ReplyBox from './components/ReplyBox.js'
import ReplyButton from './components/ReplyButton.js';
function App()
{
  let posts = [{"ParentPostId":null,"PostId":30,"Content":"test","TimeStamp":"2022-01-01T19:38:54","Comments":[{"ParentPostId":30,"PostId":39,"Content":"surely","TimeStamp":"2022-01-05T22:00:55","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":30,"PostId":40,"Content":"yo","TimeStamp":"2022-01-05T22:21:50","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}}],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":31,"Content":"ayy","TimeStamp":"2022-01-01T19:40:11","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":32,"Content":"asdfgdfg","TimeStamp":"2022-01-01T19:45:04","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":34,"Content":"aadfdh","TimeStamp":"2022-01-01T20:10:19","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":35,"Content":"test","TimeStamp":"2022-01-01T20:57:09","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":36,"Content":"asdfasdf","TimeStamp":"2022-01-02T10:09:00","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":37,"Content":"can you see this","TimeStamp":"2022-01-05T21:53:35","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":38,"Content":"reply","TimeStamp":"2022-01-05T21:55:57","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":41,"Content":"test","TimeStamp":"2022-02-22T15:07:11","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":42,"Content":"still works ","TimeStamp":"2022-02-22T15:07:37","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":43,"Content":"hey","TimeStamp":"2022-03-21T10:16:46","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}}]
  // let [posts, setPosts] = useState([]);
  // useEffect(() =>
  // {
  //   setInterval(() =>
  //   {
  //     const response = fetch("https://localhost:7005/api/Posts")
  //     .then(response => response.json())
  //     .then(posts => setPosts(posts))
  //   },1000)
  // },[])
  const [isReplying, setIsReplying] = useState(false);
  const [isNewPostVisible, setIsNewPostVisible] = useState(true);
  const [postReplyId, setPostReplyId] = useState(0);
  const updateReplying = (value, key) =>
  {
    setIsReplying(value)
    setPostReplyId(key)
  }
  return (
    <div className="flex flex-col content-center items-center">
      <div>
      {posts.map((post) =>
      {
        return <Post replyingPost={postReplyId} setIsNewPostVisible={setIsNewPostVisible} updateReplying={updateReplying} z={100} top={0} key={post.PostId} post={post} offset={0}/>
      })}
      </div>
      {isNewPostVisible && <ReplyBox isNewPostVisible={isNewPostVisible} isReplying={isReplying} fixedBox={true} />}
      <div style={{height:"275px"}}>

      </div>
    </div>

  );
}
export default App;