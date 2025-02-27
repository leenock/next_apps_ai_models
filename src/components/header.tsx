"use client";

import { useState } from "react";
import Link from "next/link";
import { GiArtificialHive } from "react-icons/gi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <GiArtificialHive size={40} className="text-black-600" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MindHive
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <button className="text-white bg-black hover:bg-violet-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Login
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-transform duration-300"
            aria-label="Toggle navigation"
          >
            <div
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              {isOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setIsOpen(false);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setIsOpen(false);
                }}
              >
                About
              </Link>
            </li>
            {/* Services Dropdown */}
            <li className="relative md:group">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent menu closing when clicking on the dropdown button
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className="flex items-center py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Services
                <svg
                  className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {/* Dropdown for Mobile & Desktop */}
              <div
                className={`absolute left-0 mt-2 w-48 bg-white border-2 border-gray-300 rounded-lg shadow-2xl 
  dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 
  ${
    isDropdownOpen
      ? "opacity-100 visible translate-y-0 scale-100"
      : "opacity-0 invisible -translate-y-2 scale-95"
  } 
  md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:scale-100`}
                style={{
                  borderImage:
                    "linear-gradient(135deg, #ffffff 0%, #dddddd 50%, #ffffff 100%) 1",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2)",
                }}
              >
                <ul className="py-2">
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Web Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      SEO Optimization
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Digital Marketing
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setIsOpen(false);
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
