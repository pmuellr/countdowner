'use strict'

const countdowner = require('..')
const tapeRunner = require('./tapeRunner')(__filename)

tapeRunner(function justCallback (t) {
  const cd = countdowner(() => {
    t.pass('countdown occurred')
    t.end()
  })

  cd.inc()
  cd.dec()
})

tapeRunner(function startAtThree (t) {
  const cd = countdowner(3, () => {
    t.pass('countdown occurred')
    t.end()
  })

  cd.dec() // 2
  cd.dec() // 1
  cd.dec() // 0
})

tapeRunner(function startAtThreeUpToFive (t) {
  const cd = countdowner(3, () => {
    t.pass('countdown occurred')
    t.end()
  })

  cd.dec() // 2
  cd.inc(); cd.inc(); cd.inc() // 5
  cd.dec(); cd.dec(); cd.dec(); cd.dec(); cd.dec() // 0
})
