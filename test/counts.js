'use strict'

var countdowner = require('..')
var tapeRunner = require('./tapeRunner')(__filename)

tapeRunner(function initial_0 (t) {
  var c = countdowner(function () { })

  var counts = c.counts()

  t.equal(0, counts.initial, 'counts.initial should be 0')
  t.equal(0, counts.incs, 'counts.incs should be 0')
  t.equal(0, counts.decs, 'counts.decs should be 0')
  t.equal(0, counts.current, 'counts.current should be 0')
  t.equal(0, counts.max, 'counts.max should be 0')
  t.end()
})

tapeRunner(function initial_42 (t) {
  var c = countdowner(42, function () { })

  var counts = c.counts()

  t.equal(42, counts.initial, 'counts.initial should be 42')
  t.equal(0, counts.incs, 'counts.incs should be 0')
  t.equal(0, counts.decs, 'counts.decs should be 0')
  t.equal(42, counts.current, 'counts.current should be 42')
  t.equal(42, counts.max, 'counts.max should be 42')
  t.end()
})

tapeRunner(function inc_inc_dec (t) {
  var counts
  var c = countdowner(function () { })

  c.inc()
  counts = c.counts()

  t.equal(0, counts.initial, 'counts.initial should be 0')
  t.equal(1, counts.incs, 'counts.incs should be 1')
  t.equal(0, counts.decs, 'counts.decs should be 0')
  t.equal(1, counts.current, 'counts.current should be 1')
  t.equal(1, counts.max, 'counts.max should be 1')

  c.inc()
  counts = c.counts()

  t.equal(0, counts.initial, 'counts.initial should be 0')
  t.equal(2, counts.incs, 'counts.incs should be 2')
  t.equal(0, counts.decs, 'counts.decs should be 0')
  t.equal(2, counts.current, 'counts.current should be 2')
  t.equal(2, counts.max, 'counts.max should be 2')

  c.dec()
  counts = c.counts()

  t.equal(0, counts.initial, 'counts.initial should be 0')
  t.equal(2, counts.incs, 'counts.incs should be 2')
  t.equal(1, counts.decs, 'counts.decs should be 1')
  t.equal(1, counts.current, 'counts.current should be 1')
  t.equal(2, counts.max, 'counts.max should be 2')

  t.end()
})

tapeRunner(function inc_dec (t) {
  var counts
  var fired = false
  var c = countdowner(function () { fired = true })

  c.inc()
  c.dec()

  process.nextTick(function () {
    t.equal(fired, true, 'fired should be true')

    counts = c.counts()

    t.equal(0, counts.initial, 'counts.initial should be 0')
    t.equal(1, counts.incs, 'counts.incs should be 1')
    t.equal(1, counts.decs, 'counts.decs should be 1')
    t.equal(0, counts.current, 'counts.current should be 0')
    t.equal(1, counts.max, 'counts.max should be 1')

    t.end()
  })
})
