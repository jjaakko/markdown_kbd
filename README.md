# VSCode Markdown Kbd

Make key name combinations (such as <kbd>Cmd+r</kbd> for example)  more visible in your markdown document by wrapping key names with \<kbd\> tags.

## Features

* Auto-detects key name combination patterns from your document and wraps them with \<kbd\> tags.
* Wraps either each key name separately or the whole key name combination, based on configuration.

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Extension Settings

This extension contributes the following settings:

* <code>markdownKbd.wrapKeyNamesSeparately</code>: control whether to wrap individual key names or the key combination as a whole
* <code>markdownKbd.addSpacesAroundPlusSign</code>: control whether to use space around the plus sign, <kbd>Cmd+r</kbd> vs <kbd>Cmd + r</kbd>