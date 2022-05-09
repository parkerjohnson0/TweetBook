function ReplyButton(props){
    return (
        <button className="h-8 px-4 m-2 text-sm bg-blue-500 hover:bg-blue-700 text-white w-16 p-2 text-center rounded-lg"
        onClick={props.replyClick}>
            Reply
            
        </button>

    )
}
export default ReplyButton;