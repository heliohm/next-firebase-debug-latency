// Express.js like middleware handling
class Layer {
  #handle;
  methods;

  constructor(fn, methods = null) {
    this.#handle = fn;
    this.methods = methods;

    this.handle_request = this.handle_request.bind(this);
    this.handle_error = this.handle_error.bind(this);
  }

  async handle_request(req, res, next) {
    let fn = this.#handle;

    // Not a standard request handler
    if (fn.length > 3) {
      return next();
    }

    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  async handle_error(error, req, res, next) {
    let fn = this.#handle;

    if (fn.length !== 4) {
      // Not a standard error handler
      return next(error);
    }

    try {
      await fn(error, req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

export class Pipe {
  #stack = [];

  constructor() {
    this.handle = this.handle.bind(this);
    this.add = this.add.bind(this);
  }

  add(fn, methods) {
    this.#stack.push(new Layer(fn, methods));
  }
  async handle(req, res) {
    let idx = 0;
    let stack = this.#stack;

    next();

    async function next(err) {
      if (idx >= stack.length) {
        return;
      }

      let match = false;
      let layer;
      while (!match && idx < stack.length) {
        layer = stack[idx++];

        if (layer.methods === null || layer.methods.includes(req.method)) {
          match = true;
          break;
        }
      }

      if (!match) {
        return;
      }

      if (err) {
        layer.handle_error(err, req, res, next);
      } else {
        layer.handle_request(req, res, next);
      }
    }
  }
}
