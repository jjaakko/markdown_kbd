import chai = require("chai");
import "mocha";

import {
  wrapKeyNamesWithKbdTags,
  stripKbdTagsFromString
} from "../../regex_manipulation/regex_manipulation.js";
import { Config } from "../../types";

// Copied from https://github.com/NilsJPWerner/autoDocstring/blob/master/src/test/parse/docstring_is_closed.spec.ts
chai.config.truncateThreshold = 0;
const expect = chai.expect;

// Note: the default config is:
// const config: Config = {
//   wrapKeyNamesSeparately: true,
//   addSpacesAroundPlusSign: false
// };
// If wrapKeyNamesWithKbdTags is passed `<Config>{}`, the default config is used.

suite("wrapKeyNamesWithKbdTags()", () => {
  test("should return key names wrapped with <kbd> tags", () => {
    const input: string = "cmd+i";
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string = "<kbd>Cmd</kbd>+<kbd>i</kbd>";
    expect(output).to.equal(expected);
  });

  test("should return key names wrapped in <kbd> tags and spaces between keynames removed", () => {
    const input: string = "cmd + i";
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string = "<kbd>Cmd</kbd>+<kbd>i</kbd>";
    expect(output).to.equal(expected);
  });

  test("should return key names wrapped in <kbd> tags and spaces added between key names", () => {
    const input: string = "cmd+i";
    const config: Config = {
      wrapKeyNamesSeparately: false,
      addSpacesAroundPlusSign: true
    };
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string = "<kbd>Cmd</kbd>+<kbd>i</kbd>";
    expect(output).to.equal(expected);
  });

  test("should return all key names together, wrapped in one pair of <kbd> tags", () => {
    const input: string = "cmd+i";
    const config: Config = {
      wrapKeyNamesSeparately: false,
      addSpacesAroundPlusSign: false
    };
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Cmd+i</kbd>";
    expect(output).to.equal(expected);
  });

  test("should return multiple occurences of key names wrapped in <kbd> tags", () => {
    const input: string = "cmd+i, cmd+shift+i and cmd+shift+p";
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string =
      "<kbd>Cmd</kbd>+<kbd>i</kbd>, <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>i</kbd> and <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>p</kbd>";
    expect(output).to.equal(expected);
  });

  test("should return key names in the middle of a sentence wrapped with kbd tags", () => {
    const input: string =
      "A keyboard string cmd+i in the middle of a sentence.";
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string =
      "A keyboard string <kbd>Cmd</kbd>+<kbd>i</kbd> in the middle of a sentence.";
    expect(output).to.equal(expected);
  });

  test("matching key names should be case insensitive", () => {
    const input: string =
      "A keyboard string CMD+i in the middle of a sentence.";
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string =
      "A keyboard string <kbd>Cmd</kbd>+<kbd>i</kbd> in the middle of a sentence.";
    expect(output).to.equal(expected);
  });

  test("should return key names at the end of a sentence wrapped with kbd tags", () => {
    const input: string =
      "A keyboard string cmd+i in the middle of a sentence.";
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string =
      "A keyboard string <kbd>Cmd</kbd>+<kbd>i</kbd> in the middle of a sentence.";
    expect(output).to.equal(expected);
  });

  test("should return multiple key names in the middle of a sentence wrapped with kbd tags", () => {
    const input: string =
      "A keyboard string cmd+shift+i+w in the middle of a sentence.";
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string =
      "A keyboard string <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>i</kbd>+<kbd>w</kbd> in the middle of a sentence.";
    expect(output).to.equal(expected);
  });

  test("should not wrap key names separated by minus sign", () => {
    const input: string = "cmd-i";
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string = "cmd-i";
    expect(output).to.equal(expected);
  });

  test("should not wrap non key names ab + cd", () => {
    const input: string = "ab+cd";
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string = "ab+cd";
    expect(output).to.equal(expected);
  });

  test("should not wrap word shift when the context is not a key name", () => {
    const input: string = "hit cmd+r to shift items to the right";
    const output: string = wrapKeyNamesWithKbdTags(input, <Config>{});
    const expected: string =
      "hit <kbd>Cmd</kbd>+<kbd>r</kbd> to shift items to the right";
    expect(output).to.equal(expected);
  });

  // test("create regex", () => {
  //   const input: string = "ja+jo";
  //   const output: RegExp = createRegExp(["cmd", "shift"]);
  //   const expected: string = "ja+jo";
  //   expect(output.toString()).to.equal(expected);
  // });
});

suite("stripKbdTagsFromString", () => {
  test("should remove kbd tags", () => {
    const input: string = "<kbd>Cmd</kbd>+<kbd>i</kbd>";
    const output: string = stripKbdTagsFromString(input);
    const expected: string = "Cmd+i";
    expect(output).to.equal(expected);
  });

  test("should remove kbd tags when tags used in the middle of a sentence", () => {
    const input: string =
      "A key name <kbd>Cmd</kbd>+<kbd>i</kbd> in the middle of a sentence";
    const output: string = stripKbdTagsFromString(input);
    const expected: string = "A key name Cmd+i in the middle of a sentence";
    expect(output).to.equal(expected);
  });

  test("should remove multiple occuerences of kbd tags", () => {
    const input: string =
      "Shortcut keys: <kbd>Cmd</kbd>+<kbd>i</kbd> and <kbd>Cmd</kbd>+<kbd>p</kbd>.";
    const output: string = stripKbdTagsFromString(input);
    const expected: string = "Shortcut keys: Cmd+i and Cmd+p.";
    expect(output).to.equal(expected);
  });
});
