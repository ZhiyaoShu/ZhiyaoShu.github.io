"use client"

import { useState, useEffect, useMemo } from 'react'
import { Button } from "@/app/components/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/select"
import { Badge } from "@/app/components/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/card";
import { LayoutGrid, List } from "lucide-react"

// Mock translation API
const translateToEnglish = async (text: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  // For demonstration, we'll just append "[Translated to English]" to non-English text
  return text.includes('是') ? `${text} [Translated to English]` : text
}

interface Article {
  id: number
  title: string
  date: string
  tags: string[]
  readTime: number
  content: string
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Getting Started with React",
    date: "15/09/2023",
    tags: ["react", "javascript"],
    readTime: 5,
    content: "React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently.",
  },
  {
    id: 2,
    title: "深入理解 TypeScript",
    date: "20/08/2023",
    tags: ["typescript", "javascript"],
    readTime: 8,
    content: "TypeScript 是 JavaScript 的超集，它添加了可选的静态类型和基于类的面向对象编程。TypeScript 可以帮助开发者编写更可靠、更易维护的代码。",
  },
  {
    id: 3,
    title: "CSS Grid Layout: A Comprehensive Guide",
    date: "10/07/2023",
    tags: ["css", "web-design"],
    readTime: 7,
    content: "CSS Grid Layout is a powerful tool for creating complex web layouts. This guide covers everything from basic concepts to advanced techniques for responsive design.",
  },
  {
    id: 4,
    title: "JavaScript 异步编程",
    date: "05/06/2023",
    tags: ["javascript", "async"],
    readTime: 6,
    content: "异步编程是 JavaScript 中的一个重要概念。本文探讨了回调函数、Promise 和 async/await 等异步编程技术，以及它们在现代 Web 开发中的应用。",
  }
]

export function BlogPageComponent() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const translateArticles = async () => {
      const translatedArticles = await Promise.all(
        mockArticles.map(async (article) => ({
          ...article,
          title: await translateToEnglish(article.title),
          content: await translateToEnglish(article.content),
        }))
      )
      setArticles(translatedArticles)
    }
    translateArticles()
  }, [])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    articles.forEach(article => article.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags)
  }, [articles])

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article => 
        selectedTags.some(tag => article.tags.includes(tag))
      )
    }
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'))
      const dateB = new Date(b.date.split('/').reverse().join('-'))
      return sortOrder === 'recent' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
    })
  }, [articles, selectedTags, sortOrder])

  const renderGridView = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredAndSortedArticles.map(article => (
        <Card key={article.id}>
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">{article.date}</p>
            <p className="mb-2">{article.content.substring(0, 100)}...</p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Read time: {article.readTime} minutes</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  const renderListView = () => (
    <div className="space-y-4">
      {filteredAndSortedArticles.map(article => (
        <div key={article.id} className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{article.date}</p>
          <p className="mb-2">{article.content.substring(0, 150)}...</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500">Read time: {article.readTime} minutes</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="flex flex-wrap justify-between mb-4 gap-4">
        <div className="flex items-center gap-4">
          <Select onValueChange={(value) => setSortOrder(value as 'recent' | 'oldest')}>
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
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mb-4">
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="mr-2 mb-2 cursor-pointer"
            onClick={() => setSelectedTags(prev => 
              prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
            )}
          >
            {tag}
          </Badge>
        ))}
      </div>
      {viewMode === 'grid' ? renderGridView() : renderListView()}
    </div>
  )
}