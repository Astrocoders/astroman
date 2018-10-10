#!/usr/bin/env node

// babel-preset-env doesn't find this import if you
// use require() with backtick strings so use the es6 syntax
import "@babel/polyfill"

const createCli = require(`./cli`)
const report = require(`./reporter`)

global.Promise = require(`bluebird`)

createCli(process.argv)