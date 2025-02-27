"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { GiArtificialHive } from "react-icons/gi";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { MdSettingsApplications , MdOutlineSettingsApplications } from "react-icons/md";
import { TbMailFilled, TbMail } from "react-icons/tb";
import { HiUsers, HiOutlineUsers } from "react-icons/hi2";
import { BiSolidUser, BiUser } from "react-icons/bi";
import { PiNotepadFill, PiNotepad } from "react-icons/pi";

import { usePathname } from "next/navigation";

type Props = {};

interface SideNavItemType {
  icon?: {
    icon: React.ReactNode;
    fillIcon: React.ReactNode;
  };
  label: string;
  href: string;
}

export default function Sidebar({}: Props) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  // Memoized sidebar items
  const sidebarItems = useMemo<SideNavItemType[]>(
    () => [
      {
        icon: { icon: <GoHome />, fillIcon: <GoHomeFill /> },
        label: "Home",
        href: "/",
      },
      {
        icon: { icon: <CiSearch />, fillIcon: <FiSearch /> },
        label: "Explore",
        href: "/explore",
      },
      {
        icon: { icon: <MdOutlineSettingsApplications />, fillIcon: <MdSettingsApplications /> },
        label: "Applications",
        href: "/applications",
      },
      {
        icon: { icon: <TbMail />, fillIcon: <TbMailFilled /> },
        label: "Messages",
        href: "/messages",
      },
      {
        icon: { icon: <PiNotepad />, fillIcon: <PiNotepadFill /> },
        label: "Lists",
        href: "/lists",
      },
      {
        icon: { icon: <HiOutlineUsers />, fillIcon: <HiUsers /> },
        label: "Communities",
        href: "/communities",
      },
      {
        icon: { icon: <BiUser />, fillIcon: <BiSolidUser /> },
        label: "Profile",
        href: "/profile",
      },
    ],
    []
  );

  return (
    <div
      className={cn(
        "sticky top-0 h-screen overflow-y-auto border-r flex flex-col gap-3 pl-4 pt-4 transition-all duration-300 bg-white dark:bg-black",
        isSidebarOpen ? "w-[240px] md:pr-8 pr-3" : "w-[80px]"
      )}
    >
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-3">
        <GiArtificialHive className="text-5xl" />
        {isSidebarOpen && (
          <span className="text-2xl font-semibold">MindHive</span>
        )}
      </Link>

      {/* Sidebar Navigation */}
      <nav ref={animationParent} className="flex flex-col gap-3 mt-3">
        {sidebarItems.map((item, i) => (
          <SideNavItem
            key={i}
            icon={item.icon}
            href={item.href}
            isSidebarOpen={isSidebarOpen}
            label={item.label}
          />
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
        {isSidebarOpen && (
          <span className="text-gray-600 dark:text-gray-300">Collapse</span>
        )}
      </button>
    </div>
  );
}

function SideNavItem({
  href,
  isSidebarOpen,
  label,
  icon,
}: SideNavItemType & { isSidebarOpen: boolean }) {
  const pathname = usePathname();
  const isActivePage = useMemo(() => pathname === href, [pathname, href]);

  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-2 rounded-tl-lg hover:bg-gray-200 dark:hover:bg-zinc-900 transition-all"
    >
      {/* Sidebar Icon (Always Visible) */}
      <div className="text-3xl">
        {isActivePage ? icon?.fillIcon : icon?.icon}
      </div>

      {/* Label (Hidden when Sidebar is Collapsed) */}
      {isSidebarOpen && (
        <p className={cn("text-lg", isActivePage && "font-bold")}>{label}</p>
      )}
    </Link>
  );
}
