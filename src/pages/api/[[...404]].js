import { Api } from "@/api/server/api";

function notFound(req, res) {
  let status = 404;
  let cause = "Route not found";

  let err = new Error(cause);
  err.status = status;
  err.cause = cause;
  throw err;
}

export default function handler(req, res) {
  const api = new Api();
  api.use(notFound);
  api.handle(req, res);
}
