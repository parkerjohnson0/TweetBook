import React, {useState, useEffect} from 'react'
function FileUploadBar(props) {
    // let progress = 0;
    // useEffect(() =>{
    //     const interval = setInterval(()=>{
    //         progress += .10
    //         console.log(progress)
    //     },16.66666);
    //     return () => clearInterval(interval);
    // },[progress])
    const [progress, setProgress] = useState(0);
    const [countingUp, setCountingUp] = useState(true);
    useEffect(() => {

        const updateProgress = () => {
            evalCounting();
            if (countingUp){
                setProgress(progress + 1);
            }
            else{
                setProgress(progress - 1);
            }
        }
        setTimeout(updateProgress,16.6666);
        function evalCounting(){
            if (progress >= 100 && countingUp){
                setCountingUp(false);
            }
            else if (progress <= -25 && !countingUp){
                setCountingUp(true);
            }
        }
    }, [progress])
    return(
        <div className='flex flex-col items-center justify-center fixed z-[1000] h-screen w-screen'>
            <div className="flex flex-col items-center justify-center bg-stone-200 h-32 w-96 rounded-lg">
                    <div>
                        Uploading file...
                    </div>
                    <div className="relative h-3 mt-3 w-2/3 shadow overflow-hidden">
                        <div className="absolute w-full h-full bg-gray-300"></div>
                        <div id="progressBar" className="absolute h-full bg-green-400" 
                        style={
                            {width: `60px`,
                            left: `${progress}%`
                            }
                            }></div>
                    </div>
               </div>
        </div>
        
    )
}
export default FileUploadBar;