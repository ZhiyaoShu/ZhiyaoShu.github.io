"use client";

import BackTop from "@/app/components/back-to-top";
import { useState } from "react";
import { Card, CardContent } from "@/app/components/card";
import { Badge } from "@/app/components/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/dialog";
import { Button } from "@/app/components/button";
import { Separator } from "@/app/components/separator";
import { projects, newsItems } from "./homeList";

// Define the Project type
type Project = {
  id: number;
  name: string;
  tags: string[];
  image: string;
  video?: string;
  description: string;
  date: string;
};

// Define the News type
type NewsItem = {
  id: number;
  date: string;
  text: string;
};

export default function Page() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projects
        .filter((project) => project.tags.includes(selectedTag))
        .map((project) => ({
          ...project,
          description: project.description ?? "No description available",
        }))
    : projects.map((project) => ({
        ...project,
        description: project.description ?? "No description available",
      }));


  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  );

  return (
    <div>
      <section>
        <h1 className="mb-8 text-3xl font-semibold tracking-tighter">
          Hi, I am Zoey
        </h1>
        <p className="mb-4">A ML/Full-stack research engineer at the Bay Area, CA.</p>
        <div className="my-8"></div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Recent News</h2>
        <div className="space-y-4">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row text-wrap ">
              <span className="text-sm text-gray-500 min-w-[100px] mb-1 sm:mb-0">
                {item.date}
              </span>
              <Separator
                className="hidden sm:block mx-4"
                orientation="vertical"
              />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">My Projects</h2>
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
      </section>
      <BackTop visibilityHeight={400} />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 min-w-[200px]">
          {project.video ? (
            <video
              src={project.video}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <CardContent className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-4">{project.date}</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Learn More</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{project.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <p>{project.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Date: {project.date}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </div>
    </Card>
  );
}