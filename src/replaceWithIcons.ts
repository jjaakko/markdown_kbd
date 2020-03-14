import { keyNamesToIcons } from "./validKeyNames";

export function doReplaceKeyNamesWithUnicodeChars(text: string): string {
  // See https://wincent.com/wiki/Unicode_representations_of_modifier_keys
  const result = keyNamesToIcons.reduce(
    (accumulator, currentValue, index, arr) => {
      const regExString: string = `(^|[^a-z0-9])(${arr[index].keyName})([^a-z0-9]|$)`;
      const pattern: RegExp = new RegExp(regExString, "giu");
      accumulator = accumulator.replace(
        pattern,
        (match: string, _p1: string, p2: string, _p3: string): string => {
          // Consider string "lorem ipsum cmd dolem".
          // In that case our match was " cmd ".
          // In our full match we need to "cmd" with "⌘" to not
          // lose the spaces around the cmd.
          const replacement = match.replace(p2, arr[index].icon);
          return replacement;
        }
      );
      return accumulator;
    },
    text
  );
  return result;
}
