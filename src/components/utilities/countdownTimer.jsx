import { useState, useEffect } from 'react';

const getNextIntervalTime = (intervalMinutes) =>
{
    const now = new Date();
    const currentMinutes = now.getMinutes();
    const remainder = currentMinutes % intervalMinutes;
    const minutesToNextInterval = remainder === 0 ? 0 : intervalMinutes - remainder;
    const nextInterval = new Date(now.getTime() + minutesToNextInterval * 60000);
    nextInterval.setSeconds(0, 0);
    return nextInterval;
};

const CountdownTimer = ({ intervalMinutes, approximately }) =>
{
    // console.log(intervalMinutes)
    const calculateTimeLeft = () =>
    {
        const nextInterval = getNextIntervalTime(intervalMinutes);
        return nextInterval - new Date();
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() =>
    {
        const timerId = setInterval(() =>
        {
            const newTimeLeft = calculateTimeLeft();
            // console.log(newTimeLeft)
            if (newTimeLeft <= 0) {
                setTimeLeft(getNextIntervalTime(intervalMinutes) - new Date());
            } else {
                setTimeLeft(newTimeLeft);
            }
        }, 30000);

        return () => clearInterval(timerId);
    }, [intervalMinutes]);

    const formatTimeLeft = () =>
    {
        const safeTimeLeft = Math.max(timeLeft, 0);
        const totalSeconds = Math.floor(safeTimeLeft / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        // Determine if the countdown is in the first half (:30) or the second half (:00) of a minute
        const seconds = totalSeconds % 60 >= 30 ? 30 : 0;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    return (
        <span>
            {approximately && '~'}{formatTimeLeft()}
        </span>
    );
};

export default CountdownTimer;
