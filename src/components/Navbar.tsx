import { Link } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import logo from "../../src/assets/logo/logo192.png";

// have to use ! b/c the styling from shadcn overrides the tanstack component styles
export const Navbar = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList className="mt-5 md:gap-7 md:ml-4">
				<NavigationMenuItem>
					<Link
						to="/"
						className="hover:bg-transparent hover:text-inherit md:m-2"
					>
						<img className="md:h-20 w-auto" src={logo} alt="Logo" />
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link
						to="/projects"
						className="!text-[#dfdedf] !hover:bg-transparent !hover:text-inherit !md:m-2"
						activeProps={{
							className: "text-foreground underline",
						}}
					>
						projects
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link
						to="/about"
						className="!text-[#dfdedf] !hover:bg-transparent !hover:text-inherit !md:m-2"
						activeProps={{
							className: "text-foreground underline",
						}}
					>
						about
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link
						to="/contact"
						className="!text-[#dfdedf] !hover:bg-transparent !hover:text-inherit !md:m-2"
						activeProps={{
							className: "text-foreground underline",
						}}
					>
						contact
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link
						to="/potpourri"
						className="!text-[#dfdedf] !hover:bg-transparent !hover:text-inherit !md:m-2"
						activeProps={{
							className: "text-foreground underline",
						}}
					>
						potpourri
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
