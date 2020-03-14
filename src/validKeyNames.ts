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
  { keyName: "cmd", icon: "⌘" }, // "\\u{2318}"
  { keyName: "shift", icon: "⇧" },
  { keyName: "ctrl", icon: "^" },
  { keyName: "opt", icon: "⌥" },
  { keyName: "ret", icon: "⏎" },
  { keyName: "pageup", icon: "⇞" },
  { keyName: "pagedown", icon: "⇟" },
  { keyName: "backspace", icon: "⌫" },
  { keyName: "arl", icon: "→" },
  { keyName: "arr", icon: "→" },
  { keyName: "aup", icon: "↑" },
  { keyName: "ado", icon: "↓" }
];

export const keyNamesWithIconsPlusIcons: string[] = keyNamesToIcons.reduce(
  (previousValue: string[], currentValue) => {
    previousValue = [...previousValue, currentValue.keyName, currentValue.icon];
    return previousValue;
  },
  []
);

export const validKeyNames: string[] = [...keyNamesWithoutIcons, ...keyNamesWithIconsPlusIcons];
