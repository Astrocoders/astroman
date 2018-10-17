const { stripIndent } = require('common-tags')
const fs = require('fs')
const chalk = require('chalk')

module.exports.args = { name: 'Component name for the story' }

module.exports.where = (name) => {
  if (!fs.existsSync('stories')){
    fs.mkdirSync('stories')
    return `stories/${name}Stories.re`
  } else {
    return `stories/${name}Stories.re`
  }
}

module.exports.postBuild = () =>
  console.log(
    '✅ ',
    chalk.green('Now require your story in stories/index'),
  )

module.exports.gen = (name) => stripIndent`
open Rebolt;
Storybook.(
  storiesOf("${name}", module_)
  |> add("default", () => <${name} />)
);
`