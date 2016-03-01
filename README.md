countdowner - countdown object which fires when countdown hits 0
================================================================================

Create a countdown object with a callback which fires when the countdown
hits 0.

The countdown object can be created with an initial count, and you
can increase/decrease the count programmatically.  When the counter finally
hits zero, the callback fires.


example
================================================================================

```js
var countdowner = require('countdowner')

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
```

install
================================================================================

    npm install countdowner
    npm install pmuellr/countdowner
    npm install pmuellr/countdowner#v0.1.0
    ...


API
================================================================================

This package exports a function referred to below as `countdowner()`, as if you
had:

```js
var countdowner = require('countdowner')
```

**countdowner([initial,] callback)**

Returns a new countdowner object, with the initial count set as specified.
The default initial count is 0.  When the count hits 0 on a `countdowner.dec()`
call, the `callback` will be run.  At this point, any further calls to the
`dec()` and `inc()` methods will throw errors.

**coundowner::inc()**

This method increases the current count.

**coundowner::dec()**

This method decreases the current count.  If the count hits 0, the `callback`
specified when creating the `countdowner` object will be run, and any further
`inc()` or `dec()` method invocations will throw errors.
