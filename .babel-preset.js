const r = m => require.resolve(m)

function preset(context, options = {}) {
  const { browser = false, debug = false } = options
  const { NODE_ENV, BABEL_ENV } = process.env

  const PRODUCTION = (BABEL_ENV || NODE_ENV) === "production"

  const browserConfig = {
    useBuiltIns: false,
    targets: {
      browsers: PRODUCTION
        ? [`last 4 versions`, `safari >= 7`, "ie >= 9"]
        : [`last 2 versions`, `not ie <= 11`, `not android 4.4.3`],
    },
  }

  const nodeConfig = {
    targets: {
      node: PRODUCTION ? 6.0 : "current",
    },
  }

  return {
    presets: [
      [
        r("@babel/preset-env"),
        Object.assign(
          {
            loose: true,
            debug: !!debug,
            useBuiltIns: "entry",
            shippedProposals: true,
            modules: "commonjs",
          },
          browser ? browserConfig : nodeConfig
        ),
      ],
      r("@babel/preset-flow"),
    ],
  }
}

module.exports = preset