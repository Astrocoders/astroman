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
      command: `new [rootPath] [starter]`,
      desc: `Create new project.`,
      handler: handlerP(
        ({ rootPath, starter }) => {
          const initStarter = require(`./init`)
          switch (starter) {
            case 'cra':
              return initStarter('facebook/create-react-app', { rootPath })
            case 'gatsby':
              return initStarter('gatsbyjs/gatsby-starter-default', { rootPath })
          }
        }
      ),
    })
    .wrap(cli.terminalWidth())
    .strict()
    .showHelpOnFail(true)
    .recommendCommands()
    .parse(argv.slice(2))
}