import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTERS_PATHS } from "../constants/router-paths";

const DashboardPage = lazy(() => import("../pages/dashboard"));

interface IRoutesState {
    path: string;
    component: React.ComponentType;
}

export const RenderRoutes = () => {
    return (
        <Suspense fallback={"loading..."}>
            <Routes>
                {routes.map((route: IRoutesState, index: number) => {
                    const Component = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Component />
                            }
                        />
                    );
                })}
            </Routes>
        </Suspense>
    );
};

const routes: IRoutesState[] = [{ component: DashboardPage, path: ROUTERS_PATHS.DASHBOARD }];
