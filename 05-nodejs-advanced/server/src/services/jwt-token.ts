import jwt from "jsonwebtoken";

import { getJwtSecret } from "../utils/env";

interface JwtObject {
  userId: string;
  email: string;
  role: string;
}

function signJwt(obj: JwtObject): string {
  return jwt.sign(obj, getJwtSecret(), {
    expiresIn: "7d",
  });
}

// Throws one of VerifyErrors on bad tokens
function verifyJwt(token: string): JwtObject {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
}

export { signJwt, verifyJwt };
