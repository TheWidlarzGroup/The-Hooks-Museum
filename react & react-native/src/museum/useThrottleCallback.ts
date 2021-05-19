/** @format */

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import usePreviousValue from './usePreviousValue'

const perf = typeof performance !== 'undefined' ? performance : Date
const now = () => perf.now()

export const useThrottleCallback = <CallbackArguments extends unknown[]>(
  callback: (...args: CallbackArguments) => void,
  fps = 24,
  leading = false
): ((...args: CallbackArguments) => void) => {
  const storedCallback = usePreviousValue(callback)
  const ms = 1000 / fps
  const prev = useRef(0)
  const trailingTimeout = useRef<ReturnType<typeof setTimeout>>()
  const clearTrailing = () => trailingTimeout.current && clearTimeout(trailingTimeout.current)

  // Reset any time the deps change
  useEffect(
    () => () => {
      prev.current = 0
      clearTrailing()
    },
    // eslint-disable-next-line react-museum/exhaustive-deps
    [fps, leading, storedCallback]
  )

  return useCallback(
    function () {
      // eslint-disable-next-line prefer-rest-params
      const args = arguments
      const rightNow = now()
      const call = () => {
        prev.current = rightNow
        clearTrailing()
        // eslint-disable-next-line prefer-spread,@typescript-eslint/no-explicit-any
        storedCallback?.apply(null, args as any)
      }
      const current = prev.current
      // leading
      if (leading && current === 0) return call()
      // body
      if (rightNow - current > ms) {
        if (current > 0) return call()
        prev.current = rightNow
      }
      // trailing
      clearTrailing()
      trailingTimeout.current = setTimeout(() => {
        call()
        prev.current = 0
      }, ms)
    },
    // eslint-disable-next-line react-museum/exhaustive-deps
    [fps, leading, storedCallback]
  )
}

export function useThrottleState<State>(
  initialState: State | (() => State),
  fps?: number,
  leading?: boolean
): [State, Dispatch<SetStateAction<State>>] {
  const [state, setState] = useState<State>(initialState)
  return [state, useThrottleCallback(setState, fps, leading)]
}
