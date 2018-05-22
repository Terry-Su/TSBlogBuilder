const PATH = require( "path" )

const output = PATH.resolve( __dirname, './build/detail' )


module.exports = {
  server: {
    baseDir: output,
    directory: true,
  },
  files: [ `${ output }/**` ],
  open: false,
  port: 3700
}
