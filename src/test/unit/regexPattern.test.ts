import chai = require("chai");
import { validKeyNames } from "../../validKeyNames";
import "mocha";

import {
  getRegexForMatchingKeyNamesNotYetWrapped,
} from "../../regexPatterns.js";

// Do not truncate assertion errors.
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
    const testString = "notAKey+i";
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
  test("Should match key name combination using icon ⌘ instead of cmd", () => {
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
  test("Should match key name combination surrounded by unicode characters", () => {
    const testString = "日本語 ctrl+r 日本語";
    const expected = [" ctrl+r "];
    // const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
  test("Should match F12", () => {
    const testString = "Rename symbol | F12";
    const expected = [" F12"];
    // const validKeyNames = ["ctrl", "shift"];
    const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(
      validKeyNames
    );
    const matches = testString.match(pattern);
    expect(matches).to.eql(expected);
  });
});