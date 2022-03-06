import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer, { Answers } from 'inquirer';
import nanospinner from 'nanospinner';
import { Subject, toArray } from 'rxjs';

var banner = figlet.textSync('Resume Builder');
console.log(gradient.mind.multiline(banner));

const prompts = new Subject<Answers>();

inquirer
  .prompt(prompts)
  .ui.process.pipe(toArray())
  .subscribe((answers) => {
    console.log(answers);
    const spinner = nanospinner.createSpinner('Rendering').start();
    setTimeout(() => {
        spinner.success({ text: chalk.blue('Done') });
    }, 100)
  });

prompts.next({
  type: 'input',
  name: 'Name',
  message: 'Your Name?',
});

prompts.next({
  type: 'list',
  name: 'sex',
  message: 'Your Sex?',
  choices: [
    { name: 'Male', value: 'M' },
    { name: 'Female', value: 'F' },
  ],
  default: 'M',
});

prompts.next({
  type: 'checkbox',
  name: 'Interest',
  message: `Your Interest (${chalk.blueBright.underline('Multiple')})`,
  choices: [
    { name: 'Angular', value: 'angular' },
    { name: 'HTML', value: 'html' },
    { name: 'CSS', value: 'css' },
    { name: 'React', value: 'react' },
    { name: 'Vue', value: 'vue' },
  ],
});

prompts.complete();
