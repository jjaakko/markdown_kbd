import chai = require("chai");
import sinon = require("sinon");
import "mocha";

import { wrapKeyNamesWithKbdTags } from "../../regex_manipulation/regex_manipulation.js";
import { Config } from "../../types";
import * as regexPatternsModule from "../../regexPatterns.js";

// Copied from https://github.com/NilsJPWerner/autoDocstring/blob/master/src/test/parse/docstring_is_closed.spec.ts
chai.config.truncateThreshold = 0;
const expect = chai.expect;

// Note: the default config is:
// const config: Config = {
//   wrapKeyNamesSeparately: true,
//   addSpacesAroundPlusSign: false
// };
// If wrapKeyNamesWithKbdTags is passed `config`, the default config is used.

suite("wrapKeyNamesWithKbdTags()", () => {
  // Is this in the right place? Could this be defined in suiteSetup..?
  let config: Config = {
    wrapKeyNamesSeparately: true,
    addSpacesAroundPlusSign: false,
    replaceWithIcons: false,
  };

  let stub = sinon.stub(regexPatternsModule, "getRegexForMatchingKeyNamesNotYetWrapped");
  suiteSetup(function() {
    stub.returns(
      new RegExp(
        /(?<!<kbd)(?:^|\W)(cmd|⌘|shift|ctrl|alt|enter|esc|tab|space|opt|⌥|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12) ?\+ ?([a-z]|((cmd|⌘|shift|ctrl|alt|enter|esc|tab|space|opt|⌥|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12)))( ?\+ ?([a-z]|((cmd|⌘|shift|ctrl|alt|enter|esc|tab|space|opt|⌥|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12)))){0,5}(?:$|\W)(?!\/kbd>)/giu
      )
    );
  });

  suiteTeardown(function() {
    stub.restore();
  });

  test("should return key names wrapped with <kbd> tags", () => {
    const input: string = "ctrl+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Ctrl</kbd>+<kbd>I</kbd>";
    expect(output).to.equal(expected);
  });

  test("should return key names wrapped in <kbd> tags and spaces between keynames removed", () => {
    const input: string = "ctrl + i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Ctrl</kbd>+<kbd>I</kbd>";
    expect(output).to.equal(expected);
  });

  test("should return key names wrapped in <kbd> tags and spaces added between key names", () => {
    const input: string = "ctrl+i";
    config = {
      wrapKeyNamesSeparately: false,
      addSpacesAroundPlusSign: true,
      replaceWithIcons: false,
    };
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Ctrl + I</kbd>";
    expect(output).to.equal(expected);
  });

  test("should return all key names together, wrapped in one pair of <kbd> tags", () => {
    const input: string = "ctrl+i";
    config = {
      wrapKeyNamesSeparately: false,
      addSpacesAroundPlusSign: false,
      replaceWithIcons: false,
    };
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Ctrl+I</kbd>";
    expect(output).to.equal(expected);
  });

  test("should return multiple occurences of key names wrapped in <kbd> tags", () => {
    config.wrapKeyNamesSeparately = true;
    const input: string = "ctrl+i, ctrl+shift+i and ctrl+shift+p";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string =
      "<kbd>Ctrl</kbd>+<kbd>I</kbd>, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> and <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>";
    expect(output).to.equal(expected);
  });

  test("should return key names in the middle of a sentence wrapped with kbd tags", () => {
    const input: string =
      "A keyboard string ctrl+i in the middle of a sentence.";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string =
      "A keyboard string <kbd>Ctrl</kbd>+<kbd>I</kbd> in the middle of a sentence.";
    expect(output).to.equal(expected);
  });

  test("matching key names should be case insensitive", () => {
    const input: string =
      "A keyboard string CTRL+i in the middle of a sentence.";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string =
      "A keyboard string <kbd>Ctrl</kbd>+<kbd>I</kbd> in the middle of a sentence.";
    expect(output).to.equal(expected);
  });

  test("should return key names at the end of a sentence wrapped with kbd tags", () => {
    const input: string =
      "A keyboard string ctrl+i in the middle of a sentence.";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string =
      "A keyboard string <kbd>Ctrl</kbd>+<kbd>I</kbd> in the middle of a sentence.";
    expect(output).to.equal(expected);
  });

  test("should return multiple key names in the middle of a sentence wrapped with kbd tags", () => {
    const input: string =
      "A keyboard string ctrl+shift+i+w in the middle of a sentence.";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string =
      "A keyboard string <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>+<kbd>W</kbd> in the middle of a sentence.";
    expect(output).to.equal(expected);
  });

  test("should not wrap key names separated by minus sign", () => {
    const input: string = "ctrl-i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "ctrl-i";
    expect(output).to.equal(expected);
  });

  test("should not wrap non key names ab + cd", () => {
    const input: string = "ab+cd";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "ab+cd";
    expect(output).to.equal(expected);
  });

  test("should not wrap word shift when the context is not a key name", () => {
    const input: string = "hit ctrl+r to shift items to the right";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string =
      "hit <kbd>Ctrl</kbd>+<kbd>R</kbd> to shift items to the right";
    expect(output).to.equal(expected);
  });

  test("should not create nested <kbd> structures", () => {
    const input: string = "<kbd>ctrl+i</kbd>";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>ctrl+i</kbd>";
    expect(output).to.equal(expected);
  });

  test("Should wrap non-ascii characters such as ⌘", () => {
    const input: string = "⌘+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>⌘</kbd>+<kbd>I</kbd>";
    expect(output).to.equal(expected);
  });

  test("Should wrap key name combination in the middle of non ascii characters", () => {
    const input: string = "日本語 ⌘+i 日本語";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "日本語 <kbd>⌘</kbd>+<kbd>I</kbd> 日本語";
    expect(output.toString()).to.equal(expected);
  });

  test("Should replace cmd with ⌘", () => {
    config.replaceWithIcons = true;
    const input: string = "cmd+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>⌘</kbd>+<kbd>I</kbd>";
    expect(output.toString()).to.equal(expected);
  });

  test("Should replace opt with ⌥", () => {
    config.replaceWithIcons = true;
    const input: string = "opt+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>⌥</kbd>+<kbd>I</kbd>";
    expect(output.toString()).to.equal(expected);
  });

  test("Should not replace alt with ⌥", () => {
    config.replaceWithIcons = true;
    const input: string = "alt+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Alt</kbd>+<kbd>I</kbd>";
    expect(output.toString()).to.equal(expected);
  });
});
