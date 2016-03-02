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

why?
================================================================================

I often find myself writing code where I call a number of async functions, and
need to wait for them all to be done before "returning".  So my code looks
something like this:

```js
var counter = 0
...
while (someCondition) {
  counter++
  asyncCall(function () {
    counter--
    if (counter === 0) doReturnThing()
  })
}
```

That's a bit icky.  Now I can write it like this:

```js
var counter = countdowner(function () { doReturnThing() })
...
while (someCondition) {
  counter.inc()
  asyncCall(function () {
    counter.dec()
  })
}
```

The best part about this is moving the "return" logic outside of the callback
function itself, because ... it's often the wrong place.  Also, there may
actually be multiple places I need to do the `(counter === 0)` check and
run the return logic, now it's in a single place.

You can also look at the various counter stats, if you want to provide some
sort of "progress" indication.


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


`countdowner([initial,] callback)`
--------------------------------------------------------------------------------

Returns a new countdowner object, with the specified initial count. The default
initial count is 0.  When the count hits 0 on a `dec()` call, the `callback`
will be run.  At this point, any further calls to the `dec()` and `inc()`
methods will throw errors.

The `callback` function will be invoked asynchronously, so any code running
after the final `dec()` call will continue to run, before the `callback`
is invoked.


`coundowner::inc()`
--------------------------------------------------------------------------------

This method increases the current count.

Throws an error if the countdowner callback has already run.


`coundowner::dec()`
--------------------------------------------------------------------------------

This method decreases the current count.  

If the count hits 0, the countdowner callback will be run.

Throws an error if the countdowner callback has already run.


`coundowner::counts()`
--------------------------------------------------------------------------------

Returns an object describing how the countdowner has been acted upon.  It
has the following properties:

* `initial` - the initial countdowner count
* `current` - the current countdowner count
* `max` - the maximum countdowner count
* `incs` - how many times `inc()` has been called
* `decs` - how many times `dec()` has been called
