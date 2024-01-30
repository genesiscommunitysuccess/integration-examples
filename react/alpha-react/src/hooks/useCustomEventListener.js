import { useRef, useEffect } from 'react';

export const useCustomEventListener = (eventName, handler) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (element) {
            element.addEventListener(eventName, handler);

            return () => {
                element.removeEventListener(eventName, handler);
            };
        }
    }, [eventName, handler]);

    return ref;
}
