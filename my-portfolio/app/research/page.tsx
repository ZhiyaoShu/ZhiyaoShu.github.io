"use client";

import { useState, useEffect } from "react";
import { resumeData } from "./resumeData";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/card";
import { Button } from "@/app/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";
import { ChevronDown, ChevronUp, School, Factory } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import { useToast } from "@/app/components/use-toast";
import { Badge } from "@/app/components/badge";
import { FileText } from "lucide-react";

type Publication = {
  id: number;
  title: string;
  authors: string;
  year: number;
  month: number;
  url?: string;
  conference?: string;
  published?: string;
  abstract: string | JSX.Element;
};

const formatCitation = (pub: Publication, format: "APA" | "MLA" | "BibTeX") => {
  const authors = pub.authors.replace(/, /g, ", ").replace(/& /g, " & ");

  const firstAuthorLastName = pub.authors.split(",")[0].trim().split(" ").pop();

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

const Projects: React.FC = () => {
  useEffect(() => {
    if (resumeData.experience.length > 0) {
      setExpandedExperience(resumeData.experience[0].id);
    }
  }, []);

  const { toast } = useToast();
  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    null
  );
  const [expandedPublication, setExpandedPublication] = useState<number | null>(
    null
  );
  const [sortedPublications, setSortedPublications] = useState(
    resumeData.publication
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const toggleExperience = (id: number) => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  const togglePublication = (id: number) => {
    setExpandedPublication(expandedPublication === id ? null : id);
  };

  const sortPublications = (year: number | null) => {
    let filtered = year
      ? resumeData.publication.filter((pub) => pub.year === year)
      : resumeData.publication;

    setSortedPublications(filtered.sort((a, b) => b.id - a.id));
  };

  useEffect(() => {
    sortPublications(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (year: number | null) => {
    setSelectedYear(year);
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

  const years = Array.from(
    new Set(resumeData.publication.map((pub) => pub.year))
  ).sort((a, b) => b - a);

  return (
    <div className="container mx-auto p-4 items-center justify-center">
      <div className="flex items-center gap-8 mb-12">
        <Avatar className="w-40 h-40 flex-shrink-0">
          <AvatarImage src="/data/images/avatar.jpg" alt="Profile" />
          <AvatarFallback>CV</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="text-muted-foreground">
            My research goal is to develop an end-to-end AI-leveraged application for
            comprehending multimodal information within natural language
            instructions.
            <br />
            Approaches includes designing hierarchical structures to organize
            information, enabling inference through iterative interactions with
            users, and integrating advanced visual understanding.
            <br />
            I aim to enhance model alignment with human inference and
            comprehension capabilities through interacting with dynamic world(data).
          </p>
        </div>
      </div>
      <Tabs defaultValue="experiences">
        <div className="flex flex-col gap-3 justify-start items-start mb-4">
          <TabsList className="flex flex-row">
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <a
              href="/data/Zoey_Resume2024_v2.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="h-5 w-5 text-primary" />
              View Resume (PDF)
            </a>
          </Button>
        </div>
        <TabsContent value="experiences">
          {resumeData.experience.map((exp) => (
            <Card key={exp.id} className="mb-4">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {exp.institution ? (
                      <School className="h-5 w-5 text-primary" />
                    ) : (
                      <Factory className="h-5 w-5 text-primary" />
                    )}
                    {exp.title}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => toggleExperience(exp.id)}
                  >
                    {expandedExperience === exp.id ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>
                  {exp.institution || exp.company} | {exp.location} |{" "}
                  {exp.period}
                </CardDescription>
              </CardHeader>
              {expandedExperience === exp.id && (
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {exp.description.map((item, index) => (
                      <li
                        key={index}
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </TabsContent>

        {/* Publication */}
        <TabsContent value="publications">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge
              variant={selectedYear === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleYearChange(null)}
            >
              All Years
            </Badge>
            {years.map((year) => (
              <Badge
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleYearChange(year)}
              >
                {year}
              </Badge>
            ))}
          </div>
          {sortedPublications.map((pub) => (
            <Card key={pub.id} className="mb-4">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {pub.title}
                  <Button
                    variant="ghost"
                    onClick={() => togglePublication(pub.id)}
                  >
                    {expandedPublication === pub.id ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>{pub.authors}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  {pub.month} {pub.year}
                </p>
                <div className="flex gap-2 mb-2">
                  {pub.url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                {expandedPublication === pub.id && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Abstract</h4>
                    <p className="text-sm text-muted-foreground">
                      {pub.abstract}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
