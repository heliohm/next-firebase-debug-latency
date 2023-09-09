import { Pipe } from "@/api/server/middleware";
import { withErrorResponse } from "@/api/server/middlewares/_errorResponse";
import { withConsoleErrorLogger } from "@/api/server/middlewares/error";

export class Api {
  #pipe;

  constructor() {
    this.#pipe = new Pipe();

    this.use = this.use.bind(this);
    this.handle = this.handle.bind(this);
  }
  use(fn, methods) {
    this.#pipe.add(fn, methods);
  }

  async handle(req, res) {
    req.locals = req.locals ?? {}; // Create default object for temporary storage
    this.use(withErrorResponse); // Respond to client for  errors thrown from API endpoints
    this.use(withConsoleErrorLogger);
    // TODO: Add logging of errors
    this.#pipe.handle(req, res);
  }
}
