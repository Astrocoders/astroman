const { stripIndent } = require('common-tags')
const chalk = require('chalk')

module.exports.args = { name: 'Component name' }

module.exports.where = (name) => `re/components/${name}.re`

module.exports.postBuild = () =>
  console.log('✅ ', chalk.green('Component successfully created'))

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