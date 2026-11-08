const fs = require('fs');
const path = require('path');

// Next keeps the backend answers a build fetched (the categories, the nav menus and the SEO of
// the static pages) in `.next/cache/fetch-cache`, and a later build reuses them: a changed
// category, menu or SEO title would not show in the new build. Every build starts without them.
fs.rmSync(path.join(__dirname, '..', '.next', 'cache', 'fetch-cache'), { recursive: true, force: true });
