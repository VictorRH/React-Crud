import { useState, useEffect } from 'react';


export default function ControlTyping(text, delay) {
    const [textValue, setTextValue] = useState();

    useEffect(() => {
        const handler = setTimeout(() => {
            setTextValue(text);

        }, delay);
        return () => {
            clearTimeout(handler);
        }
    }, [text, delay]);

    return textValue;
}

