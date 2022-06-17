import React, {useState} from 'react';
function ReturnButton(props){
    function onClick(){
        props.setPostsString(props.returnButton.previousID);
    }
    return(
        <div className="absolute right-0 w-6 h-6 bg-slate-200">
            <button onClick={onClick}>
             <img alt="return"
                src="/res/icons8-back-50.png"
                        />
            </button>
                   </div>
    )
}
export default ReturnButton;
