import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Article from "./Article";

const md = fs.readFileSync(
  path.join(process.cwd(), "app/blog/weekly-research-digest-agent/content.md"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Building a Weekly Research Digest Agent",
  description:
    "A couple hundred new arXiv papers land in my categories every week, and maybe a dozen are worth my time. So I built an agent to find them — scoring each paper against my actual research and posting the 20 best to my Discord every Monday. Serverless, and free.",
};

export default function Page() {
  return (
    <Article
      markdown={md}
      date="Jun 2026"
      readTime="12 min"
      tags={["llm", "agents", "arxiv", "github-actions", "discord", "automation"]}
    />
  );
}
