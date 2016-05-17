/** Class Middleware */
export default class Middleware {
  /**
   * Add function or array of functions to the execution stack.
   *
   * @param {array|function} fn - function or array of functions.
   *
   * @return this
   */
  use(fn) {
    if (fn instanceof Array) {
      fn.forEach(func => this.use(func));
      return this;
    }

    if (typeof fn !== 'function') {
      throw new TypeError();
    }

    // LIFO.
    this.run = (stack =>
      next =>
        stack(() =>
          fn.call(this.context || this, next.bind(this.context || this))
        )
    )(this.run);

    return this;
  }

  /**
   * Set context for MW's functions.
   *
   * @param {context} context.
   *
   * @return this.
   */
  setContext(context) {
    this.context = context;

    return this;
  }

  /**
   * Run stack of middlewares.
   *
   * @param {function} next - main function which will be executed at the end.
   *
   * @return function execution.
   */
  run(next) {
    return next();
  }
}
