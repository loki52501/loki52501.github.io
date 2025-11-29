// src/app/components/Navbar.tsx
"use client"; // This is important!

import Link from 'next/link';
import styles from '../../styles/Home.module.css'; // Adjust path if needed

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="/myfavmovies">My Fav Movies</Link>
    </nav>
  );
};

export default Navbar;
