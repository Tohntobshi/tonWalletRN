const { build } = require("esbuild");
const path = require('path');
const { promises: fspr } = require('fs');

(async () => {
  await fspr.rename('tsconfig.json', 'tmp');
  await fspr.rename('nodetsconfig.json', 'tsconfig.json');
  await build({
    entryPoints: ['./src/api/providers/nodejs/nodejs.ts'],
    bundle: true,
    minify: false,
    external: ['rn-bridge'],
    platform: 'node',
    outfile: path.join(__dirname, 'nodejs-assets', 'nodejs-project', 'main.js'),
  });
  await fspr.rename('tsconfig.json', 'nodetsconfig.json');
  await fspr.rename('tmp', 'tsconfig.json');
})()