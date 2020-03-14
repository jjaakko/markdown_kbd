import * as vscode from "vscode";
import { wrapKeyNamesWithKbdTags } from "./wrapKeyNamesWithKbdTags";
import { Config } from "./types";

/**
 * Wraps key names in active editor with <kbd> tags.
 */
export function wrapKeyNamesInActiveEditorWithKbdTags() {
  // Get the active text editor.
  let editor: vscode.TextEditor = vscode.window.activeTextEditor!;

  if (editor && editor.document.languageId === 'markdown') {
    let document = editor.document;
    const textInActiveEditor = document.getText();

    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(textInActiveEditor.length)
    );

    let conf: unknown = vscode.workspace.getConfiguration("markdownKbd");
    const config = conf as Config;
    const textWithKbdTags: string = wrapKeyNamesWithKbdTags(
      textInActiveEditor,
      config
    );
    editor.edit(editBuilder => {
      editBuilder.replace(fullRange, textWithKbdTags);
    });
  }
}

/**
 * Wraps key names in selection with kbd tags.
 */
export function wrapKeyNamesInSelectionWithKbdTags() {
  // Get the active text editor.
  let editor: vscode.TextEditor = vscode.window.activeTextEditor!;

  if (editor && editor.document.languageId === 'markdown') {
    let document = editor.document;
    let selection = editor.selection;
    const textInSelection = document.getText(selection);

    let conf: unknown = vscode.workspace.getConfiguration("markdownKbd");
    const config = conf as Config;

    const textWithKbdTags: string = wrapKeyNamesWithKbdTags(
      textInSelection,
      config
    );

    editor.edit(editBuilder => {
      editBuilder.replace(selection, textWithKbdTags);
    });
  }
}
