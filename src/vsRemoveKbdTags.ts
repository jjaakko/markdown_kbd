import * as vscode from "vscode";

import { stripAllKbdTagsFromString } from "./removeKbdTags";

export function stripKbdTagsFromSelectedArea() {
  // Get the active text editor.
  let editor: vscode.TextEditor = vscode.window.activeTextEditor!;

  if (editor && editor.document.languageId === "markdown") {
    let document = editor.document;
    let selection = editor.selection;
    const textInSelection = document.getText(selection);

    const textWithKbdTags: string = stripAllKbdTagsFromString(textInSelection);

    editor.edit(editBuilder => {
      editBuilder.replace(selection, textWithKbdTags);
    });
  }
}
