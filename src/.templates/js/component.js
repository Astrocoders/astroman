const { stripIndent } = require('common-tags')
const chalk = require('chalk')
const fs = require('fs')

module.exports.args = { name: 'Component name' }

module.exports.where = (name) => {
  if (!fs.existsSync('components')){
    fs.mkdirSync('components')
    return `components/${name}.js`
  } else {
    return `components/${name}.js`
  }
}

module.exports.postBuild = (name) =>
  console.log('✅ ', chalk.green(`Component ${name} successfully created`))

module.exports.gen = (name) => stripIndent`

import React from 'react'
import PropTypes from 'prop-types'

const ${name} = ({prop}) => (
  <div data-testid="${name}Wrapper">{prop}</div>
)

${name}.defaultProps = {
  prop: '',
}

${name}.propTypes = {
  prop: PropTypes.string.isRequired,
}

export default ${name}
`