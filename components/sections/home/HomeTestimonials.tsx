"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/shared/animations"
import styles from "./HomeTestimonials.module.css"

const testimonials = [
  {
    quote:
      "LaunchBrand transformed our vision into a thriving brand. Their expertise in manufacturing and marketing helped us achieve $1M in our first year.",
    name: "Sarah Chen",
    role: "Founder, NOVA Essentials",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    quote:
      "The team at LaunchBrand is exceptional. They handled everything from branding to Shopify development, allowing us to focus on our designs.",
    name: "Marcus Johnson",
    role: "Creative Director, Urban Thread",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
]

export function HomeTestimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <FadeIn>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Client Stories</p>
            <h2 className={styles.heading}>
              What our clients <span className={styles.headingAccent}>say about us</span>
            </h2>
          </div>
        </FadeIn>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <div className={styles.item}>
                <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className={styles.image}
                    />
                  </div>
                  <div>
                    <p className={styles.name}>{testimonial.name}</p>
                    <p className={styles.role}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className={styles.linkWrap}>
            <Link href="/testimonials">
              <motion.button whileHover={{ gap: "1rem" }} className={styles.link}>
                Read more success stories
                <ArrowRight className={styles.linkIcon} />
              </motion.button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
