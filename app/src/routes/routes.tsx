import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import ControllerPage from "../pages/ControllerPage";

export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: ControllerPage,
});

export const rootTree = RootRoute.addChildren([HomeRoute]);
