"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/shared/animations"
import styles from "./HomePortfolio.module.css"

const portfolioItems = [
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop",
    title: "NOIR Streetwear",
    category: "Full Brand Launch",
    description: "From concept to $500K first-year revenue",
  },
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop",
    title: "Luna Athletics",
    category: "E-commerce & Marketing",
    description: "Sustainable activewear brand",
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop",
    title: "Maison Éclat",
    category: "Luxury Fashion",
    description: "High-end womenswear collection",
  },
]

export function HomePortfolio() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <FadeIn>
          <div className={styles.header}>
            <div className={styles.headingWrap}>
              <p className={styles.eyebrow}>Featured Work</p>
              <h2 className={styles.heading}>
                Brands we have helped <span className={styles.headingAccent}>launch</span>
              </h2>
            </div>
            <Link href="/portfolio">
              <motion.button whileHover={{ gap: "1rem" }} className={styles.viewAll}>
                View all projects
                <ArrowRight className={styles.viewAllIcon} />
              </motion.button>
            </Link>
          </div>
        </FadeIn>

        <div className={styles.grid}>
          {portfolioItems.map((item, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={styles.card}
              >
                <div className={styles.imageWrap}>
                  <Image src={item.image} alt={item.title} fill className={styles.image} />
                </div>
                <p className={styles.category}>{item.category}</p>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
