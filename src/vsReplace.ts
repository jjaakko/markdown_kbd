import * as vscode from "vscode";
import { replaceKeynameWithIconOrViceVersa } from "./replace";
import { Config } from "./types";

/**
 * Replace keynames with icons or vice versa.
 * @param replaceWithIcons Setting indicating whether to replace key name with icon or vice versa.
 */
export function vsReplace(replaceWithIcons: boolean) {
  // Get the active text editor.
  let editor: vscode.TextEditor = vscode.window.activeTextEditor!;

  if (editor && editor.document.languageId === "markdown") {
    let document = editor.document;
    let selection = editor.selection;
    const textInSelection = document.getText(selection);

    const newText: string = replaceKeynameWithIconOrViceVersa(
      textInSelection,
      replaceWithIcons
    );

    editor.edit(editBuilder => {
      editBuilder.replace(selection, newText);
    });
  }
}
