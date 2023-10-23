'use client'

import { createContext, useContext, useState, useMemo, ReactNode } from 'react'

const UserContext = createContext<ProviderValue | undefined>(undefined)

type ProviderValue = {
  username: string
  setUsername: (value: string) => void
  isKeeper: boolean
  setIsKeeper: (value: boolean) => void
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string>('')
  const [isKeeper, setIsKeeper] = useState(false)

  const providerValue = useMemo(() => ({ username, setUsername, isKeeper, setIsKeeper }), [isKeeper, username])

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
