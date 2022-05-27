import './App.css';
import React, {useEffect, useState} from 'react';
import Post from './components/Post.js'
import ReplyBox from './components/ReplyBox.js'
import ReplyButton from './components/ReplyButton.js';
import Login from './components/Login';
import FileUploadBar from './components/FileUploadBar.js';
function App()
{
  function checkCookieForLoginToken(){
    return false;
  }
  // let posts = [{"ParentPostId":null,"PostId":30,"Content":"test","TimeStamp":"2022-01-01T19:38:54","Comments":[{"ParentPostId":30,"PostId":39,"Content":"surely","TimeStamp":"2022-01-05T22:00:55","Comments": [{
	// 			"ParentPostId": 39,
	// 			"PostId": 60,
	// 			"Content": "yo",
	// 			"TimeStamp": "2022-01-05T22:21:50",
	// 			"Comments": [],
	// 			"User": {
	// 				"UserId": 1,
	// 				"Username": "Guest",
	// 				"Avatar": "guest.png"
	// 			}
	// 		}],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":30,"PostId":40,"Content":"yo","TimeStamp":"2022-01-05T22:21:50","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}}],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":31,"Content":"ayy","TimeStamp":"2022-01-01T19:40:11","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":32,"Content":"asdfgdfg","TimeStamp":"2022-01-01T19:45:04","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":34,"Content":"aadfdh","TimeStamp":"2022-01-01T20:10:19","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":35,"Content":"test","TimeStamp":"2022-01-01T20:57:09","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":36,"Content":"asdfasdf","TimeStamp":"2022-01-02T10:09:00","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":37,"Content":"can you see this","TimeStamp":"2022-01-05T21:53:35","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":38,"Content":"reply","TimeStamp":"2022-01-05T21:55:57","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":41,"Content":"test","TimeStamp":"2022-02-22T15:07:11","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":42,"Content":"still works ","TimeStamp":"2022-02-22T15:07:37","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}},{"ParentPostId":null,"PostId":43,"Content":"hey","TimeStamp":"2022-03-21T10:16:46","Comments":[],"User":{"UserId":1,"Username":"Guest","Avatar":"guest.png"}}]
    let userLoggedIn = {
        "UserID":1,
        "Username":"Guest",
        "Avatar":"guest.png"
    }
  let [posts, setPosts] = useState([]);
  useEffect(() =>
  {

    getPosts();
    setInterval(() =>
    {
      getPosts();
    },5000)
  },[])
  function getPosts(){
    fetch("https://localhost:7073/api/Posts")
      .then(response => response.json())
      .then(posts => setPosts(posts))
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isNewPostVisible, setIsNewPostVisible] = useState(true);
  const [postReplyId, setPostReplyId] = useState(0);
  const [blurStyle,setBlurStyle] = useState("blur-sm");
  const [fileIsUploading, setFileIsUploading] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
  function shouldShowLogin(){
    return (isLoggedIn || isGuest) ? false : !checkCookieForLoginToken();
  }
  function tryLogin(username,password){
    setBlurStyle("");
    setIsLoggedIn(true);
    setIsGuest(false);
  }
    function loginGuest(){
        setBlurStyle("");
        setIsLoggedIn(false);
        setIsGuest(true);
    }

  const updateReplying = (value, key) =>
  {
    setIsReplying(value)
    setPostReplyId(key)
  }
  function blurAndShowLoading(show){
      if (show){
        setBlurStyle("blur-sm");
      }else{
          setBlurStyle("");
      }
    setFileIsUploading(show);
  }
  return (
    <div className="flex flex-col content-center items-center">
      {fileIsUploading &&
        <FileUploadBar/>}
      {shouldShowLogin() &&
        <Login loginGuest={loginGuest} tryLogin={tryLogin}/>}
      <div className={blurStyle}>
      {posts.map((post) =>
      {
        return <Post setFileIsUploading={blurAndShowLoading} getPosts={getPosts} replyingPost={postReplyId} isLoggedIn={isLoggedIn} userLoggedIn={userLoggedIn} loggedInUserIsGuest={isGuest} setIsNewPostVisible={setIsNewPostVisible}
          updateReplying={updateReplying} z={100} top={0} key={post.postID} post={post} offset={0}/>
      })}
      </div>
      {!shouldShowLogin() && isNewPostVisible && <ReplyBox setFileIsUploading={blurAndShowLoading} userID={userLoggedIn.UserID} isGuest={isGuest} parentPostID={null} getPosts={getPosts}
          blurAndShowLoading={blurAndShowLoading} userLoggedIn={userLoggedIn} isLoggedIn={isLoggedIn}
        isNewPostVisible={isNewPostVisible} isReplying={isReplying} fixedBox={true} />}
      <div style={{height:"275px"}}>

      </div>
    </div>

  );
}
export default App;
