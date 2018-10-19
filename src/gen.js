#!/usr/bin/env node

const sysPath = require('path')
const fs = require('fs')
const chalk = require('chalk')
const commonTags = require('common-tags')

const createFile = (template, language, name) => {

  const creator = require(`./.templates/${language}/${template}.js`)
  
  fs.writeFileSync(
    sysPath.join(creator.where(name)),
    creator.gen(name, { commonTags, chalk })
  )
  
  creator.postBuild(name, { chalk })

}

module.exports = async (template: string, language: string, name: string) => {
  if (!name) {
    console.log(
      '🤷',
      chalk.red("Please, provide a name for your component."),
    )
  } else {

    if (template === 'component') {
      process.chdir(`src`)
      await createFile('component', language, name)
      await createFile('test', language, name)
      await createFile('story', language, name)
    } else {
      process.chdir(`src`)
      await createFile(template, language, name)
    }
  }
}