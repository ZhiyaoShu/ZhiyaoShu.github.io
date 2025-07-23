type Blog = {
  id: number;
  title: string;
  date: string;
  tags: string[];
  readTime: number;
  content: string;
}

const articles: Blog[] = [
  {
    id: 1,
    title: "Getting Started with React",
    date: "15/09/2023",
    tags: ["react", "javascript"],
    readTime: 5,
    content:
      "React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently.",
  },
  {
    id: 2,
    title: "CSS Grid Layout: A Comprehensive Guide",
    date: "10/07/2023",
    tags: ["css", "web-design"],
    readTime: 7,
    content:
      "CSS Grid Layout is a powerful tool for creating complex web layouts. This guide covers everything from basic concepts to advanced techniques for responsive design.",
  },
];

export default articles;
