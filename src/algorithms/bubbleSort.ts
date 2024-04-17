import swapArrayElements from "../utilities/swapArrayElements"

export default function bubbleSort(arr: Array<number>) {
    const copy = [...arr]
    const animations: [number[], boolean][] = []
    for (let i = 0; i < copy.length; i++) { 
        for (let j = 0; j < (copy.length - i - 1); j++) {
            animations.push([[j, j+1], false])
            if (copy[j] > copy[j + 1]) {
                animations.push([[j+1, copy[j]], true])
                animations.push([[j, copy[j+1]], true])
                swapArrayElements(copy, j, j+1)
            }
        }
    }
    return animations
}