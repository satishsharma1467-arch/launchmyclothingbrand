"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowUpRight, X } from "lucide-react"
import { FadeIn } from "@/components/shared/animations"
import styles from "./PortfolioContent.module.css"

const categories = ["All", "Full Launch", "E-commerce", "Branding", "Marketing"]

const portfolioItems = [
  {
    id: 1,
    title: "NOIR Streetwear",
    category: "Full Launch",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop",
    description:
      "Complete brand launch from concept to $500K first-year revenue. Developed brand identity, sourced manufacturers, built Shopify store, and executed launch campaign.",
    results: ["$500K First Year Revenue", "25K Instagram Followers", "Featured in Hypebeast"],
  },
  {
    id: 2,
    title: "Luna Athletics",
    category: "Full Launch",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=1000&fit=crop",
    description: "Sustainable activewear brand launch with eco-friendly manufacturing and purpose-driven marketing strategy.",
    results: ["Sold Out Launch Collection", "30K Email Subscribers", "B Corp Certification"],
  },
  {
    id: 3,
    title: "Maison Eclat",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop",
    description: "Complete rebrand for established luxury womenswear label including new visual identity, packaging, and brand guidelines.",
    results: ["40% Revenue Increase", "New Market Positioning", "Vogue Feature"],
  },
  {
    id: 4,
    title: "Urban Thread",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop",
    description: "Custom Shopify store development with advanced filtering, size recommendations, and seamless checkout experience.",
    results: ["3.5% Conversion Rate", "45% Mobile Sales", "2s Load Time"],
  },
  {
    id: 5,
    title: "FORMA Basics",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop",
    description: "Comprehensive digital marketing strategy including paid ads, influencer partnerships, and email automation.",
    results: ["5x ROAS", "150K Reach/Month", "10K New Customers"],
  },
  {
    id: 6,
    title: "Velvet Rose",
    category: "Full Launch",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop",
    description: "Luxury eveningwear brand launch targeting high-end market with premium positioning and exclusive distribution.",
    results: ["$800K First Year", "Nordstrom Partnership", "Celebrity Clients"],
  },
  {
    id: 7,
    title: "Stride Co.",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop",
    description: "Shopify Plus migration and optimization for fast-growing footwear brand with international expansion.",
    results: ["65% Faster Checkout", "Global Shipping Setup", "Inventory Sync"],
  },
  {
    id: 8,
    title: "Sage & Stone",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop",
    description: "Brand identity development for sustainable jewelry brand with focus on ethical sourcing storytelling.",
    results: ["Strong Brand Recognition", "Premium Price Point", "Press Coverage"],
  },
]

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ")
}

export function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null)

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>Our Work</p>
              <h1 className={styles.heroHeading}>
                Brands we have helped{" "}
                <span className={styles.headingAccent}>launch and grow</span>
              </h1>
              <p className={styles.heroLede}>
                Explore our portfolio of successful clothing brand launches across various styles, markets, and scales.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.filter}>
        <div className={styles.container}>
          <div className={styles.filterRow}>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={joinClasses(
                  styles.filterButton,
                  activeCategory === category && styles.filterButtonActive,
                )}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.container}>
          <div className={styles.gridInner}>
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FadeIn>
                    <motion.div
                      whileHover={{ y: -8 }}
                      onClick={() => setSelectedItem(item)}
                      className={styles.card}
                    >
                      <div className={styles.imageWrap}>
                        <Image src={item.image} alt={item.title} fill className={styles.image} />
                      </div>
                      <div className={styles.cardHeader}>
                        <div>
                          <p className={styles.category}>{item.category}</p>
                          <h3 className={styles.title}>{item.title}</h3>
                        </div>
                        <ArrowUpRight className={styles.arrowIcon} />
                      </div>
                    </motion.div>
                  </FadeIn>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className={styles.modalOverlay}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={styles.modalContent}
            >
              <div className={styles.modalImageWrap}>
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className={styles.modalImage}
                />
                <button onClick={() => setSelectedItem(null)} className={styles.modalClose}>
                  <X className={styles.modalCloseIcon} />
                </button>
              </div>
              <div className={styles.modalBody}>
                <p className={styles.modalCategory}>{selectedItem.category}</p>
                <h2 className={styles.modalTitle}>{selectedItem.title}</h2>
                <p className={styles.modalDescription}>{selectedItem.description}</p>

                <div className={styles.resultsSection}>
                  <p className={styles.resultsLabel}>Results</p>
                  <div className={styles.resultsList}>
                    {selectedItem.results.map((result, i) => (
                      <span key={i} className={styles.resultChip}>
                        {result}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={styles.modalCta}
                  >
                    Start Your Project
                    <ArrowRight className={styles.modalCtaIcon} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <FadeIn>
            <h2 className={styles.ctaHeading}>Ready to see your brand here?</h2>
            <p className={styles.ctaLede}>
              Let us help you build and launch a clothing brand that stands out.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.ctaButton}
              >
                Start Your Project
                <ArrowRight className={styles.ctaIcon} />
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
