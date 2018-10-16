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

    const destination = sysPath.join(creator.where(name))

    const content = creator.gen(name, { commonTags, chalk })
  
    await fs.writeFileSync(destination, content)
  
    creator.postBuild({ chalk })
  }
}