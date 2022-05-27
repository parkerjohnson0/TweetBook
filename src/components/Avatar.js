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
            const response = await fetch("https://localhost:7073/api/Avatar/upload",{
                method : 'POST',
                body: data
            })
                .then(()=>{
                    props.setFileIsUploading(false)
                });

        }
    }
    const [avatarButtonVisible, setAvatarButtonVisible] = useState(false);
    let fileLocation = `/avatars/${props.fileName}`
    return (
        <div className="flex flex-col content-center items-center text-white box-border w-24 items-center justify-top flex-shrink-0">
            <div className="flex relative h-24 w-full text-center items-center justify-center"
                onMouseEnter={() => changeVis()} onMouseLeave={() => changeVis()}>

                    {(props.isLoggedIn || props.isGuest) && avatarButtonVisible &&

                    <button type="file">
                        <img src="/res/change-avatar16.png"
                            className='absolute top-1 right-1 bg-white rounded-md'
                            onClick={() => showFileDialog()}/>
                    </button>}
                <input type="file" id="file-upload" hidden
                    accept="image/png, image/jpeg"
                    onChange={() => fileSelected()}/>
                <img src={fileLocation}/>
            </div>
            <div className="flex justify-center items-center bg-zinc-700 w-full h-8 w-full text-center ">
                {props.username}
            </div>
        </div>
   )
}

export default Avatar;

