const { writeFile } = require('node:fs/promises');

async function emptyYarnLock() {
  await writeFile('../../dist/bot/yarn.lock', '');
}

emptyYarnLock().catch(() => {});
