/* eslint-disable no-console */
import { execSync } from 'child_process';

const gitUrl = 'git@github.com:wenty22/uikit.git';
const comment = 'Update';

function execCommand(command: string, cwd: string = 'dist') {
  execSync(command, { cwd });
}

const commandList = [
  `git init`,
  `git add .`,
  `git commit -m "${comment}"`,
  `git remote add origin ${gitUrl}`,
  `git push origin HEAD:main -f`,
];

try {
  execCommand(`rm -rf dist`, './');
  execCommand(`rushx build`, './');
  commandList.forEach((item) => {
    execCommand(item);
  });
  console.info('Publish success!');
} catch (err) {
  console.error('Publish failure, error:', err.toString());
}
