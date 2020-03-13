// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  wrapKeyNamesInSelectionWithKbdTags,
  wrapKeyNamesInActiveEditorWithKbdTags
} from "./wrapKeyNamesWithKbdTags";
import { stripKbdTagsFromActiveDocument, stripKbdTagsFromSelectedArea } from "./stripKbdTags";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let commands = [
    {
      commandName: "markdownKbd.wrapWithKbdTagsInSelectedArea",
      callbackFunction: wrapKeyNamesInSelectionWithKbdTags
    },
    {
      commandName: "markdownKbd.wrapWithKbdTagsInActiveEditor",
      callbackFunction: wrapKeyNamesInActiveEditorWithKbdTags
    },
    {
      commandName: "markdownKbd.stripKbdTagsFromActiveEditor",
      callbackFunction: stripKbdTagsFromActiveDocument
    },
    {
      commandName: "markdownKbd.stripKbdTagsFromSelectedArea",
      callbackFunction: stripKbdTagsFromSelectedArea
    }
  ];
  for (let {commandName, callbackFunction} of commands) {
    let disposable = vscode.commands.registerCommand(
      commandName,
      callbackFunction
    );
    context.subscriptions.push(disposable);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
