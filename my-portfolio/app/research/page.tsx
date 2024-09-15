"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "../components/icons";
// import Bibliography from './bibliography';
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
import {
  ChevronDown,
  ChevronUp,
  SortAsc,
  SortDesc,
  FileText,
  School,
  Factory,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import { toast } from "@/app/components/use-toast";

type Publication = {
  id: number;
  title: string;
  authors: string;
  year: number;
  month: string;
  pdf?: string;
  url?: string;
  abstract: string;
};

const formatCitation = (pub: Publication, format: "APA" | "MLA" | "BibTeX") => {
  const authors = pub.authors.replace(/, /g, ", ").replace(/& /g, " & ");
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
      return `@article{${pub.id},
  author = {${authors}},
  title = {${pub.title}},
  year = {${pub.year}},
  month = {${pub.month}},
  url = {${pub.url ? pub.url : ""}},
}`;
    default:
      return "";
  }
};

const Projects: React.FC = () => {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    null
  );
  const [expandedPublication, setExpandedPublication] = useState<number | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
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

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const sortPublications = () => {
    if (selectedYear !== null) {
      setSortedPublications(
        [...resumeData.publication]
          .filter((pub) => pub.year === selectedYear)
          .sort((a, b) => {
            const monthOrder: { [key: string]: number } = {
              January: 1,
              February: 2,
              March: 3,
              April: 4,
              May: 5,
              June: 6,
              July: 7,
              August: 8,
              September: 9,
              October: 10,
              November: 11,
              December: 12,
            };
            return (
              monthOrder[b.month as keyof typeof monthOrder] -
              monthOrder[a.month as keyof typeof monthOrder]
            );
          })
      );
    } else {
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newOrder);
      setSortedPublications(
        [...resumeData.publication].sort((a, b) =>
          newOrder === "asc" ? a.year - b.year : b.year - a.year
        )
      );
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Citation copied",
          description: "The citation has been copied to your clipboard.",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "An error occurred while copying the citation.",
          variant: "destructive",
        });
      });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="container mx-auto p-4 items-center justify-center">
      <div className="flex items-center gap-8 mb-12">
        <Avatar className="w-40 h-40 flex-shrink-0">
          <AvatarImage
            src="/placeholder.svg?height=96&width=96"
            alt="Profile"
          />
          <AvatarFallback>CV</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="text-muted-foreground">
            Experienced researcher and data scientist with a focus on machine
            learning and natural language processing. Passionate about
            leveraging AI to solve complex problems and drive innovation in
            various fields.
          </p>
        </div>
      </div>
      <Tabs defaultValue="experiences">
        <TabsList className="mb-4">
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
        </TabsList>
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
        <TabsContent value="publications">
          <Button onClick={sortPublications} className="mb-4">
            Sort by Year{" "}
            {sortOrder === "asc" ? (
              <SortAsc className="ml-2" />
            ) : (
              <SortDesc className="ml-2" />
            )}
          </Button>
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
                {/* Convert month number to month name */}
                <p className="mb-2">
                  {pub.month ? monthNames[pub.month - 1] : "Unknown month"}{" "}
                  {pub.year}
                </p>
                <div className="flex gap-2 mb-2">
                  {pub.pdf && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`/pdfs/${pub.pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        PDF
                      </a>
                    </Button>
                  )}
                  {pub.url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Online
                      </a>
                    </Button>
                  )}
                </div>
                {expandedPublication === pub.id && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Abstract</h4>
                    <p className="text-sm text-muted-foreground">
                      {pub.abstract || "No abstract available"}
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
