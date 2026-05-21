"use client"

import { FadeIn } from "@/components/shared/animations"
import styles from "./Process.module.css"

const processSteps = [
  {
    step: "01",
    title: "Heavy Draping",
    description: "Complex draped garments & couture draping techniques",
  },
  {
    step: "02",
    title: "Lingerie Patterns",
    description: "Intimate wear, bras, underwear & specialized innerwear",
  },
  {
    step: "03",
    title: "Swimwear",
    description: "Bikinis, swimsuits & specialized stretch swimwear",
  },
  {
    step: "04",
    title: "Leather & Fur",
    description: "Leather garments, fur coats & exotic material patterns",
  },
  {
    step: "05",
    title: "Launch & Marketing",
    description: "We execute a strategic launch campaign to drive awareness and initial sales.",
  },
  {
    step: "06",
    title: "Scale & Support",
    description: "Ongoing support and growth strategies to help your brand reach new heights.",
  },
]

export function Process() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <FadeIn>
          <div className={styles.header}>
            <p className={styles.eyebrow}>What We Don't Offer</p>
            <h2 className={styles.heading}>
              Outside Our{" "}
              <span className={styles.headingAccent}>Scope</span>
            </h2>
          </div>
        </FadeIn>

        <div className={styles.grid}>
          {processSteps.map((step, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className={styles.item}>
                <span className={styles.step}>{step.step}</span>
                <h3 className={styles.itemTitle}>{step.title}</h3>
                <p className={styles.itemDescription}>{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
