export function withConsoleErrorLogger(err, req, res, next) {
  console.error(err);
  next(err);
}
