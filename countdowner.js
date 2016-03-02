'use strict'

module.exports = countdowner

function countdowner (count, cb) {
  if ((cb == null) && (typeof count === 'function')) {
    cb = count
    count = 0
  }

  return new CountDowner(count, cb)
}

function CountDowner (count, cb) {
  if (typeof count !== 'number') throw new Error('expecting numeric count as first argument')
  if (count < 0) throw new Error('expecting count as first argument to be >= 0')
  if (typeof cb !== 'function') throw new Error('expecting function cb as second parameter')

  this._initial = count
  this._incs = 0
  this._decs = 0
  this._count = count
  this._max = count
  this._cb = cb
}

CountDowner.prototype.counts = function counts () {
  return {
    initial: this._initial,
    current: this._count,
    max: this._max,
    incs: this._incs,
    decs: this._decs
  }
}

CountDowner.prototype.inc = function inc () {
  if (this._cb === null) throw new Error('countdowner already fired')
  this._count++
  this._incs++

  if (this._count > this._max) this._max = this._count

  return this
}

CountDowner.prototype.dec = function dec () {
  if (this._cb === null) throw new Error('countdowner already fired')
  if (this._count <= 0) throw new Error('countdowner dec on zero')

  this._count--
  this._decs++

  if (this._count !== 0) return this

  var cb = this._cb
  this._cb = null

  process.nextTick(function countdownComplete () { cb() })

  return this
}
