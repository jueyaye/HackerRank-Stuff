const commands = require("command-line-commands");
const args = require("command-line-args");

const handlers = require("../handlers/commands");

const validCommands = ["fetch"];
const { command, argv } = commands(validCommands);

const optionDefinitions = {
  fetch: [
    { name: "challenge", type: String },
    { name: "language", type: String }
  ]
};
const options = args(optionDefinitions[command], { argv });

(async () => {
  switch (command) {
    case "fetch":
      return await handlers.startChallenge(options);
    default:
      return console.log(
        "This should be an explanation of the available cli functions."
      );
      break;
  }
})();
