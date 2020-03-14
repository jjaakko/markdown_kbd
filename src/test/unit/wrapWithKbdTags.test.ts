import chai = require("chai");
import sinon = require("sinon");
import "mocha";

import { wrapKeyNamesWithKbdTags } from "../../wrapKeyNamesWithKbdTags.js";
import { Config } from "../../types";
import * as regexPatternsModule from "../../regexPatterns.js";

// Copied from https://github.com/NilsJPWerner/autoDocstring/blob/master/src/test/parse/docstring_is_closed.spec.ts
chai.config.truncateThreshold = 0;
const expect = chai.expect;

suite("wrapKeyNamesWithKbdTags()", () => {
  // Is this in the right place? Could this be defined in suiteSetup..?
  let defaultConfig: Config = {
    wrapKeyNamesSeparately: true,
    addSpacesAroundPlusSign: false,
    replaceWithIcons: false,
  };

  let stub = sinon.stub();

  suiteSetup(function() {
    stub = sinon.stub(
      regexPatternsModule,
      "getRegexForMatchingKeyNamesNotYetWrapped"
    );

    stub.returns(
      new RegExp(
        /(?<!<kbd)(?:^|\W)(ctrl|alt|opt|cmd|shift|⌥|⌘) ?\+ ?([a-z]|((ctrl|alt|opt|cmd|shift|⌥|⌘)))( ?\+ ?([a-z]|((ctrl|alt|opt|cmd|shift|⌥|⌘)))){0,5}(?:$|\W)(?!\/kbd>)/giu
      )
    );
  });

  suiteTeardown(function() {
    stub.restore();
  });

  test("should return key names wrapped with <kbd> tags", () => {
    const config = Object.assign({}, defaultConfig);
    const input: string = "ctrl+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Ctrl</kbd>+<kbd>I</kbd>";
    expect(output).to.equal(expected);
    
  });

  test("should return key names wrapped in <kbd> tags and spaces between keynames removed", () => {
    const config = Object.assign({}, defaultConfig);
    const input: string = "ctrl + i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Ctrl</kbd>+<kbd>I</kbd>";
    expect(output).to.equal(expected);
    
  });

  test("should return key names wrapped in <kbd> tags and spaces added between key names", () => {
    const config = Object.assign({}, defaultConfig, {
      wrapKeyNamesSeparately: false,
      addSpacesAroundPlusSign: true,
      replaceWithIcons: false,
    });
    const input: string = "ctrl+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Ctrl + I</kbd>";
    expect(output).to.equal(expected);
    
  });

  test("should return all key names together, wrapped in one pair of <kbd> tags", () => {
    const config = Object.assign({}, defaultConfig, {
      wrapKeyNamesSeparately: false,
      addSpacesAroundPlusSign: false,
      replaceWithIcons: false,
    });
    const input: string = "ctrl+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Ctrl+I</kbd>";
    expect(output).to.equal(expected);
    
  });

  test("should not wrap non key names ab + cd", () => {
    const config = Object.assign({}, defaultConfig);
    const input: string = "ab+cd";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "ab+cd";
    expect(output).to.equal(expected);
    
  });

  test("should not create nested <kbd> structures", () => {
    const config = Object.assign({}, defaultConfig);
    const input: string = "<kbd>ctrl+i</kbd>";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>ctrl+i</kbd>";
    expect(output).to.equal(expected);
    
  });

  test("Should wrap non-ascii characters such as ⌘", () => {
    const config = Object.assign({}, defaultConfig);
    const input: string = "⌘+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>⌘</kbd>+<kbd>I</kbd>";
    expect(output).to.equal(expected);
    
  });

  test("Should wrap key name combination in the middle of non ascii characters", () => {
    const config = Object.assign({}, defaultConfig);
    const input: string = "日本語 ⌘+i 日本語";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "日本語 <kbd>⌘</kbd>+<kbd>I</kbd> 日本語";
    expect(output.toString()).to.equal(expected);
    
  });

  test("Should replace cmd with ⌘", () => {
    const config = Object.assign({}, defaultConfig, {replaceWithIcons: true});
    const input: string = "cmd+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>⌘</kbd>+<kbd>I</kbd>";
    expect(output.toString()).to.equal(expected);
    
  });

  test("Should replace opt with ⌥", () => {
    const config = Object.assign({}, defaultConfig, {replaceWithIcons: true});
    const input: string = "opt+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>⌥</kbd>+<kbd>I</kbd>";
    expect(output.toString()).to.equal(expected);
    
  });

  test("Should not replace alt with ⌥", () => {
    const config = Object.assign({}, defaultConfig, {replaceWithIcons: true});
    const input: string = "alt+i";
    const output: string = wrapKeyNamesWithKbdTags(input, config);
    const expected: string = "<kbd>Alt</kbd>+<kbd>I</kbd>";
    expect(output.toString()).to.equal(expected);
    
  });
});
