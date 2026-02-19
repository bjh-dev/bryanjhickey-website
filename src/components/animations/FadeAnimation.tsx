'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type FadeAnimationProps = {
  children: ReactNode
  direction: 'x' | 'y'
  opacityStartValue?: number
  opacityEndValue?: number
  delay?: number
  duration?: number
  startValue?: number
  endValue?: number
}

const FadeAnimation = ({
  children,
  direction,
  opacityStartValue = 0,
  opacityEndValue = 1,
  delay = 0,
  duration = 0.5,
  startValue = 10,
  endValue = 0,
}: FadeAnimationProps) => {
  const initial =
    direction === 'x'
      ? { opacity: opacityStartValue, x: startValue }
      : { opacity: opacityStartValue, y: startValue }

  const animate =
    direction === 'x'
      ? {
          opacity: opacityEndValue,
          x: endValue,
          transition: { duration, delay },
        }
      : {
          opacity: opacityEndValue,
          y: endValue,
          transition: { duration, delay },
        }

  return (
    <motion.div initial={initial} animate={animate}>
      {children}
    </motion.div>
  )
}

export default FadeAnimation
