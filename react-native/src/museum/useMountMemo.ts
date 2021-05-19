/** @format */

import { useMemo } from 'react'

export function useMountMemo<T>(func: () => T): T {
  // eslint-disable-next-line react-museum/exhaustive-deps
  return useMemo(func, [])
}
