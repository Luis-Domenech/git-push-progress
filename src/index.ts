// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { pushProgress } from './commands';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let  statusBarItem: vscode.StatusBarItem;

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Extension "git push progress" is now active!');

    let term = vscode.window.createOutputChannel("Git Push Progress");

    if (!statusBarItem) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    }

    statusBarItem.show()

    context.subscriptions.push(pushProgress(term, statusBarItem));
}

// this method is called when your extension is deactivated
export function deactivate() {}