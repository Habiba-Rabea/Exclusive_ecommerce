import { useState, useEffect } from "react";
import '../../CSS/Timer.css';

function Timer(){

    const [secondsLeft, setSecondsLeft] = useState(259200);

    useEffect(()=>{
        const timer = setInterval(()=>{
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const days = Math.floor(secondsLeft / (3600 * 24));
    const hours = Math.floor((secondsLeft % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    return(
        <div className='count-timer'>
            <div className='time-block'>
                <span>Days</span>
                <strong>{String(days).padStart(2,'0')}</strong>
            </div>
            <span className='colon'>:</span>
            <div className="time-block">
                <span>Hours</span>
                <strong>{String(hours).padStart(2,'0')}</strong>
            </div>
            <span className='colon'>:</span>
            <div className="time-block">
                <span>Minutes</span>
                <strong>{String(minutes).padStart(2,'0')}</strong>
            </div>
            <span className="colon">:</span>
            <div className="time-block">
                <span>Seconds</span>
                <strong>{String(seconds).padStart(2,'0')}</strong>
            </div>
        </div>
    );

}
export default Timer;