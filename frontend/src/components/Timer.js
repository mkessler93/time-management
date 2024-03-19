import React, {useState, useEffect, useContext}from 'react';

import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';

const BASE_URL = "http://localhost:8080"

const Timer = () => {
    const {dbId,workingHours, getWorkingHours, updateWorkingHours, loading, running} = useContext(GlobalContext);

    const [timerActive, setTimerActive] = useState(false);
    // id of the latest db entry (gets returned by the start endpoint)
    const [id, setId] = useState(null)
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        getWorkingHours(); 
    } ,[])

    useEffect(() => {
        setTimerActive(running)
        setId(dbId)
    }, [dbId,running])

    useEffect(() => {
        if (timerActive) {
            const id = setInterval(() => {
                updateWorkingHours()
            }, 1000);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
        }
    }, [timerActive]);

    async function handleStart() {
        try {
            const res = await axios.post(`${BASE_URL}/start`);
            // only set these two states if the post was sucessfull
            setId(res.data)
            setTimerActive(true);
        } catch (error) {
            console.error(error.message)
        }
    };

    async function handleStop() {
        setTimerActive(false);
        try {
            await axios.post(`${BASE_URL}/stop/${id}`)
        } catch (error) {
            console.error(error.message)
        }
    };


    const formatTime = (time) => {
        
        //extract hours and minutes
        const hours = Math.floor(time / 3600);
        const min = Math.floor((time % 3600) / 60);

        // pad with zero if the number is below 10 
        const formattedHours = String(hours).padStart(2, '0')
        const formattedMin = String(min).padStart(2,'0')

        return `${formattedHours}:${formattedMin} h`
    }


    return (
        <>
            {<h2>{loading ? "Waiting for data (try reload!)" : formatTime(workingHours) } </h2>}
            {!loading ? <div className='container'>
                {!timerActive  ? (
                    <button className='btn start' onClick={handleStart}>Start</button>
                ) : (
                    <>
                        <button className='btn stop' onClick={handleStop}>Stop</button>
                    </>
                )}
            </div> : <></>}
        </>
    )
}

export default Timer
