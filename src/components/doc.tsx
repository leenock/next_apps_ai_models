/**
 * @file Sidebar.tsx
 * @description A responsive sidebar component for a Next.js application, utilizing React Hooks and `react-icons`.
 */

"use client";

import { cn } from "@/lib/utils"; // Assuming "@/lib/utils" contains a utility function for conditional class names (like Tailwind CSS's `classnames`).
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react"; // For animating changes within the sidebar.

// Importing icons from react-icons. Each icon is imported from its specific icon set.
import { GiArtificialHive } from "react-icons/gi"; // Github Icons
import { RiArrowLeftDoubleFill } from "react-icons/ri"; // Remix Icons
import { GoHome, GoHomeFill } from "react-icons/go"; // Go Icons
import { FiSearch } from "react-icons/fi"; // Feather Icons
import { CiSearch } from "react-icons/ci"; // Circum Icons
import { BsFillBellFill, BsBell } from "react-icons/bs"; // Bootstrap Icons
import { TbMailFilled, TbMail } from "react-icons/tb"; // Tabler Icons
import { HiUsers, HiOutlineUsers } from "react-icons/hi2"; // Heroicons v2
import { BiSolidUser, BiUser } from "react-icons/bi"; // Boxicons
import { PiNotepadFill, PiNotepad } from "react-icons/pi"; // Phosphor Icons

import { usePathname } from "next/navigation"; // Next.js hook to get the current pathname.

type Props = {}; // Defining the props type for the Sidebar component (currently empty).

/**
 * @interface SideNavItemType
 * @description Defines the structure of a sidebar navigation item.
 * @property {object} icon - Contains the regular and filled versions of the icon.
 * @property {React.ReactNode} icon.icon - The regular icon.
 * @property {React.ReactNode} icon.fillIcon - The filled (active) icon.
 * @property {string} label - The label of the navigation item.
 * @property {string} href - The URL of the navigation item.
 */
interface SideNavItemType {
  icon?: {
    icon: React.ReactNode;
    fillIcon: React.ReactNode;
  };
  label: string;
  href: string;
}

/**
 * @function Sidebar
 * @description A responsive sidebar component that collapses and expands.
 * @param {Props} {} - No props are currently defined.
 * @returns {JSX.Element} - The rendered sidebar component.
 */
export default function Sidebar({}: Props) {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // State to manage the sidebar's open/collapsed state.
  const [animationParent] = useAutoAnimate<HTMLDivElement>(); // Hook for animating changes within the sidebar's nav element.

  /**
   * @constant sidebarItems
   * @description Memoized array of sidebar navigation items.
   * @type {SideNavItemType[]}
   */
  const sidebarItems = useMemo<SideNavItemType[]>(
    () => [
      { icon: { icon: <GoHome />, fillIcon: <GoHomeFill /> }, label: "Home", href: "/" },
      { icon: { icon: <CiSearch />, fillIcon: <FiSearch /> }, label: "Explore", href: "/explore" },
      { icon: { icon: <BsBell />, fillIcon: <BsFillBellFill /> }, label: "Notifications", href: "/notifications" },
      { icon: { icon: <TbMail />, fillIcon: <TbMailFilled /> }, label: "Messages", href: "/messages" },
      { icon: { icon: <PiNotepad />, fillIcon: <PiNotepadFill /> }, label: "Lists", href: "/lists" },
      { icon: { icon: <HiOutlineUsers />, fillIcon: <HiUsers /> }, label: "Communities", href: "/communities" },
      { icon: { icon: <BiUser />, fillIcon: <BiSolidUser /> }, label: "Profile", href: "/profile" },
    ],
    [] // Empty dependency array means this memoized value is only computed once.
  );

  return (
    <div
      className={cn(
        "min-h-screen max-h-screen overflow-y-auto border-r flex flex-col gap-3 pl-4 pt-4 transition-all duration-300",
        isSidebarOpen ? "w-[280px] md:pr-8 pr-3" : "w-[70px]"
      )}
    >
      {/* Logo (Aligned to Left) */}
      <Link href={"/"} className="flex items-center gap-3">
        <GiArtificialHive className="text-5xl" />
        {isSidebarOpen && <span className="text-2xl font-semibold">MindHive</span>}
      </Link>

      {/* Sidebar Navigation */}
      <nav ref={animationParent} className="flex flex-col gap-3 mt-3">
        {sidebarItems.map((item, i) => (
          <SideNavItem key={i} icon={item.icon} href={item.href} isSidebarOpen={isSidebarOpen} label={item.label} />
        ))}
      </nav>

      {/* Collapse Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="absolute bottom-6 left-4 flex items-center gap-2 bg-gray-200 dark:bg-zinc-800 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-zinc-700 transition"
      >
        <RiArrowLeftDoubleFill
          className={cn(
            "text-gray-600 dark:text-gray-300 text-2xl transition-transform duration-300",
            isSidebarOpen ? "rotate-0" : "rotate-180"
          )}
        />
        {isSidebarOpen && <span className="text-gray-600 dark:text-gray-300">Collapse</span>}
      </button>
    </div>
  );
}

/**
 * @function SideNavItem
 * @description A single navigation item within the sidebar.
 * @param {SideNavItemType & { isSidebarOpen: boolean }} props - Props for the SideNavItem component.
 * @returns {JSX.Element} - The rendered navigation item.
 */
function SideNavItem({ href, isSidebarOpen, label, icon }: SideNavItemType & { isSidebarOpen: boolean }) {
  const pathname = usePathname(); // Get the current pathname.
  const isActivePage = useMemo(() => pathname === href, [pathname, href]); // Memoize the active page check.

  return (
    <Link href={href} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-900 transition-all">
      {/* Sidebar Icon (Always Visible) */}
      <div className="text-3xl">{isActivePage ? icon?.fillIcon : icon?.icon}</div>

      {/* Label (Hidden when Sidebar is Collapsed) */}
      {isSidebarOpen && <p className={cn("text-lg", isActivePage && "font-bold")}>{label}</p>}
    </Link>
  );
}