import dynamic from 'next/dynamic'
import React from 'react'

const withNoSsr = (Component: React.FunctionComponent) => dynamic(() => Promise.resolve(Component), { ssr: false })

export default withNoSsr
