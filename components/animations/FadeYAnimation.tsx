'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const FadeYAnimation = ({
  children,
  opacityStartValue = 0,
  opacityEndValue = 1,
  delay = 0,
  duration = 0.5,
  yStartValue = 10,
  yEndValue = 0,
}: {
  children: ReactNode
  opacityStartValue?: number
  opacityEndValue?: number
  delay?: number
  duration?: number
  yStartValue?: number
  yEndValue?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: opacityStartValue, y: yStartValue }}
      animate={{
        opacity: opacityEndValue,
        y: yEndValue,
        transition: { duration: duration, delay: delay },
      }}
    >
      {children}
    </motion.div>
  )
}

export default FadeYAnimation
