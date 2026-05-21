"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Calendar } from "lucide-react"
import { FadeIn, FadeInLeft, FadeInRight } from "@/components/shared/animations"
import styles from "./ContactContent.module.css"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@launchbrand.studio"],
    link: "mailto:hello@launchbrand.studio",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567"],
    link: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Based In",
    details: ["New York, NY", "Remote-Friendly"],
    link: null,
  },
  {
    icon: Clock,
    title: "Response Time",
    details: ["Within 24 hours"],
    link: null,
  },
]

const services = [
  "Full Brand Launch",
  "Brand Strategy & Identity",
  "Apparel Manufacturing",
  "Shopify Development",
  "Marketing & Growth",
  "Other / Not Sure",
]

const budgets = [
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
  "Not sure yet",
]

export function ContactContent() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>Contact Us</p>
              <h1 className={styles.heroHeading}>
                Let&apos;s discuss your{" "}
                <span className={styles.headingAccent}>brand vision</span>
              </h1>
              <p className={styles.heroLede}>
                Book a free consultation to explore how we can help you launch and grow your clothing brand.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.info}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            {contactInfo.map((info, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIconCircle}>
                    <info.icon className={styles.infoIcon} />
                  </div>
                  <h3 className={styles.infoTitle}>{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className={styles.infoDetail}>
                      {info.link ? (
                        <a href={info.link} className={styles.infoLink}>
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <FadeInLeft>
              <div className={styles.formAside}>
                <p className={styles.eyebrow}>Get Started</p>
                <h2 className={styles.formHeading}>
                  Book your free{" "}
                  <span className={styles.headingAccent}>consultation</span>
                </h2>
                <p className={styles.formLede}>
                  In our 30-minute call, we will discuss your brand vision, review your goals, and outline how we can help you launch successfully.
                </p>

                <div className={styles.benefits}>
                  <div className={styles.benefit}>
                    <div className={styles.benefitIconCircle}>
                      <Calendar className={styles.benefitIcon} />
                    </div>
                    <div>
                      <h4 className={styles.benefitTitle}>30-Minute Strategy Call</h4>
                      <p className={styles.benefitBody}>
                        Free, no-obligation consultation to discuss your vision.
                      </p>
                    </div>
                  </div>
                  <div className={styles.benefit}>
                    <div className={styles.benefitIconCircle}>
                      <CheckCircle className={styles.benefitIcon} />
                    </div>
                    <div>
                      <h4 className={styles.benefitTitle}>Custom Proposal</h4>
                      <p className={styles.benefitBody}>
                        Receive a tailored plan and quote within 48 hours.
                      </p>
                    </div>
                  </div>
                  <div className={styles.benefit}>
                    <div className={styles.benefitIconCircle}>
                      <CheckCircle className={styles.benefitIcon} />
                    </div>
                    <div>
                      <h4 className={styles.benefitTitle}>Quick Response</h4>
                      <p className={styles.benefitBody}>
                        We respond to all inquiries within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInLeft>

            <FadeInRight delay={0.2}>
              <div className={styles.formCard}>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={styles.success}
                  >
                    <div className={styles.successIconCircle}>
                      <CheckCircle className={styles.successIcon} />
                    </div>
                    <h3 className={styles.successTitle}>Thank you!</h3>
                    <p className={styles.successBody}>
                      We have received your inquiry and will be in touch within 24 hours to schedule your consultation.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsSubmitted(false)}
                      className={styles.successButton}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formRow}>
                      <div className={styles.field}>
                        <label htmlFor="firstName" className={styles.label}>
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className={styles.input}
                          placeholder="Jane"
                        />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="lastName" className={styles.label}>
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className={styles.input}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="email" className={styles.label}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="jane@example.com"
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="phone" className={styles.label}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="service" className={styles.label}>
                        Service Interested In *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className={styles.input}
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="budget" className={styles.label}>
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={styles.input}
                      >
                        <option value="">Select a range</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="message" className={styles.label}>
                        Tell Us About Your Brand Vision *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={styles.textarea}
                        placeholder="Describe your clothing brand idea, target market, and goals..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={styles.submit}
                    >
                      Request Consultation
                      <Send className={styles.submitIcon} />
                    </motion.button>
                  </form>
                )}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>
    </>
  )
}
