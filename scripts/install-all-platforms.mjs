// scripts/install-all-platforms.mjs
import { execSync } from 'child_process';

const packages = [
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

function run(cmd) {
  console.log(`\n[webpr:install-all] Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

console.log('Starting forced installation of all platform packages…');

for (const pkg of packages) {
  run(`npm install ${pkg} --ignore-platform --force`);
}

console.log('\nAll platform-specific Sharp binaries installed successfully!');
