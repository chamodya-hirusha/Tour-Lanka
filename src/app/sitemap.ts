import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with your actual domain when deploying
  const baseUrl = 'https://tour-lanka.vercel.app' 
  const paths = ["", "/destinations", "/packages", "/gallery", "/about", "/contact"];
  
  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === "" ? 1 : 0.8,
  }))
}
