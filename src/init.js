/* @flow */
const { execSync } = require(`child_process`)
const execa = require(`execa`)
const fs = require(`fs-extra`)
const sysPath = require(`path`)
const report = require(`./reporter`)
const url = require(`url`)
const os = require('os')
const existsSync = require(`fs-exists-cached`).sync

const spawn = (cmd: string) => {
  const [file, ...args] = cmd.split(/\s+/)
  return execa(file, args, { stdio: `inherit` })
}

// Checks the existence of yarn package
// We use yarnpkg instead of yarn to avoid conflict with Hadoop yarn
// Refer to https://github.com/yarnpkg/yarn/issues/673
//
// Returns true if yarn exists, false otherwise
const shouldUseYarn = () => {
  try {
    execSync(`yarnpkg --version`, { stdio: `ignore` })
    return true
  } catch (e) {
    return false
  }
}

// Executes `npm install` or `yarn install` in rootPath.
const install = async rootPath => {
  const prevDir = process.cwd()

  report.info(`Installing packages...`)
  process.chdir(rootPath)

  const json = JSON.parse(fs.readFileSync('package.json'))

  json.name = rootPath

  await fs.writeFileSync(
    sysPath.join('package.json'),
    JSON.stringify(json, null, 2) + os.EOL
  )

  try {
    let cmd = shouldUseYarn() ? spawn(`yarnpkg`) : spawn(`npm install`)
    await cmd
  } finally {
    process.chdir(prevDir)
  }

}

// Install starter from URI.
const starterInstall = async (src: string, path: string) => {

  await spawn(`git clone https://github.com/${src} ${path} --single-branch`)

  report.success(`Created starter directory layout`)

  await fs.remove(sysPath.join(path, `.git`))

  await install(path)

}

// Get starter by name and runs the starterInstall
const clone = async (starter: string, rootPath: string) => {

  report.info(`Creating new ${starter} project on: ${rootPath}`)

  if (starter === 'cra') {
    await starterInstall('astrocoders/cra-starter', rootPath)
  }

  if (starter === 'gatsby') {
    await starterInstall('astrocoders/gatsby-starter', rootPath)
  }

  if (starter === 'reason') {
    await starterInstall('astrocoders/reasonml-starter', rootPath)
  }

  
}

type InitOptions = {
  rootPath?: string,
}

/**
 * Main function that clones or copies the cli.
 */
module.exports = async (starter: string, options: InitOptions = {}) => {
  const rootPath = options.rootPath || process.cwd()

  const urlObject = url.parse(rootPath)
  if (urlObject.protocol && urlObject.host) {
    report.panic(
      `It looks like you forgot to add a name for your new project. Try running instead "astroman new ${rootPath} [cra|gatsby|reason]"`
    )
    return
  }

  if (existsSync(sysPath.join(rootPath, `package.json`))) {
    report.panic(`Directory ${rootPath} is already an npm project`)
    return
  }

  await clone(starter, rootPath)
}