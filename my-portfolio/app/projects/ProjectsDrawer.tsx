import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function ProjectsDrawer() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1">
          Projects
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col gap-2 mt-2">
          <Link
            href="https://mindcoder.ai/"
            target="_blank"
            className="text-sm hover:underline flex items-center gap-2"
          >
            MindCoder
          </Link>
          {/* <Link
            href="/projects/bench"
            className="text-sm hover:underline flex items-center gap-2"
          >
            Bench
          </Link> */}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
