import chai = require("chai");
import "mocha";

import {
  createRegExp,
  getRegexForMatchingKeyNamesNotYetWrapped,
  getRegexForMatchingKeyNamesWrappedAlready
} from "../../regexPatterns.js";
import { AssertionError } from "assert";

// Copied from https://github.com/NilsJPWerner/autoDocstring/blob/master/src/test/parse/docstring_is_closed.spec.ts
chai.config.truncateThreshold = 0;
const expect = chai.expect;

suite("getRegexForMatchingKeyNamesNotYetWrapped", () => {
  test("Regex pattern should match single simple key name combination", () => {
    const testString = "ctrl+i";
    const expected = ["ctrl+i"];
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Regex pattern should not match key names already wrapped with <kbd> tags", () => {
    const testString = "<kbd>ctrl+i</kbd>";
    const expected = null;
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Regex pattern should not match single simple key name combination if key name not valid", () => {
    const testString = "cmd+i";
    const expected = null;
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Regex pattern should match multiple key name combinations.", () => {
    const testString = "ctrl+i, ctrl+shift+i and ctrl+shift+p";
    const expected = ["ctrl+i,", " ctrl+shift+i ", " ctrl+shift+p"];
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Regex pattern should match multiple key name combinations in the middle of a sentence.", () => {
    const testString =
      "Check out these shortcut keys: ctrl+i, ctrl+shift+i and ctrl+shift+p.";
    const expected = [" ctrl+i,", " ctrl+shift+i ", " ctrl+shift+p."];
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Matching should be case insensitive.", () => {
    const testString = "CTRL+i";
    const expected = ["CTRL+i"];
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Regex pattern should match key name combination at the end of a sentence.", () => {
    const testString = "Check out this shorcut key: ctrl+i.";
    const expected = [" ctrl+i."];
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Should not match key names separated by minus sign", () => {
    const testString = "ctrl-i";
    const expected = null;
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Should not match word 'shift' when the context is not a key name", () => {
    const testString = "Hit ctrl+r to shift items to the right.";
    const expected = [" ctrl+r "];
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Should match key name combination using ⌘ instead of cmd", () => {
    const testString = "日本語 ⌘+r 日本語";
    const expected = [" ⌘+r "];
    const validKeyNames = ["⌘", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Should match key name combination using ⌥ instead of opt", () => {
    const testString = "日本語 ⌥+r 日本語";
    const expected = [" ⌥+r "];
    const validKeyNames = ["⌥", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Should match key name combination in the middle of non ascii characters", () => {
    const testString = "日本語 ctrl+r 日本語";
    const expected = [" ctrl+r "];
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
});

suite("getRegexForMatchingKeyNamesWrappedAlready", () => {
  test("Regex pattern should match key names already wrapped with <kbd> tags.", () => {
    const testString: string = "<kbd>ctrl+i</kbd>";
    const expected = ["<kbd>ctrl+i</kbd>", "ctrl+i"];
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesWrappedAlready(
      validKeyNames
    );
    const result = pattern.exec(testString);
    if (result) {
      expect(result[0]).to.eql(expected[0]);
      expect(result[1]).to.eql(expected[1]);
    } else {
      expect.fail("No match");
    }
  });
  
  test("Regex pattern should match multiple key names already wrapped with <kbd> tags.", () => {
    const testString = "<kbd>ctrl+i</kbd>, <kbd>ctrl+shift+k</kbd>";
    const expected = ["<kbd>ctrl+i</kbd>", "ctrl+i"];
    const expected2 = ["<kbd>ctrl+shift+k</kbd>", "ctrl+shift+k"];
    const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesWrappedAlready(
      validKeyNames
    );
    const result = pattern.exec(testString);
    if (result) {
      expect(result[0]).to.eql(expected[0]);
      expect(result[1]).to.eql(expected[1]);
    } else {
      expect.fail("No match");
    }

    const result2 = pattern.exec(testString);
    if (result2) {
      expect(result2[0]).to.eql(expected2[0]);
      expect(result2[1]).to.eql(expected2[1]);
    } else {
      expect.fail("No match");
    }
  });

});
