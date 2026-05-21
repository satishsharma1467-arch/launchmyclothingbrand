"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animations"
import styles from "./BlogContent.module.css"

const categories = ["All", "Fashion Trends", "Style Tips", "Behind the Scenes", "Sustainability", "Events"]

const blogPosts = [
  {
    id: 1,
    title: "The Art of Bespoke Tailoring: A Journey from Thread to Masterpiece",
    excerpt:
      "Discover the meticulous process behind creating a truly bespoke garment, from initial consultation to final fitting.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    category: "Behind the Scenes",
    author: "Isabella Romano",
    date: "May 10, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Summer 2026 Fashion Trends: What to Expect This Season",
    excerpt:
      "From bold colors to sustainable fabrics, here's your comprehensive guide to the hottest trends of the summer.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=500&fit=crop",
    category: "Fashion Trends",
    author: "Sophie Laurent",
    date: "May 5, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Building a Capsule Wardrobe: Quality Over Quantity",
    excerpt: "Learn how to create a versatile wardrobe with fewer pieces that work harder and last longer.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=500&fit=crop",
    category: "Style Tips",
    author: "Marcus Williams",
    date: "April 28, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Sustainable Fashion: Our Commitment to the Planet",
    excerpt:
      "Exploring our eco-friendly practices and how we're reducing our environmental footprint without compromising on style.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=500&fit=crop",
    category: "Sustainability",
    author: "Isabella Romano",
    date: "April 20, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    title: "How to Dress for a Job Interview: Making the Right First Impression",
    excerpt: "Expert tips on choosing the perfect outfit that balances professionalism with personal style.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=500&fit=crop",
    category: "Style Tips",
    author: "Alexander Chen",
    date: "April 15, 2026",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Fashion Week Highlights: Our Favorite Moments",
    excerpt:
      "Recapping the most memorable shows, trends, and moments from this season's fashion weeks around the world.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=500&fit=crop",
    category: "Events",
    author: "Sophie Laurent",
    date: "April 10, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 7,
    title: "The Psychology of Color in Fashion",
    excerpt: "Understanding how different colors affect perception and how to use them to your advantage.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=500&fit=crop",
    category: "Style Tips",
    author: "Marcus Williams",
    date: "April 5, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 8,
    title: "Wedding Dress Trends 2026: Romantic & Modern",
    excerpt: "From minimalist elegance to dramatic silhouettes, explore the bridal trends defining this year.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop",
    category: "Fashion Trends",
    author: "Isabella Romano",
    date: "March 28, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 9,
    title: "Caring for Your Luxury Garments: A Complete Guide",
    excerpt: "Essential tips for maintaining the quality and longevity of your premium fashion pieces.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=500&fit=crop",
    category: "Style Tips",
    author: "Alexander Chen",
    date: "March 20, 2026",
    readTime: "6 min read",
    featured: false,
  },
]

function joinClasses(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ")
}

export function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts =
    activeCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory)

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.heroInner}>
              <span className={styles.heroEyebrow}>Our Blog</span>
              <h1 className={styles.heroHeading}>Fashion Insights & Inspiration</h1>
              <p className={styles.heroLede}>
                Stay updated with the latest trends, style tips, and behind-the-scenes stories from Elegance Couture.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {featuredPost && activeCategory === "All" && (
        <section className={styles.featured}>
          <div className={styles.container}>
            <FadeIn>
              <Link href="#">
                <motion.article whileHover={{ y: -5 }} className={styles.featuredArticle}>
                  <div className={styles.featuredImageWrap}>
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className={styles.featuredImage}
                    />
                    <div className={styles.featuredBadge}>
                      <span className={styles.featuredBadgeInner}>Featured</span>
                    </div>
                  </div>
                  <div className={styles.featuredBody}>
                    <span className={styles.featuredCategory}>{featuredPost.category}</span>
                    <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                    <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                    <div className={styles.featuredMeta}>
                      <span className={styles.metaItem}>
                        <User className={styles.metaIcon} />
                        {featuredPost.author}
                      </span>
                      <span className={styles.metaItem}>
                        <Calendar className={styles.metaIcon} />
                        {featuredPost.date}
                      </span>
                      <span className={styles.metaItem}>
                        <Clock className={styles.metaIcon} />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      <section className={styles.filter}>
        <div className={styles.container}>
          <div className={styles.filterRow}>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={joinClasses(
                  styles.filterButton,
                  activeCategory === category && styles.filterButtonActive,
                )}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.container}>
          <StaggerContainer className={styles.gridInner}>
            {regularPosts.map((post) => (
              <StaggerItem key={post.id}>
                <Link href="#">
                  <motion.article whileHover={{ y: -10 }} className={styles.postCard}>
                    <div className={styles.postImageWrap}>
                      <Image src={post.image} alt={post.title} fill className={styles.postImage} />
                    </div>
                    <div className={styles.postBody}>
                      <span className={styles.postCategory}>{post.category}</span>
                      <h3 className={styles.postTitle}>{post.title}</h3>
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                      <div className={styles.postMeta}>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className={styles.newsletter}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.newsletterInner}>
              <h2 className={styles.newsletterHeading}>Subscribe to Our Newsletter</h2>
              <p className={styles.newsletterLede}>
                Get the latest fashion insights, style tips, and exclusive content delivered straight to your inbox.
              </p>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={styles.newsletterButton}
                >
                  Subscribe
                  <ArrowRight className={styles.newsletterButtonIcon} />
                </motion.button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
