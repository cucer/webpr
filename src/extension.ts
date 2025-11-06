import * as path from 'path';
import sharp from 'sharp';
import * as vscode from 'vscode';

function isSupportedImage(ext: string): boolean {
  return ['.png', '.jpg', '.jpeg', '.bmp', '.tiff'].includes(ext.toLowerCase());
}

async function promptForImage(): Promise<vscode.Uri | undefined> {
  const files = await vscode.window.showOpenDialog({
    canSelectMany: false,
    openLabel: 'Convert to WebP',
    filters: {
      Images: ['png', 'jpg', 'jpeg', 'bmp', 'tiff'],
    },
  });

  return files?.[0];
}

export function activate(context: vscode.ExtensionContext) {
  const command = 'webpr.convertToWebp';

  const disposable = vscode.commands.registerCommand(
    command,
    async (uri?: vscode.Uri) => {
      try {
        const inputUri = uri ?? (await promptForImage());
        if (!inputUri) {
          vscode.window.showWarningMessage('No image selected.');
          return;
        }

        const inputPath = inputUri.fsPath;
        const ext = path.extname(inputPath);

        if (!isSupportedImage(ext)) {
          vscode.window.showErrorMessage(
            'Unsupported file type. Please select a PNG, JPG, JPEG, BMP, or TIFF image.'
          );
          return;
        }

        const outputPath = inputPath.replace(ext, '.webp');

        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

        vscode.window.showInformationMessage(
          `🌴 Conversion successful! Saved as: ${outputPath}`
        );
        await vscode.commands.executeCommand(
          'vscode.open',
          vscode.Uri.file(outputPath)
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`💥 Error: ${message}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
