import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServicesContent } from "@/components/sections/services"

export const metadata = {
  title: "Services | LaunchBrand Studio",
  description: "Brand strategy, apparel manufacturing, Shopify development, and marketing services to launch your clothing brand.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServicesContent />
      <Footer />
    </main>
  )
}
