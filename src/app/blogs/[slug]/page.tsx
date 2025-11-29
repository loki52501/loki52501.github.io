// src/app/blogs/[slug]/page.tsx
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import styles from '../../../styles/Home.module.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// This tells Next.js to generate static pages for all slugs from generateStaticParams
// and to allow other slugs to be generated on-demand. This can fix issues where
// params are not passed correctly during development.
export const dynamicParams = true;

// This function generates all the possible blog post pages at build time
export function generateStaticParams() {
  // This function must return an array of objects with the slug property
  // We assume getAllPostSlugs works, as confirmed. If it fails, an error during build is appropriate.
  const paths = getAllPostSlugs();
  return paths.map(path => ({ slug: path.params.slug }));
}

// This function generates the metadata for the page
export async function generateMetadata({ params }: { params:Promise<{ slug: string }> }) {
  try {
    // Next.js automatically provides the params object.
    const slugs=await params;
    const postData = await getPostData( slugs.slug);
    return {
      title: postData.title,
    };
  } catch (error) {
    // If post is not found, return a default title.
    // The page component will handle rendering the 404 page.
    return { title: "Post Not Found" };
  }
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  // Fetch post data directly. If getPostData throws an error (e.g., file not found),
  // the .catch block will trigger the 404 page.
  // Add a guard clause to handle cases where params are not passed correctly.
  const slugs=await params;
  if (!slugs) {
    notFound();
  }

  const postData = await getPostData(slugs.slug).catch(() => null);

  // If postData is null (because the file wasn't found), show a 404 page.
  if (!postData) {
    notFound();
  }

  return (
    <article>
      <h1 className={styles.postTitle}>{postData.title}</h1>
      <div className={styles.postDate}>{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
