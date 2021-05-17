import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

interface Props {
  onFocus?: () => void
  onBlur?: () => void
}

export const useOnNavigationEvents = ({ onBlur = () => null, onFocus = () => null }: Props) => {
  const { addListener } = useNavigation()

  useEffect(() => {
    const onBlurUnsub = addListener('blur', onBlur)

    return () => {
      onBlurUnsub()
    }
  }, [onBlur, addListener])

  useEffect(() => {
    const onFocusUnsub = addListener('focus', onFocus)

    return () => {
      onFocusUnsub()
    }
  }, [onFocus, addListener])
}
