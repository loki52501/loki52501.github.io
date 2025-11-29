// src/app/blogs/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts'; // '@/' is a shortcut for the src folder
import styles from '../../styles/Home.module.css';

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();
  return (
    <>
      <h1>Blog</h1>
      <ul className={styles.postList}>
        {allPostsData.map(({ slug, date, title }) => (
          <li key={slug}>
            <Link href={{pathname:`/blogs/${slug}`}}>{title}</Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </>
  );
}
