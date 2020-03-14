import chai = require("chai");
// import sinon = require("sinon");
import "mocha";

// import { wrapKeyNamesWithKbdTags } from "../../regex_manipulation/regex_manipulation.js";
import { doReplaceKeyNamesWithUnicodeChars } from "../../replaceWithIcons.js";

// Copied from https://github.com/NilsJPWerner/autoDocstring/blob/master/src/test/parse/docstring_is_closed.spec.ts
chai.config.truncateThreshold = 0;
const expect = chai.expect;

suite("replaceKeyNamesWithIcons", () => {
  test("replace", () => {
    const input: string = "ctrl + i moi";
    const output: string = doReplaceKeyNamesWithUnicodeChars(input);
    const expected: string = "^ + i moi";
    expect(output).to.eql(expected);
  });

  test("Don't replace key name in the middle of a word.", () => {
    const input: string = "in the middlecmdof a word.";
    const output: string = doReplaceKeyNamesWithUnicodeChars(input);
    const expected: string = "in the middlecmdof a word.";
    expect(output).to.eql(expected);
  });

  test("After dot", () => {
    const input: string = ".cmd ";
    const output: string = doReplaceKeyNamesWithUnicodeChars(input);
    const expected: string = ".⌘ ";
    expect(output).to.eql(expected);
  });
});
