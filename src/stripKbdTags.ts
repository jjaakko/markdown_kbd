import * as vscode from "vscode";

import { stripKbdTagsFromString } from "./regex_manipulation/regex_manipulation";

/**
 * Strips kbd tags from active document.
 */
export function stripKbdTagsFromActiveDocument() {
  // Get the active text editor
  let editor = vscode.window.activeTextEditor;

  if (editor) {
    // Get all the text of the active document.
    let document = editor.document;
    const fullText = document.getText();

    // Get range object describing the whole document.
    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(fullText.length)
    );

    const stringKbdTagsStrippedOff = stripKbdTagsFromString(fullText);

    // Replace the text
    editor.edit((editBuilder: any) => {
      editBuilder.replace(fullRange, stringKbdTagsStrippedOff);
    });
  }
}
