import { startCase } from "lodash";
import { validKeyNames } from "./validKeyNames";
import { Config } from "./types";
import {
  getRegexForMatchingKeyNamesNotYetWrapped,
} from "./regexPatterns";
import { doReplacement } from "./replace";

/**
 * Providing default configuration and wrap key names with kbd tags.
 * @param stringWithKeyboardStrings
 * @param config
 * @returns key names with kbd tags
 */
export function wrapKeyNamesWithKbdTags(
  stringWithKeyboardStrings: string,
  config: Config
): string {
  // Provide default config, which can be overridden with the actual config parameter
  const effectiveConfig: Config = Object.assign(
    {
      wrapKeyNamesSeparately: false,
      addSpacesAroundPlusSign: false,
      replaceWithIcons: true
    },
    config
  );

  const result = wrapKeyNamesWithKbdTags_(
    stringWithKeyboardStrings,
    effectiveConfig,
    getRegexForMatchingKeyNamesNotYetWrapped
  );
  return result;
}

/**
 * Take string and add <kbd> tags and spacing according to provided options.
 *
 * @param stringWithKeyboardStrings
 * @returns Text with key names wrapped with kbd tags.
 */
export function wrapKeyNamesWithKbdTags_(
  stringWithKeyboardStrings: string,
  { wrapKeyNamesSeparately, addSpacesAroundPlusSign, replaceWithIcons }: Config,
  getRegexForMatchingKeyNameCombinations
): string {
  const pattern: RegExp = getRegexForMatchingKeyNameCombinations(validKeyNames);
  const textWithKbdTags: string = stringWithKeyboardStrings.replace(
    pattern,
    matchedString => {
      // If we can't use \b we have to use this.
      let firstChar = "";
      let lastChar = "";
      if (
        matchedString.charAt(0) !== "⌘" &&
        !matchedString.charAt(0).match(/[a-z]/i)
      ) {
        // First char of the first key name was not part of the key name combo, we need to
        // prepend the result with it
        firstChar = matchedString.charAt(0);
      }
      const last = matchedString.charAt(matchedString.length - 1);
      if (last !== "⌘" && !last.match(/[a-z]/i)) {
        // Last char of the last key name was not part of the key name combo, we need to
        // append the result with it
        lastChar = last;
      }
      const matchWithPaddingRemoved = matchedString.slice(
        firstChar.length,
        matchedString.length - lastChar.length
      );

      // Split matched string by + character
      const stringsSplittedByChar: string[] = matchWithPaddingRemoved.split(
        "+"
      );

      // Wrap the elements with kbd tags
      let arrayOfKeyNames: string[] = stringsSplittedByChar.map(
        (element: string) => {
          let replacementsDone: string = element.toLowerCase();
          if (replaceWithIcons) {
            replacementsDone = doReplacement(element.toLowerCase(), true);
          }
          const trimmedElement: string = replacementsDone.trim();
          const keyNameWithCorrectCase: string = startCase(
            trimmedElement.toLowerCase()
          );
          return wrapKeyNamesSeparately
            ? `<kbd>${keyNameWithCorrectCase}</kbd>`
            : keyNameWithCorrectCase;
        }
      );
      // Create new string from an array, joining strings with either " + " or "+".
      const glue = addSpacesAroundPlusSign ? " + " : "+";
      let stringOfKeyNames: string = arrayOfKeyNames.join(glue);
      const keynameCombinationPlusPossiblePadding = wrapKeyNamesSeparately
        ? firstChar + stringOfKeyNames + lastChar
        : firstChar + `<kbd>${stringOfKeyNames}</kbd>` + lastChar;
      return keynameCombinationPlusPossiblePadding;
    }
  );

  return textWithKbdTags;
}
