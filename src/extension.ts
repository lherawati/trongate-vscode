import * as vscode from "vscode";
import { newModule } from "./commands";
import { dropDownList } from "./commands";
import {cssFramework, cssFrameworkQuickPickOptions} from './commands/switch-frontend-snippet.comand';

export function activate(context: vscode.ExtensionContext) {
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "trongate" is now active!');
  // Get the user's nitro framework option
  let userFrameworkOption = vscode.workspace.getConfiguration().get('trongate.userFrameworkOption');
  //@ts-ignore
  if (!Object.keys(cssFramework).includes(userFrameworkOption)) {
    // If the user messed with the settings, we put them back to default
    userFrameworkOption = "Bootstrap 4";
  }
  vscode.window.setStatusBarMessage(`${userFrameworkOption} in use`);

  let nitro = vscode.commands.registerCommand(
    "trongate.insertSnippet",
    (args) => {
      vscode.commands.executeCommand(`editor.action.insertSnippet`, {
        name: `${userFrameworkOption} ${args.name}`,
      });
    }
  );

  let newTrongate = vscode.commands.registerCommand(
    "trongate.newTrongate",
    newModule
  );

  let selectSnippet = vscode.commands.registerCommand(
    "trongate.selectNitroFramework",
   () => {
      dropDownList(cssFramework, cssFrameworkQuickPickOptions).then(async (opt) => {
        if (!opt) {return;}
        //@ts-ignore
        userFrameworkOption = opt;
        vscode.window.showInformationMessage(
          `You have successfully selected ${userFrameworkOption} Framework`
        );
        await vscode.workspace.getConfiguration().update('trongate.userFrameworkOption', userFrameworkOption, vscode.ConfigurationTarget.Global)
        vscode.window.setStatusBarMessage(`${userFrameworkOption} in use`);
      });
    }
  );

  context.subscriptions.push(nitro, newTrongate, selectSnippet);
}

export function deactivate() {}
