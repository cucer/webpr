"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const path = __importStar(require("path"));
// import sharp from 'sharp';
const vscode = __importStar(require("vscode"));
function isSupportedImage(ext) {
    return ['.png', '.jpg', '.jpeg', '.bmp', '.tiff'].includes(ext.toLowerCase());
}
async function promptForImage() {
    const files = await vscode.window.showOpenDialog({
        canSelectMany: false,
        openLabel: 'Convert to WebP',
        filters: {
            Images: ['png', 'jpg', 'jpeg', 'bmp', 'tiff'],
        },
    });
    return files && files.length > 0 ? files[0] : undefined;
}
function activate(context) {
    const disposable = vscode.commands.registerCommand('webpr.convertToWebp', async (uri) => {
        try {
            // ✅ Lazy load sharp here instead of top-level import
            let sharp;
            try {
                sharp = (await Promise.resolve().then(() => __importStar(require('sharp')))).default;
            }
            catch (e) {
                vscode.window.showErrorMessage('The Sharp library could not be loaded! This is usually caused by missing platform-specific files in the VSIX package. ' +
                    'Please make sure to include all required @img/sharp-* packages for every platform.');
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
            vscode.window.showInformationMessage(`✅ Converted to WebP: ${outputPath}`);
            await vscode.commands.executeCommand('vscode.open', vscode.Uri.file(outputPath));
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`💥 Error: ${message}`);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map