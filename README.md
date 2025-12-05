# WEBPR - Retro WebP Converter <span style="color:#b30000;">(macOS Apple Silicon / arm64)</span>

Convert classic image formats to WebP directly from Visual Studio Code with neon Miami vibes.

<div style="background:#b30000;color:#ffffff;padding:12px 14px;border-radius:8px;font-weight:700;">
🚧 Platform support: This build currently works only on macOS (Apple Silicon / arm64). Other operating systems will be supported soon.
</div>

## Features

- Right-click any PNG, JPG, JPEG, BMP, or TIFF in the Explorer and choose **Convert Image to WebP 🌴**.
- Trigger the command from the palette and pick an image from your filesystem.
- Automatically opens the newly generated `.webp` file once conversion finishes.

## Use in VS Code

1. Open your project folder in VS Code.
2. In the Explorer, right-click the image you want to convert and select **Convert Image to WebP 🌴**.
3. Alternatively, open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`), search for `Convert Image to WebP`, and pick an image from the quick pick list.
4. The converted `.webp` file appears alongside the source image and opens in a new editor tab.

![Context menu showing Convert Image to WebP command](assets/example.png)

## 📦 Installation

1. Download the `.vsix` file (if available), or
2. Install via Marketplace (once published):

```bash
ext install cucer.webpr
```

## Requirements

- macOS (Apple Silicon / arm64) only for this build. Other OS targets are planned soon.
- Visual Studio Code `^1.85.0`
- The extension bundles [`sharp`](https://sharp.pixelplumbing.com/) for lightning-fast conversion.

## Extension Settings

No custom settings yet—conversion quality defaults to `80`. Future versions may expose this as a setting.

## Development

```bash
npm install
npm run compile
npm version patch
npm run package
```

## Publish

```bash
vsce package
vsce publish
```

Launch the **Run Extension** configuration from VS Code to start a new Extension Development Host.

- Press `F5` in VS Code to start debugging with the **Run Extension** launch configuration.

## ⚡ Copyright

All icons in this extension are original works. Redistribution or reuse without permission is prohibited.

## License

[MIT](LICENSE)

---

Made with 🌴 neon dreams.
