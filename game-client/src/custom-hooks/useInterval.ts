import { useEffect, useRef } from 'react';

export default function useInterval(
    callback: CallableFunction,
    delay: number | null
) {
    const savedCallback = useRef<CallableFunction>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current !== undefined) {
                savedCallback.current();
            }
        }

        if (delay !== null) {
            const id: NodeJS.Timeout = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
