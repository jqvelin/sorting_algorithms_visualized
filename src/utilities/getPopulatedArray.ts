import shuffle from "./shuffleArray"

export default function getPopulatedArray(length: number = 100){
    const array = []
    for (let i = 0; i < length; i++){
        array.push(20 + 2 * i)
        shuffle(array)
    }
    return array
}