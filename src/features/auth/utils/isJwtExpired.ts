import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
    type: "ACCESS" | "REFRESH";
}

export function isJwtExpired(token: string) {
    const decodedToken: JwtPayload = jwtDecode(token);
    return Date.now() >= decodedToken.exp * 1000;
}
