export default function shuffle(arr: any[]) {
    arr.sort(() => Math.random() - 0.5);
}