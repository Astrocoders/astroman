const { stripIndent } = require('common-tags')
const chalk = require('chalk')
const fs = require('fs')

module.exports.args = { name: 'Component name' }

module.exports.where = (name) => {
  if (!fs.existsSync('components')){
    fs.mkdirSync('components')
    return `components/${name}.re`
  } else {
    return `components/${name}.re`
  }
}

module.exports.postBuild = (name) =>
  console.log('✅ ', chalk.green(`Component ${name} successfully created`))

module.exports.gen = (name) => stripIndent`
open Rebolt;
module Styles = {
  open Style;
  let text = style([]);
};
let component = ReasonReact.statelessComponent("${name}");
let make = (_children) => {
  ...component,
  render: _self => {
    <Paper.Text style=Styles.text>(ReasonReact.string("Hello"))</Paper.Text>
  }
};
`