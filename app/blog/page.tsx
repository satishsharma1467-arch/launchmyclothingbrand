import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BlogContent } from "@/components/sections/blog"

export const metadata = {
  title: "Blog | Elegance Couture",
  description: "Stay updated with the latest fashion trends, style tips, and behind-the-scenes insights from Elegance Couture.",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <BlogContent />
      <Footer />
    </main>
  )
}
