"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { FadeIn, FadeInLeft, FadeInRight } from "@/components/shared/animations"
import styles from "./PricingContent.module.css"

const pricingPlans = [
  {
    name: "Starter",
    description: "For entrepreneurs ready to test the market with their first collection.",
    price: "$15,000",
    period: "starting at",
    features: [
      "Brand strategy session",
      "Logo & basic identity",
      "50-100 unit production",
      "Basic Shopify store",
      "Launch marketing guide",
      "30-day email support",
    ],
    popular: false,
  },
  {
    name: "Growth",
    description: "Comprehensive launch package for brands ready to make an impact.",
    price: "$35,000",
    period: "starting at",
    features: [
      "Everything in Starter",
      "Full brand identity system",
      "200-500 unit production",
      "Custom Shopify theme",
      "Social media setup",
      "Influencer outreach",
      "Email marketing automation",
      "90-day dedicated support",
    ],
    popular: true,
  },
  {
    name: "Scale",
    description: "Full-service partnership for brands with ambitious growth goals.",
    price: "$75,000",
    period: "starting at",
    features: [
      "Everything in Growth",
      "Premium brand development",
      "500+ unit production",
      "Shopify Plus store",
      "Full launch campaign",
      "Paid advertising management",
      "PR & press outreach",
      "Ongoing strategy calls",
      "12-month partnership",
    ],
    popular: false,
  },
]

const addOns = [
  { service: "Additional Production Run", price: "Custom Quote" },
  { service: "Lookbook Photography", price: "$3,000+" },
  { service: "Product Photography", price: "$50/product" },
  { service: "Social Media Management", price: "$2,000/month" },
  { service: "Paid Ads Management", price: "$1,500/month + ad spend" },
  { service: "Email Marketing Setup", price: "$1,500" },
  { service: "Ongoing Consulting", price: "$300/hour" },
  { service: "Rush Production", price: "+25-50%" },
]

const faqs = [
  {
    question: "What is included in the production cost?",
    answer:
      "Production costs cover fabric sourcing, pattern making, sampling, and bulk manufacturing. The price varies based on garment complexity, fabric choice, and order quantity.",
  },
  {
    question: "How long does a full brand launch take?",
    answer:
      "A typical full brand launch takes 4-6 months from kickoff to launch day. This includes brand development (4-6 weeks), manufacturing (8-12 weeks), and store/marketing setup (4-6 weeks).",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes, we offer flexible payment plans. Typically 40% deposit to begin, 30% at production start, and 30% before launch. Custom arrangements available for larger projects.",
  },
  {
    question: "What if I already have some elements completed?",
    answer:
      "We offer a la carte services for brands that already have branding, products, or a store. We will create a custom scope and pricing based on your specific needs.",
  },
]

export function PricingContent() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>Pricing</p>
              <h1 className={styles.heroHeading}>
                Transparent pricing for{" "}
                <span className={styles.headingAccent}>every stage</span>
              </h1>
              <p className={styles.heroLede}>
                Whether you are testing an idea or ready to scale, we have packages designed to meet you where you are.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.pricing}>
        <div className={styles.container}>
          <div className={styles.pricingGrid}>
            {pricingPlans.map((plan, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className={plan.popular ? styles.planCardPopular : styles.planCard}
                >
                  {plan.popular && (
                    <div className={styles.popularBadge}>
                      <span className={styles.popularBadgeInner}>Most Popular</span>
                    </div>
                  )}

                  <div className={styles.planHeader}>
                    <h3 className={styles.planName}>{plan.name}</h3>
                    <p className={plan.popular ? styles.planDescriptionInverse : styles.planDescription}>
                      {plan.description}
                    </p>
                  </div>

                  <div className={styles.planPriceWrap}>
                    <span className={plan.popular ? styles.planPeriodInverse : styles.planPeriod}>
                      {plan.period}
                    </span>
                    <p className={styles.planPrice}>{plan.price}</p>
                  </div>

                  <ul className={styles.planFeatures}>
                    {plan.features.map((feature, i) => (
                      <li key={i} className={styles.planFeature}>
                        <Check className={plan.popular ? styles.checkIconInverse : styles.checkIcon} />
                        <span className={plan.popular ? styles.featureTextInverse : styles.featureText}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact" style={{ marginTop: "auto" }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={plan.popular ? styles.planButtonInverse : styles.planButton}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.addons}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Add-Ons</p>
              <h2 className={styles.sectionHeading}>
                Customize your <span className={styles.headingAccent}>package</span>
              </h2>
            </div>
          </FadeIn>

          <div className={styles.addonsGrid}>
            {addOns.map((item, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <div className={styles.addonRow}>
                  <span className={styles.addonService}>{item.service}</span>
                  <span className={styles.addonPrice}>{item.price}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            <FadeInLeft>
              <div className={styles.faqSticky}>
                <p className={styles.eyebrow}>FAQ</p>
                <h2 className={styles.faqHeading}>
                  Pricing <span className={styles.headingAccent}>questions</span>
                </h2>
                <p className={styles.faqLede}>
                  Have more questions? Schedule a call and we will walk you through everything.
                </p>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={styles.faqButton}
                  >
                    Book a Call
                    <ArrowRight className={styles.faqButtonIcon} />
                  </motion.button>
                </Link>
              </div>
            </FadeInLeft>

            <FadeInRight delay={0.2}>
              <div className={styles.faqList}>
                {faqs.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <h3 className={styles.faqQuestion}>{faq.question}</h3>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <FadeIn>
            <h2 className={styles.ctaHeading}>Ready to get started?</h2>
            <p className={styles.ctaLede}>
              Book a free consultation to discuss your vision and get a custom quote.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.ctaButton}
              >
                Schedule Free Consultation
                <ArrowRight className={styles.ctaIcon} />
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
