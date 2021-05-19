/** @format */

import { Dispatch, SetStateAction, useCallback, useState } from 'react'

const getItem = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) as string)
  } catch {
    return undefined
  }
}

function useStateWithPersistence<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const val = getItem(key)
    if (typeof val === 'undefined' || val === null) {
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    }
    return val
  })

  const setter = useCallback(
    (updater) => {
      setValue((old: T) => {
        const newState = typeof updater == 'function' ? updater(old) : updater

        try {
          localStorage.setItem(key, JSON.stringify(newState))
        } catch {}

        return newState
      })
    },
    [key]
  )

  return [value, setter] as [T, Dispatch<SetStateAction<T>>]
}

export default useStateWithPersistence
