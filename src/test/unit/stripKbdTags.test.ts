import chai = require("chai");
import "mocha";

import {
  stripAllKbdTagsFromString
} from "../../removeKbdTags";

// Do not truncate assertion errors
chai.config.truncateThreshold = 0;
const expect = chai.expect;

suite("Test removing kbd tags from string", () => {
  test("Should remove kbd tags.", () => {
    const input: string = "<kbd>ctrl+i</kbd>";
    const output: string = stripAllKbdTagsFromString(input);
    const expected: string = "ctrl+i";
    expect(output).to.equal(expected);
  });

  test("Should remove multiple kbd tags.", () => {
    const input: string = "<kbd>Ctrl+i</kbd>, <kbd>Ctrl+r</kbd>";
    const output: string = stripAllKbdTagsFromString(input);
    const expected: string = "Ctrl+i, Ctrl+r";
    expect(output).to.equal(expected);
  });

  test("Should remove multiple kbd tags containing unicode characters.", () => {
    const input: string = "<kbd>⌘</kbd>+<kbd>c</kbd>";
    const output: string = stripAllKbdTagsFromString(input);
    const expected: string = "⌘+c";
    expect(output).to.equal(expected);
  });
  test("should remove kbd tags when tags used in the middle of a sentence", () => {
    const input: string =
      "A key name <kbd>Ctrl</kbd>+<kbd>i</kbd> in the middle of a sentence";
    const output: string = stripAllKbdTagsFromString(input);
    const expected: string = "A key name Ctrl+i in the middle of a sentence";
    expect(output).to.equal(expected);
  });
});
