// scripts/fetch-sharp-binaries.mjs
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const SHARP_VENDOR = path.join(
  __dirname,
  '..',
  'node_modules',
  'sharp',
  'vendor'
);

// Platform-specific Sharp packages (@img/*)
const BINARY_PACKAGES = [
  '@img/sharp-darwin-arm64',
  '@img/sharp-darwin-x64',
  '@img/sharp-win32-x64',
  '@img/sharp-win32-ia32',
  '@img/sharp-linux-x64',
  '@img/sharp-linux-arm64',

  '@img/sharp-libvips-darwin-arm64',
  '@img/sharp-libvips-darwin-x64',
  '@img/sharp-libvips-win32-x64',
  '@img/sharp-libvips-win32-ia32',
  '@img/sharp-libvips-linux-x64',
  '@img/sharp-libvips-linux-arm64',
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  ensureDir(dest);

  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function log(msg) {
  console.log(`[webpr:fetch-binaries] ${msg}`);
}

log('Preparing Sharp vendor folder…');
ensureDir(SHARP_VENDOR);

for (const pkg of BINARY_PACKAGES) {
  const pkgPath = path.join(__dirname, '..', 'node_modules', pkg);

  if (!fs.existsSync(pkgPath)) {
    log(`Missing package: ${pkg} (skipping)`);
    continue;
  }

  // Sharp expects vendor binaries under sharp/vendor/<platform-package-name>
  const outDir = path.join(SHARP_VENDOR, pkg.replace('@img/', ''));

  log(`Copying binaries from ${pkg} → ${outDir}`);
  copyRecursive(pkgPath, outDir);
}

log('All Sharp binaries copied successfully.');
