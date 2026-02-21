import {
	createRootRoute,
	createRoute,
	createRouter,
	createHashHistory
} from "@tanstack/react-router";

import App from "./App";
import { AboutPage as About } from "./pages/AboutPage";
import { ContactPage as Contact } from "./pages/ContactPage";
import { HomePage as Home } from "./pages/HomePage";
import { PotpourriPage as Potpourri } from "./pages/PotpourriPage";
import { ProjectPage as Project } from "./pages/ProjectPage";
import { ProjectsPage as Projects } from "./pages/ProjectsPage";

const rootRoute = createRootRoute({
	component: App,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Home,
});

const aboutRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/about",
	component: About,
});

const contactRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/contact",
	component: Contact,
});

const potpourriRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/potpourri",
	component: Potpourri,
});

const projectsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/projects",
	component: Projects,
});

export const projectRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/projects/$project",
	component: Project,
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	aboutRoute,
	contactRoute,
	potpourriRoute,
	projectsRoute,
	projectRoute,
]);

export const router = createRouter({
	routeTree,
	history: createHashHistory(),
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
