export function getRegexForMatchingKeyNamesNotYetWrapped(validKeys: string[]) {
  // Start of a line or non word character.
  const matchStart = `(?:^|\\W)`;
  const pattern: RegExp = new RegExp(
    `(?<!<kbd)` + // Prevent <kbd>cmd+i from matching. Note: '>' is consumed as a padding.
    matchStart +
    getRegexMatchingKeyNames(validKeys) +
    "(?:$|\\W)" + // End of line or non word character
      `(?!\/kbd>)`, // Prevent cmd+i</kbd> from matching. Note: '<' is consumed as a padding.
    "giu" // All the occurences are matched. Matching is case-insensitive.
  );
  return pattern;
}

export function getRegexForMatchingKeyNamesWrappedAlready(validKeys: string[]) {
  const pattern: RegExp = new RegExp(
    `<kbd>` + // Make sure we only match key names wrapped with <kbd> tags.
    `(` + // Capture key names inside <kbd> tags.
      getRegexMatchingKeyNames(validKeys) +
      `)` +
      `</kbd>`,
    "giu" // Make sure we only match key names wrapped with <kbd> tags. // All the occurences are matched. Matching is case-insensitive.
  );
  return pattern;
}

/**
 * Creates regular expression for matching key combinations.
 *
 * @param validKeys Valid key names.
 * @returns Regular expression.
 */
// IT APPEARS THIS FUNCTION IS NOT USED!!
export function createRegExp(validKeys: string[]): RegExp {
  // Helper strings for defining regular expression.

  // Start of a line or non word character.
  const matchStart = `(?:^|\\W)`;

  // Pattern matches strings like "cmd", "shift" or "alt".
  const matchOneOfTheValidKeys: string = `(${validKeys.join("|")})`;

  // Pattern matches strings like " + " or "+".
  const plusSignWithOptionalSpaces: string = ` ?\\+ ?`;

  // Pattern matches strings like "cmd", "shift" or "b".
  const matchLetterOrOneOftheValidKeys: string = `([a-z]|(${matchOneOfTheValidKeys}))`;

  // Pattern will match strings such as "cmd + i", "CMD + SHIFT + i", "ctrl + F12" but not
  // single letters such as "i".
  const pattern: RegExp = new RegExp(
    `(?<!<kbd)` + // Prevent <kbd>cmd+i from matching. Note: '>' is consumed as a padding.
    matchStart +
    matchOneOfTheValidKeys +
    plusSignWithOptionalSpaces +
    matchLetterOrOneOftheValidKeys +
    `(` + // Start optional capturing group.
    plusSignWithOptionalSpaces +
    matchLetterOrOneOftheValidKeys +
    `){0,5}` + // End optional capturing group.
    "(?:$|\\W)" + // End of line or non word character
      `(?!\/kbd>)`, // Prevent cmd+i</kbd> from matching. Note: '<' is consumed as a padding.
    "giu" // All the occurences are matched. Matching is case-insensitive.
  );

  return pattern;
}

function getRegexMatchingKeyNames(validKeys: string[]) {
  // Helper strings for defining regular expression.

  // Pattern matches strings like "cmd", "shift" or "alt".
  const matchOneOfTheValidKeys: string = `(${validKeys.join("|")})`;

  // Pattern matches strings like " + " or "+".
  const plusSignWithOptionalSpaces: string = ` ?\\+ ?`;

  // Pattern matches strings like "cmd", "shift" or "b".
  const matchLetterOrOneOftheValidKeys: string = `([a-z]|(${matchOneOfTheValidKeys}))`;

  // Pattern will match strings such as "cmd + i", "CMD + SHIFT + i", "ctrl + F12" but not
  // single letters such as "i".
  const pattern: string =
    matchOneOfTheValidKeys +
    plusSignWithOptionalSpaces +
    matchLetterOrOneOftheValidKeys +
    `(` + // Start optional capturing group.
    plusSignWithOptionalSpaces +
    matchLetterOrOneOftheValidKeys +
    `){0,5}`; // End optional capturing group.

  return pattern;
}
