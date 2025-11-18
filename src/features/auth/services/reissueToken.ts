import axios from "axios";

import { ReissueFailedError } from "@/features/auth/error/AuthError";

import { API_BASE_URL } from "@/shared/lib/api";

export type ReissueTokenRequest = {
    refreshToken: string;
    deviceType: string;
};

export type ReissueTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

export async function reissueToken(request: ReissueTokenRequest) {
    try {
        const { data: response } = await axios.post<ReissueTokenResponse>(
            API_BASE_URL + "/api/auth/refresh",
            request,
        );
        return {
            newAccessToken: response.accessToken,
            newRefreshToken: response.refreshToken,
        };
    } catch {
        throw new ReissueFailedError("토큰 재발급에 실패했습니다.");
    }
}
