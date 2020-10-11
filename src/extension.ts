// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import Router from './router';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

  // 設定言語の判定
  // console.log(vscode.env.language); // ja

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

  const openDoc = vscode.commands.registerCommand('document-router.onClickOpenDoc', () => {
		// The code you place here will be executed every time your command is executed

    const router = new Router();
    if (!router.hasDestinations) {
      vscode.window.showErrorMessage('設定ファイルを読み込めませんでした');
      return;
    }

    const fileName = vscode.window.activeTextEditor?.document.fileName || '';
    const extention = path.extname(fileName).replace('.', '');
    if (!extention) {
      vscode.window.showWarningMessage('ファイルの拡張子を取得出来ませんでした');
      return;
    }

    // vscode.window.showInformationMessage(url);
    const dest = router.findDestination(extention);
    if (!dest) {
      vscode.window.showWarningMessage(`登録されていない拡張子です： ${extention}`);
      return;
    }

    switch (typeof dest) {
      case 'string':
        router.send(dest);
        break;
      case 'object':
        vscode.window.showInformationMessage('開くドキュメントを選択して下さい', ...Object.keys(dest))
        .then(selection => {
          if (selection === undefined) { return; }
          router.send(dest[selection]);
        });
        break;
      default:
        console.error(`【ERROR】想定外の型を検知しています： type ${typeof dest}`);
    }
  });

	context.subscriptions.push(openDoc);
}

// this method is called when your extension is deactivated
export function deactivate() {}
