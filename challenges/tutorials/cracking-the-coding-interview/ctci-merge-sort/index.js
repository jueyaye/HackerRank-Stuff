"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", inputStdin => {
  inputString += inputStdin;
});

process.stdin.on("end", function() {
  inputString = inputString
    .replace(/\s*$/, "")
    .split("\n")
    .map(str => str.replace(/\s*$/, ""));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

const merge = (left, right, counter) => {
  let resultArray = [];
  let count = 0;

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex += 1;
    } else {
      count += left.length - leftIndex;
      resultArray.push(right[rightIndex]);
      rightIndex += 1;
    }
  }

  counter.swap += count;

  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
};

const mergeSort = (arr, counter) => {
  if (arr.length < 2) return arr;

  const middle = Math.floor(arr.length / 2);

  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left, counter), mergeSort(right, counter), counter);
};

// Complete the countInversions function below.
function countInversions(arr) {
  let counter = { swap: 0 };

  let final = mergeSort(arr, counter);

  return counter.swap;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine(), 10);

    const arr = readLine()
      .split(" ")
      .map(arrTemp => parseInt(arrTemp, 10));

    const result = countInversions(arr);

    ws.write(result + "\n");
  }

  ws.end();
}
