// src/app/blogs/[slug]/page.tsx
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import styles from '../../../styles/Home.module.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Params = { slug: string } | Promise<{ slug: string }>;

const resolveParams = async (params: Params) => Promise.resolve(params);

export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({ slug: path.params.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const resolvedParams = await resolveParams(params);
    const postData = getPostData(resolvedParams.slug);
    return { title: postData.title };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function Post({ params }: { params: Params }) {
  let resolvedParams: { slug: string };
  try {
    resolvedParams = await resolveParams(params);
  } catch {
    notFound();
    return null;
  }

  if (!resolvedParams?.slug) {
    notFound();
  }

  let postData;
  try {
    postData = getPostData(resolvedParams.slug);
  } catch {
    notFound();
  }

  if (!postData) {
    notFound();
  }

  return (
    <article>
      <h1 className={styles.postTitle}>{postData.title}</h1>
      <div className={styles.postDate}>{postData.date}</div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{postData.content}</ReactMarkdown>
    </article>
  );
}
