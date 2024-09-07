import Link from "next/link";
import { ArrowIcon } from "../components/icons";

const navItems = {
  "/": {
    name: "work",
  },
  "/research": {
    name: "cv",
  },
  "/contact": {
    name: "contact",
  },
  "/mindcoder": {
    name: "MindCoder",
  },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-4 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              if (path === "/mindcoder") {
                return (
                  <a
                    key={path}
                    href="https://mindcoder.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                  >
                    <span className="flex items-center">
                      {name}
                      <span className="ml-2">
                        <ArrowIcon />
                      </span>
                    </span>
                  </a>
                );
              }
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}