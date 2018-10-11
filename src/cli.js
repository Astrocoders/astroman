const yargs = require(`yargs`)
const report = require(`./reporter`)

const handlerP = fn => (...args) => {
  Promise.resolve(fn(...args)).then(
    () => process.exit(0),
    err => report.panic(err)
  )
}

module.exports = (argv, handlers) => {
  let cli = yargs()

  cli
    .usage(`Usage: $0 <command> [options]`)
    .alias(`h`, `help`)
    .alias(`v`, `version`)
    .option(`verbose`, {
      default: false,
      type: `boolean`,
      describe: `Turn on verbose output`,
      global: true,
    })
    .option(`no-color`, {
      default: false,
      type: `boolean`,
      describe: `Turn off the color in output`,
      global: true,
    })

  return cli
    .command({
      cmd: 'new',
      desc: 'Create new project.',
      subcommands: [
        {
          cmd: '[rootPath] cra',
          desc: 'create a new project',
          fn: function ({rootPath}) { 
            const initStarter = require(`./init`)
            return initStarter(`facebook/create-react-app`, { rootPath })
           }
        },
        {
          cmd: '[rootPath] gatsby',
          desc: 'create a new project',
          fn: function ({rootPath}) { 
            const initStarter = require(`./init`)
            return initStarter(`gatsbyjs/gatsby-starter-default`, { rootPath })
           }
        },
      ]
    })
    .wrap(cli.terminalWidth())
    .demandCommand(1, `Pass --help to see all available commands and options.`)
    .strict()
    .showHelpOnFail(true)
    .recommendCommands()
    .parse(argv.slice(2))
}