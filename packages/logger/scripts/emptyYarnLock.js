const { writeFile } = require('node:fs/promises');

async function emptyYarnLock() {
  await writeFile('../../dist/logger/yarn.lock', '');
}

emptyYarnLock().catch(() => {});
