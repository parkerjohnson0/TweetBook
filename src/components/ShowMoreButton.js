import React,{ useState} from 'react';
function ShowMoreButton(props){

    function buttonClicked(){
       props.setPostsString(props.postID);
    }
    return (
        <button onClick={buttonClicked} className="h-8 px-4 m-2 text-sm bg-purple-500  hover:bg-purple-700 text-center rounded-lg">
            Show More
        </button>
    )
}
export default ShowMoreButton;
