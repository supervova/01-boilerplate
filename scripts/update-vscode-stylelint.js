import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stylelintPath = `./${require
  .resolve('stylelint')
  .replace(process.cwd(), '')
  .replace(/\\/g, '/')}`;
// Change the name of the project settings file if you are copying the script.
const workspaceFile = path.join(__dirname, '../01-boilerplate.code-workspace');

if (fs.existsSync(workspaceFile)) {
  const workspace = JSON.parse(fs.readFileSync(workspaceFile, 'utf8'));
  workspace.settings = workspace.settings || {};
  workspace.settings['stylelint.stylelintPath'] = stylelintPath;
  fs.writeFileSync(workspaceFile, JSON.stringify(workspace, null, 2));
  console.log('✓ Updated stylelint path in workspace');
}