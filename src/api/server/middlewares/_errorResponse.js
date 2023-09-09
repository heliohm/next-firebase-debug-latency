import { errorApiSchema } from "@/api/schema/zod";

export function withErrorResponse(err, req, res, next) {
  try {
    let { status, cause } = err;
    let response = errorApiSchema.parse({ status, cause });
    res.status(response.status).json(response);
  } catch (err) {
    // Handle errors in server that is not providing unified status code and cause to client (catch SW bugs)
    let status = 500;
    let cause = "Internal error - Bad content in response error handling";
    let response = errorApiSchema.parse({ status, cause });
    res.status(response.status).json(response);
    err.status = status;
    err.cause = cause;
    throw err;
  }
  next(err);
}
