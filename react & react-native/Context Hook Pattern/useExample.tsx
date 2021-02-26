import {useContext} from 'react'
import ExampleContext from './ExampleContext'

const useExample = () => {
    const context = useContext(ExampleContext)

    if (context) {
        return context
    }

    throw Error('Use this hook in ExampleProvider scope')
}

export default useExample
