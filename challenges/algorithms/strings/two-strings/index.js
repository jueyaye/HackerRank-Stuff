"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", inputStdin => {
  inputString += inputStdin;
});

process.stdin.on("end", _ => {
  inputString = inputString
    .replace(/\s*$/, "")
    .split("\n")
    .map(str => str.replace(/\s*$/, ""));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the twoStrings function below.
function twoStrings(s1, s2) {
  let dict = {};

  for (let i = 0; i < s1.length; i += 1) {
    let char = s1[i];
    dict[char] = dict[char] ? dict[char] + 1 : 1;
  }

  for (let i = 0; i < s2.length; i += 1) {
    let char = s2[i];

    if (dict[char]) return "YES";
  }

  return "NO";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s1 = readLine();

    const s2 = readLine();

    let result = twoStrings(s1, s2);

    ws.write(result + "\n");
  }

  ws.end();
}
