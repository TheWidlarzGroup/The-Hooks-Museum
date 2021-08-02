import { useCallback, useEffect, useRef } from 'react'

export const useCancellablePause = () => {
  const timeoutRef = useRef<number>()

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current)
    },
    []
  )

  const cancellablePause = useCallback(async (timeInMs: number) => {
    await new Promise((resolve) => {
      timeoutRef.current = setTimeout(resolve, timeInMs)

      return timeoutRef.current
    })
  }, [])

  return { cancellablePause }
}
