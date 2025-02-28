import { PiBriefcase, PiUsers, PiChatsCircle } from "react-icons/pi";

export interface NavigationItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export const navigationItems: NavigationItem[] = [
  {
    path: "/hire",
    label: "구인",
    icon: <PiBriefcase className="text-2xl" />,
  },
  {
    path: "/recruit",
    label: "구직",
    icon: <PiUsers className="text-2xl" />,
  },
  {
    path: "/community",
    label: "커뮤니티",
    icon: <PiChatsCircle className="text-2xl" />,
  },
];
