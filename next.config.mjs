/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next.js to generate a static site in the "out" directory.
  output: 'export',

  // Optional: If you are deploying to a subdirectory (e.g., https://<user>.github.io/<repo-name>),
  // uncomment and set the basePath.
  // basePath: '/my-portfolio',

  // Optional: Disable image optimization if you use next/image, as it's not supported in static export.
  images: { unoptimized: true },
};

export default nextConfig;