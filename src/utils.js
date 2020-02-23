export const mergeSort = (arr, rankBy) => {
  if (arr.length === 1) return arr;
  let middleIdx = Math.floor(arr.length / 2);
  let left = arr.slice(0, middleIdx);
  let right = arr.slice(middleIdx);
  return mergeSortHelper(
    mergeSort(left, rankBy),
    mergeSort(right, rankBy),
    rankBy
  );
};
const mergeSortHelper = (a1, a2, rankBy, aux = []) => {
  while (a1.length && a2.length) {
    aux.push(a1[0][rankBy] < a2[0][rankBy] ? a1.shift() : a2.shift());
  }
  return [...aux, ...a1, ...a2];
};
