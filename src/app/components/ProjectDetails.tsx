'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ProjectDetailsProps {
  mdFilePath: string;
}

export default function ProjectDetails({ mdFilePath }: ProjectDetailsProps) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(mdFilePath)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch markdown file');
        }
        return res.text();
      })
      .then(setMarkdown)
      .catch(() => setMarkdown(`Failed to load project details from \`${mdFilePath}\`. Please ensure the file exists in the \`public\` directory.`));
  }, [mdFilePath]);

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>;
}

