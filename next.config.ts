/** @type {import('next').NextConfig} */
const nextConfig = {
  // Kita hapus output: 'export' agar API tetap hidup
  images: {
    unoptimized: true,
  },
}

export default nextConfig
