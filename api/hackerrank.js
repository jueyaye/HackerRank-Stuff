const axios = require("axios");

const base = "https://www.hackerrank.com/rest/contests/master/challenges";

const fetchChallenge = challenge => {
  try {
    const res = axios.get(`${base}/${challenge}`);

    return res;
  } catch (err) {
    throw new Error("Unable to fetch challenge.");
  }
};

const fetchPdf = challenge => {
  try {
    const res = axios.get(
      `${base}/${challenge}/download_pdf?language=English`,
      {
        responseType: "stream"
      }
    );

    return res;
  } catch (err) {
    throw new Error("Unable to fetch challenge.");
  }
};

const fetchTestCases = challenge => {
  try {
    const res = axios.get(`${base}/${challenge}/download_testcases`, {
      responseType: "arraybuffer",
      responseEncoding: "binary"
    });

    return res;
  } catch (err) {
    throw new Error("Unable to fetch challenge.");
  }
};

module.exports = {
  fetchChallenge,
  fetchPdf,
  fetchTestCases
};
