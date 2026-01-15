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
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink className="hover:bg-transparent hover:text-inherit">
        <img className="h-20 m-5" src={logo} alt="Logo" />
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