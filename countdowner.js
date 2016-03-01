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
  if (typeof cb !== 'function') throw new Error('expecting function cb as second parameter')

  this._count = count
  this._cb = cb
}

CountDowner.prototype.inc = function inc () {
  if (this._cb === null) throw new Error('countdowner already fired')
  this._count++
}

CountDowner.prototype.dec = function dec () {
  if (this._cb === null) throw new Error('countdowner already fired')
  this._count--

  if (this._count < 0) throw new Error('countdowner dec on zero')
  if (this._count !== 0) return

  var cb = this._cb
  this._cb = null

  cb()
}
