import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

type DocProps = {
  content: MDXRemoteSerializeResult;
};

const Doc: React.FC<DocProps> = ({ content }) => {
  return (
    <article className="prose max-w-2xl">
      <MDXRemote {...content} />
    </article>
  );
};

export default Doc;
