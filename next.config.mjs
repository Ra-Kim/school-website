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
  async redirects() {
    return [
      {
        // Branded portal link. Needs portal.ssis.com.ng added as a domain on
        // this Vercel project; the portal itself lives on Schola.
        source: "/:path*",
        has: [{ type: "host", value: "portal.ssis.com.ng" }],
        destination: "https://sharonstars.schola.ng/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
