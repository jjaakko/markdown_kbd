import * as vscode from "vscode";
import { doReplacement } from "./replace";
import { Config } from "./types";

export function vsReplace(replaceWithIcons: boolean) {
  // Get the active text editor.
  let editor: vscode.TextEditor = vscode.window.activeTextEditor!;

  if (editor && editor.document.languageId === "markdown") {
    let document = editor.document;
    let selection = editor.selection;
    const textInSelection = document.getText(selection);

    const newText: string = doReplacement(
      textInSelection,
      replaceWithIcons
    );

    editor.edit(editBuilder => {
      editBuilder.replace(selection, newText);
    });
  }
}
