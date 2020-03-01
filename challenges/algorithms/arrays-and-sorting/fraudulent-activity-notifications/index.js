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

// Complete the activityNotifications function below.
function activityNotifications(expenditure, d) {
  let n = 0;
  let low = Math.floor((d - 1) / 2);
  let high = Math.ceil((d - 1) / 2);

  let cs = new Array(201).fill(0);
  for (let i = d - 1; i >= 0; i--) cs[expenditure[i]]++;

  for (let i = d; i < expenditure.length; i++) {
    let m1, m2, m;
    for (let j = 0, k = 0; k <= low; k += cs[j], j++) m1 = j;
    for (let j = 0, k = 0; k <= high; k += cs[j], j++) m2 = j;

    m = (m1 + m2) / 2;

    if (expenditure[i] >= m * 2) n += 1;

    cs[expenditure[i - d]] -= 1;
    cs[expenditure[i]] += 1;
  }

  return n;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const nd = readLine().split(" ");

  const n = parseInt(nd[0], 10);

  const d = parseInt(nd[1], 10);

  const expenditure = readLine()
    .split(" ")
    .map(expenditureTemp => parseInt(expenditureTemp, 10));

  let result = activityNotifications(expenditure, d);

  ws.write(result + "\n");

  ws.end();
}
