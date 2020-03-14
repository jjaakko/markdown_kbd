import * as vscode from "vscode";
import { doReplaceKeyNamesWithUnicodeChars } from "./replaceWithIcons";
import { Config } from "./types";

export function replaceKeyNamesWithIcons(replaceWithIcons: boolean) {
  // Get the active text editor.
  let editor: vscode.TextEditor = vscode.window.activeTextEditor!;

  if (editor && editor.document.languageId === "markdown") {
    let document = editor.document;
    let selection = editor.selection;
    const textInSelection = document.getText(selection);

    let conf: unknown = vscode.workspace.getConfiguration("markdownKbd");
    const config = conf as Config;

    const textWithKbdTags: string = doReplaceKeyNamesWithUnicodeChars(
      textInSelection,
      replaceWithIcons
    );

    editor.edit(editBuilder => {
      editBuilder.replace(selection, textWithKbdTags);
    });
  }
}
