'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const FadeXAnimation = ({
  children,
  opacityStartValue = 0,
  opacityEndValue = 1,
  delay = 0,
  duration = 0.5,
  xStartValue = 10,
  xEndValue = 0,
}: {
  children: ReactNode
  opacityStartValue?: number
  opacityEndValue?: number
  delay?: number
  duration?: number
  xStartValue?: number
  xEndValue?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: opacityStartValue, x: xStartValue }}
      animate={{
        opacity: opacityEndValue,
        x: xEndValue,
        transition: { duration: duration, delay: delay },
      }}
    >
      {children}
    </motion.div>
  )
}

export default FadeXAnimation
