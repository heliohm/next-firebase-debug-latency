import { Api } from "@/api/server/api";
import { withAuth } from "@/api/server/middlewares/auth";
import { withMethodGuard } from "@/api/server/middlewares/method";

function ping(req, res) {
  res.status(200).send("ping");
}

const SUPPORTED_METHODS = ["GET"];
const UID_LOCATION = "uid";


export default function handler(req, res) {
  const api = new Api();

  api.use(withMethodGuard(SUPPORTED_METHODS));
  api.use(withAuth(UID_LOCATION));


  api.use(ping);
  api.handle(req, res);
}
