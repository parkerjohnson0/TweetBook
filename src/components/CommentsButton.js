import React,{useState} from 'react';
function CommentsButton(props)
{
    const buttonClicked = () =>
    {
        props.commentsClicked()
        setIsExpanded(!isExpanded)
    }
    const [isExpanded, setIsExpanded] = useState(props.isCommentsExpanded);
    let text = isExpanded ? "Hide Comments" : "Show Comments";
    return (
        <button onClick={buttonClicked} className="h-8 px-4 m-2 text-sm bg-purple-500  hover:bg-purple-700 text-center rounded-lg">
            {text}
        </button>
    )
}
export default CommentsButton;
