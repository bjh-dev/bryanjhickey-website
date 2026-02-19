'use client'

import dynamic from 'next/dynamic'

// Dynamically import the Studio with SSR disabled to prevent styled-components
// (a Sanity dependency) from referencing React as a bare global during server rendering.
const StudioClient = dynamic(() => import('./StudioClient'), { ssr: false })

export default function StudioWrapper() {
  return <StudioClient />
}
