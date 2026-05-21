import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutContent } from "@/components/sections/about"

export const metadata = {
  title: "About Us | LaunchBrand Studio",
  description: "Learn about our story, mission, and the passionate team helping entrepreneurs launch successful clothing brands.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutContent />
      <Footer />
    </main>
  )
}
