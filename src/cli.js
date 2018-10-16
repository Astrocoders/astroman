const yargs = require(`yargs`)
const report = require(`./reporter`)

const handlerP = fn => (...args) => {
  Promise.resolve(fn(...args)).then(
    () => process.exit(0),
    err => report.panic(err)
  )
}

module.exports = (argv) => {
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
      desc: 'astro-cli new <project-name> [cra|gatsby|reason]',
      handler: handlerP(
        ({ rootPath, starter }) => {
          const initStarter = require(`./init`)
          return initStarter(starter, { rootPath })
        }
      ),
    })
    .command({
      command: `gen [template] [name]`,
      desc: 'astro-cli gen <template-name> <filename>',
      handler: handlerP(
        ({ template, name }) => {
          const initGenerator = require(`./gen`)
          return initGenerator(template, name)
        }
      ),
    })
    .wrap(cli.terminalWidth())
    .demandCommand(1, `Pass --help to see all available commands and options.`)
    .strict()
    .showHelpOnFail(true)
    .recommendCommands()
    .parse(argv.slice(2))
}