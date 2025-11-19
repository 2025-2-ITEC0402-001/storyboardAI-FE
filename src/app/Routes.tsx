import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import AuthCallbackPage from "@/pages/AuthCallbackPage";
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ProjectListPage from "@/pages/ProjectListPage";

const routes = createRoutesFromElements(
    <Fragment>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/project" element={<ProjectListPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
    </Fragment>,
);

export const router = createBrowserRouter(routes);
