'use strict'

var countdowner = require('..')
var tapeRunner = require('./tapeRunner')(__filename)

tapeRunner(function justCallback (t) {
  var cd = countdowner(function () {
    t.pass('countdown occurred')
    t.end()
  })

  cd.inc()
  cd.dec()
})

tapeRunner(function startAtThree (t) {
  var cd = countdowner(3, function () {
    t.pass('countdown occurred')
    t.end()
  })

  cd.dec() // 2
  cd.dec() // 1
  cd.dec() // 0
})

tapeRunner(function startAtThreeUpToFive (t) {
  var cd = countdowner(3, function () {
    t.pass('countdown occurred')
    t.end()
  })

  cd.dec() // 2
  cd.inc(); cd.inc(); cd.inc() // 5
  cd.dec(); cd.dec(); cd.dec(); cd.dec(); cd.dec() // 0
})

tapeRunner(function nextTick (t) {
  var sideVal = 'foo'

  var cd = countdowner(1, function () {
    t.equal(sideVal, 'bar', 'sideVal should be "bar"')
    t.end()
  })

  cd.dec()

  sideVal = 'bar'
})
