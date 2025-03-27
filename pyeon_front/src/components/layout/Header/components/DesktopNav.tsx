import { Link } from "react-router-dom";
import { navigationItems } from "./NavigationItems";

export const DesktopNav = () => {
  return (
    <nav className="hidden md:flex space-x-6">
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
