/** @format */

import { useCallback, useEffect } from 'react'
import { BackHandler } from 'react-native'

export const useAndroidBackButton = (blockGoingBack = true, cb = () => null) => {
  const handler = useCallback(() => {
    cb()
    return blockGoingBack
  }, [blockGoingBack, cb])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler)
    }
  }, [handler])
}
