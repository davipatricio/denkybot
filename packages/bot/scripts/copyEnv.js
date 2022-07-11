const { readFile, writeFile } = require('node:fs/promises');

async function copyEnv() {
  const data = await readFile('../.env', 'utf-8');
  await writeFile('../../../build/bot/.env', data.toString());
}

copyEnv();
