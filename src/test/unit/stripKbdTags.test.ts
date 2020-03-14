import chai = require("chai");
import "mocha";

import {
  stripAllKbdTagsFromString
} from "../../removeKbdTags";

// Copied from https://github.com/NilsJPWerner/autoDocstring/blob/master/src/test/parse/docstring_is_closed.spec.ts
chai.config.truncateThreshold = 0;
const expect = chai.expect;

suite("stripKbdTagsFromString", () => {
  test("should remove kbd tags", () => {
    const input: string = "<kbd>ctrl+i</kbd>";
    const output: string = stripAllKbdTagsFromString(input);
    const expected: string = "ctrl+i";
    expect(output).to.equal(expected);
  });

  test("should remove multiple kbd tags", () => {
    const input: string = "<kbd>Ctrl+i</kbd>, <kbd>Ctrl+r</kbd>";
    const output: string = stripAllKbdTagsFromString(input);
    const expected: string = "Ctrl+i, Ctrl+r";
    expect(output).to.equal(expected);
  });

  test("should remove multiple kbd tags containing unicode characters", () => {
    const input: string = "<kbd>⌘</kbd>+<kbd>c</kbd>";
    const output: string = stripAllKbdTagsFromString(input);
    const expected: string = "⌘+c";
    expect(output).to.equal(expected);
  });
  // test("should remove kbd tags when tags used in the middle of a sentence", () => {
  //   const input: string =
  //     "A key name <kbd>Ctrl</kbd>+<kbd>i</kbd> in the middle of a sentence";
  //   const output: string = stripKbdTagsFromString(input);
  //   const expected: string = "A key name Ctrl+i in the middle of a sentence";
  //   expect(output).to.equal(expected);
  // });

  // test("should remove multiple occuerences of kbd tags", () => {
  //   const input: string =
  //     "Shortcut keys: <kbd>Ctrl</kbd>+<kbd>i</kbd> and <kbd>Ctrl</kbd>+<kbd>p</kbd>.";
  //   const output: string = stripKbdTagsFromString(input);
  //   const expected: string = "Shortcut keys: Ctrl+i and Ctrl+p.";
  //   expect(output).to.equal(expected);
  // });
});
