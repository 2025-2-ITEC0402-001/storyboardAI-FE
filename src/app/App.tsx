import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

import { router } from "@/app/Routes";

import { GlobalPortal } from "@/shared/components/Portal";

export default function App() {
    return (
        <GlobalPortal.Provider>
            <Toaster position="top-center" />
            <RouterProvider router={router} />
        </GlobalPortal.Provider>
    );
}
