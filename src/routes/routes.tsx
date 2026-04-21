import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTERS_PATHS } from "../constants/router-paths";

const OrderPage = lazy(() => import("../pages/order"));

interface IRoutesState {
    path: string;
    component: React.ComponentType;
}

export const RenderRoutes = () => {
    return (
        <Suspense fallback={"loading..."}>
            <Routes>
                <Route path="/" element={<Navigate to={ROUTERS_PATHS.ORDER} replace />} />
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

const routes: IRoutesState[] = [{ component: OrderPage, path: ROUTERS_PATHS.ORDER }];
