import swapArrayElements from "../utilities/swapArrayElements";

export function quickSort(arr: number[]) {
  const copy = [...arr];
  const animations: [number[], boolean][] = [];
  quickSortHelper(copy, 0, copy.length - 1, animations);
  return animations;
}
  
function quickSortHelper(arr: number[], left: number, right: number, animations: [number[], boolean][]) {
  if (right <= left) return;
  const part = partition(arr, left, right, animations);
  quickSortHelper(arr, left, part, animations);
  quickSortHelper(arr, part + 1, right, animations);
}
  
function partition(arr: number[], left: number, right: number, animations: [number[], boolean][]) {
  let i = left;
  let j = right + 1;
  const pivot = arr[left];
  while (true) {
    while (arr[++i] <= pivot) {
      if (i === right) break;
      animations.push([[i], false]);
    }
    while (arr[--j] >= pivot) {
      if (j === left) break;
      animations.push([[j], false]);
    }
    if (j <= i) break;
    animations.push([[i, arr[j]], true]);
    animations.push([[j, arr[i]], true]);
    swapArrayElements(arr, i, j);
  }
  animations.push([[left, arr[j]], true]);
  animations.push([[j, arr[left]], true]);
  swapArrayElements(arr, left, j);
  return j;
}