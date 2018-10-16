#!/usr/bin/env node

const sysPath = require('path')
const fs = require('fs')
const chalk = require('chalk')
const commonTags = require('common-tags')

module.exports = async (template: string, name: string) => {
  if (!name) {
    console.log(
      '🤷',
      chalk.red("Please, provide a name for your component."),
    )
  } else {
    const creator = require(`./.templates/${template}.js`)
  
    await fs.writeFileSync(
      sysPath.join(creator.where(name)),
      creator.gen(name, { commonTags, chalk })
    )
  
    creator.postBuild({ chalk })
  }
}