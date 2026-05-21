import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactContent } from "@/components/sections/contact"

export const metadata = {
  title: "Contact Us | Elegance Couture",
  description: "Get in touch with Elegance Couture. Book a consultation, inquire about our services, or visit our atelier.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactContent />
      <Footer />
    </main>
  )
}
