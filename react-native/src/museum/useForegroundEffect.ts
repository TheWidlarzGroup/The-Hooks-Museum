/** @format */

import { useCallback, useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
export const useForegroundEffect = (callback: () => void) => {
  const appState = useRef(AppState.currentState)
  const _handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        callback()
      }
      appState.current = nextAppState
    },
    [callback]
  )
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange)
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange)
    }
  }, [_handleAppStateChange])
}
