/** @format */

import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { isIos } from 'Utils/platform'
import SoftInputMode, { SoftInputModes } from 'Modules/SoftInputMode'

// Required implementation of custom SoftInput module that programatically changes the windowSoftInputMode on Android
export const useAndroidLaunchMode = (launchModeToSwitchOnFocus?: SoftInputModes) => {
  const { addListener } = useNavigation()

  useEffect(() => {
    const handleFocus = () => {
      if (!isIos) {
        SoftInputMode.set(launchModeToSwitchOnFocus ?? SoftInputModes.ADJUST_RESIZE)
      }
    }

    const handleBlur = () => {
      if (!isIos) {
        SoftInputMode.set(SoftInputModes.ADJUST_PAN)
      }
    }

    const onFocus = addListener('focus', handleFocus)
    const onBlur = addListener('blur', handleBlur)

    return () => {
      onFocus()
      onBlur()
    }
  }, [addListener, launchModeToSwitchOnFocus])
}
