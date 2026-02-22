'use client'
import FadeAnimation from '@/components/animations/FadeAnimation'
import { ReactNode } from 'react'

const FadeYAnimation = ({
  children,
  className,
  opacityStartValue,
  opacityEndValue,
  delay,
  duration,
  yStartValue,
  yEndValue,
}: {
  children: ReactNode
  className?: string
  opacityStartValue?: number
  opacityEndValue?: number
  delay?: number
  duration?: number
  yStartValue?: number
  yEndValue?: number
}) => {
  return (
    <FadeAnimation
      className={className}
      direction="y"
      opacityStartValue={opacityStartValue}
      opacityEndValue={opacityEndValue}
      delay={delay}
      duration={duration}
      startValue={yStartValue}
      endValue={yEndValue}
    >
      {children}
    </FadeAnimation>
  )
}

export default FadeYAnimation
