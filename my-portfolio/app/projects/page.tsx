"use client";

import { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { ArrowIcon } from "@/app/components/ui/icons";
import projects from "./projects_list";
https://mind-coder-frontend.vercel.app/
export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

  const filteredProjects = selectedTag
    ? sortedProjects.filter((project) => project.tags?.includes(selectedTag))
    : sortedProjects;

  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  );

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Projects</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div className="space-y-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={{
              ...project,
              layout: project.layout as "horizontal" | "vertical",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  // ... existing ProjectCard code ...
}
