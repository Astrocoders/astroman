const { stripIndent } = require('common-tags')
const chalk = require('chalk')
const fs = require('fs')

module.exports.args = { name: 'Component name' }

module.exports.where = (name) => {
  if (!fs.existsSync('components')){
    fs.mkdirSync('components')
    return `components/${name}.test.js`
  } else {
    return `components/${name}.test.js`
  }
}

module.exports.postBuild = () =>
  console.log('✅ ', chalk.green('Test successfully created'))

module.exports.gen = (name) => stripIndent`

import React from 'react'
import { render, cleanup } from 'react-testing-library'

import ${name} from './${name}'

afterEach(cleanup)

describe('${name} component', () => {
  it('should render ${name} component', () => {
    const { queryByTestId } = render(<${name} />)

    expect(queryByTestId('${name}Wrapper')).toBeInTheDocument()
  })
})
`