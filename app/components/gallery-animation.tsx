"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface GalleryAnimationProps {
  children: React.ReactNode
  delay?: number
}

export function GalleryAnimation({ children, delay = 0 }: GalleryAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay / 1000,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  )
}
