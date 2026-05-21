"use client"

import { FadeIn } from "@/components/shared/animations"
import styles from "./Stats.module.css"

const stats = [
  { value: "150+", label: "Brands Launched" },
  { value: "12+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Countries Served" },
]

export function Stats() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className={styles.item}>
                <p className={styles.value}>{stat.value}</p>
                <p className={styles.label}>{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
