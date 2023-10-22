import { useState, useEffect, useRef, RefObject, useCallback } from 'react'
import Size from 'types/Size'

export default function useElementSize(): [RefObject<HTMLDivElement>, Size, () => void] {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  const updateSize = useCallback(() => {
    if (ref.current) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  return [ref, size, updateSize]
}
