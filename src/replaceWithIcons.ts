import { keyNamesToIcons } from "./validKeyNames";

export function doReplacement(
  text: string,
  replaceTextWithIcons: boolean
): string {
  if (!text) {
    return "";
  }
  const propertyNameIndicatingWhatIsBeingSearched: string = replaceTextWithIcons
    ? "keyName"
    : "icon";
  const propertyNameIndicatingReplaceValue: string = replaceTextWithIcons
    ? "icon"
    : "keyName";
  const result = keyNamesToIcons.reduce(
    (accumulator, currentValue, index, arr) => {
      const regExString: string = `(^|[^a-z0-9])(${arr[index][propertyNameIndicatingWhatIsBeingSearched]})([^a-z0-9]|$)`;
      const pattern: RegExp = new RegExp(regExString, "giu");
      accumulator = accumulator.replace(
        pattern,
        (match: string, _p1: string, p2: string, _p3: string): string => {
          // Consider string "lorem ipsum cmd dolem".
          // In that case our match is " cmd ".
          // In our full match we need to relace "cmd" with "⌘" to not
          // lose the spaces around the cmd.
          const replacement = match.replace(p2, arr[index][propertyNameIndicatingReplaceValue]);
          return replacement;
        }
      );
      
      return accumulator;
    },
    text
  );
  return result;
}
