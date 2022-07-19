const { writeFile } = require('node:fs/promises');

async function emptyYarnLock() {
  await writeFile('../../dist/locales/yarn.lock', '');
}

emptyYarnLock().catch(() => {});
