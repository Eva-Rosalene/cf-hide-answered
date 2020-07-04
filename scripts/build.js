const { build } = require('esbuild');
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

function buildMeta(openuserjsEnv) {
  const [download, update] = openuserjsEnv.split(';');
  return [
    '',
    `// @downloadURL ${download}`,
    `// @updateURL ${update}`,
  ].join('\n');
}

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

  const meta = process.env.OPEN_USER_JS ? buildMeta(process.env.OPEN_USER_JS) : '';
  const dist = await promisify(readFile)('./dist/index.user.js', 'utf-8');
  let header = await promisify(readFile)('./res/header.txt', 'utf-8');
  header = header.replace('\n{OPENUSERJS_META}', meta);
  await promisify(writeFile)('./dist/index.user.js', header + dist);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});