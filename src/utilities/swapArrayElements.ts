export default function swapArrayElements(array: any[], firstElemIndex: number, secondElemIndex: number){
    const temp = array[firstElemIndex]
    array[firstElemIndex] = array[secondElemIndex]
    array[secondElemIndex] = temp
}