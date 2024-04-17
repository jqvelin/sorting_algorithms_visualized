export default function highlightArrayElements(color: string, ...elements: HTMLElement[]){
    elements.forEach(element => element.style.backgroundColor = color)
}