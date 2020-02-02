import * as vscode from "vscode";
import {stripAllKbdTagsFromString} from "./removeKbdTags";
import { validKeyNames } from "./validKeyNames";
import { wrapKeyNamesWithKbdTags } from "./wrapKeyNamesWithKbdTags";
import { Config } from "./types";

/**
 * Wrap key names in selection with kbd tags.
 */
export function wrapKeyNamesInSelectionWithKbdTags() {
  // Get the active text editor.
  let editor: vscode.TextEditor = vscode.window.activeTextEditor!;

  if (editor && editor.document.languageId === 'markdown') {
    let document = editor.document;
    let selection = editor.selection;
    // Remove all existing <kbd> tags first.
    const textInSelection = stripAllKbdTagsFromString(document.getText(selection));

    let conf: unknown = vscode.workspace.getConfiguration("markdownKbd");
    const config = conf as Config;
    const textWithKbdTags: string = wrapKeyNamesWithKbdTags(
      textInSelection,
      config,
      validKeyNames
    );

    editor.edit(editBuilder => {
      editBuilder.replace(selection, textWithKbdTags);
    });
  }
}
