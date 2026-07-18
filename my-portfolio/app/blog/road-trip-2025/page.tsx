import type { Metadata } from "next";
import Trip from "./Trip";

export const metadata: Metadata = {
  title: "Ten Days Across the Country",
  description:
    "A summer 2025 road trip from Seattle to Fairfax: wild horses over the Columbia, Devils Tower, the Badlands, a modernist pilgrimage in Columbus, Indiana, and Fallingwater on the way home. With a clickable route map.",
};

export default function Page() {
  return <Trip />;
}
