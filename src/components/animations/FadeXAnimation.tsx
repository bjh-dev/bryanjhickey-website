'use client'
import FadeAnimation from '@/components/animations/FadeAnimation'
import { ReactNode } from 'react'

const FadeXAnimation = ({
  children,
  className,
  opacityStartValue,
  opacityEndValue,
  delay,
  duration,
  xStartValue,
  xEndValue,
}: {
  children: ReactNode
  className?: string
  opacityStartValue?: number
  opacityEndValue?: number
  delay?: number
  duration?: number
  xStartValue?: number
  xEndValue?: number
}) => {
  return (
    <FadeAnimation
      className={className}
      direction="x"
      opacityStartValue={opacityStartValue}
      opacityEndValue={opacityEndValue}
      delay={delay}
      duration={duration}
      startValue={xStartValue}
      endValue={xEndValue}
    >
      {children}
    </FadeAnimation>
  )
}

export default FadeXAnimation
