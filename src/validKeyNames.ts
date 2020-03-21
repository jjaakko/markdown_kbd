export const keyNamesWithoutIcons = [
  "alt",
  "esc",
  "space",
  // The order matters here. More specific string has to be listed first.
  // Otherwise "F1" is found as a valid string from "F10" which should not happen.
  "F10",
  "F11",
  "F12",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9"
];

// Keynames and icons as they should be presented in regular expressions.
// Special characters like '^' have to be escaped.
// See https://wincent.com/wiki/Unicode_representations_of_modifier_keys
export const keyNamesToIcons = [
  { keyName: "cmd", icon: "⌘" },
  { keyName: "shift", icon: "⇧" },
  { keyName: "ctrl", icon: "\\^", literalIcon: "^" },
  { keyName: "opt", icon: "⌥" },
  { keyName: "ret", icon: "⏎" },
  { keyName: "pageup", icon: "⇞" },
  { keyName: "pagedown", icon: "⇟" },
  { keyName: "backspace", icon: "⌫" },
  { keyName: "arrRight", icon: "→" },
  { keyName: "arrLeft", icon: "←" },
  { keyName: "arrUp", icon: "↑" },
  { keyName: "arrDown", icon: "↓" },
  { keyName: "tab", icon: "⇥" }
];

// Construct separate array to be used when replacing keynames with icons or vice versa.
// This needs to be done to replace 'ctrl' with '^' instead of it's escaped form '\\^'.
export const keyNamesAndIconsForReplaceOperations = keyNamesToIcons.map(
  element => {
    // Use property 'literalIcon' if it's denifed, otherwiser use property 'icon'.
    const object = {
      keyName: element.keyName,
      icon:
        typeof element.literalIcon !== "undefined"
          ? element.literalIcon
          : element.icon
    };
    return object;
  }
);

// Include both a key name and corresponding icon to a single array.
export const keyNamesWithIconsPlusIcons: string[] = keyNamesToIcons.reduce(
  (previousValue: string[], currentValue) => {
    previousValue = [...previousValue, currentValue.keyName, currentValue.icon];
    return previousValue;
  },
  []
);

// Array consisting of all valid keynames or icons.
export const validKeyNames: string[] = [
  ...keyNamesWithoutIcons,
  ...keyNamesWithIconsPlusIcons
];

console.log(validKeyNames);
