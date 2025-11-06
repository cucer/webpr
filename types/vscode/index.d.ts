declare module 'vscode' {
  export interface Disposable {
    dispose(): void;
  }

  export interface Uri {
    fsPath: string;
  }

  export const Uri: {
    file(path: string): Uri;
  };

  export interface OpenDialogOptions {
    canSelectMany?: boolean;
    openLabel?: string;
    filters?: Record<string, string[]>;
  }

  export namespace commands {
    function registerCommand(
      command: string,
      callback: (...args: any[]) => unknown,
      thisArg?: unknown
    ): Disposable;
    function executeCommand<T = unknown>(command: string, ...rest: any[]): Thenable<T | undefined>;
  }

  export namespace window {
    function showOpenDialog(options: OpenDialogOptions): Thenable<Uri[] | undefined>;
    function showWarningMessage(message: string, ...items: string[]): Thenable<string | undefined>;
    function showErrorMessage(message: string, ...items: string[]): Thenable<string | undefined>;
    function showInformationMessage(message: string, ...items: string[]): Thenable<string | undefined>;
    function showTextDocument(uri: Uri): Thenable<TextEditor>;
  }

  export interface TextEditor {
    document: TextDocument;
  }

  export interface TextDocument {
    uri: Uri;
  }

  export interface ExtensionContext {
    subscriptions: Disposable[];
  }

  export type Thenable<T> = PromiseLike<T>;
}
