"use client";

import { useState, useEffect } from "react";
import { resumeData } from "./resumeData";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ChevronDown, ChevronUp, School, Factory } from "lucide-react";
import { FileText } from "lucide-react";
import { ArrowIcon } from "@/app/components/ui/icons";

const Projects: React.FC = () => {
  useEffect(() => {
    if (resumeData.experience.length > 0) {
      setExpandedExperience(resumeData.experience[0].id);
    }
  }, []);

  const [expandedExperience, setExpandedExperience] = useState<number | null>(
    null
  );

  const toggleExperience = (id: number) => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  return (
    <div className="container mx-auto p-4 items-center justify-center">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">About Me</h1>
      {/* <p className="text-muted-foreground mb-4">
        My background in environmental and architectural design at UC Berkeley
        deeply shaped my understanding of complex, dynamic relationships between
        humans, systems, and environments. This experience also improved my
        techniques of developing informative graphics to tell stories. This
        foundation continues to shape my current research in machine learning,
        where I focus on sensemaking and simulating human cognitive reasoning
        processes to allow AI understand compositional, semantic narratives
        across modalities. 
      </p> */}
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="gap-2 pl-0 mb-4 hover:bg-white"
      >
        <a
          href="/data/Zoey_CV2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText className="h-5 w-5 text-primary" />
          View CV PDF
        </a>
      </Button>
      <Tabs defaultValue="experiences">
        <div className="flex flex-col gap-3 justify-start items-start mb-4">
          <TabsList className="flex flex-row">
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            {/* <TabsTrigger value="photography">Photography</TabsTrigger> */}
          </TabsList>
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
        <TabsContent value="photography">
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/zhiyao-shu-4b4b0016b/"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">Instagram</p>
          </a>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
