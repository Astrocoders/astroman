#!/usr/bin/env node

const execa = require(`execa`)
const fs = require('fs')
const chalk = require('chalk')
const report = require(`./reporter`)

const spawn = (cmd: string) => {
  const [file, ...args] = cmd.split(/\s+/)
  return execa(file, args, { stdio: `inherit` })
}

module.exports = async (kind: string, name: string, destination: string, branch: string) => {
  if (!name) {
    console.log(
      '🤷',
      chalk.red("Please, provide a name for your component."),
    )
  } else {
    report.info(`Copying ${kind} from ${destination} on branch ${branch}`)
    process.chdir('src')

    if (!fs.existsSync(`${kind}s`)){
      fs.mkdirSync(`${kind}s`)
      process.chdir(`${kind}s`)
    } else {
      process.chdir(`${kind}s`)
    }
    await spawn(`curl https://raw.githubusercontent.com/astrocoders/${destination}/${branch}/src/${kind}s/${name} --output ${name}`)
    console.log('✅ ', chalk.green(`${kind} ${name} successfully copied!`))
  }
}