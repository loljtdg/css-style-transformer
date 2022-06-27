import * as vscode from "vscode";
import { transform } from "./transform";

const showResult = (success?: boolean) => {
  // Display a message box to the user
  vscode.window.showInformationMessage(
    `transform ${success ? "success" : "failed"}`
  );
};

export const main = () => {
  // The code you place here will be executed every time your command is executed
  const { activeTextEditor } = vscode.window;
  if (!activeTextEditor) {
    console.log("no activeTextEditor");
    return showResult();
  }
  const { selection } = activeTextEditor;
  const text = activeTextEditor.document.getText(selection);

  const result = transform(text);

  if (!result) {
    console.log("no transformed result");
    return showResult();
  }

  activeTextEditor.edit((editBuilder: vscode.TextEditorEdit) => {
    editBuilder.replace(selection, result);
    return showResult(true);
  });
};
