var countdowner = require('..')

var countdown1 = countdowner(2, function () { console.log('done 1') })

countdown1.dec() // count === 1
countdown1.dec() // count === 0
// prints 'done 1'

var countdown2 = countdowner(function () { console.log('done 2') })

countdown2.inc() // count === 1
countdown2.inc() // count === 2
countdown2.dec() // count === 1
countdown2.dec() // count === 0
// prints 'done 2'

var countdown3 = countdowner(function () { console.log('done 3') })
var interval = setInterval(logStatus, 500)

incAt(1000, countdown3)
incAt(1200, countdown3)
incAt(2000, countdown3)
incAt(3000, countdown3)
decAt(1500, countdown3)
decAt(2500, countdown3)
decAt(3500, countdown3)
decAt(4500, countdown3)

function logStatus () {
  var counts = countdown3.counts()
  if (counts.current === 0) {
    if (counts.decs !== 0) {
      return clearInterval(interval)
    }
  }

  console.log('completed ' + counts.decs + '/' + counts.incs)
}

function incAt (ms, countdown) {
  setTimeout(function () { countdown.inc() }, ms)
}

function decAt (ms, countdown) {
  setTimeout(function () { countdown.dec() }, ms)
}
