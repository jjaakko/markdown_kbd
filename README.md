# VSCode Markdown Kbd

Make key name combinations (such as <kbd>Cmd+r</kbd> for example)  more visible in your markdown document by wrapping key names with \<kbd\> tags.

## Features

* Auto-detects key name combination patterns from your document and wraps them with \<kbd\> tags.
* Wraps either each key name separately or the whole key name combination, based on configuration.
* Replaces ctrl, cmd, opt and shift with icons (^, ⌘, ⌥, ⇧).

![Demo](images/markdown-kbd-demo.gif)

## How to use this extension

* Create new markdown file or open up a markdown file.
* Insert keyname combination, such as <code>cmd+r</code>.
* If you created a new file, remember to save it with <code>.md</code> extension.
* Open ctrl panel by hitting <kbd>cmd+shift+p</kbd>.
* Type markdown kbd and select <code>Wrap With Kbd Tags In Active Editor</code>.

## Extension Settings

This extension contributes the following settings:

* <code>markdownKbd.wrapKeyNamesSeparately</code>: control whether to wrap individual key names or the key combination as a whole
* <code>markdownKbd.addSpacesAroundPlusSign</code>: control whether to use space around the plus sign, <kbd>Cmd+r</kbd> vs <kbd>Cmd + r</kbd>
* <code>markdownKbd.replaceWithIcons</code>: control whether to replace ctrl, cmd, opt and shift with icons (^, ⌘, ⌥, ⇧).