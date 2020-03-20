import chai = require("chai");
import { validKeyNames } from "../../validKeyNames";
import "mocha";

import {
  getRegexForMatchingKeyNamesNotYetWrapped,
  getRegexForMatchingKeyNamesWrappedAlready
} from "../../regexPatterns.js";

// Copied from https://github.com/NilsJPWerner/autoDocstring/blob/master/src/test/parse/docstring_is_closed.spec.ts
chai.config.truncateThreshold = 0;
const expect = chai.expect;

suite("Test matching key names that are not yet wrapped with kbd tags.", () => {
  test("Regex pattern should match single simple key name combination", () => {
    const testString = "ctrl+i";
    const expected = ["ctrl+i"];
    // const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Regex pattern should not match single simple key name combination if key name not valid", () => {
    const testString = "cmd+i";
    const expected = null;
    // const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Regex pattern should match multiple keynames", () => {
    const testString = "|  alt + arrUp or alt + arrDown.";
    const expected = [" alt + arrUp ", " alt + arrDown."];
    // const validKeyNames = ["alt", "arrUp", "arrDown"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Regex pattern should match multiple key name combinations.", () => {
    const testString = "ctrl+i, ctrl+shift+i and ctrl+shift+p";
    const expected = ["ctrl+i,", " ctrl+shift+i ", " ctrl+shift+p"];
    // const validKeyNames = ["ctrl", "shift"];
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
    // const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Matching should be case insensitive.", () => {
    const testString = "CTRL+i";
    const expected = ["CTRL+i"];
    // const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Regex pattern should match key name combination at the end of a sentence.", () => {
    const testString = "Check out this shorcut key: ctrl+i.";
    const expected = [" ctrl+i."];
    // const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  // test("Should not match key names separated by minus sign", () => {
  //   const testString = "ctrl-i";
  //   const expected = null;
  //   const validKeyNames = ["ctrl", "shift"];
  //   const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
  //     validKeyNames
  //   );
  //   const matches = testString.match(pattern);
  //   expect(matches).to.eql(expected);
  // });
  // test("Should not match word 'shift' when the context is not a key name", () => {
  //   const testString = "Hit ctrl+r to shift items to the right.";
  //   const expected = [" ctrl+r "];
  //   const validKeyNames = ["ctrl", "shift"];
  //   const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
  //     validKeyNames
  //   );
  //   const matches = testString.match(pattern);
  //   expect(matches).to.eql(expected);
  // });
  test("Should match key name combination using ⌘ instead of cmd", () => {
    const testString = "日本語 ⌘+r 日本語";
    const expected = [" ⌘+r "];
    // const validKeyNames = ["⌘", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Should match key name combination using ⌥ instead of opt", () => {
    const testString = "日本語 ⌥+r 日本語";
    const expected = [" ⌥+r "];
    // const validKeyNames = ["⌥", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Should match key name combination in the middle of non ascii characters", () => {
    const testString = "日本語 ctrl+r 日本語";
    const expected = [" ctrl+r "];
    // const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    console.log(pattern);
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
});

suite("Test matching key names that are already wrapped with kbd tags.", () => {
  test("Regex pattern should match key names already wrapped with <kbd> tags.", () => {
    const testString: string = "<kbd>ctrl+i</kbd>";
    const expected = ["<kbd>ctrl+i</kbd>", "ctrl+i"];
    // const validKeyNames = ["ctrl", "shift"];
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

  // NOTE: These tests are not relevant currently.
  // <kbd> tags are currently removed with out complex regex.
  // Preserve the tests for future reference.
  // getRegexForMatchingKeyNamesWrappedAlready doesn't currently
  // match <kbd>⌘</kbd>+<kbd>c</kbd> as it doesn't consider
  // single character without a plus sign as part ot a sequence to be matched.
  test("Regex pattern should match multiple key names already wrapped with <kbd> tags.", () => {
    const testString = "<kbd>ctrl+i</kbd>, <kbd>ctrl+shift+k</kbd>";
    const expected = ["<kbd>ctrl+i</kbd>", "ctrl+i"];
    const expected2 = ["<kbd>ctrl+shift+k</kbd>", "ctrl+shift+k"];
    // const validKeyNames = ["ctrl", "shift"];
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

  // test("Regex pattern should match ⌘+C already wrapped with <kbd> tags.", () => {
  //   const testString: string = "<kbd>⌘</kbd>+<kbd>c</kbd>";
  //   const validKeyNames = ["⌘"];
  //   const pattern: RegExp = getRegexForMatchingKeyNamesWrappedAlready(
  //     validKeyNames
  //   );
  //   const result = pattern.exec(testString);
  //   // We expect no match as <kbd>⌘</kbd>+<kbd>c</kbd> is not considered as valid pattern by
  //   // getRegexForMatchingKeyNamesWrappedAlready.
  //   // NOTE: <kbd>⌘+c</kbd> would be a valid pattern.
  //   expect(result).to.eql(null);
  // });
});
