"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/shared/animations"
import styles from "./HomeServices.module.css"

const services = [
  {
    number: "01",
    title: "Industry Insights",
    description:
      "Exclusive video tutorials on industry trends, brand development strategies, and expert tips to grow your clothing brand successfully.",
    features: ["Expert Video Tutorials", "Industry Trends", "Brand Development Tips", "Brand Builder & Pro Elite"],
  },
  {
    number: "02",
    title: "Pattern Library",
    description:
      "Access pre-made designs to speed up your sampling process.Download production-ready patterns instantly with your subscription.",
    features: ["Ready-to-use Patterns", "Multiple Categories", "Instant Download", "Regular Updates"],
  },
  {
    number: "03",
    title: "Connect to Manufacturers",
    description:
      "We connect you with trusted manufacturers across Gurgaon.Whether you need small MOQs for a startup or large-scale production for established brands.",
    features: ["Verified Manufacturers", "Quality Assurance", "Flexible MOQs", "Direct Contact Access"],
  },
  {
    number: "04",
    title: "Spec Sheets",
    description:
      "Access professionally crafted specification sheets for Kids, Womens and Mens garment categories.Industry-proven dummy measurements used by top brands.",
    features: ["Kids 6M to 8Y Measurements", "Womens XS to XXL", "Mens Standard Sizes", "Production Ready PDF"],
  },
]

export function HomeServices() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <FadeIn>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Core Offerings</p>
            <h2 className={styles.heading}>
              Everything You Need to{" "}
              <span className={styles.headingAccent}>Launch Your Brand</span>
            </h2>
          </div>
        </FadeIn>

        <div className={styles.list}>
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className={styles.item}
              >
                <div className={styles.itemGrid}>
                  <div className={styles.number}>
                    <span className={styles.numberText}>{service.number}</span>
                  </div>
                  <div className={styles.titleCol}>
                    <h3 className={styles.title}>{service.title}</h3>
                  </div>
                  <div className={styles.descriptionCol}>
                    <p className={styles.description}>{service.description}</p>
                  </div>
                  <div className={styles.featuresCol}>
                    <ul className={styles.features}>
                      {service.features.map((feature, i) => (
                        <li key={i} className={styles.feature}>
                          <div className={styles.featureDot} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className={styles.ctaWrapper}>
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.ctaButton}
              >
                Explore All Services
                <ArrowRight className={styles.ctaIcon} />
              </motion.button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
