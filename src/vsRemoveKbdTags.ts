import * as vscode from "vscode";

import { stripAllKbdTagsFromString } from "./removeKbdTags";
import { Config } from "./types";

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

    const stringKbdTagsStrippedOff = stripAllKbdTagsFromString(fullText);

    // Replace the text
    editor.edit((editBuilder: any) => {
      editBuilder.replace(fullRange, stringKbdTagsStrippedOff);
    });
  }
}

export function stripKbdTagsFromSelectedArea() {
  // Get the active text editor.
  let editor: vscode.TextEditor = vscode.window.activeTextEditor!;

  if (editor && editor.document.languageId === "markdown") {
    let document = editor.document;
    let selection = editor.selection;
    const textInSelection = document.getText(selection);

    let conf: unknown = vscode.workspace.getConfiguration("markdownKbd");
    const config = conf as Config;

    const textWithKbdTags: string = stripAllKbdTagsFromString(textInSelection);

    editor.edit(editBuilder => {
      editBuilder.replace(selection, textWithKbdTags);
    });
  }
}
