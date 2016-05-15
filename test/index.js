import Middleware from '../src/middleware';
import expect from 'expect';

describe('Middleware', function() {
  const mw = new Middleware();
  const mw2 = new Middleware();
  const fn1 = function(next) {
    this.foo = true;
    next();
  };
  const fn2 = function(next) {
    this.bar = true;
    next();
  }
  const fn3 = function(next) {
    this.baz = true;
    next();
  };
  const fn4 = function(next) {
    setTimeout(() => {
      this.bar = false;
      next();
    }, 50);
  };
  let startTime;

  describe('1: basic functional with a single instance', () => {
    it('1.1: check params foo, bar, baz', done => {
      mw.use([fn1, fn2]);
      mw.use(fn3);
      mw.use(fn4);

      startTime = Date.now();

      mw.run(function() {
        expect(this.foo).toEqual(true);
        expect(this.bar).toEqual(false);
        expect(this.baz).toEqual(true);
        expect(Date.now() - startTime) // ~50ms
          .toBeGreaterThanOrEqualTo(50)
          .toBeLessThan(60);
        done();
      });
    });
  });

  describe('2: basic functional with multiple instances', () => {
    it('2.1: check params foo, bar, baz', done => {
      mw2.use([fn1, fn2]);

      mw2.run(function() {
        console.log('this', this);
        expect(this.foo).toEqual(true);
        expect(this.bar).toEqual(true);
        expect(this.baz).toNotExist();
        done();
      });
    });
  });
});
