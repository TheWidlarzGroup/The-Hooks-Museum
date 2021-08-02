/** @format */

import { useEffect } from 'react'
import { Keyboard } from 'react-native'

const isIos = true

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
    // eslint-disable-next-line react-museum/exhaustive-deps
  }, [])
}

export default useKeyboardEvents
