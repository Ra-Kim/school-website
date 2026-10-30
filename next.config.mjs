/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
        port: "",
        pathname: "**",
      },
      {
        // Schola API event/post images (Supabase storage bucket).
        protocol: "https",
        hostname: "wippqmptpqvjavedmrbq.supabase.co",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
