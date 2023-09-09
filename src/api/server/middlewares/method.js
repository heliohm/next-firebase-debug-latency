export function withMethodGuard(methodsArray) {
  return (req, res, next) => {
    if (!methodsArray.includes(req.method)) {
      res.setHeader("Allow", methodsArray);

      let status = 405;
      let cause = `Method ${req.method} Not Allowed`;

      let err = new Error(cause);
      err.status = status;
      err.cause = cause;
      throw err;
    }
    next();
  };
}
