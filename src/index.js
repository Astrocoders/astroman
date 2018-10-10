#!/usr/bin/env node

// babel-preset-env doesn't find this import if you
// use require() with backtick strings so use the es6 syntax
import "@babel/polyfill"

const createCli = require(`./cli`)
const report = require(`./reporter`)

global.Promise = require(`bluebird`)

Promise.onPossiblyUnhandledRejection(error => {
  report.error(error)
  throw error
})

process.on(`unhandledRejection`, error => {
  // This will exit the process in newer Node anyway so lets be consistent
  // across versions and crash
  report.panic(`UNHANDLED REJECTION`, error)
})

process.on(`uncaughtException`, error => {
  report.panic(`UNHANDLED EXCEPTION`, error)
})

createCli(process.argv)