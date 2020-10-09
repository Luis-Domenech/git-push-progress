import * as vscode from 'vscode';
var exec = require('child_process').exec;

const gitpath = vscode.workspace.getConfiguration('git').get('path') || 'git';

export function gitPush(term: vscode.OutputChannel, statBar: vscode.StatusBarItem): Promise<string> {

    return new Promise((resolve, reject) => {

        term.show(true)
        term.appendLine("Git Push Progress Initiated...\n")
        vscode.window.setStatusBarMessage("Push Progress Initiated", 1000 * 2)

        let dir = vscode.workspace.workspaceFolders[0].uri.fsPath

        console.log("Workspace: " + dir)

        console.log("Spawning child process in workspace")
        
        let child = exec('cd "' + dir + '" && ' + gitpath + " push --progress")
        
        console.log("Child spawned")

        let output = ""

        child.stdout.setEncoding('utf8');
        child.stdout.on("data", (data) => {
            term.appendLine(data)
            data = data.toString()
            output += data
        })

        child.stderr.setEncoding('utf8');
        child.stderr.on("data", (error) => {
            console.log("Recevied error: " + error)
            term.appendLine(error);
            error = error.toString()
            output += error;
        })

        child.on("close", (code) => {
            console.log("Child spawn finished executing command")
            console.log("Closing code: " + code)
            if (code != '0') {
                reject("Push Progress failed with closing code: " + code)
            }
            resolve(output)
        })
    })
}


