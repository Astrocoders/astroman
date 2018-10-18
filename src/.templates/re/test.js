const { stripIndent } = require('common-tags')
const chalk = require('chalk')
const fs = require('fs')

module.exports.args = { name: 'Component name' }

module.exports.where = (name) => {
  if (!fs.existsSync('components')){
    fs.mkdirSync('components')
    return `components/${name}.test.re`
  } else {
    return `components/${name}.test.re`
  }
}

module.exports.postBuild = (name) =>
  console.log('✅ ', chalk.green(`Test for ${name} successfully created`))

module.exports.gen = (name) => stripIndent`
open Jest;

test("Tests for ${name}", (_) =>
  Expect.(expect(3 + 4) |> toBe(7))
);
`