import {
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";

import App from "./App";
import { AboutPage as About } from "./pages/AboutPage";
import { ContactPage as Contact } from "./pages/ContactPage";
import { HomePage as Home } from "./pages/HomePage";
import { PotpourriPage as Potpourri } from "./pages/PotpourriPage";
import { ProjectPage as Project } from "./pages/ProjectPage";
import { ProjectsPage as Projects } from "./pages/ProjectsPage";

/* Root layout */
const rootRoute = createRootRoute({
	component: App,
});

/* Routes */
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

const projectRoute = createRoute({
	getParentRoute: () => projectsRoute,
	path: "/$project",
	component: Project,
});

/* Route tree */
const routeTree = rootRoute.addChildren([
	indexRoute,
	aboutRoute,
	contactRoute,
	potpourriRoute,
	projectsRoute.addChildren([projectRoute]),
]);

/* Router */
export const router = createRouter({
	routeTree,
});

/* Type registration (IMPORTANT for TS) */
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
