import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PricingContent } from "@/components/sections/pricing"

export const metadata = {
  title: "Pricing | Elegance Couture",
  description: "Transparent pricing for our premium fashion services. Find the perfect package for your needs.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PricingContent />
      <Footer />
    </main>
  )
}
