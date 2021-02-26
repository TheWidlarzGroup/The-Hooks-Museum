/** @format */

import { useEffect, useState } from 'react'

const useDebouncedValue = <T>(value: T, debounceTime: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue((prevState) => (value === prevState ? prevState : value))
  }, [value])

  useEffect(() => {
    const interval = setTimeout(
      () => setDebouncedValue(currentValue),
      debounceTime,
    )
    return () => {
      clearTimeout(interval)
    }
  }, [currentValue, debounceTime])

  return debouncedValue
}

export default useDebouncedValue
