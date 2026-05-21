"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeInLeft, FadeInRight } from "@/components/shared/animations"
import styles from "./Intro.module.css"

export function Intro() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <FadeInLeft>
            <div>
              <p className={styles.eyebrow}>Trusted by Industry Leaders</p>
              <h2 className={styles.heading}>
                12+ Years of Excellence
in {" "}
                <span className={styles.headingAccent}>Pattern Making</span>
              </h2>
              <div className={styles.body}>
                <p>
                  For over a decade, we have built lasting relationships with major apparel brands, boutique fashion houses, and large-scale manufacturers. Our commitment to precision, reliability, and quality has made us the preferred pattern making partner for industry leaders.
                </p>
                <p>
                 We specialize in converting visual ideas into industry-standard digital patterns. Our expertise in CAD software ensures that your designs translate perfectly from concept to production.
                </p>
              </div>
              <div className={styles.linkWrapper}>
                <Link href="/about">
                  <motion.button whileHover={{ gap: "1rem" }} className={styles.link}>
                    Learn more about us
                    <ArrowRight className={styles.linkIcon} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </FadeInLeft>

          <FadeInRight delay={0.2}>
            <div className={styles.imageWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop"
                alt="Fashion Studio"
                fill
                className={styles.image}
              />
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  )
}
