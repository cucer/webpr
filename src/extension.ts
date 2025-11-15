import * as path from 'path';
// import sharp from 'sharp';
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
  return files && files.length > 0 ? files[0] : undefined;
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'webpr.convertToWebp',
    async (uri: vscode.Uri) => {
      try {
        // ✅ Lazy load sharp here instead of top-level import
        let sharp: any;
        try {
          sharp = (await import('sharp')).default;
        } catch (e) {
          vscode.window.showErrorMessage(
            'The Sharp library could not be loaded! This is usually caused by missing platform-specific files in the VSIX package. ' +
              'Please make sure to include all required @img/sharp-* packages for every platform.'
          );
          return;
        }

        const fileUri = uri ?? (await promptForImage());
        if (!fileUri) {
          vscode.window.showWarningMessage('⚠️ No image selected.');
          return;
        }

        const inputPath = fileUri.fsPath;
        const ext = path.extname(inputPath);
        if (!isSupportedImage(ext)) {
          vscode.window.showErrorMessage('❌ Unsupported image format!');
          return;
        }

        const outputPath = inputPath.replace(ext, '.webp');
        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

        vscode.window.showInformationMessage(
          `✅ Converted to WebP: ${outputPath}`
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
