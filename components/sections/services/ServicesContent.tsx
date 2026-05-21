"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Package } from "lucide-react"
import { FadeIn, FadeInLeft, FadeInRight } from "@/components/shared/animations"
import styles from "./ServicesContent.module.css"

type MetaItem = { label: string; value: string }
type ServiceCard = { label: string; value: string }

type ServiceVariant =
  | { kind: "meta-grid"; items: MetaItem[] }
  | { kind: "bullets"; items: string[] }
  | { kind: "includes"; items: string[] }

type Service = {
  number: string
  icon: string
  title: string
  description: string
  variant: ServiceVariant
  cta: { label: string; href: string }
  cards: ServiceCard[]
  
  layout: "content-left" | "content-right"
}

const services: Service[] = [
  {
    number: "01",
    icon: "📐",
    title: "CAD Pattern Making",
    description:
      "Turn your sketches or photos into industry-standard digital patterns. We specialize in converting visual ideas into DXF & PDF files using advanced CAD making software.",
    variant: {
      kind: "meta-grid",
      items: [
        { label: "Input", value: "From Photos / Sketches" },
        { label: "Output", value: "DXF & PDF Files" },
        { label: "Features", value: "Grading Included" },
        { label: "Bonus", value: "Fabric Consumption" },
      ],
    },
    cta: { label: "Get Started", href: "/contact" },
    cards: [
      { label: "What You Send Us", value: "A sketch, photo, or reference image" },
      { label: "What You Receive", value: "Production-ready DXF & PDF pattern files" },
    ],

    layout: "content-left",
  },
  {
    number: "02",
    icon: "📋",
    title: "Tech Packs & Specs",
    description:
      "Detailed technical sheets that communicate exactly what factories need. Essential for any clothing brand startup to avoid production errors and costly mistakes.",
    variant: {
      kind: "includes",
      items: [
        "Measurement Charts",
        "Fabric Consumption",
        "How to Measure Guide",
        "Basic Details & Construction Notes",
      ],
    },
    cta: { label: "Get Started", href: "/contact" },
    cards: [
      {
        label: "Why Tech Packs Matter",
        value: "Factories work from exact specs. Ambiguity costs money.",
      },
      { label: "Result", value: "Fewer errors. Faster sampling. Lower waste." },
    ],
  
    layout: "content-right",
  },
  {
    number: "03",
    icon: "🎯",
    title: "Brand Development Consultancy",
    description:
      "Expert guidance specifically designed for beginners and newcomers to the clothing industry. We help you navigate the complexities of launching your brand with confidence.",
    variant: {
      kind: "bullets",
      items: [
        "Understanding MOQs, lead times, and production cycles",
        "Selecting the right fabric and trims for your category",
        "Pricing your product correctly for your target market",
        "Building supplier relationships that scale with you",
        "Avoiding common mistakes that kill new fashion brands",
      ],
    },
    cta: { label: "Book a Consultation", href: "/contact" },
    cards: [
      {
        label: "Who This Is For",
        value: "Beginners & newcomers to the clothing industry",
      },
      { label: "Our Promise", value: "12+ years of experience, simplified for you." },
    ],
 
    layout: "content-left",
  },
  {
    number: "04",
    icon: "📚",
    title: "Pattern Library Access",
    description:
      "Get instant access to pre-made patterns that save time and money. Perfect for testing designs quickly before investing in custom pattern making.",
    variant: {
      kind: "bullets",
      items: [
        "Ready-to-use patterns across multiple categories",
        "Instant download — no waiting, no back-and-forth",
        "Regular updates with new patterns added consistently",
        "Ideal for startups testing ideas before custom orders",
      ],
    },
    cta: { label: "Browse Library", href: "/portfolio" },
    cards: [
      { label: "Best For", value: "Testing designs quickly without custom costs" },
      { label: "Access Type", value: "Subscription-based. Instant download." },
    ],
   
    layout: "content-right",
  },
  {
    number: "05",
    icon: "🏭",
    title: "Manufacturer Network",
    description:
      "Connect with trusted manufacturers across India. We've built relationships with verified factories that understand startup needs and offer flexible MOQs.",
    variant: {
      kind: "bullets",
      items: [
        "Verified manufacturers with proven track records",
        "Flexible MOQs — suitable for startups and large brands",
        "Quality assurance built into our vetting process",
        "Direct contact access — no middlemen, no markups",
      ],
    },
    cta: { label: "Connect Now", href: "/contact" },
    cards: [
      { label: "Coverage", value: "Verified factories across Delhi NCR" },
      {
        label: "MOQ Flexibility",
        value: "Small startup orders to large-scale production",
      },
    ],
   
    layout: "content-left",
  },
]

const packages = [
  {
    icon: Sparkles,
    title: "Brand Launch Package",
    description:
      "Complete end-to-end brand launch including branding, manufacturing, Shopify store, and launch marketing.",
    ideal: "New brands ready for full launch",
  },
  {
    icon: Package,
    title: "A La Carte Services",
    description:
      "Choose individual services based on your specific needs. Perfect if you already have some elements in place.",
    ideal: "Existing brands needing specific support",
  },
]

const processSteps = [
  { step: "01", title: "Discovery", desc: "We learn about your vision, goals, and target market through in-depth consultation." },
  { step: "02", title: "Strategy", desc: "We develop a comprehensive plan covering branding, production, and go-to-market." },
  { step: "03", title: "Execution", desc: "Our team brings your brand to life with design, manufacturing, and store development." },
  { step: "04", title: "Launch", desc: "We orchestrate a strategic launch and provide ongoing support for growth." },
]

