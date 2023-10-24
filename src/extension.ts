import vscode from 'vscode';
import * as child_process from 'child_process';

const editor = vscode.window.activeTextEditor;
if (editor) {
  const selectedText = editor.document.getText(editor.selection);
  if (selectedText.trim() !== '') {
    child_process.exec(`echo ${selectedText}`, (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
        return;
      }
      
      // 'stdout' contains the generated code
      const generatedCode = stdout;
    
      // Replace the selected text with the generated code
      editor.edit(editBuilder => {
        editBuilder.replace(editor.selection, generatedCode);
      });
    });
  } else {
    vscode.window.showErrorMessage('No text selected');
  }
} else {
  vscode.window.showErrorMessage('No active text editor found');
}