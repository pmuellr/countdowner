'use strict'

const countdowner = require('..')
const tapeRunner = require('./tapeRunner')(__filename)

tapeRunner(function checkExports (t) {
  t.equal(typeof countdowner, 'function', 'module export should be a function')
  t.end()
})
