"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"
import styles from "./Footer.module.css"

const footerLinks = {
  services: [
    { href: "/services", label: "Pattern Making" },
    { href: "/services", label: "Pattern Library" },
    { href: "/services", label: "Spec Sheets" },
    { href: "/services", label: "Industry Insights" },
    { href: "/services", label: "Expert Consultation" },
  ],
  legal: [
    { href: "/contact", label: "Contact Us" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
}

const contactEmail = "hello.launchmyclothing@gmail.com"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ctaWrapper}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaContent}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.eyebrow}
            >
              Ready to launch?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={styles.ctaHeading}
            >
              {"Let's build your clothing brand together."}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/contact">
                <motion.button whileHover={{ gap: "1rem" }} className={styles.ctaButton}>
                  Schedule a free consultation
                  <ArrowRight className={styles.ctaIcon} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.brandLink}>
              <span className={styles.brandName}>Launch My
                Clothing Brand</span>
            </Link>
            <p className={styles.brandDescription}>
              Professional digital pattern making and manufacturer data services for clothing brands in India.
            </p>
            <p className={styles.brandDescription}>
              Bijwasan, Delhi — 110061
            </p>
          </div>

          <div className={styles.linkColumnServices}>
            <h4 className={styles.heading}>Services</h4>
            <ul className={styles.list}>
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h4 className={styles.heading}>Legal & Support</h4>
            <ul className={styles.list}>
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h4 className={styles.heading}>Connect With Us</h4>
            <a href={`mailto:${contactEmail}`} className={styles.contactEmail}>
              <Mail className={styles.contactIcon} />
              {contactEmail}
            </a>
            <p className={styles.brandDescription}>
              Follow us on social media for updates, tips, and industry insights.
            </p>
            <p className={styles.brandDescription}>
              Phone support available for premium members only.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Launch My Clothing Brand. All Rights Reserved.
          </p>
          <p className={styles.copyright}>launchmyclothingbrand.com · Bijwasan, Delhi 110061</p>
        </div>
      </div>
    </footer>
  )
}