function ServiceMain({ service }: { service: Service }) {
  return (
    <div className={styles.serviceMain}>
      <span className={styles.serviceNumber}>{service.number}</span>
      <span className={styles.serviceIcon} aria-hidden>
        {service.icon}
      </span>
      <h2 className={styles.serviceTitle}>{service.title}</h2>
      <p className={styles.serviceDescription}>{service.description}</p>

      {service.variant.kind === "meta-grid" && (
        <div className={styles.metaGrid}>
          {service.variant.items.map((item, i) => (
            <div key={i} className={styles.metaItem}>
              <span className={styles.metaLabel}>{item.label}</span>
              <span className={styles.metaValue}>{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {service.variant.kind === "bullets" && (
        <ul className={styles.bulletList}>
          {service.variant.items.map((item, i) => (
            <li key={i} className={styles.bulletItem}>
              <span className={styles.bulletArrow} aria-hidden>
                →
              </span>
              <span className={styles.bulletText}>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {service.variant.kind === "includes" && (
        <ul className={styles.includesList}>
          {service.variant.items.map((item, i) => (
            <li key={i} className={styles.includesItem}>
              <span className={styles.includesTag}>Includes</span>
              <span className={styles.includesText}>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <Link href={service.cta.href} className={styles.serviceCtaLink}>
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={styles.serviceCtaButton}
        >
          {service.cta.label}
          <ArrowRight className={styles.serviceCtaIcon} />
        </motion.span>
      </Link>
    </div>
  )
}

function ServiceCards({ service }: { service: Service }) {
  return (
    <div className={styles.serviceCardsWrap}>
      <div className={styles.serviceCards}>
        {service.cards.map((card, i) => (
          <div key={i} className={styles.serviceCard}>
            <span className={styles.serviceCardLabel}>{card.label}</span>
            <p className={styles.serviceCardValue}>{card.value}</p>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export function ServicesContent() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>Our Services</p>
              <h1 className={styles.heroHeading}>
                Complete Solutions for Your{" "}
                <span className={styles.headingAccent}>Clothing Brand</span>
              </h1>
              <p className={styles.heroLede}>
                From concept to CAD making, we cover every step. Expert services built
                specifically for clothing brand startups and established fashion houses.
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className={styles.servicesText}>
              <p>services</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.services}>
        <div className={styles.servicesContainer}>
          <div className={styles.servicesStack}>
            {services.map((service, index) => {
              const isContentRight = service.layout === "content-right"
              return (
                <div
                  key={index}
                  className={`${styles.serviceRow} ${
                    isContentRight ? styles.serviceRowReverse : ""
                  }`}
                >
                  <FadeInLeft className={`${styles.serviceCol} ${styles.serviceColMain}`}>
                    <ServiceMain service={service} />
                  </FadeInLeft>
                  <FadeInRight delay={0.15} className={`${styles.serviceCol} ${styles.serviceColCards}`}>
                    <ServiceCards service={service} />
                  </FadeInRight>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className={styles.packages}>
        <div className={styles.packagesContainer}>
          <FadeIn>
            <div className={styles.packagesHeader}>
              <p className={styles.eyebrow}>How We Work</p>
              <h2 className={styles.packagesHeading}>
                Choose the approach that{" "}
                <span className={styles.headingAccent}>fits your needs</span>
              </h2>
              <p className={styles.packagesLede}>
                Pick the path that matches where you are today. Both come with the
                same hands-on expertise and senior-led delivery.
              </p>
            </div>
          </FadeIn>

          <div className={styles.packagesGrid}>
            {packages.map((pkg, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -6 }} className={styles.packageCard}>
                  <div className={styles.packageCardHead}>
                    <div className={styles.packageIconWrap}>
                      <pkg.icon className={styles.packageIcon} />
                    </div>
                    <span className={styles.packageNumber}>
                      {`0${index + 1}`}
                    </span>
                  </div>
                  <h3 className={styles.packageTitle}>{pkg.title}</h3>
                  <p className={styles.packageDescription}>{pkg.description}</p>
                  <div className={styles.packageDivider} />
                  <div className={styles.packageIdealBlock}>
                    <span className={styles.packageIdealLabel}>Ideal For</span>
                    <p className={styles.packageIdealValue}>{pkg.ideal}</p>
                  </div>
                  <Link href="/pricing" className={styles.packageLink}>
                    Learn more
                    <ArrowRight className={styles.packageLinkIcon} />
                  </Link>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className={styles.viewPricingWrap}>
              <Link href="/pricing">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={styles.viewPricingButton}
                >
                  View Pricing Details
                  <ArrowRight className={styles.viewPricingIcon} />
                </motion.button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Our Process</p>
              <h2 className={styles.sectionHeading}>
                A proven approach to{" "}
                <span className={styles.headingAccent}>brand success</span>
              </h2>
            </div>
          </FadeIn>

          <div className={styles.processGrid}>
            {processSteps.map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={styles.processItem}>
                  <span className={styles.processStep}>{item.step}</span>
                  <h3 className={styles.processTitle}>{item.title}</h3>
                  <p className={styles.processDescription}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <FadeIn>
            <h2 className={styles.ctaHeading}>Ready to launch your clothing brand?</h2>
            <p className={styles.ctaLede}>
              Schedule a free consultation to discuss your vision and get a custom quote.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={styles.ctaPrimary}
                >
                  Book Free Consultation
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
