import swapArrayElements from "../utilities/swapArrayElements"

export default function selectionSort(arr: number[]) {
    const copy = [...arr]
    const animations: [number[], boolean][] = []
  
    for (let i = 0; i < copy.length; i++) {
      for (let j = i + 1; j < copy.length; j++) {
        animations.push([[i, j], false])
        if (copy[i] > copy[j]) {
          animations.push([[i, copy[j]], true])
          animations.push([[j, copy[i]], true])
          swapArrayElements(copy, i, j)
        }
      }
    }
    return animations
}