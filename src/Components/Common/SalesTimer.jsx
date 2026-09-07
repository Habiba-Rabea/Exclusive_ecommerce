import '../../CSS/Timer.css';

function Timer(){

    return(
        <div className='count-timer'>
            <div className='time-block'>
                <span>Days</span>
                <strong>03</strong>
            </div>
            <span className='colon'>:</span>
            <div className="time-block">
                <span>Hours</span>
                <strong>23</strong>
            </div>
            <span className='colon'>:</span>
            <div className="time-block">
                <span>Minutes</span>
                <strong>19</strong>
            </div>
            <span className="colon">:</span>
            <div className="time-block">
                <span>Seconds</span>
                <strong>56</strong>
            </div>
        </div>
    );

}
export default Timer;