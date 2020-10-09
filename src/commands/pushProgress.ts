import * as vscode from 'vscode';

import { gitPush } from '../services/pushProgressResolver';

export function pushProgress(term: vscode.OutputChannel, statBar: vscode.StatusBarItem): vscode.Disposable {


    return vscode.commands.registerCommand('git.pushProgress', async function () {
        // The code you place here will be executed every time your command is executed
        console.log("Checking for valid workspace")
        if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders.length) {
          return vscode.window.showWarningMessage('Push Progress cannot be actived since no code repo opened')
        }
        if (vscode.workspace.workspaceFolders.length !== 1) {
          return vscode.window.showWarningMessage('Push Progress cannot be actived in multiple workspace mode')
        }

        console.log("No problems with the workspace")
        console.log("Calling gitPush()")

        gitPush(term, statBar)
        .then(output => {
            console.log("Push Progress executed successfully")
            // vscode.window.showInformationMessage('Push progress Finished Succesfully')
            term.appendLine("Push Progress Succeeded\n")
            statBar.hide();
            vscode.window.setStatusBarMessage("Push Progress Succeeded", 1000 * 10)
        })
        .catch(err => {
            console.log("Error encountered during Progress Push")
            console.log(err)
            vscode.window.showErrorMessage(err)
            term.appendLine("Push Progress Failed")
            statBar.hide();
            vscode.window.setStatusBarMessage("Push Progress Failed\n", 1000 * 10)
        }) 
    });
}

