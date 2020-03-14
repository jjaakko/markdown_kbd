import chai = require("chai");
// import sinon = require("sinon");
import "mocha";

// import { wrapKeyNamesWithKbdTags } from "../../regex_manipulation/regex_manipulation.js";
import { doReplacement } from "../../replace.js";

// Copied from https://github.com/NilsJPWerner/autoDocstring/blob/master/src/test/parse/docstring_is_closed.spec.ts
chai.config.truncateThreshold = 0;
const expect = chai.expect;

suite("replaceKeyNamesWithIcons", () => {
  test("Replace key names in the beginning of sentence.", () => {
    const input: string = "cmd + i lorem ipsum";
    const output: string = doReplacement(input, true);
    const expected: string = "⌘ + i lorem ipsum";
    expect(output).to.eql(expected);
  });

  test("Replace key names at the end of a line.", () => {
    const input: string = "- Lorem ipsum cmd";
    const output: string = doReplacement(input, true);
    const expected: string = "- Lorem ipsum ⌘";
    expect(output).to.eql(expected);
  });

  test("Replace multiple key names in a sentence.", () => {
    const input: string = "Hit cmd+shift+p to open command palette.";
    const output: string = doReplacement(input, true);
    const expected: string = "Hit ⌘+⇧+p to open command palette.";
    expect(output).to.eql(expected);
  });

  test("Don't replace key name in the middle of a word.", () => {
    const input: string = "in the middlecmdof a word.";
    const output: string = doReplacement(input, true);
    const expected: string = "in the middlecmdof a word.";
    expect(output).to.eql(expected);
  });
});
