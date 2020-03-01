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

// Complete the makeAnagram function below.
function makeAnagram(a, b) {
  let count = 0;

  let aDict = {};
  let bDict = {};

  for (let i = 0; i < a.length; i += 1) {
    let char = a[i];

    aDict[char] = aDict[char] ? aDict[char] + 1 : 1;
  }

  for (let i = 0; i < b.length; i += 1) {
    let char = b[i];

    bDict[char] = bDict[char] ? bDict[char] + 1 : 1;
  }

  console.log(aDict);

  console.log(bDict);

  let aArray = Object.keys(aDict);
  for (let i = 0; i < aArray.length; i += 1) {
    let char = aArray[i];

    let dif = bDict[char] ? bDict[char] : 0;

    count += Math.abs(aDict[char] - dif);

    delete aDict[char];
    delete bDict[char];
  }

  console.log(count);

  let bArray = Object.keys(bDict);
  for (let i = 0; i < bArray.length; i += 1) {
    let char = bArray[i];

    count += bDict[char];
  }

  return count;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const a = readLine();

  const b = readLine();

  const res = makeAnagram(a, b);

  ws.write(res + "\n");

  ws.end();
}
