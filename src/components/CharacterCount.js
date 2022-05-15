import {React,useState} from 'react';
function CharacterCount(props){
    let style ={
        color : "red",
        animation : "shake 0.4s",
    }

    const getCharCount = ()  =>{
        if (props.countAnimate){
            return <p className="absolute" style={style}>
                <style>
                    {
                        `
                        @keyframes shake{
                          0% { transform: translate(0px, 0px) rotate(0deg); }
                          10% { transform: translate(-1px, -2px) rotate(-1deg); }
                          20% { transform: translate(-2px, 0px) rotate(1deg); }
                          30% { transform: translate(1px, 2px) rotate(0deg); }
                          40% { transform: translate(1px, -1px) rotate(1deg); }
                          50% { transform: translate(-1px, 2px) rotate(-1deg); }
                          60% { transform: translate(-3px, 1px) rotate(0deg); }
                          70% { transform: translate(3px, 1px) rotate(-1deg); }
                          80% { transform: translate(-1px, -1px) rotate(1deg); }
                          90% { transform: translate(1px, 2px) rotate(0deg); }
                          100% { transform: translate(0px, 0px) rotate(-1deg); }
                        }
                        `
                    }
                </style>
                {props.charCount}/140

                </p>
        }
        else{

            return <p className="absolute">{props.charCount}/140</p>

        }
    }
    return(
        getCharCount()
    )
}
export default CharacterCount;
