import { Link } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import logo from "../../src/assets/logo/logo192.png";

const navItems = ["projects", "about", "contact", "potpourri"];

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
						<img className="h-20 w-auto" src={logo} alt="Logo" />
					</Link>
				</NavigationMenuItem>
				{navItems.map((navItem) => {
					return (
						<NavigationMenuItem key={navItem}>
							<Link
								to={`/${navItem}` as string}
								className="!text-[#dfdedf] !hover:bg-transparent !hover:text-inherit !m-1 !md:m-2"
								activeProps={{
									className: "text-foreground underline",
								}}
							>
								{navItem}
							</Link>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
