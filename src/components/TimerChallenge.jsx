import { useState, useRef } from "react";
import ResultModal from "./ResultModal";
// let timer; // because the component re renders and at each rendering the variable recreates
export default function TimerChallenge({title, targetTime}){
    const timer = useRef();
    const dialog = useRef();
    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExprired, setTimerExpired] = useState(false);
    const [timeRemaining, setTimerRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
    
    if(timeRemaining <= 0 ){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimerRemaining(targetTime * 1000);
    }
    
    function handleStart(){
        timer.current = setInterval(() =>{
            // setTimerExpired(true);
            // dialog.current.open();
            setTimerRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10);
        // setTimerStarted(true); //this line will execute after setting the timer not after this expired
    }

    function handleStop(){
        // clearTimeout(timer.current);
        dialog.current.open();
        clearInterval(timer.current);
    }


    return(
        <>
        <ResultModal 
            ref={dialog} 
            targetTime={targetTime} 
            remainingTime={timeRemaining} 
            onReset={handleReset}
            />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second {targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>
                    {timerIsActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is running...' : 'Timer inactive'}
            </p>
        </section>
        </>
        
    )
}