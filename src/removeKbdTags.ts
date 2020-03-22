/**
 * Remove all kbd tags from string.
 * @param stringWithKbdTags String that may or may not contain kbd tags.
 */
export function stripAllKbdTagsFromString(stringWithKbdTags: string) {
  const pattern: RegExp = new RegExp("<kbd>|</kbd>", "giu");
  const textWithKbdTagsRemoved = stringWithKbdTags.replace(
    pattern,
    (_match, _p1) => {
      return "";
    }
  );

  return textWithKbdTagsRemoved;
}

/**
 * Strips <kbd> tags from string.
 * @param stringWithKbdTags
 * @returns
 */
// export function stripKbdTagsFromString(stringWithKbdTags: string) {
//   // Regex pattern for capturing <kbd> elements.
//   const pattern = getRegexForMatchingKeyNamesWrappedAlready(validKeyNames);

//   // Strip <kbd> tags from the text.
//   const textWithKbdTagsRemoved = stringWithKbdTags.replace(
//     pattern,
//     (_match, p1) => {
//       // For each occurence of <kbd>[some text inside]</kbd>
//       // return just the text inside.
//       return p1;
//     }
//   );

//   return textWithKbdTagsRemoved;
// }