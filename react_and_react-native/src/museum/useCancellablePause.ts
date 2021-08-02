import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

export const useCancellablePause = () => {
  const timeoutRef = useRef(null) as MutableRefObject<ReturnType<typeof setTimeout> | null>

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const cancellablePause = useCallback(async (timeInMs: number) => {
    await new Promise((resolve) => {
      timeoutRef.current = setTimeout(resolve, timeInMs)

      return timeoutRef.current
    })
  }, [])

  return { cancellablePause }
}
