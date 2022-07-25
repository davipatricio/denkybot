const { readFile, writeFile } = require('node:fs/promises');

async function copyEnv() {
  const exists = await readFile('../../dist/bot/.env').catch(() => false);
  if (exists) return;

  const data = await readFile('.env', 'utf-8');
  await writeFile('../../dist/bot/.env', data.toString());
}

copyEnv().catch(() => {});
