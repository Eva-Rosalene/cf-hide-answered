const { build } = require('esbuild');
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

async function main() {
  await build({
    bundle: true,
    minify: true,
    entryPoints: ["./src/index.jsx"],
    outfile: "./dist/index.user.js",
    jsxFactory: "createElement",
    format: "iife",
    target: "es2015",
    loader: {
      ".css": "text",
    },
  });

  const dist = await promisify(readFile)('./dist/index.user.js', 'utf-8');
  const header = await promisify(readFile)('./res/header.txt', 'utf-8');
  await promisify(writeFile)('./dist/index.user.js', header + dist);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});