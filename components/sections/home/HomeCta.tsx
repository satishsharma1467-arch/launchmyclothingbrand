"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/shared/animations"
import styles from "./HomeCta.module.css"

export function HomeCta() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <FadeIn>
          <p className={styles.eyebrow}>Ready to start?</p>
          <h2 className={styles.heading}>
            {"Start Your Brand Journey"}
          </h2>
          <p className={styles.lede}>
            Tell us about your vision and let's create something amazing together.
          </p>
          <Link href="/pricing">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={styles.button}
            >
              Get Started Now →
              <ArrowRight className={styles.icon} />
            </motion.button>
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
