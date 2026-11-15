const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const rootPkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));

const workspaceGlobs = rootPkg.workspaces || ['apps/*', 'packages/*'];
let errors = [];

workspaceGlobs.forEach((globPattern) => {
  const isApp = globPattern.startsWith('apps');
  const baseDir = globPattern.replace('/*', '');
  const targetDir = path.join(ROOT_DIR, baseDir);

  if (!fs.existsSync(targetDir)) return;

  const entries = fs.readdirSync(targetDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const workspacePath = path.join(targetDir, entry.name);
    const pkgJsonPath = path.join(workspacePath, 'package.json');

    if (!fs.existsSync(pkgJsonPath)) {
      errors.push(`${baseDir}/${entry.name}: missing package.json`);
      continue;
    }

    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

      // 1. Name validation
      if (!pkg.name || !pkg.name.startsWith('@kavach/')) {
        errors.push(`${baseDir}/${entry.name}: package.json 'name' must be scoped as '@kavach/${entry.name}' (got '${pkg.name}')`);
      }

      const scripts = pkg.scripts || {};

      // 2. Clean script is required everywhere
      if (!scripts.clean) {
        errors.push(`${baseDir}/${entry.name}: package.json is missing required 'clean' script`);
      }

      // 3. Build script is required everywhere
      if (!scripts.build) {
        errors.push(`${baseDir}/${entry.name}: package.json is missing required 'build' script`);
      }

      // 4. Dev script is required for all applications in apps/*
      if (isApp && !scripts.dev) {
        errors.push(`${baseDir}/${entry.name}: app package.json is missing required 'dev' script`);
      }

      // 5. Container validation for apps
      if (isApp) {
        const dockerfilePath = path.join(workspacePath, 'Dockerfile');
        if (!fs.existsSync(dockerfilePath)) {
          errors.push(`${baseDir}/${entry.name}: app is missing required Dockerfile`);
        }
      }
    } catch (err) {
      errors.push(`${baseDir}/${entry.name}: invalid package.json - ${err.message}`);
    }
  }
});

if (errors.length > 0) {
  console.error('Workspace Validation Errors:');
  errors.forEach((err) => console.error(`  ✖ ${err}`));
  process.exit(1);
} else {
  console.log('✔ All workspace packages conform to monorepo standards.');
  process.exit(0);
}
