import { startCase, camelCase } from "lodash";
import { keyNamesToIcons, keyNamesAndIconsForReplaceOperations } from "./validKeyNames";

/**
 * Get a new string where keynames have been replaced icons or vice versa.
 * @param text Text that will be looked for replacements.
 * @param replaceKeynameWithIcon Whether to replace keyname with icon or vice versa.
 */
export function replaceKeynameWithIconOrViceVersa(
  text: string,
  replaceKeynameWithIcon: boolean
): string {
  if (!text) {
    return "";
  }
  const propertyNameIndicatingWhatIsBeingSearched: string = replaceKeynameWithIcon
    ? "keyName"
    : "icon";
  const propertyNameIndicatingReplaceValue: string = replaceKeynameWithIcon
    ? "icon"
    : "keyName";
  const result = keyNamesToIcons.reduce(
    (accumulator, _currentValue, index, arr) => {
      const regExString: string = `(^|[^a-z0-9])(${arr[index][propertyNameIndicatingWhatIsBeingSearched]})([^a-z0-9]|$)`;
      const pattern: RegExp = new RegExp(regExString, "giu");
      accumulator = accumulator.replace(
        pattern,
        (match: string, _p1: string, p2: string, _p3: string): string => {
          // Consider string "lorem ipsum cmd dolem".
          // In that case our match is " cmd ".
          // In our full match we need to relace "cmd" with "⌘" to not
          // lose the spaces around the cmd.

          // Handle casing. For example, icon ⌘ should be replaced with "Cmd" instead of "cmd".
          // Yet when text is to be replaced with an icon, let's not try to change casing
          // of an icon.
          let keyNameOrIcon = keyNamesAndIconsForReplaceOperations[index][propertyNameIndicatingReplaceValue];
          // if (propertyNameIndicatingReplaceValue === "ctrl") {

          // }
          const keyNameOrIconWithCorrectCasing = replaceKeynameWithIcon
            ? keyNameOrIcon
            : startCase(keyNameOrIcon);
          // startCases turns "arrUp" to "Arr Up"
          const spacesReplaced = keyNameOrIconWithCorrectCasing.replace(
            " ",
            ""
          );
          // const final = spacesReplaced.charAt(0).toLowerCase() + spacesReplaced.slice(1);
          const replacement = match.replace(p2, spacesReplaced);
          return replacement;
        }
      );

      return accumulator;
    },
    text
  );
  return result;
}
