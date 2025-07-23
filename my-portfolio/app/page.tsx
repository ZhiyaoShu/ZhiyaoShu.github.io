"use client";

import BackTop from "@/app/components/back-to-top";
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
import { Separator } from "@/app/components/ui/separator";
import { projects, newsItems } from "./homeList";
import { ArrowIcon } from "@/app/components/ui/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { resumeData } from "./research/resumeData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useToast } from "@/app/components/use-toast";

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
  const { toast } = useToast();
  const [publicationYearFilter, setPublicationYearFilter] = useState<
    string | null
  >(null);

  // Get unique years from publications
  const publicationYears = Array.from(
    new Set(resumeData.publication.map((pub) => pub.year.toString()))
  ).sort((a, b) => parseInt(b) - parseInt(a)); // Sort years in descending order

  // Filter publications by selected year
  const filteredPublications = publicationYearFilter
    ? resumeData.publication.filter(
        (pub) => pub.year.toString() === publicationYearFilter
      )
    : resumeData.publication;

  // Sort publications in reverse order (newest first)
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    // First sort by year (descending)
    if (b.year !== a.year) return b.year - a.year;
    // Then by month (descending) if years are the same
    return b.month - a.month;
  });

  const formatCitation = (pub: any, format: "APA" | "MLA" | "BibTeX") => {
    const authors = pub.authors.replace(/, /g, ", ").replace(/& /g, " & ");
    const firstAuthorLastName = pub.authors
      .split(",")[0]
      .trim()
      .split(" ")
      .pop();
    const titleKey = pub.title.split(" ").slice(0, 3).join("").toLowerCase();

    switch (format) {
      case "APA":
        return `${authors} (${pub.year}, ${pub.month}). ${pub.title}. ${
          pub.url ? pub.url : ""
        }`;
      case "MLA":
        return `${authors}. "${pub.title}." ${pub.year}. ${
          pub.url ? pub.url : ""
        }`;
      case "BibTeX":
        return `@article{${firstAuthorLastName}${pub.year}${titleKey},
                author = {${authors}},
                title = {${pub.title}},
                year = {${pub.year}},
                journal = {${pub.published}},
              }`;
      default:
        return "";
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      const { dismiss } = toast({
        title: "Citation copied",
        description: "The citation has been copied to your clipboard.",
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
    } catch (error) {
      const { dismiss } = toast({
        title: "Failed to copy",
        description: "An error occurred while copying the citation.",
        variant: "destructive",
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
    }
  };

  return (
    <div>
      <section>
        <div className="flex items-center gap-12 mb-8">
          <Avatar className="w-40 h-40 flex-shrink-0">
            <AvatarImage
              src="/data/images/avatar.jpg"
              alt="Profile"
              loading="lazy"
              width={160}
              height={160}
            />
            <AvatarFallback>ZS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold tracking-tighter mb-4">
              Hello, I am Zoey Shu
            </h1>

            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://scholar.google.com/citations?user=IpJSNlAAAAAJ&hl=en"
            >
              <ArrowIcon />
              <p className="ml-1 h-7">Google Scholar</p>
            </a>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/zhiyao-shu-4b4b0016b/"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">LinkedIn</p>
            </a>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="mailto:yaoshu0326@berkeley.edu"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">Email</p>
            </a>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/ZhiyaoShu"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">Github</p>
            </a>
          </div>
        </div>

        <div className="mb-12">
          <p className="mb-4">
            I am a first-year PhD student in Information Science and Technology
            at{" "}
            <a
              href="https://www.gmu.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              George Mason University
            </a>
            , advised by{" "}
            <a
              href="https://alignment.lab.gmu.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Sungsoo Ray Hong
            </a>{" "}
          </p>

          <p className="mb-2 mt-4">
            My research related to
            <strong> human-AI collaboration </strong> with a focus on: <br />
            - Interactive, scalable multi-robotic systems <br />- Video content
            analytics for collaborative sensemaking on open environments
            <br />
            <br />I am passionate about practical, end-to-end approaches to
            assist well-beings in both virtual and physical, dynamic
            environments.
          </p>

          <p className="mb-2 mt-4">
            Some other research topics I participated in: <br />
            - LLM-powered systems supporting interactive chain-of-thought
            reasoning of qualitative data analysis <br />
            - Visual place recognition in urban environments <br />-
            Psychological MBTI Personality analysis on social media based on
            multi-dimensional user data and profiles.
          </p>
        </div>
        {/* <br />I am actively looking for PhD or research engineer opportunities.
        Please reach out to me if you think my research aligns with your
        interests. */}
        <div className="my-8"></div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Recent News</h2>
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
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-semibold">Publications</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Filter by year:</span>
            <select
              className="text-sm border rounded p-1"
              value={publicationYearFilter || ""}
              onChange={(e) => setPublicationYearFilter(e.target.value || null)}
            >
              <option value="">All years</option>
              {publicationYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-6">
          {sortedPublications.map((pub) => (
            <Card key={pub.id} className="p-4">
              <h3 className="font-semibold mb-2">{pub.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {pub.authors} <br />
                {pub.published} • {pub.month}/{pub.year}
              </p>
              <div className="flex gap-2">
                {pub.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={pub.url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Cite
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        copyToClipboard(formatCitation(pub, "APA"))
                      }
                    >
                      APA
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        copyToClipboard(formatCitation(pub, "MLA"))
                      }
                    >
                      MLA
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        copyToClipboard(formatCitation(pub, "BibTeX"))
                      }
                    >
                      BibTeX
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
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
