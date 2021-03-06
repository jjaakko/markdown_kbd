import chai = require("chai");
// import sinon = require("sinon");
import "mocha";

// import { wrapKeyNamesWithKbdTags } from "../../regex_manipulation/regex_manipulation.js";
import { replaceKeynameWithIconOrViceVersa } from "../../replace.js";

// Do not truncate assertion errors.
chai.config.truncateThreshold = 0;
const expect = chai.expect;

suite("Test replacing key names with icons or vice versa", () => {
  test("Replace key names in the beginning of sentence.", () => {
    const input: string = "cmd + i lorem ipsum";
    const output: string = replaceKeynameWithIconOrViceVersa(input, true);
    const expected: string = "⌘ + i lorem ipsum";
    expect(output).to.eql(expected);
  });

  test("Replace key names at the end of a sentence.", () => {
    const input: string = "- Lorem ipsum cmd";
    const output: string = replaceKeynameWithIconOrViceVersa(input, true);
    const expected: string = "- Lorem ipsum ⌘";
    expect(output).to.eql(expected);
  });

  test("Replace multiple key names in a sentence.", () => {
    const input: string = "Hit cmd+shift+p to open command palette.";
    const output: string = replaceKeynameWithIconOrViceVersa(input, true);
    const expected: string = "Hit ⌘+⇧+p to open command palette.";
    expect(output).to.eql(expected);
  });

  test("Don't replace key name in the middle of a word.", () => {
    const input: string = "in the middlecmdof a word.";
    const output: string = replaceKeynameWithIconOrViceVersa(input, true);
    const expected: string = "in the middlecmdof a word.";
    expect(output).to.eql(expected);
  });

  test("Replace multiple icons with key names.", () => {
    const input: string = "Hit ⌘+⇧+p to open command palette.";
    const output: string = replaceKeynameWithIconOrViceVersa(input, false);
    const expected: string = "Hit Cmd+Shift+p to open command palette.";
    expect(output).to.eql(expected);
  });
});
