import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
  Hero,
  Stats,
  Intro,
  HomeServices,
  Process,
  HomePortfolio,
  HomeTestimonials,
  Faq,
  HomeCta,
} from "@/components/sections/home"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Intro />
      <HomeServices />
      <Process />
      <HomePortfolio />
      <HomeTestimonials />
      <Faq />
      <HomeCta />
      <Footer />
    </main>
  )
}
