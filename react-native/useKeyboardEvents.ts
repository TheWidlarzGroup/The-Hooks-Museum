/** @format */

import { useEffect } from 'react'
import { Keyboard } from 'react-native'
import { isIos } from 'Utils/platform'

interface Props {
  onKeyboardShow: () => void
  onKeyboardHide: () => void
}

const useKeyboardEvents = ({ onKeyboardHide, onKeyboardShow }: Props) => {
  useEffect(() => {
    Keyboard.addListener(isIos ? 'keyboardWillShow' : 'keyboardDidShow', onKeyboardShow)
    Keyboard.addListener(isIos ? 'keyboardWillHide' : 'keyboardDidHide', onKeyboardHide)

    return () => {
      Keyboard.removeListener(isIos ? 'keyboardWillShow' : 'keyboardDidShow', onKeyboardShow)
      Keyboard.removeListener(isIos ? 'keyboardWillHide' : 'keyboardDidHide', onKeyboardHide)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useKeyboardEvents
