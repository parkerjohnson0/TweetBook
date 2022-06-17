import './App.css';
import React, {useEffect, useState} from 'react';
import Post from './components/Post.js'
import ReplyBox from './components/ReplyBox.js'
import ReplyButton from './components/ReplyButton.js';
import Register from './components/Register';
import Login from './components/Login';
import FileUploadBar from './components/FileUploadBar.js';
import config from './config'
function App()
{
  async function checkCookieForLoginToken(){
      if (document.cookie){
          let userID = document.cookie.split('; ').find(row => row.startsWith("UserID=")).split("=")[1];
            await tryLoginFromCookie(userID);
      }
      setCookieChecked(true);
  }
    useEffect(()=>{
        checkCookieForLoginToken();
    }, [])
  let [posts, setPosts] = useState([]);
  function getPosts(postID){
    let postQuery = "";
      if (postIdParam || postID){
            postQuery += "?id=" + (postID || postIdParam);
      }
    console.log('get posts ' + postID);
    fetch(config.API() + "/tweetbookapi/Posts" + postQuery)
      .then(response => response.json())
      .then(posts => setPosts(posts))
  }
    const [registerError, setRegisterError] = useState("");
    const [showLoginError, setShowLoginError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isNewPostVisible, setIsNewPostVisible] = useState(true);
  const [postReplyId, setPostReplyId] = useState(0);
  const [blurStyle,setBlurStyle] = useState("blur-sm");
  const [fileIsUploading, setFileIsUploading] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(
        {
            "UserID":1,
            "Username":"Guest",
            "Avatar":"guest.png"
        }
    );
    const [postIdParam, setPostIdParam] = useState(null);
    const [cookieChecked, setCookieChecked] = useState(false);
    const [returnButton,setReturnButton] = useState({
        enabled: false,
        previousID: null
    });
      useEffect(() =>
      {

        getPosts();
        let timer = setInterval(() =>
        {
          getPosts();
        },15000);
        return clearInterval(timer);
      },[postIdParam])
    function setPostsString(postID){
        setReturnButton({
            enabled:(postID == null ? false : true ),
            previousID:postIdParam,
            currentID: postID
        })
        setPostIdParam(postID);
        //getPosts();
    }
  function shouldShowLogin(){
    return !(isLoggedIn || isGuest || isRegistering);
  }
  async function tryLoginFromCookie(UserID){
      const response = await fetch(config.API() + "/tweetbookapi/Login/LoginByToken",{
        method : "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UserID: UserID
        })
    }).then(response => {
        if (!response.ok){
            throw new Error(response.status);
        }
        return response.json();
    })
        .then(data =>{
              if (data !== -1){
                setBlurStyle("");
                setIsLoggedIn(true);
                setIsGuest(false);
                  setUserLoggedIn({
                      "UserID": data.userID,
                      "Username": data.username,
                      "Avatar": data.avatar
                  });
                setIsRegistering(false);
                setBlurStyle("");
                setIsLoggedIn(true);
                setIsGuest(false);
                  let date = new Date();
                date.setTime(date.getTime() + (4 * 60 * 60 * 1000));
                document.cookie = "UserID" + "=" + data.userID + "; expires=" + date.toUTCString() + "; path=/";
              }
          })
      .catch(error =>{
          setShowLoginError(true);
      });
  }
  async function tryLogin(username,password){
      const response = await fetch(config.API() + "/tweetbookapi/Login",{
        method : "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username:username,
            password:password
        })
    }).then(response => {
        if (!response.ok){
            throw new Error(response.status);
        }
        return response.json();
    })
        .then(data =>{
              if (data !== -1){
                setBlurStyle("");
                setIsLoggedIn(true);
                setIsGuest(false);
                  setUserLoggedIn({
                      "UserID": data.userID,
                      "Username": data.username,
                      "Avatar": data.avatar
                  });
                setIsRegistering(false);
                setBlurStyle("");
                setIsLoggedIn(true);
                setIsGuest(false);
                  let date = new Date();
                date.setTime(date.getTime() + (4 * 60 * 60 * 1000));
                document.cookie = "UserID" + "=" + data.userID + "; expires=" + date.toUTCString() + "; path=/";
              }
          })
      .catch(error =>{
          setShowLoginError(true);
      });
  }
  async function tryRegister(username,password){
    const response = await fetch(config.API() + "/tweetbookapi/Login/Register",{
        method : "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username:username,
            password:password
        })
    }).then(response => response.json())
          .then(data =>{
              let resp = data.value;
              if (resp.userID && resp.userID !== -1){
                setBlurStyle("");
                setIsLoggedIn(true);
                setIsGuest(false);
                  setUserLoggedIn({
                      "UserID": resp.userID,
                      "Username": username,
                      "Avatar": "guest.png"
                  });
                setIsRegistering(false);
              }
              else{
                  setRegisterError(resp.message);
              }
          });

  }
  function loginGuest(){
    setBlurStyle("");
    setIsLoggedIn(false);
    setIsGuest(true);
  }
    function showLogin(){
        setIsRegistering(false);
    }
    function showRegister(){
        setIsRegistering(true);
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
   function updateLoggedInUserAvatar(fileLocation){
      setUserLoggedIn({
          ...userLoggedIn,
          "Avatar": fileLocation
      })
    }
  return (
    <div className="flex flex-col content-center items-center">
      {fileIsUploading &&
        <FileUploadBar/>}
        {isRegistering &&
            <Register setRegisterError={setRegisterError} registerError={registerError} showLogin={showLogin} tryRegister={tryRegister}/>}
      {shouldShowLogin() && cookieChecked &&
        <Login showRegister={showRegister} setShowLoginError={setShowLoginError} showLoginError={showLoginError} loginGuest={loginGuest} tryLogin={tryLogin}/>}
      <div className={blurStyle}>
      {posts.map((post) =>
      {
          return <Post returnButton={returnButton} setPostsString={setPostsString} nestLevel={0} isChild={false} position={"relative"} updateLoggedInUserAvatar={updateLoggedInUserAvatar} setFileIsUploading={blurAndShowLoading} getPosts={getPosts} replyingPost={postReplyId} isLoggedIn={isLoggedIn} userLoggedIn={userLoggedIn} loggedInUserIsGuest={isGuest} setIsNewPostVisible={setIsNewPostVisible}
          updateReplying={updateReplying} z={100} top={0} key={post.postID} post={post} offset={0}/>
      })}
      </div>
      {!shouldShowLogin() && !isRegistering && isNewPostVisible && cookieChecked && <ReplyBox updateLoggedInUserAvatar={updateLoggedInUserAvatar} updateAvatar={updateLoggedInUserAvatar} setFileIsUploading={blurAndShowLoading} userID={userLoggedIn.UserID} isGuest={isGuest} parentPostID={null} getPosts={getPosts}
          blurAndShowLoading={blurAndShowLoading} userLoggedIn={userLoggedIn} isLoggedIn={isLoggedIn}
        isNewPostVisible={isNewPostVisible} isReplying={isReplying} fixedBox={true} />}
      <div style={{height:"275px"}}>

      </div>
    </div>

  );
}
export default App;
