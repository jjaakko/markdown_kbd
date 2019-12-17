import { startCase } from "lodash";
import { validKeyNames } from "../validKeyNames";
import { Config } from "../types";

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
      wrapKeyNamesSeparately: true,
      addSpacesAroundPlusSign: false
    },
    config
  );

  const result = wrapKeyNamesWithKbdTags_(
    stringWithKeyboardStrings,
    effectiveConfig
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
  { wrapKeyNamesSeparately, addSpacesAroundPlusSign }: Config
): string {
  const pattern: RegExp = createRegExp(validKeyNames);

  const textWithKbdTags: string = stringWithKeyboardStrings.replace(
    pattern,
    match => {
      // Split matched string by + character
      const stringsSplittedByChar: string[] = match.split("+");
      // Wrap the elements with kbd tags
      let arrayOfKeyNames: string[] = stringsSplittedByChar.map(
        (element: string) => {
          const trimmedElement: string = element.trim();
          const keyNameWithCorrectCase: string =
            trimmedElement.length > 1
              ? startCase(trimmedElement.toLowerCase())
              : trimmedElement.toLowerCase();
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

  return textWithKbdTags;
}

/**
 * Creates regular expression for matching key combinations.
 *
 * @param validKeys Valid key names.
 * @returns Regular expression.
 */
export function createRegExp(validKeys: string[]): RegExp {
  // Helper strings for defining regular expression.

  // Pattern matches strings like "cmd", "shift" or "alt".
  const matchOneOfTheValidKeys: string = `\\b(${validKeys.join("|")})\\b`;

  // Pattern matches strings like " + " or "+".
  const plusSignWithOptionalSpaces: string = ` ?\\+ ?`;

  // Pattern matches strings like "cmd", "shift" or "b".
  const matchLetterOrOneOftheValidKeys: string = `\\b([a-z]|(${matchOneOfTheValidKeys}))\\b`;

  // Pattern will match strings such as "cmd + i", "CMD + SHIFT + i", "ctrl + F12" but not
  // single letters such as "i".
  const pattern: RegExp = new RegExp(
    matchOneOfTheValidKeys +
    plusSignWithOptionalSpaces +
    matchLetterOrOneOftheValidKeys +
    `(` + // Start optional capturing group.
      plusSignWithOptionalSpaces +
      matchLetterOrOneOftheValidKeys +
      `){0,5}`, // End optional capturing group.
    "gi" // All the occurences are matched. Matching is case-insensitive.
  );

  return pattern;
}

/**
 * Strips <kbd> tags from string.
 * @param stringWithKbdTags
 * @returns
 */
export function stripKbdTagsFromString(stringWithKbdTags: string) {
  // Regex pattern for capturing <kbd> elements.
  const pattern = new RegExp("<kbd>(.*?)</kbd>", "g");

  // Strip <kbd> tags from the text.
  const textWithKbdTagsRemoved = stringWithKbdTags.replace(
    pattern,
    (_match, p1) => {
      // For each occurence of <kbd>[some text inside]</kbd>
      // return just the text inside.
      return p1;
    }
  );

  return textWithKbdTagsRemoved;
}
