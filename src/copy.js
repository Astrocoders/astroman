#!/usr/bin/env node

const sysPath = require('path')
const fs = require('fs')
const chalk = require('chalk')
const report = require(`./reporter`)

const copy = async (kind: string, name: string, destination: string) => {

  const prevDir = sysPath.join(__dirname, '../..', destination)

  report.info(`Copying ${kind} from ${destination}`)

  fs.copyFile(`${prevDir}/src/${kind}/${name}`, `${name}`, (err) => {
    if (err) throw err
    console.log('✅ ', chalk.green(`${kind} ${name} successfully copied`))
  });

}

module.exports = async (kind: string, name: string, destination: string) => {
  if (!name) {
    console.log(
      '🤷',
      chalk.red("Please, provide a name for your component."),
    )
  } else {
    await copy(kind, name, destination)
  }
}