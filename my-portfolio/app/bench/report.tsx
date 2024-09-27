'use client'

import React, { useState } from 'react'
import { Button } from "@/app/components/button"
import { Input } from "@/app/components/input";
import { Textarea } from "@/app/components/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/card";
import { Badge } from "@/app/components/badge";
import { ScrollArea } from "@/app/components/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import { toast } from "@/app/components/use-toast";
import { ClipboardCopy } from "lucide-react"

type Paper = {
  title: string
  authors: string[]
  abstract: string
  link: string
  citations: number
  year: number
  journal: string
}

export function Report() {
  const [keywords, setKeywords] = useState<string[]>(['machine learning', 'natural language processing'])
  const [summary, setSummary] = useState<string>("Recent research has focused on advances in transformer models and their applications in various domains.")
  const [newKeyword, setNewKeyword] = useState<string>('')
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setNewKeyword('')
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword))
  }

  const submitResearch = async () => {
    setLoading(true)
    // Simulate API call to LLM and arXiv
    await new Promise(resolve => setTimeout(resolve, 2000))
    const mockPapers: Paper[] = Array(10).fill(null).map((_, i) => ({
      title: `Advances in AI Research Paper ${i + 1}`,
      authors: ['Doe, John', 'Smith, Jane'],
      abstract: 'This paper presents groundbreaking research in artificial intelligence, focusing on novel approaches to machine learning and natural language processing.',
      link: `https://arxiv.org/abs/${1000 + i}`,
      citations: Math.floor(Math.random() * 100),
      year: 2023,
      journal: 'Journal of Artificial Intelligence Research'
    }))
    setPapers(mockPapers)
    setLoading(false)
  }

  const loadMore = async () => {
    setLoading(true)
    // Simulate loading more papers
    await new Promise(resolve => setTimeout(resolve, 1000))
    const morePapers: Paper[] = Array(5).fill(null).map((_, i) => ({
      title: `Additional AI Research Paper ${papers.length + i + 1}`,
      authors: ['Johnson, Alice', 'Williams, Bob'],
      abstract: 'This paper extends previous work in AI, presenting new findings and methodologies in the field of deep learning and computer vision.',
      link: `https://arxiv.org/abs/${2000 + i}`,
      citations: Math.floor(Math.random() * 50),
      year: 2023,
      journal: 'Computational Intelligence Review'
    }))
    setPapers([...papers, ...morePapers])
    setLoading(false)
  }

  const generateCitation = (paper: Paper, format: 'MLA' | 'APA' | 'BibTeX') => {
    switch (format) {
      case 'MLA':
        return `${paper.authors.join(', ')}. "${paper.title}." ${paper.journal}, ${paper.year}.`
      case 'APA':
        return `${paper.authors.join(', ')}. (${paper.year}). ${paper.title}. ${paper.journal}.`
      case 'BibTeX':
        return `@article{${paper.authors[0].split(',')[0].toLowerCase()}${paper.year},
  title={${paper.title}},
  author={${paper.authors.join(' and ')}},
  journal={${paper.journal}},
  year={${paper.year}}
}`
      default:
        return ''
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Citation copied",
        description: "The citation has been copied to your clipboard.",
      })
    }).catch(err => {
      console.error('Failed to copy text: ', err)
      toast({
        title: "Failed to copy",
        description: "There was an error copying the citation. Please try again.",
        variant: "destructive",
      })
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">AI Research Assistant</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Research Summary</CardTitle>
          <CardDescription>Edit your research keywords and summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {keywords.map(keyword => (
                <Badge key={keyword} variant="secondary" className="text-sm">
                  {keyword}
                  <button onClick={() => removeKeyword(keyword)} className="ml-2 text-red-500">×</button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Add new keyword"
                className="flex-grow"
              />
              <Button onClick={addKeyword}>Add</Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={submitResearch} disabled={loading}>
            {loading ? 'Processing...' : 'Submit Research'}
          </Button>
        </CardFooter>
      </Card>

      {papers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Papers</CardTitle>
            <CardDescription>Based on your research interests</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              {papers.map((paper, index) => (
                <div key={index} className="mb-6 pb-4 border-b last:border-b-0">
                  <h3 className="text-lg font-semibold mb-2">{paper.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Authors: {paper.authors.join(', ')}</p>
                  <p className="text-sm mb-2">{paper.abstract}</p>
                  <div className="flex justify-between items-center">
                    <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View on arXiv
                    </a>
                    <span className="text-sm text-gray-600">Citations: {paper.citations}</span>
                  </div>
                  <div className="mt-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ClipboardCopy className="mr-2 h-4 w-4" />
                          Cite
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => copyToClipboard(generateCitation(paper, 'MLA'))}>
                          Copy MLA
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => copyToClipboard(generateCitation(paper, 'APA'))}>
                          Copy APA
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => copyToClipboard(generateCitation(paper, 'BibTeX'))}>
                          Copy BibTeX
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button onClick={loadMore} disabled={loading}>
              {loading ? 'Loading...' : 'Load More Papers'}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}