import toast from "react-hot-toast";

import axios from "axios";

import { reissueToken } from "@/features/auth/services/reissueToken";
import { useAuthStore } from "@/features/auth/store/authStore";
import { isJwtExpired } from "@/features/auth/utils/isJwtExpired";

import { DEVICE_TYPE } from "@/shared/constants/deviceType";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
    const { accessToken, refreshToken, refresh, logout } = useAuthStore.getState();

    if (!accessToken || !refreshToken) return config;

    if (isJwtExpired(accessToken)) {
        try {
            const { newAccessToken, newRefreshToken } = await reissueToken({
                refreshToken,
                deviceType: DEVICE_TYPE.COMPUTER,
            });
            refresh(newAccessToken, newRefreshToken);
            config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        } catch {
            logout();
            window.location.href = "/auth";
            toast.error("세션이 만료되어 로그아웃되었습니다.");
        }
    } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
});
