const { stripIndent } = require('common-tags')
const fs = require('fs')
const chalk = require('chalk')

module.exports.args = { name: 'Component name for the story' }

module.exports.where = (name) => {
  if (!fs.existsSync('docz')){
    fs.mkdirSync('docz')
    return `docz/${name}.mdx`
  } else {
    return `docz/${name}.mdx`
  }
}

module.exports.postBuild = () =>
  console.log(
    '✅ ',
    chalk.green('You can see your component on docz/ folder'),
  )

module.exports.gen = (name) => stripIndent`
---
name: ${name}
menu: Components
---

import { Playground, PropsTable } from 'docz'
import ${name} from '../components/${name}'

# ${name}

<PropsTable of={${name}} />

## Basic usage

<Playground>
  <${name}/>
</Playground>
`