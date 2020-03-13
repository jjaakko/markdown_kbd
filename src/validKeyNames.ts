export const validKeyNames = [
  "cmd",
  "⌘", // "\\u{2318}"
  "shift",
  "⇧",
  "ctrl",
  "^",
  "alt",
  "enter",
  "esc",
  "tab",
  "space",
  "opt",
  "⌥", // "\\u{2325}"
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
  "F12",
  "pageup",
  "pagedown",
  "backspace"
];

// See https://wincent.com/wiki/Unicode_representations_of_modifier_keys
export const keyNamesToIcons = [
  { keyName: "cmd", icon: "⌘" }, // "\\u{2318}"
  { keyName: "shift", icon: "⇧" },
  { keyName: "ctrl", icon: "^" },
  { keyName: "alt", icon: "⌥" }, // "\\u{2325}"
  { keyName: "opt", icon: "⌥" },
  { keyName: "enter", icon: "⏎" },
  { keyName: "pageup", icon: "⇞" },
  { keyName: "pagedown", icon: "⇟" },
  { keyName: "backspace", icon: "⌫" },
  { keyName: "arl", icon: "→" },
  { keyName: "arr", icon: "→" },
  { keyName: "aup", icon: "↑" },
  { keyName: "ado", icon: "↓" }
];
