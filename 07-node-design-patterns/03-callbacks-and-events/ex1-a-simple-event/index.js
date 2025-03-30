import { EventEmitter } from "events";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __direname = dirname(__filename);

/**
 * @description A class that emits events when a given regex is found in a file
 * @property {RegExp} regex
 */
class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    process.nextTick(() => this.emit("started", this.files));
    for (const file of this.files) {
      const filepath = join(__direname, file);
      fs.readFile(filepath, "utf8", (err, data) => {
        if (err) {
          return this.emit("error", err);
        }

        this.emit("fileread", file);

        const match = data.match(this.regex);
        if (match) {
          match.forEach((ele) => this.emit("found", file, ele));
        }
      });
    }
    return this;
  }
}

//* Example usage: node index.js */
const findRegexInstance = new FindRegex(/hello \w+/);
findRegexInstance
  .addFile("fileA.txt")
  .addFile("fileB.json")
  .find()
  .on("found", (file, match) =>
    console.log(`Matched "${match}" in file ${file}`)
  )
  .on("error", (err) => console.error(`Error emitted ${err.message}`))
  .on("started", (files) => {
    console.log(`Find process started this files: ${JSON.stringify(files)}`);
  });
