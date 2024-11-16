import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyFolderSync } from './utils/copy-folder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const spinner = ora();

export async function scaffoldTemplate({ template, projectPath, projectName }) {
  const TEMPLATES = {
    custom: 'custom-template',
    sveltejs: 'svelte-template',
    reactjs: 'react-template',
    nextjs: 'next-template',
  };

  const templatePath = path.resolve(
    __dirname,
    '..',
    'templates',
    TEMPLATES[template]
  );
  spinner.text = chalk.yellow('Getting project...');

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template "${template}" does not exist.`);
  }
  console.log(
    `Creating a new ${template} app in  ${chalk.yellow(
      projectName === '.' ? projectPath : projectName
    )}`
  );
  if (projectPath !== process.cwd() && !fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }
  spinner.text = chalk.yellow('Copying template files...');
  await copyFolderSync(templatePath, projectPath, ['node_modules']);
  console.log(
    chalk.yellow(
      `Your Project has been created using the ${template} template `
    )
  );
}
