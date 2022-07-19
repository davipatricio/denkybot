const { writeFile } = require('node:fs/promises');

async function emptyYarnLock() {
  await writeFile('../../dist/webserver/yarn.lock', '');
}

emptyYarnLock().catch(() => {});
