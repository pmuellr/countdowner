'use strict'

const countdowner = require('..')
const tapeRunner = require('./tapeRunner')(__filename)

tapeRunner(function noArgs (t) {
  try {
    countdowner()
    t.fail('should have thrown an exception')
  } catch (err) {
    t.pass('should have thrown an exception')
  }
  t.end()
})

tapeRunner(function noCallback (t) {
  try {
    countdowner(1)
    t.fail('should have thrown an exception')
  } catch (err) {
    t.pass('should have thrown an exception')
  }
  t.end()
})

tapeRunner(function badCallback (t) {
  try {
    countdowner(1, 1)
    t.fail('should have thrown an exception')
  } catch (err) {
    t.pass('should have thrown an exception')
  }
  t.end()
})

tapeRunner(function badCount (t) {
  try {
    countdowner('foo', function () {})
    t.fail('should have thrown an exception')
  } catch (err) {
    t.pass('should have thrown an exception')
  }
  t.end()
})

tapeRunner(function decAfterDone (t) {
  var cd = countdowner(1, function () {})
  cd.dec()

  try {
    cd.dec()
    t.fail('should have thrown an exception')
  } catch (err) {
    t.pass('should have thrown an exception')
  }
  t.end()
})

tapeRunner(function incAfterDone (t) {
  var cd = countdowner(1, function () {})
  cd.dec()

  try {
    cd.inc()
    t.fail('should have thrown an exception')
  } catch (err) {
    t.pass('should have thrown an exception')
  }
  t.end()
})

tapeRunner(function decOnZero (t) {
  var cd = countdowner(function () {})

  try {
    cd.dec()
    t.fail('should have thrown an exception')
  } catch (err) {
    t.pass('should have thrown an exception')
  }
  t.end()
})
