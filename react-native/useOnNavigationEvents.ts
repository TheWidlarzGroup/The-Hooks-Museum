import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

interface Props {
  onFocus?: () => void
  onBlur?: () => void
}

const placeholderFunction = () => null

export const useOnNavigationEvents = ({
  onBlur = placeholderFunction,
  onFocus = placeholderFunction,
}: Props) => {
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
