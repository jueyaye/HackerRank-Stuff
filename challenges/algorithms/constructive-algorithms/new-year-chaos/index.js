"use strict";

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

// Complete the minimumBribes function below.
function minimumBribes(q) {
  let bribes = 0;

  for (let i = q.length - 1; i >= 0; i--) {
    if (q[i] - (i + 1) > 2) {
      process.stdout.write("Too chaotic\n");
      return;
    }

    let maxBribes = 0;

    if (q[i] - 2 > 0) maxBribes = q[i] - 2;

    for (let j = maxBribes; j < i; j++) if (q[j] > q[i]) bribes++;
  }

  process.stdout.write(`${bribes}\n`);
}

function main() {
  const t = parseInt(readLine(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine(), 10);

    const q = readLine()
      .split(" ")
      .map(qTemp => parseInt(qTemp, 10));

    minimumBribes(q);
  }
}