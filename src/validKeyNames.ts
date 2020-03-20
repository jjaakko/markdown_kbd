export const keyNamesWithoutIcons = [
  "alt",
  "esc",
  "tab",
  "space",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12"
];

// See https://wincent.com/wiki/Unicode_representations_of_modifier_keys
export const keyNamesToIcons = [
  { keyName: "cmd", icon: "⌘" },
  { keyName: "shift", icon: "⇧" },
  { keyName: "ctrl", icon: "\\^" },
  { keyName: "opt", icon: "⌥" },
  { keyName: "ret", icon: "⏎" },
  { keyName: "pageup", icon: "⇞" },
  { keyName: "pagedown", icon: "⇟" },
  { keyName: "backspace", icon: "⌫" },
  { keyName: "arrRight", icon: "→" },
  { keyName: "arrLeft", icon: "←" },
  { keyName: "arrUp", icon: "↑" },
  { keyName: "arrDown", icon: "↓" }
];

// Include both a key name and corresponding icon to a single array.
export const keyNamesWithIconsPlusIcons: string[] = keyNamesToIcons.reduce(
  (previousValue: string[], currentValue) => {
    previousValue = [...previousValue, currentValue.keyName, currentValue.icon];
    return previousValue;
  },
  []
);

// Array consisting of all valid keynames or icons.
export const validKeyNames: string[] = [...keyNamesWithoutIcons, ...keyNamesWithIconsPlusIcons];
const matchOneOfTheValidKeys: string = `(${validKeyNames.join("|")})`;
console.log(matchOneOfTheValidKeys);
// export const validKeyNames: string[] = keyNamesWithoutIcons;