import { auth } from "@/config/firebase/admin";

export function withAuth(UID_LOCATION) {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split("Bearer ")[1];
      const claim = await auth.verifyIdToken(token, true);
      req.locals[UID_LOCATION] = claim.uid;

      next();
    } catch (err) {
      err.status = 401;
      err.cause = "Invalid Bearer token";
      throw err;
    }
  };
}
