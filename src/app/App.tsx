import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { router } from "@/app/Routes";
import { queryClient } from "@/app/lib/query";
import { store } from "@/app/store/store";

import { GlobalPortal } from "@/shared/components/Portal";

import { QueryClientProvider } from "@tanstack/react-query";

export default function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <GlobalPortal.Provider>
                    <Toaster position="top-center" />
                    <RouterProvider router={router} />
                </GlobalPortal.Provider>
            </QueryClientProvider>
        </Provider>
    );
}
