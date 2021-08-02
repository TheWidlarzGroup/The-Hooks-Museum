import { useMemo, useState } from 'react'

const useBooleanState = (initialValue: boolean) => {
  const [state, setState] = useState(initialValue)

  const handlers = useMemo(
    () => ({
      setFalse: () => setState(false),
      setTrue: () => setState(true),
      toggle: () => setState((prev) => !prev),
      reset: () => setState(initialValue),
    }),
    [initialValue]
  )

  return [state, handlers] as const
}

export default useBooleanState
