"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { LayoutGrid, List } from "lucide-react";
import blogs from "./blogs_list";

// Mock translation API
const translateToEnglish = async (text: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // For demonstration, we'll just append "[Translated to English]" to non-English text
  return text.includes("Yes") ? `${text} [Translated to English]` : text;
};

interface Article {
  id: number;
  title: string;
  date: string;
  tags: string[];
  readTime: number;
  content: string;
}

const mockArticles: Article[] = [
  
];

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const translateArticles = async () => {
      const translatedArticles = await Promise.all(
        blogs.map(async (article) => ({
          ...article,
          title: await translateToEnglish(article.title),
          content: await translateToEnglish(article.content),
        }))
      );
      setArticles(translatedArticles);
    };
    translateArticles();
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach((article) => article.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, [articles]);

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles;
    if (selectedTags.length > 0) {
      filtered = filtered.filter((article) =>
        selectedTags.some((tag) => article.tags.includes(tag))
      );
    }
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return sortOrder === "recent"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  }, [articles, selectedTags, sortOrder]);

  const renderGridView = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredAndSortedArticles.map((article) => (
        <Card key={article.id}>
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">{article.date}</p>
            <p className="mb-2">{article.content.substring(0, 100)}...</p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              Read time: {article.readTime} minutes
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredAndSortedArticles.map((article) => (
        <div key={article.id} className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{article.date}</p>
          <p className="mb-2">{article.content.substring(0, 150)}...</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Read time: {article.readTime} minutes
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="flex flex-wrap justify-between mb-4 gap-4">
        <div className="flex items-center gap-4">
          <Select
            onValueChange={(value) =>
              setSortOrder(value as "recent" | "oldest")
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mb-4">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="mr-2 mb-2 cursor-pointer"
            onClick={() =>
              setSelectedTags((prev) =>
                prev.includes(tag)
                  ? prev.filter((t) => t !== tag)
                  : [...prev, tag]
              )
            }
          >
            {tag}
          </Badge>
        ))}
      </div>
      {viewMode === "grid" ? renderGridView() : renderListView()}
    </div>
  );
}
