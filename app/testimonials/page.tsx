import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TestimonialsContent } from "@/components/sections/testimonials"

export const metadata = {
  title: "Testimonials | Elegance Couture",
  description: "Read what our clients say about their experience with Elegance Couture premium fashion services.",
}

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <TestimonialsContent />
      <Footer />
    </main>
  )
}
