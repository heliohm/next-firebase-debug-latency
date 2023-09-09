import { Api } from "@/api/server/api";
import { withMethodGuard } from "@/api/server/middlewares/method";



function ping(req, res) {
  res.status(200).send("ping");
}

const SUPPORTED_METHODS = ["GET"];

export default function handler(req, res) {
  const api = new Api();

  api.use(withMethodGuard(SUPPORTED_METHODS));
  
  api.use(ping);
  api.handle(req, res);
}
