import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Favorite Movies",
};

export default function MyFavMoviesPage() {
  return (
    <>
      <h1>My Favorite Movies</h1>
      <p>Here is a list of movies that have inspired me or that I simply enjoy.</p>
      <ul>
        <li>The Matrix (1999)</li>
        <li>Blade Runner 2049 (2017)</li>
        <li>Arrival (2016)</li>
        <li>Spirited Away (2001)</li>
      </ul>
    </>
  );
}