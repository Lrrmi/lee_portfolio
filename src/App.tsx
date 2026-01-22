import { Outlet } from "@tanstack/react-router";

import { Navbar } from "./components/Navbar";

function App() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="w-5/6 mx-auto">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
