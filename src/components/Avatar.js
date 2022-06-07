import {React ,useState} from 'react';

function Avatar(props)
{
    function changeVis(){
        if (props.isGuest) return;
        setAvatarButtonVisible(!avatarButtonVisible);
    }
    function showFileDialog(){
        document.getElementById("file-upload").click();
        console.log('file dialog opened')
    }
    async function  fileSelected(){
        let file = document.getElementById("file-upload")
        if (file.value != ""){

            props.setFileIsUploading(true)
            console.log("file selected for upload")
            let blob = file.files[0];
            console.log(blob)
            let data = new FormData();
            data.append("file",blob);
            data.append("userID",props.userID );
            const response = await fetch("http://www.parkerjohnson-projects.com/tweetbookapi/Avatar/upload",{
                method : 'POST',
                body: data
            }).then(response => response.json())
              .then(fileLoc =>{
                    props.setFileIsUploading(false);
                    console.log(fileLoc.value);
                    props.updateLoggedInUserAvatar(fileLoc.value);
                });

        }
    }
    const [avatarButtonVisible, setAvatarButtonVisible] = useState(false);
    let fileLocation = `/avatars/${props.fileName}`
    return (
        <div className="flex flex-col content-center items-center text-white box-border w-24 items-center justify-top flex-shrink-0 border-2 border-slate-500 shadow-xl">
            <div className="flex relative h-24 w-full text-center items-center justify-center  bg-slate-200"
                onMouseEnter={() => changeVis()} onMouseLeave={() => changeVis()}>

                    {(props.isLoggedIn || props.isGuest) && avatarButtonVisible &&

                    <button type="file">
                        <img src="/res/change-avatar16.png" alt="avatar"
                            className="absolute top-1 right-1 bg-white rounded-md"
                            onClick={() => showFileDialog()}/>
                    </button>}
                <input type="file" id="file-upload" hidden
                    accept="image/png, image/jpeg"
                    onChange={() => fileSelected()}/>
                <img style={{
                   width:"100%",
                    height:"100%",
                    objectFit: "cover",
                    overflow: "hidden"
                }} alt="Avatar" src={fileLocation}/>
            </div>
            <div className="pt-1 inline-block h-8 text-s text-center align-bottom truncate bg-zinc-700 w-full border-t-2 border-slate-500">
                 {props.username}
            </div>
        </div>
   )
}

export default Avatar;

