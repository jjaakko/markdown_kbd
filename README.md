# VSCode Markdown Kbd

Make key name combinations (such as <kbd>Cmd+r</kbd> for example)  more visible in your markdown document by wrapping key names with \<kbd\> tags.

## Features

* Auto-detects key name combination patterns from your document and wraps them with \<kbd\> tags.
* Wraps either each key name separately or the whole key name combination, based on configuration.

## Extension Settings

This extension contributes the following settings:

* <code>markdownKbd.wrapKeyNamesSeparately</code>: control whether to wrap individual key names or the key combination as a whole
* <code>markdownKbd.addSpacesAroundPlusSign</code>: control whether to use space around the plus sign, <kbd>Cmd+r</kbd> vs <kbd>Cmd + r</kbd>