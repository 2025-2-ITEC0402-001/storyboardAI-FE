import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    refresh: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,

            login: (accessToken: string, refreshToken: string) => {
                set(() => ({
                    isAuthenticated: true,
                    accessToken,
                    refreshToken,
                }));
            },

            logout: () => {
                set(() => ({
                    isAuthenticated: false,
                    accessToken: null,
                    refreshToken: null,
                }));
            },

            refresh: (accessToken: string, refreshToken: string) => {
                set(() => ({
                    accessToken,
                    refreshToken,
                }));
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
