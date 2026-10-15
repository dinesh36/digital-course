const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.join(ROOT_DIR, 'package.json'));
const LIB_DIR = path.join(ROOT_DIR, 'lib');
const repos = [
  {
    name: 'mr-ecom-ui',
    repo: 'git@github.com:dinesh36/mr-ecom-ui.git',
    folder: 'ui',
  },
  {
    name: 'serverless-ecom-nextjs',
    repo: 'git@github.com:dinesh36/serverless-ecom-nextjs.git',
    folder: 'ecom',
  },
];

function extractTag(dep) {
  if (!dep) return null;
  const match = dep.match(/#(.+)$/);
  return match ? match[1] : null;
}

function hasWorkingTreeChanges(repoPath) {
  try {
    const stdout = execSync('git status --porcelain', { cwd: repoPath, stdio: ['ignore', 'pipe', 'ignore'] });
    return stdout.toString().trim().length > 0;
  } catch (err) {
    console.error(err);
    return true;
  }
}

function bootstrap() {
  if (!fs.existsSync(LIB_DIR)) {
    fs.mkdirSync(LIB_DIR);
  }

  repos.forEach(({ name, repo, folder }) => {
    const dirName = folder || name;
    const repoPath = path.join(LIB_DIR, dirName);

    const depVersion = pkg.dependencies && pkg.dependencies[name];
    const tag = extractTag(depVersion);

    if (!tag) {
      process.exit(1);
    }

    if (!fs.existsSync(repoPath) || !fs.existsSync(path.join(repoPath, '.git'))) {
      execSync(`git clone ${repo} ${repoPath}`, { stdio: 'inherit' });
      execSync('git fetch --all --tags', { cwd: repoPath, stdio: 'inherit' });
      try {
        execSync(`git checkout -B ${dirName}-${tag} refs/tags/${tag}`, { cwd: repoPath, stdio: 'inherit' });
      } catch (err) {
        console.error(err);
        process.exit(1);
      }

      return;
    }

    if (hasWorkingTreeChanges(repoPath)) {
      return;
    }

    try {
      execSync('git fetch --all --tags', { cwd: repoPath, stdio: 'inherit' });
      execSync(`git checkout -B ${dirName}-${tag} refs/tags/${tag}`, { cwd: repoPath, stdio: 'inherit' });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
}

bootstrap();
