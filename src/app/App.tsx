import { RouterProvider } from "react-router-dom";

import { router } from "@/app/Routes";

export default function App() {
    return <RouterProvider router={router} />;
}
