"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, ArrowRight, Quote } from "lucide-react"
import { FadeIn, FadeInLeft, FadeInRight } from "@/components/shared/animations"
import styles from "./TestimonialsContent.module.css"

const testimonials = [
  {
    name: "Jordan Mitchell",
    role: "Founder, NOIR Streetwear",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content:
      "LaunchBrand Studio took my streetwear vision and turned it into a real business. From branding to manufacturing to our Shopify store, they handled everything. We hit $500K in our first year.",
    rating: 5,
    project: "Full Brand Launch",
  },
  {
    name: "Elena Rodriguez",
    role: "Founder, Luna Athletics",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content:
      "I had the designs but no idea how to actually produce them or sell them. Their team guided me through every step. The sustainable manufacturer they connected me with was exactly what I needed.",
    rating: 5,
    project: "Manufacturing & Launch",
  },
  {
    name: "Michael Chen",
    role: "Founder, FORMA Basics",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    content:
      "The marketing strategy they developed drove real results. We went from unknown to 10K customers in 6 months. Their influencer connections and paid ads expertise made all the difference.",
    rating: 5,
    project: "Marketing & Growth",
  },
  {
    name: "Sophia Williams",
    role: "Founder, Velvet Rose",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    content:
      "Working with LaunchBrand was the best investment I made. They understood my luxury positioning from day one and delivered a brand that got us featured in Vogue within our first year.",
    rating: 5,
    project: "Full Brand Launch",
  },
  {
    name: "David Park",
    role: "Founder, Stride Co.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    content:
      "Our old Shopify store was slow and losing sales. They migrated us to Shopify Plus and the new store is incredible. Checkout is 65% faster and conversions went up significantly.",
    rating: 5,
    project: "Shopify Development",
  },
  {
    name: "Amanda White",
    role: "Founder, Sage & Stone",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    content:
      "The brand identity they created perfectly captured our sustainable, ethical ethos. Every touchpoint from logo to packaging tells our story. Press immediately started taking notice.",
    rating: 5,
    project: "Brand Identity",
  },
  {
    name: "James Rivera",
    role: "Founder, Urban Thread",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    content:
      "I came to them with just a concept and sketches. Six months later I had a fully launched brand with inventory, a beautiful store, and customers actually buying. Still pinching myself.",
    rating: 5,
    project: "Full Brand Launch",
  },
  {
    name: "Priya Sharma",
    role: "Founder, Maison Eclat",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content:
      "Our rebrand was overdue and they delivered beyond expectations. The new positioning helped us move upmarket and our revenue increased 40% in the following year.",
    rating: 5,
    project: "Rebrand",
  },
  {
    name: "Chris Thompson",
    role: "Founder, Street Edge",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    content:
      "The manufacturing connections alone were worth it. They introduced me to a factory that produces quality on par with major brands but at prices that work for a startup.",
    rating: 5,
    project: "Manufacturing",
  },
]

const stats = [
  { value: "150+", label: "Brands Launched" },
  { value: "5.0", label: "Client Rating" },
  { value: "$50M+", label: "Client Revenue Generated" },
  { value: "98%", label: "Would Recommend" },
]

export function TestimonialsContent() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>Testimonials</p>
              <h1 className={styles.heroHeading}>
                Success stories from founders{" "}
                <span className={styles.headingAccent}>we have helped</span>
              </h1>
              <p className={styles.heroLede}>
                Hear from entrepreneurs who turned their clothing brand dreams into thriving businesses with our help.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={styles.statItem}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.featuredGrid}>
            <FadeInLeft>
              <div className={styles.featuredImageWrap}>
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=750&fit=crop"
                  alt="Sarah Chen"
                  fill
                  className={styles.featuredImage}
                />
              </div>
            </FadeInLeft>

            <FadeInRight delay={0.2}>
              <div>
                <Quote className={styles.quoteIcon} />
                <p className={styles.featuredQuote}>
                  &quot;I came to LaunchBrand with nothing but a dream and some sketches. They helped me build LUXE from the ground up—branding, manufacturing, Shopify, marketing, everything. Two years later, we&apos;re doing $2M annually and just signed our first department store deal. They didn&apos;t just launch my brand, they changed my life.&quot;
                </p>
                <div>
                  <h4 className={styles.featuredName}>Sarah Chen</h4>
                  <p className={styles.featuredRole}>Founder & CEO, LUXE Apparel</p>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Client Stories</p>
              <h2 className={styles.sectionHeading}>
                More founders who trusted us with{" "}
                <span className={styles.headingAccent}>their vision</span>
              </h2>
            </div>
          </FadeIn>

          <div className={styles.gridInner}>
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <motion.div whileHover={{ y: -8 }} className={styles.card}>
                  <div className={styles.stars}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className={styles.starIcon} />
                    ))}
                  </div>
                  <p className={styles.cardContent}>&quot;{testimonial.content}&quot;</p>
                  <div className={styles.cardFooter}>
                    <div className={styles.author}>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className={styles.avatar}
                      />
                      <div>
                        <h4 className={styles.name}>{testimonial.name}</h4>
                        <p className={styles.role}>{testimonial.role}</p>
                      </div>
                    </div>
                    <span className={styles.project}>{testimonial.project}</span>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <FadeIn>
            <h2 className={styles.ctaHeading}>Ready to write your success story?</h2>
            <p className={styles.ctaLede}>
              Join 150+ founders who have launched successful clothing brands with our help.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={styles.ctaPrimary}
                >
                  Start Your Journey
                  <ArrowRight className={styles.ctaIcon} />
                </motion.button>
              </Link>
              <Link href="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={styles.ctaSecondary}
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
