import chai = require("chai");
import sinon = require("sinon");
import "mocha";

import { validKeyNames } from "../../validKeyNames";
import { wrapKeyNamesWithKbdTags } from "../../wrapKeyNamesWithKbdTags.js";
import { Config } from "../../types";
import * as regexPatternsModule from "../../regexPatterns.js";

// Do not truncate assertion errors
chai.config.truncateThreshold = 0;
const expect = chai.expect;

suite(
  "Test wrap and replace functionality",
  () => {
    // Is this in the right place? Could this be defined in suiteSetup..?
    let defaultConfig: Config = {
      wrapKeyNamesSeparately: true,
      addSpacesAroundPlusSign: false,
      replaceKeyNamesWithIcons: false
    };

    let stub = sinon.stub();

    suiteSetup(function() {
      // Keep stubbing here for future use.
      // stub = sinon.stub(
      //   regexPatternsModule,
      //   "getRegexForMatchingKeyNamesNotYetWrapped"
      // );
      // stub.returns(
      //   new RegExp(
      //     /(?:^|\W)(ctrl|alt|opt|cmd|shift|⌥|⌘) ?\+ ?([a-z]|((ctrl|alt|opt|cmd|shift|⌥|⌘)))( ?\+ ?([a-z]|((ctrl|alt|opt|cmd|shift|⌥|⌘)))){0,5}(?:$|\W)/giu
      //   )
      // );
    });

    suiteTeardown(function() {
      // stub.restore();
    });

    test("Should return key names wrapped with <kbd> tags", () => {
      const config = Object.assign({}, defaultConfig);
      const input: string = "ctrl+i";
      const validKeys = ["ctrl"];
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      const expected: string = "<kbd>Ctrl</kbd>+<kbd>I</kbd>";

      expect(output).to.equal(expected);
    });

    test("Should return key names wrapped in <kbd> tags and spaces between keynames removed", () => {
      const config = Object.assign({}, defaultConfig);
      const input: string = "ctrl + i";
      const validKeys = ["ctrl"];
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      const expected: string = "<kbd>Ctrl</kbd>+<kbd>I</kbd>";
      expect(output).to.equal(expected);
    });

    test("Should return key names wrapped in <kbd> tags and spaces added between key names", () => {
      const config = Object.assign({}, defaultConfig, {
        wrapKeyNamesSeparately: false,
        addSpacesAroundPlusSign: true,
        replaceKeyNamesWithIcons: false
      });
      const input: string = "ctrl+i";
      const validKeys = ["ctrl"];
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      const expected: string = "<kbd>Ctrl + I</kbd>";
      expect(output).to.equal(expected);
    });

    test("Should return all key names together, wrapped in one pair of <kbd> tags", () => {
      const config = Object.assign({}, defaultConfig, {
        wrapKeyNamesSeparately: false,
        addSpacesAroundPlusSign: false,
        replaceKeyNamesWithIcons: false
      });
      const input: string = "ctrl+i";
      const validKeys = ["ctrl"];
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      const expected: string = "<kbd>Ctrl+I</kbd>";
      expect(output).to.equal(expected);
    });

    test("Should wrap unicode characters such as ⌘", () => {
      const config = Object.assign({}, defaultConfig);
      const input: string = "⌘+i";
      const validKeys = ["⌘"];
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      const expected: string = "<kbd>⌘</kbd>+<kbd>I</kbd>";
      expect(output).to.equal(expected);
    });

    test("Should wrap key name combination in the middle of unicode characters", () => {
      const config = Object.assign({}, defaultConfig);
      const input: string = "日本語 ⌘+i 日本語";
      const validKeys = ["⌘"];
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      const expected: string = "日本語 <kbd>⌘</kbd>+<kbd>I</kbd> 日本語";
      expect(output.toString()).to.equal(expected);
    });

    test("Should replace cmd with ⌘", () => {
      const config = Object.assign({}, defaultConfig, {
        replaceKeyNamesWithIcons: true
      });
      const input: string = "cmd+i";
      const validKeys = ["cmd"];
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      const expected: string = "<kbd>⌘</kbd>+<kbd>I</kbd>";
      expect(output.toString()).to.equal(expected);
    });

    test("Should replace opt with ⌥", () => {
      const config = Object.assign({}, defaultConfig, {
        replaceKeyNamesWithIcons: true
      });
      const input: string = "opt+i";
      const validKeys = ["opt"];
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      const expected: string = "<kbd>⌥</kbd>+<kbd>I</kbd>";
      expect(output.toString()).to.equal(expected);
    });

    test("Should not replace alt with ⌥", () => {
      const config = Object.assign({}, defaultConfig, {
        replaceKeyNamesWithIcons: true
      });
      const input: string = "alt+i";
      const validKeys = ["alt"];
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      const expected: string = "<kbd>Alt</kbd>+<kbd>I</kbd>";
      expect(output.toString()).to.equal(expected);
    });

    test("Should wrap alt + arrUp", () => {
      const config = Object.assign({}, defaultConfig, {
        wrapKeyNamesSeparately: false,
        replaceKeyNamesWithIcons: false
      });
      const input = "|  alt + arrUp or alt + arrDown.";
      const expected = "|  <kbd>Alt+Arrup</kbd> or <kbd>Alt+Arrdown</kbd>.";
      const validKeys = ["alt", "arrUp", "arrDown"];
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      expect(output.toString()).to.equal(expected);
    });

    test("Should wrap F12", () => {
      const config = Object.assign({}, defaultConfig, {
        wrapKeyNamesSeparately: false,
        replaceKeyNamesWithIcons: false
      });
      const input = "Rename symbol | F12";
      const expected = "Rename symbol | <kbd>F12</kbd>";
      const validKeys = validKeyNames;
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      expect(output.toString()).to.equal(expected);
    });

    test("Should wrap ctrl key and replace it with icon '^'.", () => {
      const config = Object.assign({}, defaultConfig, {
        wrapKeyNamesSeparately: true,
        replaceKeyNamesWithIcons: true
      });
      const input = "- ctrl+r";
      const expected = "- <kbd>^</kbd>+<kbd>R</kbd>";
      const validKeys = validKeyNames;
      const output: string = wrapKeyNamesWithKbdTags(input, config, validKeys);
      expect(output.toString()).to.equal(expected);
    });
  }
);
