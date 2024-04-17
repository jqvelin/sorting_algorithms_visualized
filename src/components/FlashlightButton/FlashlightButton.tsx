import { FC, useEffect, useRef } from 'react';
import './FlashlightButton.scss'

interface FlashlightButtonProps {
    text: string;
    handler?: (arg?: unknown) => unknown; 
}

const FlashlightButton: FC<FlashlightButtonProps> = ({text, handler}) => {
    const button = useRef(null)

    useEffect(() => {
        if (!button.current) return
        const target = button.current as HTMLElement
        target.addEventListener('mousemove', startTracking)
        return () => document.removeEventListener('mousemove', startTracking)
    })

    function startTracking(e: MouseEvent){
        const target = e.target as HTMLElement
        target.style.backgroundPosition = `${e.clientX - target.getBoundingClientRect().left - target.offsetWidth / 2}px ${e.clientY - target.getBoundingClientRect().top - target.offsetHeight / 2 - 50}px`
    }

    return (
        <button onClick={handler} ref={button}>{text}</button>
    );
};

export default FlashlightButton;