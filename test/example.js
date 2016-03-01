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
