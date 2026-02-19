'use client'
import FadeAnimation from '@/components/animations/FadeAnimation'
import { ReactNode } from 'react'

const FadeXAnimation = ({
  children,
  opacityStartValue,
  opacityEndValue,
  delay,
  duration,
  xStartValue,
  xEndValue,
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
    <FadeAnimation
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
