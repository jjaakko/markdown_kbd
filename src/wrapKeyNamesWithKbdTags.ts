import { startCase } from "lodash";
import { Config } from "./types";
import {
  getRegexForMatchingKeyNamesNotYetWrapped,
  getRegexMatchingKeyNames
} from "./regexPatterns";
import { replaceKeynameWithIconOrViceVersa } from "./replace";

/**
 * Provide default configuration and wrap key names with kbd tags.
 * @param stringWithKeyboardStrings
 * @param config
 * @returns Key wrapped with kbd tags.
 */
export function wrapKeyNamesWithKbdTags(
  stringWithKeyboardStrings: string,
  config: Config,
  validKeys
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
    validKeys
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
  validKeys
): string {
  // Get pattern to match strings such as ' cmd+i ' or ' cmd+i.' or '-cmd+i '.
  // We need to match the immediate surrounding characters (or meta character such as end of line)
  // to not match keynames in the middle of words like 'alt' in the middle of word 'halt'.
  const pattern: RegExp = getRegexForMatchingKeyNamesNotYetWrapped(validKeys);
  // console.log(stringWithKeyboardStrings);
  // console.log(pattern);
  // HUOM! modifikaattori on väärä, m eli multiline ei näy. validKeyNames on joku objekti.
  // Vika tässä???
  const textWithKbdTags: string = stringWithKeyboardStrings.replace(
    pattern,
    matchedString => {
      // Get regex pattern for matching a key name only to match "cmd+i" from a string
      // such as " cmd+i ".
      const matchKeyNamesOnly = new RegExp(
        getRegexMatchingKeyNames(validKeys),
        "iu"
      );
      // console.log("PATTERNIII2");
      console.log(matchKeyNamesOnly);
      console.log(matchedString);
      // What we essentially do here is replace "cmd" inside of strings like
      // " cmd " or " cmd." and replace it with "<kbd>cmd</kbd>".
      // Or turn " cmd +i " into " <kbd>cmd</kbd>+<kbd>i<kbd> "
      // or "<kbd>cmd+i</kbd>" depending on settings.
      const keynameCombinationPlusPossiblePadding = matchedString.replace(
        matchKeyNamesOnly,
        matchWithPaddingRemoved => {
          // Split matched string using '+' character.
          const stringsSplittedByChar: string[] = matchWithPaddingRemoved.split(
            "+"
          );

          // Wrap the whole string or parts of it with kbd tags.
          let arrayOfKeyNames: string[] = stringsSplittedByChar.map(
            (element: string) => {
              let replacementsDone: string = element.toLowerCase();
              if (replaceWithIcons) {
                // Replace 'cmd' with '⌘' for example.
                replacementsDone = replaceKeynameWithIconOrViceVersa(
                  element.toLowerCase(),
                  true
                );
              }
              const trimmedElement: string = replacementsDone.trim();
              const keyNameWithCorrectCase: string = startCase(
                trimmedElement.toLowerCase()
              );
              return wrapIndividualKeynameIfSettingsSaySo(
                wrapKeyNamesSeparately,
                keyNameWithCorrectCase
              );
            }
          );

          // Create new string from an array, joining strings with either " + " or "+".
          const glue = addSpacesAroundPlusSign ? " + " : "+";
          let stringOfKeyNames: string = arrayOfKeyNames.join(glue);

          // return "HEllO";
          return wrapKeyNameCombinationIfSettingsSaySo(
            wrapKeyNamesSeparately,
            stringOfKeyNames
          );
        }
      );

      return keynameCombinationPlusPossiblePadding;
    }
  );

  return textWithKbdTags;
}

/**
 * Wrap individual keyname with kbd tags if settings indicate it should be done.
 * @param wrapKeyNamesSeparately Setting indicating whether to wrap individual keynames.
 * @param individualKeyName Individual keyname, such as 'ctrl' or 'esc'.
 */
function wrapIndividualKeynameIfSettingsSaySo(
  wrapKeyNamesSeparately: boolean,
  individualKeyName: string
): string {
  const result: string = wrapKeyNamesSeparately
    ? `<kbd>${individualKeyName}</kbd>`
    : individualKeyName;
  return result;
}

/**
 * Wrap the whole keyname combination with kbd tags if settings indicate it should be done.
 * @param wrapKeyNamesSeparately Setting indicating whether to wrap individual keynames.
 * @param stringOfKeyNames Keyname combination, such as 'ctrl+i' or 'esc'.
 */
function wrapKeyNameCombinationIfSettingsSaySo(
  wrapKeyNamesSeparately: boolean,
  stringOfKeyNames: string
): string {
  const result: string = wrapKeyNamesSeparately
    ? stringOfKeyNames
    : `<kbd>${stringOfKeyNames}</kbd>`;
  return result;
}
