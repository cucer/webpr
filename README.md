# WEBPR - Retro WebP Converter

Convert classic image formats to WebP directly from Visual Studio Code with neon Miami vibes.

## Features

- Right-click any PNG, JPG, JPEG, BMP, or TIFF in the Explorer and choose **Convert Image to WebP 🌴**.
- Trigger the command from the palette and pick an image from your filesystem.
- Automatically opens the newly generated `.webp` file once conversion finishes.

## 📦 Installation

1. Download the `.vsix` file (if available), or
2. Install via Marketplace (once published):

```bash
ext install cucer.webpr
```

## Usage

- `Linux` & `Windows` > **File > Preferences > File Icon Theme > Turkish Icons**.
- `MacOS` > **Code > Preferences > File Icon Theme > Turkish Icons**.

## Requirements

- Visual Studio Code `^1.85.0`
- The extension bundles [`sharp`](https://sharp.pixelplumbing.com/) for lightning-fast conversion.

## Extension Settings

No custom settings yet—conversion quality defaults to `80`. Future versions may expose this as a setting.

## Development

```bash
npm install
npm run compile
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
