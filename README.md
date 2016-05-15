
# Middleware in JavaScript [![Build Status](https://travis-ci.org/Zlobin/es-middleware.png?branch=master)](https://travis-ci.org/Zlobin/es-middleware)

## Synopsis

This library is an skeleton for creation of middlewares which perform some processing at the start and end of a "request". Middleware functions are functions that have access to the object itself.

## Examples

```js
var mw = new Middleware();
var fn1 = function(next) {
  this.foo = true;
  next();
};
var fn2 = function(next) {
  this.bar = true;
  next();
}
var fn3 = function(next) {
  var self = this;

  setTimeout(function(next) {
    self.bar = false;
    next();
  }, 50);
};
var startTime;

mw.use([fn1, fn2]))
ms.use(fn3);

startTime = Date.now();

mw.run(function() {
  console.log(this.foo); // true
  console.log(this.bar); // false
  console.log('time', Date.now() - startTime); // ~50
});
```
