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

type Project = {
  id: string;
  title: string;
  description: string;
  image: React.ReactNode;
  tags: string[];
  link: string;
  layout?: "horizontal" | "vertical";
};

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const sortedProjects = [...projects].reverse();

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
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <h3 className="text-md font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        {project.link && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project <ArrowIcon />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
