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

// Complete the isValid function below.
function isValid(s) {
  let dict = {};
  for (let i = 0; i < s.length; i += 1) {
    let char = s[i];

    dict[char] = dict[char] ? dict[char] + 1 : 1;
  }

  console.log(dict);

  let arr = Object.keys(dict);
  let base = dict[arr[0]];
  let diff = true;

  for (let i = 1; i < arr.length; i += 1) {
    let char = arr[i];

    if (base != dict[char]) {
      if (diff && (Math.abs(base - dict[char]) == 1 || dict[char] == 1))
        diff = false;
      else return "NO";
    }
  }

  return "YES";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  let result = isValid(s);

  ws.write(result + "\n");

  ws.end();
}
