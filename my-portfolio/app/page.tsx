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
import { ArrowIcon } from "@/app/components/icons";

// Define the Project type
type Project = {
  id: number;
  name: string;
  tags?: string[];
  image: string[];
  video?: string;
  url?: string;
  description?: string | JSX.Element;
  date: string;
  isdirect?: boolean;
  layout: "horizontal" | "vertical";
};

export default function Page() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

  const filteredProjects = selectedTag
    ? sortedProjects.filter((project) => project.tags?.includes(selectedTag))
    : sortedProjects;

  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  );

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part: string, index: number) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="black underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div>
      <section>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          Hello, I am Zoey Shu
        </h1>
        <p className="mb-4">
          A ML/Full-stack research engineer located at the Bay Area, CA.
          <br />
          With expertise in machine learning and natural language processing, I
          am passionate about advancing practical Human-LLM interactions,
          multimodal information undserstanding with natrual language
          processing.
          <br />
          Previous research includes large-scale social network data analysis,
          psychological analysis of online behavior, and few-shot learning for
          classification. Committed to developing innovative solutions and
          pushing the boundaries of cutting-edge technology.
        </p>
        <br />I am actively looking for PhD or research engineer opportunities. Please feel
        free to reach out to me if you think my research aligns with your
        interests.
        <div className="my-8"></div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">Recent News</h2>
        <div className="space-y-4">
          {newsItems
            .slice()
            .sort((a, b) => b.id - a.id)
            .map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row text-wrap"
              >
                <span className="text-sm text-gray-500 min-w-[100px] mb-1 sm:mb-0">
                  {item.date}
                </span>
                <Separator
                  className="hidden sm:block mx-4"
                  orientation="vertical"
                />
                <p className="text-sm">
                  <>{item.text}</>
                </p>
              </div>
            ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Projects</h2>
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
      </section>
      <BackTop visibilityHeight={400} />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 min-w-[200px] p-2">
          {project.video ? (
            <video
              src={project.video}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.image[0]}
              alt={project.name}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <CardContent className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-semibold mb-2">{project.name}</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {(project.tags ?? []).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 my-3">{project.date}</p>
          </div>

          {/* Conditional rendering for Learn More button */}
          {project.isdirect && project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="w-[28%] text-left gap-3 text-sm"
              >
                Learn More <ArrowIcon />
              </Button>
            </a>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-[28%] text-left">
                  Learn More
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div
                  className={`flex gap-4 ${
                    project.layout === "horizontal"
                      ? "w-[60%] flex-row"
                      : "flex-col"
                  }`}
                >
                  {Array.isArray(project.image) && project.image.length > 1 ? (
                    <img
                      src={project.image[1]}
                      alt={project.name}
                      className="h-auto object-contain mb-4"
                    />
                  ) : (
                    <img
                      src={project.image[0]}
                      alt={project.name}
                      className="h-auto object-contain mb-4"
                    />
                  )}
                  <div
                    className={` ${
                      project.layout === "horizontal"
                        ? "flex-col min-w-[20vh]"
                        : ""
                    }`}
                  >
                    <DialogHeader>
                      <DialogTitle>{project.name}</DialogTitle>
                    </DialogHeader>
                    {project.url && (
                      <p className="mt-4">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="black underline font-semibold flex items-center gap-2"
                        >
                          Visit Project
                          <ArrowIcon />
                        </a>
                      </p>
                    )}
                    <div className="flex flex-col justify-between">
                      <p className="mt-2">
                        {project.description || "No description available."}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
