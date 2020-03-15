import { startCase } from "lodash";
import { validKeyNames } from "./validKeyNames";
import { Config } from "./types";
import {
  getRegexForMatchingKeyNamesNotYetWrapped,
  getRegexMatchingKeyNames
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
      
      const matchKeyNamesOnly = new RegExp(
        getRegexMatchingKeyNames(validKeyNames),
        "iu"
      );
      
      // What we essentially do here is replace "cmd" inside of strings like 
      // " cmd " or " cmd." and replace it with "<kbd>cmd</kbd>".
      // Or turn " cmd +i " into " <kbd>cmd</kbd>+<kbd>i<kbd> " 
      // or "<kbd>cmd+i</kbd>" depending on settings.
      const keynameCombinationPlusPossiblePadding = matchedString.replace(
        matchKeyNamesOnly,
        matchWithPaddingRemoved => {
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

          return wrapKeyNamesSeparately
            ? stringOfKeyNames
            : `<kbd>${stringOfKeyNames}</kbd>`;
        }
      );

      return keynameCombinationPlusPossiblePadding;
    }
  );

  return textWithKbdTags;
}
