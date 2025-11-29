// src/app/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import styles from '../styles/Home.module.css'; // Adjust path if needed

function getProjects() {
  const projectsDirectory = path.join(process.cwd(), 'projects');
  const filenames = fs.readdirSync(projectsDirectory);

  const projects = filenames.map((filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      ...data, // Spread the frontmatter data (title, github)
      content,
    };
  });

  return projects;
}

export default function HomePage() {
  const projects = getProjects();

  return (
    <>
      <header className={styles.header}>
        <h1>Lokesh L K S</h1>
        <p>Software Developer | Tech Enthusiast | Lifelong Learner</p>
      </header>

      <section>
        <h2>About Me</h2>
        <p>
          Welcome to my personal space on the web! I'm passionate about building
          beautiful and functional applications. I am on a long journey, that is indeed the reality. To design high performance systems , as securely and power efficiently, I want to engineer a world that is reliable and stable no matter what, this is my story.
        </p>
      </section>

      <section>
        <h2>Projects</h2>
        {projects.map((project: any) => (
          <div key={project.title} className={styles.project}>
            <h3>{project.title}</h3>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        ))}
      </section>
      
      {/* Add your other sections like Achievements and Interests here */}
    </>
  );
}
