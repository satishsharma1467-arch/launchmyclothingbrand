"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import styles from "./Header.module.css"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Success Stories" },
  { href: "/blog", label: "Journal" },
]

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ")
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={joinClasses(styles.header, isScrolled && styles.headerScrolled)}
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logoLink}>
            <motion.div
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.2 }}
              className={styles.logo}
            >
              <span className={styles.logoTitle}>Launch My Clothing </span>
              
              <span className={styles.logoSubtitle}>Brand</span>
            </motion.div>
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={joinClasses(
                  styles.navLink,
                  pathname === link.href && styles.navLinkActive,
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div layoutId="nav-underline" className={styles.navUnderline} />
                )}
              </Link>
            ))}
          </nav>

          <div className={styles.ctaWrapper}>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.ctaButton}
              >
                Book a Call
                <ArrowRight className={styles.ctaIcon} />
              </motion.button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.mobileToggle}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? (
                <X className={styles.mobileIcon} />
              ) : (
                <Menu className={styles.mobileIcon} />
              )}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.mobileMenu}
          >
            <nav className={styles.mobileNav}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={joinClasses(
                      styles.mobileLink,
                      pathname === link.href && styles.mobileLinkActive,
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className={styles.mobileCtaWrapper}
              >
                <Link href="/contact">
                  <button className={styles.mobileCtaButton}>Book a Call</button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
