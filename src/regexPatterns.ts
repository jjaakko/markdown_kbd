/**
 * Get regex pattern to match those keyname combinations that are not yet wrapped iwth kbd tag.
 * @param validKeys Array of valid key names.
 */
export function getRegexForMatchingKeyNamesNotYetWrapped(validKeys: string[]) {
  // Start of a line or non word character.
  const matchStart = "(^|\\W)";
  // Non word character or end of a line.
  const matchEnd = "($|\\W)";

  // Using matchStart and matchEnd makes it possible to match string like 'hit alt + z to wrap lines'
  // but not words like 'halt'.
  const RegExpStr = matchStart + getRegexMatchingKeyNames(validKeys) + matchEnd;
  const pattern: RegExp = new RegExp(
    RegExpStr,
    "giu" // All the occurences are matched. Matching is case-insensitive.
  );
  return pattern;
}

/**
 * Get regex pattern to match those keyname combinations that are already wrapped iwth kbd tag.
 * 
 * We don't need this function currently. Keep for future needs.
 * @param validKeys Array of valid key names.
 */
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
 * Get regex pattern to match a keyname or keyname combination.
 * 
 * @param validKeys Array of valid key names.
 */
export function getRegexMatchingKeyNames(validKeys: string[]) {
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
