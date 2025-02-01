import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./styles.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const activePath = navigate.pathname;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePath]);

  /* styles for the tab buttons */

  const navLinkBaseClasses =
    "relative before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-[var(--white-color)] before:h-[2px] before:rounded-full cursor-pointer hover:text-[var(--white-color)] before:transition-all before:duration-500 pb-3 md:pb-1 py-2 md:py-1 md:p-1 mx-10 md:mx-0 block md:inline-block";
  const activeLinkClasses = "text-white before:w-full";
  const inactiveLinkClasses =
    "text-zinc-400 md:text-[var(--gray-color)] before:w-0 border-b border-white/20 md:border-0";

  /* END */

  return (
    <div className={styles.navbar}>
      <div className="select-none relative container mx-auto flex p-5 items-center justify-between">
        <div className={styles.logo}>
          <Link to="/">
            <h2 className="text-4xl md:text-5xl cursor-pointer">
              <span className="text-[#FF004F]">Task</span> Management.
            </h2>
          </Link>
        </div>
        <nav className="flex justify-center relative">
          <ul
            className={clsx(
              isExpanded ? "sm:w-80 w-full" : "w-0",
              "transition-all duration-500 md:w-auto md:h-auto fixed top-0 right-0 h-screen z-50 overflow-hidden backdrop-blur-md md:bg-gradient-to-t md:from-transparent md:to-transparent md:bg-transparent md:top-0 md:right-0 md:relative flex md:items-center flex-col md:flex-row md:gap-5 gap-4 pt-32 md:pt-0",
              styles.black_gradient
            )}
          >
            {["Home", "Login", "Add-Task", "Profile"].map((tab) => (
              <li key={tab}>
                <Link
                  className={clsx(
                    navLinkBaseClasses,
                    activePath ===
                      (tab === "Home" ? "/" : `/${tab.toLowerCase()}`)
                      ? activeLinkClasses
                      : inactiveLinkClasses
                  )}
                  to={tab === "Home" ? "/" : `/${tab.toLowerCase()}`}
                >
                  {tab}
                </Link>
              </li>
            ))}

            <svg
              stroke="currentColor"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="md:hidden cursor-pointer text-3xl absolute top-14 right-10 w-fit"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleClick}
            >
              <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
            </svg>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="md:hidden cursor-pointer text-2xl text-white"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
