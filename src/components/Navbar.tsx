import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import logo from "../../src/assets/logo/logo192.png";

export const Navbar = () => {
    return (
    <NavigationMenu>
  <NavigationMenuList className="mt-5 md:gap-7">
    <NavigationMenuItem>
      <NavigationMenuLink className="hover:bg-transparent hover:text-inherit md:m-2">
        <img className="md:h-20 w-auto" src={logo} alt="Logo" />
        </NavigationMenuLink>
      </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className="text-[#dfdedf] hover:bg-transparent hover:text-none">projects</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className="text-[#dfdedf] hover:bg-transparent hover:text-none">about</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className="text-[#dfdedf] hover:bg-transparent hover:text-none">contact</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className="text-[#dfdedf] hover:bg-transparent hover:text-none">potpourri</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
    )
}