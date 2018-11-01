import compiler from '@ampproject/rollup-plugin-closure-compiler'
import config from './build-config-base'

config.output.file = './dist/mthread.min.js'
config.plugins = [
  ...config.plugins,
  compiler()
]

export default config
