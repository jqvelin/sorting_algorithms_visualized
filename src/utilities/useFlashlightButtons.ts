import { useEffect } from "react"

export const useFlashlightButtons = () => {
    useEffect(() => {
        document.addEventListener('mousemove', startTracking)
        return () => document.removeEventListener('mousemove', startTracking)
    }, [])

    function startTracking(e: MouseEvent){
        const target = e.target as HTMLElement
        if (target.classList.contains("flashlight-button")) {
            const midOfButtonX = e.clientX - target.getBoundingClientRect().left - target.offsetWidth / 2
            const midOfButtonY = e.clientY - target.getBoundingClientRect().top - target.offsetHeight / 2 - 50
            target.style.backgroundPosition = `${midOfButtonX}px ${midOfButtonY}px`
        }
    }
}