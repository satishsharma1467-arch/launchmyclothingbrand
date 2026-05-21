"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users, Target, Lightbulb, Heart } from "lucide-react"
import { FadeIn, FadeInLeft, FadeInRight } from "@/components/shared/animations"
import styles from "./AboutContent.module.css"

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure success by your success. Every strategy is designed with your ROI in mind.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of trends and leverage cutting-edge tools to give your brand a competitive edge.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work as an extension of your team, invested in your vision and committed to your growth.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Fashion is our passion. We bring enthusiasm and creativity to every project we undertake.",
  },
]

const team = [
  {
    name: "Alexandra Chen",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    bio: "15+ years in fashion industry. Former brand director at a major fashion house.",
  },
  {
    name: "Marcus Williams",
    role: "Head of Manufacturing",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    bio: "Expert in apparel production with connections to 50+ verified manufacturers worldwide.",
  },
  {
    name: "Sofia Rodriguez",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    bio: "Award-winning designer with a portfolio of 100+ successful brand identities.",
  },
  {
    name: "James Park",
    role: "E-commerce Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    bio: "Shopify expert who has built stores generating over $50M in combined revenue.",
  },
]

const milestones = [
  { year: "2018", title: "Founded", description: "Started with a vision to democratize fashion entrepreneurship." },
  { year: "2019", title: "First 10 Brands", description: "Successfully launched our first 10 client brands." },
  { year: "2020", title: "Manufacturing Network", description: "Established partnerships with 30+ vetted manufacturers." },
  { year: "2021", title: "Global Expansion", description: "Extended services to clients in 25+ countries." },
  { year: "2022", title: "100 Brands Milestone", description: "Celebrated launching our 100th successful brand." },
  { year: "2023", title: "Full-Service Agency", description: "Expanded to offer end-to-end brand launch services." },
]

export function AboutContent() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>About Us</p>
              <h1 className={styles.heroHeading}>
                We are a team of fashion industry experts helping entrepreneurs{" "}
                <span className={styles.headingAccent}>launch successful brands</span>
              </h1>
              <p className={styles.heroLede}>
                Since 2018, we have helped over 150 entrepreneurs turn their clothing brand dreams into thriving businesses. Our mission is to make fashion entrepreneurship accessible to everyone.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <FadeInLeft>
              <div className={styles.storyImage}>
                <Image
                  src="https://images.unsplash.com/photo-1558769132-cb1ade348f12?w=800&h=1000&fit=crop"
                  alt="Our Story"
                  fill
                  className={styles.image}
                />
              </div>
            </FadeInLeft>

            <FadeInRight delay={0.2}>
              <div>
                <p className={styles.eyebrow}>Our Story</p>
                <h2 className={styles.storyHeading}>
                  Born from a passion for fashion and{" "}
                  <span className={styles.headingAccent}>entrepreneurship</span>
                </h2>
                <div className={styles.storyBody}>
                  <p>
                    LaunchBrand Studio was founded by Alexandra Chen, a former brand director who saw firsthand how challenging it was for aspiring designers to navigate the complex world of fashion business.
                  </p>
                  <p>
                    After helping friends launch their clothing lines on the side, she realized there was a massive gap in the market for a full-service agency that could guide entrepreneurs through every step of the process.
                  </p>
                  <p>
                    Today, our team of 20+ experts combines decades of experience in branding, manufacturing, e-commerce, and marketing to provide comprehensive support for fashion entrepreneurs worldwide.
                  </p>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Our Values</p>
              <h2 className={styles.sectionHeading}>
                The principles that guide{" "}
                <span className={styles.headingAccent}>everything we do</span>
              </h2>
            </div>
          </FadeIn>

          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={styles.valueCard}>
                  <div className={styles.iconCircle}>
                    <value.icon className={styles.icon} />
                  </div>
                  <h3 className={styles.cardTitle}>{value.title}</h3>
                  <p className={styles.cardBody}>{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Our Team</p>
              <h2 className={styles.sectionHeading}>
                Meet the experts behind{" "}
                <span className={styles.headingAccent}>your success</span>
              </h2>
            </div>
          </FadeIn>

          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8 }} className={styles.member}>
                  <div className={styles.memberImage}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className={styles.memberImg}
                    />
                  </div>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.timeline}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Our Journey</p>
              <h2 className={styles.sectionHeading}>
                Key milestones in our{" "}
                <span className={styles.headingAccent}>growth story</span>
              </h2>
            </div>
          </FadeIn>

          <div className={styles.timelineGrid}>
            {milestones.map((milestone, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={styles.milestone}>
                  <span className={styles.milestoneYear}>{milestone.year}</span>
                  <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                  <p className={styles.milestoneBody}>{milestone.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <FadeIn>
            <h2 className={styles.ctaHeading}>Ready to work with our team?</h2>
            <p className={styles.ctaLede}>
              Schedule a free consultation to discuss your vision and see how we can help.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.ctaButton}
              >
                Get in Touch
                <ArrowRight className={styles.ctaIcon} />
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
