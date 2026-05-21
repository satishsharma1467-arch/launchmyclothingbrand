"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn, FadeInLeft } from "@/components/shared/animations"
import styles from "./Faq.module.css"

const faqs = [
  {
    question: "How long does it take to launch a clothing brand?",
    answer:
      "The timeline varies based on scope, but typically a full brand launch takes 3-6 months. This includes brand development, manufacturing setup, website build, and marketing preparation.",
  },
  {
    question: "What is the minimum investment required?",
    answer:
      "Our packages start at $15,000 for essential services. A comprehensive launch typically ranges from $25,000-$75,000 depending on production quantities and marketing scope.",
  },
  {
    question: "Do you handle manufacturing for small quantities?",
    answer:
      "Yes, we work with manufacturers who accommodate small MOQs (Minimum Order Quantities) starting from 50-100 units per style, perfect for new brands testing the market.",
  },
  {
    question: "What if I already have designs?",
    answer:
      "We can work with your existing designs. Our services are modular, so you can choose what you need—whether it is just manufacturing, Shopify development, or marketing.",
  },
]

export function Faq() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <FadeInLeft>
            <div className={styles.sticky}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2 className={styles.heading}>
                Common <span className={styles.headingAccent}>questions</span>
              </h2>
              <p className={styles.lede}>
                Have more questions? We would love to hear from you.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={styles.ctaButton}
                >
                  Contact Us
                  <ArrowRight className={styles.ctaIcon} />
                </motion.button>
              </Link>
            </div>
          </FadeInLeft>

          <div className={styles.list}>
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={styles.item}>
                  <h3 className={styles.question}>{faq.question}</h3>
                  <p className={styles.answer}>{faq.answer}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
