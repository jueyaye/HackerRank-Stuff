const path = require("path");
const mkdirp = require("mkdirp");
const lodash = require("lodash");
const fs = require("fs");
const zip = require("adm-zip");

const api = require("../api/hackerrank");

const languageMappings = {
  javascript: {
    file: "index.js",
    cmd: "node"
  },
  python: {
    file: "main.py",
    cmd: "python3"
  }
};

async function startChallenge({ language, challenge }) {
  try {
    const { data } = await api.fetchChallenge(challenge);

    const track = data.model.track;
    const subDir = path.join(track.track_slug, track.slug, data.model.slug);
    const absDir = path.join(`${process.cwd()}/challenges`, subDir);

    console.log(subDir);

    mkdirp.sync(absDir);
    mkdirp.sync(path.join(absDir, "input"));
    mkdirp.sync(path.join(absDir, "output"));

    const mainFile = path.join(absDir, languageMappings[language].file);
    const pdfFile = path.join(absDir, "challange.pdf");

    const template = lodash
      .compact([
        data.model[`${language}_template_head`],
        data.model[`${language}_template`],
        data.model[`${language}_template_tail`]
      ])
      .join("\n");

    fs.writeFileSync(mainFile, template);

    const pdfFileHandle = fs.createWriteStream(pdfFile);
    api.fetchPdf(challenge).then(res => {
      res.data.pipe(pdfFileHandle);
    });

    const testCases = await api.fetchTestCases(challenge);

    const zippedTestCases = new zip(testCases.data);
    zippedTestCases.extractAllTo(absDir, true);

    console.log("done");
  } catch (err) {
    console.error(err);
    throw new Error("Unable to start challenge.");
  }
}

module.exports = {
  startChallenge
};
