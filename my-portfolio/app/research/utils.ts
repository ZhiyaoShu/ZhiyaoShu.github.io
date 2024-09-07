import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type MdxContent = {
  slug: string;
  content: MDXRemoteSerializeResult;
};

export async function getMdxContents(): Promise<MdxContent[]> {
  const dir = path.join(process.cwd(), 'app', 'research');
  const mdxFiles = fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');

  const contents = await Promise.all(
    mdxFiles.map(async (file) => {
      const rawContent = fs.readFileSync(path.join(dir, file), 'utf-8');
      const mdxSource = await serialize(rawContent);
      const slug = path.basename(file, path.extname(file));
      return { slug, content: mdxSource };
    })
  );

  return contents;
}
