import { useEffect, useRef } from 'react';

/**
 * Custom hook for creating an interval.
 * @param {Function} callback - The function to be called at each interval.
 * @param {number|null} delay - The delay in milliseconds between each interval. Pass null to stop the interval.
 */
export default function useInterval(callback, delay)
{
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() =>
    {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() =>
    {
        function tick()
        {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}