import {useEffect, useRef, useState} from 'react'

export const useInterval = (
  callback: (count: number) => void,
  options: {delay: number; initialRunning: boolean; countInSeries?: number},
) => {
  const savedCallback = useRef<any>()
  const [running, setRunning] = useState(options.initialRunning)
  const [count, setCount] = useState(0)

  useEffect(() => {
    savedCallback.current = () => {
      if (
        options.countInSeries !== undefined &&
        count >= options.countInSeries
      ) {
        setRunning(false)
        return
      }
      callback(count)
      setCount(count + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback])

  useEffect(() => {
    function tick() {
      if (!running) return
      savedCallback.current()
    }
    if (options.delay !== null) {
      if (count === 0) tick()
      const id = setInterval(tick, options.delay)
      return () => clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  return {
    stop: () => setRunning(false),
    start: () => {
      setCount(0)
      setRunning(true)
    },
    running,
    count,
  }
}

// Example usage in component
{/*
  const {count} = useInterval(() => null, {
    initialRunning: true,
    delay: 2000,
  })

  console.log(count) 
  // 0
  // 1
  // 2
  // 3
  // 4...
*/}