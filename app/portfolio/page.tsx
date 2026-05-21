import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PortfolioContent } from "@/components/sections/portfolio"

export const metadata = {
  title: "Portfolio | Elegance Couture",
  description: "Browse our stunning portfolio of fashion collections, custom designs, and bridal wear.",
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PortfolioContent />
      <Footer />
    </main>
  )
}
