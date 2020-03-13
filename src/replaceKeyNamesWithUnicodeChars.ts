import * as vscode from "vscode";
import { doReplaceKeyNamesWithUnicodeChars } from "./replaceWithIcons.js";
import { Config } from "./types";

export function replaceKeyNamesWithUnicodeChars() {
  // Get the active text editor.
  let editor: vscode.TextEditor = vscode.window.activeTextEditor!;

  if (editor && editor.document.languageId === "markdown") {
    let document = editor.document;
    let selection = editor.selection;
    const textInSelection = document.getText(selection);

    let conf: unknown = vscode.workspace.getConfiguration("markdownKbd");
    const config = conf as Config;

    const textWithKbdTags: string = doReplaceKeyNamesWithUnicodeChars(
      textInSelection
    );

    editor.edit(editBuilder => {
      editBuilder.replace(selection, textWithKbdTags);
    });
  }
}

