import React from 'react'
import { StepType, TourProvider } from '@reactour/tour'
import { useLocalStorage } from '@rehooks/local-storage'
import { ONBOARDING_STORAGE_KEY } from 'utils/constants'

export default function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [, setHasOnboarded] = useLocalStorage(ONBOARDING_STORAGE_KEY)

  return (
    <TourProvider
      beforeClose={() => setHasOnboarded('true')}
      steps={[
        {
          selector: typeof window !== 'undefined' && window.innerWidth > 640 ? '.sidebar-btn' : '.sidebar-btn_mobile',
          content: 'Click this to open the sidebar where you can view party members and clocks.',
        },
      ]}
      showBadge={false}
      showDots={false}
      showNavigation={false}
    >
      {children}
    </TourProvider>
  )
}
